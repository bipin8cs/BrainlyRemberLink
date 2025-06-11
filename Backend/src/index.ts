import express from 'express';
//if you are using require  it will hard to get the type of the file
// expreess is a library that is wrtten in js but we are using in ts file for that we need to bring declaration file (.d.ts )
// code in our project for that we need to npm install -d @types/express ///Users/bipinapradhan/Desktop/PracticeStuff/Brainly/node_modules/@types/express/index.d.ts
// declaration file is  never run in when you are running final  js code 
// when we are building ts code we can can easily split in .js file into  .d.ts files easily do no need to write manually
//in npm registry you only publisj .js .d.ts files not .ts files
//import
import jwt from 'jsonwebtoken';
import  connectDb from '../src/models/db'
//import {Tg}

///Users/bipinapradhan/Desktop/PracticeStuff/Brainly/Backend/src/index.ts
connectDb();
const app = express();
app.post("api/v1/signup", (req, res) => { })

app.post("api/v1/signin", (req, res) => {

})

app.post("api/v1/content", (req, res) => {

})
app.post("api/v1/brain/share", (req, res) => {

})
app.get("api/v1/brain/:shareLink", (req, res) => {

})
