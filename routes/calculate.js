const { Router } = require('express');
const { body, validationResult } = require('express-validator');

const router = Router();

const calculatePayloadValidation = () => {
    return [
        body().isArray().withMessage('List of flights is required'),
        body().custom(arr => arr.length > 0).withMessage('List of flights can\'t be empty'),
        body().custom(arr => arr.every(item => item.length === 2)).withMessage('Flight must have two elements'),
        body().custom(arr => arr.every(item => item.every(element => typeof element === 'string'))).withMessage('Flight departure and arrivals must be string'),
    ]
};

router.post('/calculate',
    calculatePayloadValidation(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        return res.json(req.body[0]);
});

module.exports = router;