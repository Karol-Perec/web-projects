const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

server = app.listen(3000, () => console.log(`Listening on http://localhost:3000`));
const io = require('socket.io')(server);
const Message = mongoose.model('Message', {message: String, username: String});

app.get('/', (req, res) => {
    res.render('index');
});

io.on('connection', (socket) => {
    console.log('New user connected');
    mongoose.connect('mongodb+srv://test:test@lab7-xsari.gcp.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        const stream = Message.find().stream().on('data', (doc) => {
            socket.emit('load_chat', {message: doc.message, username: doc.username})
        });
    });

    socket.username = "Anonymous";

    socket.on('change_username', (data) => {
        socket.username = data.username;
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', {username: socket.username})
    });

    socket.on('new_message', (data) => {
        io.sockets.emit('new_message', {message: data.message, username: socket.username});
        db.once('open', () => {
            const msg = new Message({message: data.message, username: socket.username});
            msg.save().then(() => console.log('Saved to Db'));
        });
    });

    socket.on('disconnect', function () {
        console.log('User disconnected');
    });

});
