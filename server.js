const express = require('express');
const connectDb = require("./utils/dbConnection");
require("dotenv").config({ path: "./config.env" });



require('dotenv').config();
const app = express();

const port = 3000;

app.use(express.json());

connectDb().then(() => {
    app.listen(port, err => {
        if (err) throw err;

        app.use("/api",require('./api/food'))
        
        console.log(`Express server  running ${port}`);

    }


    );
});