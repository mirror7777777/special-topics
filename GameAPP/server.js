const express = require('express')
const path = require ('path')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const Port = 4093;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(express.static("public"))
app.listen(Port , ()=>{
    console.log(`Port is open at: http://localhost:${Port}`)
})
app.get('/', (req, res) => {
 res.sendFile(path.join(__dirname, 'public/index.html'))
});
app.get('/Games', (req, res) => {
 res.sendFile(path.join(__dirname, 'public/Games.html'))
});
app.get('/Product', (req, res) => {
 res.sendFile(path.join(__dirname, 'public/Product.html'))
});

app.get('/images/key-skull', (req, res) => {
 res.sendFile(path.join(__dirname, 'Assets/key-skull.jpg'))
});
app.get('/images/blue-pad', (req, res) => {
 res.sendFile(path.join(__dirname,  "Assets/blue-pad.jpg.jpg"))
});
app.get('/images/red-pad', (req, res) => {
 res.sendFile(path.join(__dirname,  "Assets/red-pad3.jpg"))
});
app.get('/images/see-game', (req, res) => {
 res.sendFile(path.join(__dirname,  "Assets/see-game.jpg"))
});
app.get('/images/skull-pad.', (req, res) => {
 res.sendFile(path.join(__dirname,  "Assets/skull-pad.jpg"))
});
app.get('/images/x-box-A', (req, res) => {
 res.sendFile(path.join(__dirname,  "Assets/x-box-A.jpg"))
});
app.get('/images/x-boxSilver', (req, res) => {
 res.sendFile(path.join(__dirname,  "Assets/x-box-silver.jpg"))
});
app.get('/images/x-gamepad', (req, res) => {
 res.sendFile(path.join(__dirname,  "Assets/x-gamepad.jpg"))
});
