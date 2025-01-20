// This file was edited by ChatGpt

class readNotes {
    constructor() {
        this.notes = [];
        this.setUp();
    }

    setUp(){
        this.loadNotes();

        setInterval(() => {
            this.loadNotes();
        }, 2000);
    }

    loadNotes(){
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        document.getElementById('stored-time').innerHTML = MESSAGES.storedTime + new Date().toLocaleTimeString('en-US', { hour12: true });
        this.renderNotes();
    }

    renderNotes(){
        document.getElementById('notes-area').innerHTML = '';
        this.notes.forEach((note) => {
            const noteElement = document.createElement('div');
            const textArea = document.createElement('textarea');

            textArea.value = note.content;
            textArea.classList.add('textbox');
            textArea.disabled = true;
            noteElement.appendChild(textArea);
            noteElement.classList.add('note');

            document.getElementById('notes-area').appendChild(noteElement);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('readerTitle').innerHTML = MESSAGES.readerPageTitle;
    new readNotes(); 
});

