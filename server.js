require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const PORT = process.env.PORT || 4000;
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo");




// database connection
// const db = "mongodb://localhost:27017";
// const url = "mongodb://localhost:27017/pizza";
const url = "mongodb+srv://test:test12@cluster0.fl6tpu4.mongodb.net/pizza"
mongoose.connect(url).then(() => {
    console.log("Database Connected....");
});

// const connection = mongoose.connection;
// connection.on("error", console.error.bind(console, "Connection Failed..."));
// connection.once("open", function() {
//     console.log("Database Connected...");
// });

// session store
let mongoStore = MongoDbStore.create({

    mongoUrl: url,
    // ttl: 14 * 24 * 60 * 60, // = 14 days. Default
});

// session config
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        store: mongoStore,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24hrs
    })
);

app.use(flash());

// Assets
app.use(express.static("public"))
app.use(express.json())

// Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    next()
})

// set template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

// routes
require("./routes/web")(app);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
