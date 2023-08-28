const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const history = [];

function performOperation(operator, operand1, operand2) {
    operand1 = parseFloat(operand1);
    operand2 = parseFloat(operand2);

    switch (operator) {
        case 'add':
            return operand1 + operand2;
        case 'subtract':
            return operand1 - operand2;
        case 'multiply':
            return operand1 * operand2;
        case 'divide':
            return operand1 / operand2;
        case 'modulus':
            return operand1 % operand2;
        case 'exponential':
            return operand1 ** operand2;
        default:
            return 'Invalid operation';
    }
}

app.get('/calculate/:operator', (req, res) => {
    const operator = req.params.operator;
    const { operand1, operand2 } = req.body;

    if (!operator || !operand1 || !operand2) {
        return res.status(400).json({ error: 'Invalid request format' });
    }

    const result = performOperation(operator, operand1, operand2);
    history.push({ operator, operand1, operand2, result });
    
    if (history.length > 20) {
        history.shift();
    }

    res.json({ result });
});

app.get('/history', (req, res) => {
    res.json(history);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
