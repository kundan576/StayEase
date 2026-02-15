const mongoose = require("mongoose");
const initdata =require("./data.js");
const listen = require("../models/listing.js");



const mongo_url = "mongodb://127.0.0.1:27017/StayEase";

main()
.then(() => {
    console.log("connect to db");
}).catch(err =>{
    console.log("err");
});

async function main(){
    await mongoose.connect(mongo_url);
}

const initdb =async ()=>{
    await listen.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({...obj,owner:"6973d002331efe37d0203258"}));
    await listen.insertMany(initdata.data);
    console.log("data");
}
initdb();

