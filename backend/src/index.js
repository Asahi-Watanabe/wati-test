const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const TreeService = require('./treeService');

const app = express();
const port = 8080;

const treeService = new TreeService();

app.use(bodyParse.json());
app.use(cors());

app.put('/tree', (req, res) => {
    const { value } = req.body;

    if (value === undefined) {
        res.status(400).json({
            message: 'Bad Request',
        })
    }

    if (!treeService.valueValidator(req.body)) {
        res.status(400).json({
            message: 'Bad Request',
        })
    }
    
    treeService.save(req.body);
    
    res.status(200).json({
        message: 'success',
    });
});

app.get('/tree', (req, res) => {
    const { path } = req.query;
    const value = treeService.getValue(path);

    if (value === null) {
        res.status(404).json({
            message: 'Not Found',
        });
    } else {
        res.status(200).json({
            message: 'success',
            value,
        });
    }
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});