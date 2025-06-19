"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const express_1 = __importDefault(require("express"));
//if you are using require  it will hard to get the type of the file
// expreess is a library that is wrtten in js but we are using in ts file for that we need to bring declaration file (.d.ts )
// code in our project for that we need to npm install -d @types/express ///Users/bipinapradhan/Desktop/PracticeStuff/Brainly/node_modules/@types/express/index.d.ts
// declaration file is  never run in when you are running final  js code 
// when we are building ts code we can can easily split in .js file into  .d.ts files easily do no need to write manually
//in npm registry you only publisj .js .d.ts files not .ts files
//import
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGO_DB_URL || "mongodb+srv://pradhanbipina27:d4mA4R0YyvTnU8Rv@cluster0.nwb4jnn.mongodb.net/brainly?retryWrites=true&w=majority&appName=Cluster0");
    }
    catch (e) {
        console.log("Error in connect in Mongodb", e.message);
    }
});
exports.connectDb = connectDb;
///Users/bipinapradhan/Desktop/PracticeStuff/Brainly/Backend/src/index.ts
(0, exports.connectDb)();
const collections_1 = require("./models/collections");
const commonConfig_1 = require("./configs/commonConfig");
//import {Tg}
const app = (0, express_1.default)();
app.use(express_1.default.json()); //expecting the body to be json 
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //zod validation 
    const username = req.body.username;
    const password = req.body.password;
    const ob = {
        username: username, password: password
    };
    console.log("s", ob);
    try {
        yield collections_1.User.create(ob);
        res.json({
            message: "Users Signed Up Successfully"
        });
    }
    catch (e) {
        console.log(e);
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //zod validation 
        const username = req.body.username;
        const password = req.body.password;
        const existingUser = yield collections_1.User.find({
            username,
            password
        }).lean();
        if (existingUser) {
            const token = jsonwebtoken_1.default.sign({
                user: existingUser
            }, commonConfig_1.JWT_TOKEN_KEY);
            res.json({ token });
        }
    }
    catch (error) {
    }
}));
app.post("/api/v1/content", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
app.post("/api/v1/brain/share", (req, res) => {
});
app.get("/api/v1/brain/:shareLink", (req, res) => {
});
app.listen(4000, () => {
    console.log("server listening at 4000");
});
