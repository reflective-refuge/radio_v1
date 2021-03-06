if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// --- Auth & JWT server setup----
// const express = require('express')
// const app = express()
// const bcrypt = require('bcrypt')
// const passport = require('passport')
// const flash = require('express-flash')
// const session = require('express-session')


// const initalizePassport = require('./passport-config')
// initalizePassport(
//     passport, 
//     email => accounts.find(account => account.email === email)
// )

// app.use(express.json())
// app.set('view-engine', 'ejs')
// app.use(express.urlencoded({ extended: false}))
// app.use(flash())
// app.use(session({
//     secret: process.eventNames.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }))
// app.use(passport.initialize())
// app.use(passport.session())

// const accounts = []

//----Passport Login System----

// app.get('/', (req, res) => {
//     res.render('index.ejs', {host: 'BK'})
// })

// app.get('/login', (req, res) => {
//     res.render('login.ejs')
// })

// app.post('/login', passport.authenticate('local',{
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
// }))

// app.get('/register', (req, res) => {
//     res.render('register.ejs')
// })

// app.post('/register', async (req, res) => {
//   try {
//       const hashedPassword = await bcrypt.hash(req.body.password, 10)
//       accounts.push ({
//           is: Date.now().toString(),
//           name: req.body.accountName,
//           email: req.body.email,
//           password: hashedPassword
//       })
//       res.redirect('/login')
//   } catch {
//       res.redirect('/regiester')
//   }
//   console.log(accounts)
// })

// //Auth 

// app.get('/accounts', (req, res) => {
//     res.json(accounts)
// })

// app.post('/accounts', async (req, res) => {
//     try {
//         const salt =  await bcrypt.genSalt()
//         const hashedPassword = await bcrypt.hash(req.body.password, salt)
//         const account = { accountName: req.body.accountName, password: hashedPassword }
//         accounts.push(account)
//         res.status(201).send()

//     } catch {
//         res.status(500).send()
//     }
// })

// app.post('/accounts/login', async (req, res) => {
//     const account = accounts.find(account => account.accountName = req.body.accountName)
//     if (account == null) {
//         return res.status(400).send('Cant Not Find Account')
//     }
//     try {
//         if(await bcrypt.compare(req.body.password, account.password)) {
//             res.send('Succesfully Loged In')
//         } else {
//             res.send('Not Allowed')
//         }
//     } catch {
//         res.status(500).send()
//     }
// })

// //JWT 
// const posts =[
//     {
//         username:'BK',
//         title: 'Sample Post'
//     },
//     {
//         username:'Pippa',
//         title: 'Sample Post2'
//     },
// ]
// app.get('/posts', (req, res) =>{
//     res.json(posts)
// })

// app.get('/login', (req,res) => {
//     //Authenticate User
// })

// app.listen(8080)


// -----Socket io Server Setup-----
const io = require('socket.io')(3000)

const users = {}

io.on('connect', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name:users[socket.id]})
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})