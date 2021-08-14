const notesList = document.querySelector('#notes')

const NoteUI = (note) => {

    const div = document.createElement('div') //creo un elemento div y en donde le agrego toda la interfaz que tiene el titulo, descripcion y los botones de eliminar y actualizar
        div.innerHTML = 
            `
            <div>
                <div>
                    <h1>${note.titulo}</h1>
                </div>
                    <p>${note.descripcion}</p>
                        <div>
                            <button class="eliminar" data-id="${note.id}">Eliminar</button> 
                            <button class="actualizar" data-id="${note.id}">Actualizar</button>
                        </div>
            </div>
            `

    const btnEliminar = div.querySelector('.eliminar')  //captuto el boton eliminar
    const btnActualizar = div.querySelector('.actualizar') //captuto el boton actualiz
    
    //funcion para eliminar la nota 
    btnEliminar.addEventListener('click', () => {
        deleteNote(btnEliminar.dataset.id)
    })

    //funcion para actualizar la nota 
    btnActualizar.addEventListener('click', () => {
        getNote(btnActualizar.dataset.id)
    })

    return div //tenemos que retornar el div ya que si no lo hariamos la estructura creada en NoteUI no se podria ver en el frontend
}
// data-id="${note.id}" utilizamos el data para capturar el id de cada nota

const renderNotes = (notes) => { //aca retorno todas las notas existentes actualmente
    notesList.innerHTML = ''
    notes.forEach(notes => {
        notesList.append(NoteUI(notes))  //append es para agregar un elemento que en este caso seria para 'notesList' en donde agrego varias notas
    })
}

const appendNote = (note) => { //aca solo retorno una sola nota 
    notesList.append(NoteUI(note))
}