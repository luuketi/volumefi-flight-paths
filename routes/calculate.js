const { Router } = require('express');
const { body, validationResult } = require('express-validator');

const router = Router();

const calculatePayloadValidation = () => {
    return [
        body().isArray().withMessage('Array of flights is required'),
    ]
};

router.post('/calculate',
    calculatePayloadValidation(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        return res.json({});
});

module.exports = router;