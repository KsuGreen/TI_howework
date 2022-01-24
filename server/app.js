const express = require('express');
const app = express();
const port = 8081;

// parse application/json
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

let shelfList = [
    {
        name: 'Багет дэс кук',
        description: 'Хлебные изделия'
    },
    {
        name: 'Упс',
        description: 'Мороженные продукты'
    },
    {
        name: 'Выдра',
        description: 'Фрукты'
    },
    {
        name: 'Диван',
        description: 'Овощи'
    },
    {
        name: 'Тарелка',
        description: 'Сыры'
    }
];

let goodsList = [
    {
        shelfId: 1,
        name: 'Батон',
    },
    {
        shelfId: 3,
        name: 'Хлеб',
    },
    {
        shelfId: 4,
        name: 'Помидор',
    }
];

const handleShelfChange = (req, res) => {
    shelfList = req.body;
}
const handleGoodsChange = (req, res) => {
    goodsList = req.body;
}

app.get('/shelfs', (req, res) => {
    res.send(shelfList);
});

app.get('/goods', (req, res) => {
    res.send(goodsList);
});

app.post('/add/shelf', handleShelfChange);
app.delete('/delete/shelf', handleShelfChange);

app.post('/add/good', handleGoodsChange);
app.put('/change/good', handleGoodsChange);
app.delete('/delete/good', handleGoodsChange);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
