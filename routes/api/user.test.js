import mongoose from "mongoose";
import request from "supertest";
import "dotenv/config";

import app from "../../app.js";

import User from "../../models/users.js";

const {PORT, DB_HOST_TEST} = process.env;

describe("test signup route", ()=> {
    let server = null;
    beforeAll(async()=> {
        await mongoose.connect(DB_HOST_TEST);
        server = app.listen(PORT);
    })

    afterAll(async()=> {
        await mongoose.connection.close();
        server.close();
    })


    afterEach(async()=> {
        await User.deleteMany({});
    })

    test("test signup with correct data", async()=> {
        const signupData = {
            email: "ooo@gmail.com",
            password: "111"
        }
        const {statusCode} = await request(app).post("/api/users/register").send(signupData);

        expect(statusCode).toBe(201);

    })
    // test("body req with token", async()=> {
    //     const signupData = {
    //         email: "ooo@gmail.com",
    //         password: "111"
    //     }
    //     const res = await request(app).post("/api/users/register").send(signupData);
    //     const token = res.req.rawHeaders[3];
    //     const isToten = token.includes("Bearer")



    //     expect(isToten).toBe(true);
    
    // })
})
        // expect(token).toBe(token !== undefined);

        // expect(body.email).toBe(signupData.email);


        // const user = await User.findOne({email: signupData.email});
        // expect(user.email).toBe(signupData.email);
        // expect(user.name).toBe(signupData.name);