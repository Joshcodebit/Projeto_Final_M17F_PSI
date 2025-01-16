const express = require('express');
const { request } = require('http');
const app =express();
const path = require('path')
const mysql = require('mysql2')
 
app.use(express.json())

//1)
const selecionar = "songs";
app.get('/api/songs',(req, res)=>{
 //Onde definimos a query
 const myQuery = `SELECT * FROM ${selecionar}`
    
 //Executa a myQuery
 connection.query(myQuery, (err, results) => {

 // Dar erro se err existir
 if (err){
     return res.status(500).send('Erro ao buscar musicas : ' + err.message);
 }
 // Enviar resposta
 res.json(results);
 });
});

//2)
app.post('api/songs', (req, res) => {

    console.log(req.body)
     //Onde definimos a query
 const myQuery = `INSERT INTO songs (id, title, artist, album, genre, duration_seconds, release_date, likes) VALUES (null,'${req.body.title}', '${req.body.artist}','${req.body.album}','${req.body.genre}','${req.body.duration_seconds}','${req.body.release_date}','${req.body.likes}')`
    
 //Executa a myQuery
 connection.query(myQuery, (err, results) => {

 // Dar erro se err existir
 if (err){
     return res.status(500).send('Erro ao buscar musicas: ' + err.message);
 }
 // Enviar resposta
 res.json(results);
 });
})
//3)
app.put('api/songs/:id', (req, res) => {

    console.log(req.body)
     //Onde definimos a query
 const myQuery = `UPDATE songs SET title = '${req.body.title}', artist= '${req.body.artist}', album= '${req.body.album}', genre= '${req.body.genre}', duration_seconds= '${req.body.duration_seconds}', release_date= '${req.body.release_date}', likes= WHERE id= '${req.body.likes}' ${req.params.id}`
    
 //Executa a myQuery
 connection.query(myQuery, (err, results) => {

 // Dar erro se err existir
 if (err){
     return res.status(500).send('Erro ao buscar musicas: ' + err.message);
 }
 // Enviar resposta
 res.json(results);
 });
})

//4)
app.delete('api/songs/id:', (req, res) => {

    console.log(req.body)
     //Onde definimos a query
 const myQuery = `DELETE songs WHERE id = ${req.params.id}`
    
 //Executa a myQuery
 connection.query(myQuery, (err, results) => {

 // Dar erro se err existir
 if (err){
     return res.status(500).send('Erro ao buscar musicas: ' + err.message);
 }
 // Enviar resposta
 res.json(results);
 });
})

   //5)
const NOME_TABELA = "songs";

app.get('/api/songs/:id',(req, res)=>{
    const id = req.params.id;
    const myQuery = `SELECT * FROM ${NOME_TABELA} WHERE id = ${id}`
       
    //Executa a myQuery
    connection.query(myQuery, (err, results) => {
   
    // Dar erro se err existir
    if (err){
        return res.status(500).send('Erro ao buscar musicas : ' + err.message);
    }
    // Enviar resposta
    res.json(results);
    });
   })

   //6)
var priceperlike = 0.5;

   app.get('/api/price',(req, res)=>{

const result = {"price":priceperlike}

    // Enviar resposta
    res.json(result);
   });


    
 
//7)  
app.put('/api/price', (req, res) => {
    if (pricePerLike != null){
        pricePerLike = req.body.price;
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});
 
 
//8)
app.get('/api/songs/:id/revenue', (req, res) =>{    
    const id = req.params.id;
    const myQuery = `SELECT likes FROM ${NOME_TABELA} WHERE id = ${id}`;
connection.query(myQuery, (err, results) => {
 
    if (err) {
        return res.status(404).send('Erro ao encontrar a receita: ' + err.message);
    }
 
    res.json({"revenue": priceperlike * results[0].likes});
});
  });
 
 
 
//9)
const bands = [
    {
        "artist": "Ed Sheeran",
        "band_members": ["Ed Sheeran"]
    },
    {
        "artist": "Linkin Park",
        "band_members": ["Mike Shinoda", "Brad Delson", "Dave Farrell", "Joe Hahn", " Emily Armstrong", "Colin Brittain"]
    },
    {
        "artist": "eminem",
        "band_members": ["eminem"]
    }
]
 
 
app.get('/api/songs/:id/band', (req, res) =>{    
    const id = req.params.id;  
    const myQuery = `SELECT artist FROM ${NOME_TABELA} WHERE id = ${id}`;
connection.query(myQuery, (err, results) => {
 
    if (err) {
        return res.status(404).send('Erro a aceder à base de dados: ' + err.message);
    }

    const artist=results[0].artist;
    for (let i = 0 ; i < bands.length; i++){
        if (results[0].artist==bands[i].artist){
       return res.json(bands[i])
        }
    }

    return res.status(404).send('Erro ao encontrar os membros da banda: ');
 
});
  });  

  //10)
  
app.post('/api/songs/:id/band', (req, res) =>{    
    const id = req.params.id;  
    const myQuery = `SELECT * FROM ${NOME_TABELA} WHERE id = ${id}`;
connection.query(myQuery, (err, results) => {
 
    if (err) {
        return res.status(404).send('Erro ao encontrar a banda: ' + err.message);
    }
 
    res.json(results[bands]);
});
  });  
 


const connection= mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'musicas_t1',
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar à base de dados:', err.message);
    } else {
        console.log('Conectado à base de dados MYSQL!');
    }
});
    
   
 
const PORT=3002;
app.listen(PORT, ()=>{
    console.log(`servidor a correr em http://localhost:${PORT}`);
})