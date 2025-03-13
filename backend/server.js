const { createServer } = require('http')
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const router = require('./router/routes');
const Error_hendler = require('./middlewares/Errorhendler.middleware');
const morgan = require('morgan')
const colors = require('colors');
const ConnectDb = require('./db/DB');
const Users = require('./model/User.model');
require('dotenv').config({})


const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
})


app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//connect db
ConnectDb()


app.get('/', (req, res) => {
    res.send('Hello, World!')
})


app.use('/api/v1', router)


////error hendler middlewaire
app.use(Error_hendler)




const users = new Map()
const rooms = new Map()
io.on('connection', (socket) => {
    socket.on('USER', async(user) => {
        users.set(user, socket.id)
        await Users.findByIdAndUpdate(user, { isOnline: true })
        io.emit('USER-ONLINE', Array.from(users.keys()))

        //send user in call
        socket.on('USER-IN-CALL', data => {
            io.emit('USER-IN-CALL', data)
        })

        ///send call
        socket.on('SEND-CALL', ({
            target,
            call_user
        }) => {
            io.to(users.get(target)).emit('GET-CALL', call_user)
        })

        //send icecandidate
        socket.on('ICE-CANDIDATE', ({
            candidate,
            targrt,
            user
        }) => {
            io.to(users.get(targrt)).emit('ICE-CANDIDATE', {
                targrt: user,
                candidate
            })
        })

        ///send offer
        socket.on('OFFER', ({
            targrt,
            offer,
            user
        }) => {
            io.to(users.get(targrt)).emit('OFFER', {
                targrt: user,
                offer
            })
        })

        ///send answar
        socket.on('ANSWAR', ({
            targrt,
            answar
        }) => {
            io.to(users.get(targrt)).emit('ANSWAR', {
                targrt: user,
                answar
            })
        })

        //call end
        socket.on('CALL-END', ({
            target,
            callend
        }) => {
            io.to(users.get(target)).emit('CALL-END', { target, callend })
            console.log('call-end', target, callend)
        })










        socket.on('disconnect', async() => {
            console.log('User  disconnected');
            users.delete(user)
            await Users.findByIdAndUpdate(user, { isOnline: false })
            io.emit('USER-ONLINE', Array.from(users.keys()))
        });
    })
});







const PORT = process.env.PORT || 5080

server.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`.bgGreen)
})