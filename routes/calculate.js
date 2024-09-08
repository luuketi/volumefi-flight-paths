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

        const route = findRoute(req.body);
        if (route !== undefined){
            return res.json(route);
        }
        return res.status(400).json({ errors: ['Invalid flights'] });
});

function findRoute(flights) {
    let departures = flights.map(flight => {return flight[0]});
    let arrivals = flights.map(flight => {return flight[1]});

    for (let i = departures.length - 1; i >= 0; --i) {
        const departure = departures[i];
        if (arrivals.includes(departure)) {
            departures.splice(i, 1);
            const index = arrivals.indexOf(departure);
            if (index >= 0) {
                arrivals.splice(index, 1);
            }
        }
    }

    if (departures.length === 1 && arrivals.length === 1){
        return departures.concat(arrivals);
    }
}

module.exports = router;