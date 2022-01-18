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

    //enviar todas las notas al fronted
    io.emit('server:loadnotes', notes)

    //crear una nota
    socket.on('client:newNote', (NewNote) => {
        const newnote = { ...NewNote, id: uuid4()}
        notes.push(newnote)

        io.emit('server:newnotes', newnote)
    })

    //eliminar nota
    socket.on('client:deleteNote', (noteId) => { 
        notes = notes.filter((note) => note.id !== noteId) 
        io.emit('server:loadnotes', notes)
        console.log(notes)
    })

    //traemos los datos desde la base de datos y se la enviamos al fronted
    socket.on('client:getNote', (noteId) => {
        const note = notes.find((note) => note.id === noteId) //buscamos la nota y se la mandamos al fronted
        socket.emit('server:selectedNote', note)
    })

    //actualizando nota
    socket.on('client:updatedNote', (updatedNote) => {
        notes = notes.map((note) => {
            if(note.id === updatedNote.id){
            note.titulo = updatedNote.titulo
            note.descripcion = updatedNote.descripcion
            }
            return note
        })
        io.emit('server:loadnotes', notes) //le enviamos la nueva nota actualizada
    })
})

httpServer.listen(3000, () => {
    console.log('Servidor Corriendo');
})

 