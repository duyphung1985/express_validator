const express = require('express');
const app = express();
const { check, validationResult } = require('express-validator');
const flash = require('connect-flash');
const bodyParser = require('body-parser');


app.set('views','views')
app.set('view engine','ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/',function(req,res){
    res.render('index');
})

app.get('/register',function(req,res){
    res.render('register');
})

app.post('/register', [
    check('name','Name: độ dài tối thiểu là 5 ký tự')
        .exists()
        .isLength({min: 5}),
    check('email','Email không đúng định dạng')
        .exists()
        .isEmail(),
    check('password','Password độ dài tối thiểu là 8 ký tự')
        .isLength({min: 8})
],
function(req,res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        var alert = errors.array();
        res.render('register',{
            alert
        })
    }
});

//Start server listener
const port = 3333;
app.listen(port,function(err){
    if(err){
        console.log(err);
    } else{
        console.log(`App listener http://localhost:${port}`)
    }
})