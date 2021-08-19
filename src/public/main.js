const form_notes = document.querySelector('#note_form')
const titulo = document.querySelector('#titulo')
const descripcion = document.querySelector('#descripcion')

 form_notes.addEventListener('submit', (e) => {
    e.preventDefault()

    if(SavedId){  //valimos si el usuario esta actualizando o creando una nueva nota
      updateNote(SavedId, titulo.value, descripcion.value)
    }else{
        savedNote(titulo.value, descripcion.value)
    }

    titulo.value = ''
    descripcion.value = ''

    titulo.focus()
 })