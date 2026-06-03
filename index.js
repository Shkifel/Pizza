
const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.static('public'));

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


let applications = []; 


app.listen(PORT, () => {
    console.log(`Сервер успешно запущен на порту ${PORT}`);
});