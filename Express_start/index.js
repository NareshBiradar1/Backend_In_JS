const express = require('express')
const app = express()

let courses  = [
    {id:1, name:"java"},
    {id:2 , name:"javascript"},
    {id:3 , name:"python"}
]

function logger(req,res,next){
    console.log(req.ip);
    console.log(req.hostname);
    console.log(new Date().toString());
    next();
}

app.use(express.json());
app.use(logger);

app.get('/courses' , (req,res)=>{
    res.json(courses);
})

app.post('/courses' , (req,res)=>{
    let newCourse  = {
        id : courses.length+1 ,
        name : req.body.name
    }
    courses.push(newCourse);
    res.json(courses);
});

app.put('/courses/:id' , (req,res)=>{
    const ID = req.params.id;

    let course = courses.find(course => course.id == ID);

    if(course==null){
        res.send("course not found");
    }
    else{
        course.name = req.body.name;
        res.send(courses)
    }
})

app.delete('/courses/:id' , (req,res)=>{
    const ID = parseInt(req.params.id);
    courses = courses.filter(course => course.id !== ID)
    res.send(courses);
})

app.listen(3000 , ()=>{
    console.log("port is running")
})