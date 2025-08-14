const express = require('express')
const path = require ('path')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const Port = 4093;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(express.static("pages"))
app.listen(Port , ()=>{
    console.log(`Port is open at: http://localhost:${Port}`)
})
app.get('/', (req, res) => {
 res.sendFile(path.join(__dirname, 'index.html'))
});
app.get('/Games', (req, res) => {
 res.sendFile(path.join(__dirname, 'pages/Games.html'))
});
app.get('/product', (req, res) => {
 res.sendFile(path.join(__dirname, 'pages/product.html'))
});

app.get('/images/key-skull', (req, res) => {
 res.sendFile(path.join(__dirname, 'assets/key-skull.jpg'))
});
app.get('/images/red-pad', (req, res) => {
 res.sendFile(path.join(__dirname,  "assets/red-pad3.jpg"))
});
app.get('/images/see-game', (req, res) => {
 res.sendFile(path.join(__dirname,  "assets/see-game.jpg"))
});

app.get('/images/x-box-A', (req, res) => {
 res.sendFile(path.join(__dirname,  "assets/x-box-A.jpg"))
});
app.get('/images/x-boxSilver', (req, res) => {
 res.sendFile(path.join(__dirname,  "assets/x-box-silver.jpg"))
});
app.get('/images/x-gamepad', (req, res) => {
 res.sendFile(path.join(__dirname,  "assets/x-gamepad.jpg"))
});
app.get('/data', (req, res) => {
 res.sendFile(path.join(__dirname, 'assets/data/productData.json'))
}); 
