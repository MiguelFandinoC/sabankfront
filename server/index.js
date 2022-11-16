const express = require('express')
const app = express()
const mysql = require("mysql");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Clubpenguin321?',
    database:'portal'
});

app.post('/register',(req,response) => {

    const userName = req.body.username 
    const userPassword = req.body.password 
    const userBalance = req.body.balance 
    const accountType = req.body.type 
    const accountNum = req.body.num

    db.query("INSERT INTO login (userName,userPassword,userBalance,accountType,accountNum) VALUES (?,?,?,?,?)",
    [userName,userPassword,userBalance,accountType,accountNum],
    (err,result)=>{
        console.log(err)
    })
})

app.post("/login" , (req,response)=> {
    const userName = req.body.username 
    const userPassword = req.body.password 
    db.query(   
        "SELECT * FROM login WHERE userName = ? AND userPassword = ?",
    [userName,userPassword],
    (err,result)=>{
        if(err){
            response.send({err: err})
        }
        if (result.length > 0){
            response.send(result)
        }else {
            response.send({message: "Wrong  combination of username/password!"})
        }
    })
})

app.post("/transaccion", (req,response) => {
    const accountNum = req.body.num
    const dineroTran = req.body.dineroTran
    const accNum = req.body.accNum 
    db.query(
        "UPDATE login SET userbalance= userbalance + ? WHERE accountNum =?;",
        [dineroTran,accountNum],
        (err,result)=>{
            if(err){
                response.send({err: err})
            }else{
                response.send(result)
            }
        }
    )
    db.query(
        "UPDATE login SET userbalance= userbalance - ? WHERE accountNum =?;",   
        [dineroTran,accNum],
        (err,result)=>{
            if(err){
                response.send({err: err})
            }else{
                response.send(result)
            }
        }
    )
})

app.listen(3001, () => {
    console.log("running on port 3001");
})