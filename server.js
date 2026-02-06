app.get("/login", (req, res) => {

const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`;
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