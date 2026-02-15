

if(process.env.NODE_ENV !="production"){
require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");

const session = require("express-session");
const MongoStore = require("connect-mongo").default;

const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


require("./models/user");
require("./models/listing");
require("./models/review");



/* Get User model from mongoose registry */
const User = mongoose.model("User");

const listings = require("./routes/listing");
const reviewRoutes = require("./routes/review");
const userRoutes = require("./routes/user");
const { error } = require("console");


//const mongo_url = "mongodb://127.0.0.1:27017/StayEase";


const dbUrl = process.env.ATLASTD_URL;

async function main() {
  await mongoose.connect(dbUrl);
  
}
main().catch(err => console.log(err));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("Mongo Session Store Error:", err);
});


const sessionOption = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};



app.use(session(sessionOption));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.curruser = req.user;
  next();
});



app.use("/listings", listings);
app.use("/listings/:id/review", reviewRoutes);
app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.redirect("/listings");
});


app.get("/listing/new", (req, res) => {
  res.redirect("/listings/new");
});

app.get("/listing", (req, res) => {
  res.redirect("/listings");
});

app.get("/listing/:id/edit", (req, res) => {
  res.redirect(`/listings/${req.params.id}/edit`);
});

app.get("/listing/:id", (req, res) => {
  res.redirect(`/listings/${req.params.id}`);
});

app.use((req, res, next) => {
  next(new ExpressError(404, "page not found"));
});


app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("error.ejs", { message });
});


app.listen(8080, () => {
  console.log("server");
});
