import 'dotenv/config'; // Legge il file .env
import express from 'express'; // Carica il framework per il server
const app = express(); // Crea l'istanza dell'applicazione

app.get("/login", (req, res) => {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
    
    res.redirect(url);
});


app.get("/api/auth/github/callback", async (req, res) =>{

const  code = req.query.code;

if(!code){
    return res.status(400).send("Bad request");
}

console.log("the code is: ", code);


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
console.log("Token ricevuto: ", data);


const userResponse = await fetch("https://api.github.com/user", {
    method: 'GET',
    headers: {
        "Authorization": `Bearer ${data.access_token}`, 
        "User-Agent": "IlMioProgettoOAuth",
        "Accept": "application/json"
    }

});

const userData =  await userResponse.json();
console.log("Dati profilo: ", userData);

if (userData.login) {
    res.send(`<h1>Benvenuto ${userData.login}!</h1><img src="${userData.avatar_url}" width="100">`);
} else {
    res.status(500).send("Errore nel recupero dei dati utente");
}

});

app.listen(8803, () =>{
    console.log("Server pronto!");
});

