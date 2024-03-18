import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;
var isUserAuthorised = false;

function passwordChecker(req, res, next){
    if(req.body.password == "ILoveProgramming"){
        isUserAuthorised = true;
        
    }
    next();
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(passwordChecker);

app.get('/', (req, res) => {
  res.sendFile(__dirname +'/public/index.html');
});

app.post('/check', (req, res) => {
    if(isUserAuthorised){
        res.sendFile(__dirname +'/public/secret.html');
    }
    else{
        res.redirect('/');
    }
});