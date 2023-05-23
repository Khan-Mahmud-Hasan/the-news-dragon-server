const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// data load
const categories = require('./data/categories.json');
const news = require('./data/news.json');
app.use(cors());

app.get('/', (req, res) => {
    res.send('Dragon is running')
});

// data get
app.get('/categories', (req, res) => {
    res.send(categories);
})
app.get('/news', (req, res) => {
    res.send(news);
})

// get data as per selected ID
app.get('/news/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const selectedNews = news.find(n => n._id === id);
    res.send(selectedNews);
})

// get categories wise id news
app.get('/categories/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    if (id === 0) {
        res.send(news)
    }
    else {
        const categoryWiseNews = news.filter(n => parseInt(n.category_id) === id);
        res.send(categoryWiseNews);
    }
})

app.listen(port, () => {
    console.log(`Dragon API is running on port: ${port}`);
})