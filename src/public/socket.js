const socket = io()

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
/**
 * delete note
 * @param {string} noteId id note 
 */
const deleteNote = (noteId) => {
    socket.emit('client:deleteNote', noteId)
}
/**
 * 
 * get note for updated
 * @param {string} noteId id note
 */
const getNote = (noteId) => {
    socket.emit('client:getNote', noteId)
}
/**
 * 
 * updated note
 * @param {string} id id note
 * @param {string} titulo title note
 * @param {string} descripcion description note
 */
const updateNote = (id, titulo, descripcion) => {
    socket.emit('client:updatedNote', {
        id,
        titulo,
        descripcion
    })
}

socket.on('server:newnotes', appendNote) 

socket.on('server:loadnotes', renderNotes)

socket.on('server:selectedNote', (note) => {
    const titulo = document.querySelector('#titulo')
    const descripcion = document.querySelector('#descripcion')

    titulo.value = note.titulo
    descripcion.value = note.descripcion

    SavedId = note.id
})