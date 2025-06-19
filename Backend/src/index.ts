import express from 'express';
//if you are using require  it will hard to get the type of the file
// expreess is a library that is wrtten in js but we are using in ts file for that we need to bring declaration file (.d.ts )
// code in our project for that we need to npm install -d @types/express ///Users/bipinapradhan/Desktop/PracticeStuff/Brainly/node_modules/@types/express/index.d.ts
// declaration file is  never run in when you are running final  js code 
// when we are building ts code we can can easily split in .js file into  .d.ts files easily do no need to write manually
//in npm registry you only publisj .js .d.ts files not .ts files
//import
import jwt from 'jsonwebtoken';
import cors from 'cors'
import mongoose, { model, Schema, trusted } from 'mongoose';
import { userMiddleware } from './middleware/user';
import { random } from './utils/utils';
export const connectDb = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL || "mongodb+srv://pradhanbipina27:d4mA4R0YyvTnU8Rv@cluster0.nwb4jnn.mongodb.net/brainly?retryWrites=true&w=majority&appName=Cluster0");
    } catch (e: any) {
        console.log("Error in connect in Mongodb", e.message)
    }

}
///Users/bipinapradhan/Desktop/PracticeStuff/Brainly/Backend/src/index.ts
connectDb();
import { Link, User, Tag, Content } from './models/collections'
import { JWT_TOKEN_KEY } from './configs/commonConfig';
//import {Tg}


const app = express();
app.use(express.json());//expecting the body to be json 
app.use(cors());
app.post("/api/v1/signup", async (req, res) => {
    //zod validation 

    const username = req.body.username;
    const password = req.body.password;
    const ob = {
        username: username, password: password
    }
    console.log("s", ob);
    try {
        await User.create(ob)
        res.json({
            message: "Users Signed Up Successfully"
        })
    } catch (e) {
        console.log(e)
    }
})


app.post("/api/v1/signin", async (req, res) => {
    try {
        //zod validation 
        const username = req.body.username;
        const password = req.body.password;
        const existingUser = await User.find({
            username,
            password
        }).lean()
        if (existingUser) {
            const token = jwt.sign({
                user: existingUser
            }, JWT_TOKEN_KEY);
            res.json({ token })
        }
    } catch (error) {

    }

})

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    try {
        const link = req.body.link;
        const type = req.body.type;
        const tags = req.body.tags || []
        const content = await Content.create({
            link,
            type,
            //@ts-ignore
            userId: req.userId,
            tags: tags
        })
        res.status(200).json({
            message: "Content added successfully"
        })
    } catch (error) {
        console.log(error)
    }
})
app.get("/api/v1/content", userMiddleware, async (req, res) => {
    try {
        //@ts-ignore
        const userId = req.userId;
        const content = await Content.find({
            userId
        }).populate('userId', "username");
        res.status(200).json(content)
    } catch (error) {
        console.log(error)
    }
})
//deleteing userContent
app.delete('/api/vi/content', userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;
    await Content.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    })
    res.json({
        message: "Content deleted successfully"
    })
})
app.post("/api/v1/brain/share", async (req, res) => {

    try {
        const { share } = req.body;
        if (share) {
            // Check if a link already exists for the user.
            const existingLink = await Link.findOne({ userId: req.userId });
            if (existingLink) {
                res.json({ hash: existingLink.hash }); // Send existing hash if found.
                return;
            }

            // Generate a new hash for the shareable link.
            const hash = random(10);
            await Link.create({ userId: req.userId, hash });
            res.json({ hash }); // Send new hash in the response.
        } else {
            // Remove the shareable link if share is false.
            await Link.deleteOne({ userId: req.userId });
            res.json({ message: "Removed link" }); // Send success response.
        }
    } catch (error) {
        console.log(error)
    }
})
app.get("/api/v1/brain/:shareLink", async (req, res) => {
    try {
        const hash = req.params.shareLink;

        // Find the link using the provided hash.
        const link = await Link.findOne({ hash });
        if (!link) {
            res.status(404).json({ message: "Invalid share link" }); // Send error if not found.
            return;
        }

        // Fetch content and user details for the shareable link.
        const content = await Content.find({ userId: link.userId });
        const user = await User.findOne({ _id: link.userId });

        if (!user) {
            res.status(404).json({ message: "User not found" }); // Handle missing user case.
            return;
        }

        res.json({
            username: user.username,
            content
        }); // Send user and content details in response.
    } catch (error) {

    }
})
app.listen(4000, () => {
    console.log("server listening at 4000")
})

