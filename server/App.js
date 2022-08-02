require('dotenv').config();
const express = require('express');
const createError = require("http-errors");
const path = require("path");
const cors = require("cors");

const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup");
const optionsRouter = require("./routes/options");
const mainRouter = require("./routes/main");
const profileRouter = require("./routes/profile");
const groupsRouter = require("./routes/groups");
const usersRouter = require("./routes/users");
const galleryRouter = require("./routes/gallery");
const calendarRouter = require("./routes/calendar");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/main", mainRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/options", optionsRouter);
app.use("/profile", profileRouter);
app.use("/groups", groupsRouter);
app.use("/users", usersRouter);
app.use("/gallery", galleryRouter);
app.use("/calendar", calendarRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    // res.status(err.status || 500);
    res.sendStatus(err.status ?? 500);
});

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.listen(5000);

module.exports = app;