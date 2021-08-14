const form_notes = document.querySelector('#note_form')
const titulo = document.querySelector('#titulo')
const descripcion = document.querySelector('#descripcion')

 form_notes.addEventListener('submit', e => {
    e.preventDefault()

    savedNote(titulo.value, descripcion.value)

    
 })