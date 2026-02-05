app.get("/login", (req, res) => {

const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`;
res.redirect(url);

});