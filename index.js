const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const plansRouter = require("./routes/PlansRouter")
const flash = require("connect-flash")

// View engine
app.set('view engine','ejs');

app.use(session({
    secret: "qualquercoisa", cookie: { maxAge: 30000000},
    saveUninitialized: true,
    resave: true
}))

app.use(flash())

app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Router
app.use("/plan", plansRouter)

// End Router
app.listen(54321, () => {
    console.log("O servidor está rodando!")
})