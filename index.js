const express = require("express");
const app=express();

const port = 8080;

const path =require("path");


const methodOverride =require("method-override");

const {v4: uuidv4} = require('uuid');
uuidv4();

app.use(express.urlencoded({ extended :true}));


app.use(express.json());


app.use(methodOverride('_method'))

app.set("view engine","ejs");

app.set("views",path.join(__dirname,"views"));


app.use(express.static(path.join(__dirname,"public")));


app.get("/posts",(req,res)=> {


    res.render("index.ejs",{posts});

});

app.get("/posts/new",(req,res)=> {


    res.render("new.ejs");
  
}
)

app.post("/posts", (req, res) => {
    let id = uuidv4();

    let { username, content } = req.body;

    posts.push({ id, username, content });

    res.redirect("/posts");
});   

app.get("/posts/:id",(req,res)=> {

    
     let { id } = req.params;
   
let post = posts.find((p) => id ===p.id);

res.render("show.ejs",{post});
   
})
app.patch("/posts/:id",(req,res)=> {
 let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id ===p.id);
    post.content= newContent;

     
      
  res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=> {
    let { id } = req.params;
 let post = posts.find((p) => id ===p.id);
 res.render("edit.ejs",{post});;


})
app.delete("/posts/:id",(req,res)=> {
     let { id } = req.params;

      posts = posts.filter((p) => id !==p.id);
  res.redirect("/posts");
     
})

let posts = [

    {
        id : uuidv4(),
        username : "himal",
        content : " I love coding "

    },
    {
        id : uuidv4(),
        username : "jagdish",
        content : "Hardwork is important to achieve success"

    },
    {
        id: uuidv4(),
        username : "niraj",
        content : " I got selected for my first internship "

    },
]


app.listen(port,()=> 
console.log(`app is listening on the ${port}`));