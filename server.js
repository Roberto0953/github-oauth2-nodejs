require('dotenv').config(); // Legge il file .env
const express = require('express'); // Carica il framework per il server
const app = express(); // Crea l'istanza dell'applicazione

app.get("/login", (req, res) => {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
    
    res.redirect(url);
});


app.get("/api/auth/github/callback", (req, res) =>{

const  code = req.query.code;

if(!code){
    return res.status(400).send("Bad request");
}

console.log(code);
res.send("Autenticazione riuscita!");

});

app.listen(8803, () =>{
    console.log("Server pronto!");
});

const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
    }),
    headers: {
        "Content-type": "application/json",
        Accept: "application/json",
    },
});


const data = await response.json();
console.log(data);