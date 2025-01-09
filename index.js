const express = require('express');
const { request } = require('http');
const app =express();
const path = require('path')
const mysql = require('mysql2')
 
app.use(express.json())

app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));

})
app.get('/sobre',(req, res)=>{
    res.sendFile(path.join(__dirname, 'sobre.html'));   



})
app.get('/contactos',(req, res)=>{
    res.sendFile(path.join(__dirname, 'contactos.html'));
  
})

app.get('/carros',(req, res)=>{
    res.sendFile(path.join(__dirname, 'carros.html'));
});

app.get('/carros/:marca',(req, res)=>{
    const requestedId = req.params.marca;
    res.send(`A marca de carro acedido foi o ${requestedId}`);
});

app.get('/users/:name/nationality/:country',(req, res)=>{
    const name = req.params.name
    const country = req.params.country
    res.send(`O ${name} tem nacionalidade ${country}`);
});

app.get('/search_users',(req, res)=>{
    const query = req.query;
    res.send(`Procuraste pelo termo ${query.name} com o filtro ${query.id}`);
});

app.get('/tarefas',(req, res)=>{
    res.sendStatus(404);
})
app.get('/pagamento',(req, res)=>{
    res.status(403).send("FORBIDEEEEEEEEEEEEEEN!");
})



app.get('api/songs',(req, res)=>{
 //Onde definimos a query
 const myQuery = 'SELECT * FROM songs'
    
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

app.delete('api/songs', (req, res) => {

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


const connection= mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'psi_t1',
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