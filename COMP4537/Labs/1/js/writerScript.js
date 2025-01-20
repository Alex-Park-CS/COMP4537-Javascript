// This file was edited by ChatGpt

class Note {
    constructor(content = '') {
        this.content = content;
        this.id = Date.now();
    }
}

class WriteNotes{
    constructor() {
        this.notes = [];
        this.notesContainer = document.getElementById('notes-area');
        this.setUp();
    }

    setUp(){
        this.loadNotes();
        document.getElementById('stored-time').innerHTML = MESSAGES.storedTime + new Date().toLocaleTimeString('en-US', { hour12: true });
        document.getElementById('add-button').addEventListener('click', () => {
            this.addNote();
            this.renderNotes();
        });
    }

    saveNotes(){
        localStorage.setItem('notes', JSON.stringify(this.notes));
        document.getElementById('stored-time').innerHTML = MESSAGES.storedTime + new Date().toLocaleTimeString('en-US', { hour12: true });
    }

    loadNotes(){
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.renderNotes();
    }

    addNote(){
        const note = new Note();
        this.notes.push(note);
        this.saveNotes();
        this.renderNotes();
    }

    removeNote(id){
        this.notes = this.notes.filter((note) => note.id !== id);
        this.saveNotes();
        this.renderNotes();
    }

    renderNotes(){
        this.notesContainer.innerHTML = '';
        this.notes.forEach((note) => {
            const noteElement = document.createElement('div');
            const textArea = document.createElement('textarea');
            const deleteButton = document.createElement('button');

            textArea.value = note.content;
            textArea.addEventListener('input', (e) => {
                note.content = e.target.value;
                this.saveNotes();
            });
            textArea.classList.add('textbox');

            deleteButton.innerHTML = MESSAGES.removeButton;
            deleteButton.addEventListener('click', () => {
                this.removeNote(note.id);
            });
            deleteButton.classList.add('removeButton');

            noteElement.appendChild(textArea);
            noteElement.appendChild(deleteButton);
            noteElement.classList.add('note');

            this.notesContainer.appendChild(noteElement);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('writerTitle').innerHTML = MESSAGES.writerPageTitle;
    document.getElementById('add-button').innerHTML = MESSAGES.addButton;
    new WriteNotes();
});

    