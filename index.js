const express = require('express');
const hbsexp = require('express-handlebars');
const os = require('os');
const path = require('path')
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');



//model
const User = require('./toughts/models/User')
const Tought = require('./toughts/models/Toughts')

const app = express();
const conn = require('./toughts/db/conn');

conn.sync({ force: true }).then(() => {
    app.listen(3000)
}).catch((err) => console.log(err))


app.engine('handlebars', hbsexp.engine())
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(
    session({
        name: 'session',
        secret: 'nosso_secret',
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: Function(),
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true,
        }
    }),
)


//Flash massage
app.use(flash())

//public path
app.use(express.static('public'))

//set session to res
app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.session = req.session
    }

    next()
})


//middleware save to user sessions 


app.use(express.json());

