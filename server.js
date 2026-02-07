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

if(data.access_token){
    res.send("Successo!");
}else{
    return res.status(400).send("Error!")
}

});

app.listen(8803, () =>{
    console.log("Server pronto!");
});

