const express = require('express')
var geolocation = require('geolocation')
var geoutil=require('geolocation-utils')
const app = express()
const port = process.env.PORT||8181;
const path=require('path');
const bodyParser = require('body-parser');
const url = require('url');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.render('/index'))

app.post("/getGeo",function(req,res){
     const data=req.body;
   console.log(data.lat);
   console.log(data.long);
   // console.log(center)
   const lat=19.7524798; //set Prajwal's home latitude and longitude
   const lon=75.7148884;
   const radius = 1000   //set radius of circle in meters
   const center={lat,lon};
   const status=geoutil.insideCircle({lat:data.lat, lon:data.long 
   }, center, radius)
   if(status){
     console.log("you are within range");
     res.json({
       status:'You Present in a class'
     });
   }
   else{
     console.log("You out of the range");
     res.json({
       status:'You are Absent'
     });
   }

});




app.listen(port, () => console.log(`Example app listening on port ${port}!`))