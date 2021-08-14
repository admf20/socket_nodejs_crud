const socket =  io()

/**
 * 
 * save a new note
 * @param {string} titulo note title  
 * @param {string} descripcion note description
 */

const savedNote = (titulo, descripcion) => {
    socket.emit('client:newNote', {
        titulo,
        descripcion
    })
}

const deleteNote = (noteId) => {
    socket.emit('client:deleteNote', noteId)
}

const getNote = (noteId) => {
    socket.emit('client:getNote', noteId)
}

socket.on('server:newnotes', appendNote) 

socket.on('server:loadnotes', renderNotes)

socket.on('server:selectedNote', (note) => {
    const titulo = document.querySelector('#titulo')
    const descripcion = document.querySelector('#descripcion')

    titulo.value = note.titulo
    descripcion.value = note.descripcion
})