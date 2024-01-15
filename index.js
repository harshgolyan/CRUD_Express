const express = require('express')
const db = require('./model/connection')
const engine = require('express-handlebars').engine



const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


app.get("/",(req,res)=>{
    res.render('home')
})

//create user

app.post("/adduser",(req,res)=>{
    //console.log(req.body)
    const user = {name:req.body.name,email:req.body.email,phone:req.body.phone}
    const sql = "INSERT INTO `employee` SET ?"
    db.query(sql,user,(err,result)=>{
        if(err) throw err
        else res.render('home')
    })
})

//show user

app.get("/showUser",(req,res)=>{
    const sql = "SELECT * FROM `employee`"
    db.query(sql,(err,result)=>{
        if(err) console.log(err.sqlMessage)
        else res.render('show',{list:result})
    })

})

//delete user

app.get("/deleteUser/:id",(req,res)=>{
    //console.log("hello")
    let sql = `DELETE FROM employee WHERE id = '${req.params.id}'`
    db.query(sql,(err,result)=>{
        if(err) console.log(err)
        else res.redirect('/showUser')
    })
})

//update user

app.post("/updateUser/:id",(req,res)=>{
    const id = req.params.id
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone

    const sql = `UPDATE employee SET name ='${name}',email = '${email}',phone = '${phone}' WHERE id = '${id}'`
    db.query(sql,(err,result)=>{
        if(err) console.log(err)
        else res.redirect('/showUser')
    })
})

//edit user

app.get("/editUser/:id",(req,res)=>{
        const sql = `SELECT * FROM employee WHERE id = '${req.params.id}'`
        db.query(sql,(err,result)=>{
            if(err) console.log(err)
            else res.render('editUser',{list:result})
        })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})