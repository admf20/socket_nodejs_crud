const express = require('express')
const { Server: WebSocketServer } = require('socket.io')
const http = require('http')
const { v4: uuid4 } = require('uuid')

const app = express();
const httpServer = http.createServer(app) //creamos un module http
const io = new WebSocketServer(httpServer)

app.use(express.static(__dirname + '/public'))

let notes = []

io.on('connection', (socket) => {
    console.log('Nueva Conexion con Socket', socket.id)

    //encviar todas las notas al fronted
    socket.emit('server:loadnotes', notes)

    //crear una nota
    socket.on('client:newNote', (NewNote) => {
        const newnote = { ...NewNote, id: uuid4()}
        notes.push(newnote)

        socket.emit('server:newnotes', newnote)
    })

    //eliminar nota
    socket.on('client:deleteNote', (noteId) => { 
        notes = notes.filter((note) => note.id !== noteId) 
        socket.emit('server:loadnotes', notes)
        console.log(notes)
    })

    socket.on('client:getNote', (noteId) => {
        const note = notes.find((note) => note.id === noteId)
        socket.emit('server:selectedNote', note)
    })
})

httpServer.listen(3000, () => {
    console.log('Servidor Corriendo');
})

 