const express = require('express');
const https = require('https');

const app = express();

app.get('/noticias', async (req, res) => {
const { data, tema, pais, idioma } = req.query;

const options = {
    hostname: 'newsapi.org',
    path: `/v2/everything?q=LGBTQIA+${data ? `&from=${data}` : ''}${tema ? `&topic=${tema}` : ''}${pais ? `&country=${pais}` : ''}${idioma ? `&language=${idioma}` : ''}&apiKey=${process.env.NEWS_API_KEY}`,
    method: 'GET',
};

const request = https.request(options, (response) => {
    let body = '';

    response.on('data', (chunk) => {
    body += chunk;
    });

    response.on('end', () => {
    const noticias = JSON.parse(body).articles;

    res.json({ noticias });
    });
});

request.end();
});

app.listen(3000, () => {
console.log('API escutando na porta 3000');
});
