const express=require('express')
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const menu=require(__dirname +"/data.js")
const app=express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"));

mongoose.connect("mongodb+srv://dbkaran:Karan@123@cluster0.p32px.mongodb.net/getlocationDB" ,{useNewUrlParser:true, useUnifiedTopology: true});

const getLocationSchema=new mongoose.Schema({
    location:String
})

const GetLocation=mongoose.model('GetLocation',getLocationSchema);

app.get('/',function(req,res){
    res.render('Home',{menu:menu});
})


app.post('/',function(req,res){
    const getLocation=new GetLocation({
        location:req.body.city
    })
    getLocation.save();
    console.log(req.body.city);
    res.send('<h1>Not available in Your city. But Cooming Soon to your city.</h1>');
})

let port = process.env.PORT;
if(port ==null || port==""){
    port=3000;
}
app.listen(port,function(){
    console.log('server running at 3000');
})
