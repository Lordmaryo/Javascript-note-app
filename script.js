const btnEl = document.querySelector("#btn");

const containerEl = document.querySelector("#app");

getNotes().forEach((note) => {
    const noteEl = createNote(note.id, note.content);
    containerEl.insertBefore(noteEl, btnEl);
});

function createNote(id, content) {
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.placeholder = "Empty note";
    element.value = content;
        // delete event listener
    element.addEventListener("dblclick", ()=> {
        const warning = confirm("Do you need this note deleted?");
        if (warning) {
         deleteNote(id, element);
        } 
    })

    element.addEventListener("input", ()=> {
        updateNote(id, element.value);
    })

    return element;
}
    // delete note
function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id != id);
    savedNotes(notes);
    containerEl.removeChild(element);
}
        // update note
function updateNote(id, content) {
    const notes = getNotes();
    const target = notes.filter((note)=> note.id == id)[0];
    target.content = content;
    savedNotes(notes);
}

function addNote() {
    const notes = getNotes();
    const noteObj = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };

    const noteEl = createNote(noteObj.id, noteObj.content);
    containerEl.insertBefore(noteEl, btnEl);
    notes.push(noteObj);

        // save notes to local browser
    savedNotes(notes);
}
        
function savedNotes(notes) {
    localStorage.setItem("notes-app", JSON.stringify(notes));
}

function getNotes() {
   return JSON.parse(localStorage.getItem("notes-app") || "[]");
}

btnEl.addEventListener("click", addNote);