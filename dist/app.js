import { state } from "./state.js";
import { saveNotes, loadNotes } from "./storage.js";
const createNoteBtn = document.getElementById("btn-new-note");
const createModal = document.getElementById("create-modal");
const closeCreateModal = document.getElementById("close-modal");
const cancelCreateModal = document.getElementById("cancel-btn");
const createNoteFinal = document.getElementById("create-btn");
const noteNameInput = document.getElementById("note-title");
const noteContentInput = document.getElementById("note-content");
const deleteConfirmModal = document.getElementById("delete-modal");
const confirmDeleteBtn = document.getElementById("confirm-delete-btn");
const confirmCancelBtn = document.getElementById("cancel-delete-btn");
const confirmCloseBtn = document.getElementById("close-delete-modal");
const noteTitle = document.getElementById("note-title-input");
const noteTextarea = document.getElementById("editor-content");
const noteEditor = document.getElementById('note-editor');
const notesList = document.querySelector(".notes-list");
let activeNote = null;
let activeCard = null;
let deleteTimeout = null;
function newNote(name, content) {
    const existingNote = state.notes.find(note => note.title.toLowerCase() === name.toLowerCase());
    if (!existingNote && name) {
        const newNoteEntry = {
            title: name,
            id: crypto.randomUUID(),
            content: content,
            createdAt: Date.now()
        };
        state.notes.push(newNoteEntry);
        saveNotes();
        renderNotes();
    }
}
function renderNotes() {
    const grid = document.querySelector(".notes-grid");
    grid.innerHTML = "";
    state.notes.forEach(notes => {
        const card = document.createElement("div");
        card.className = ("note-preview");
        const header = document.createElement("h3");
        header.className = "note-title";
        if (notes.title !== "") {
            header.textContent = notes.title;
        }
        else {
            header.textContent = "No title yet...";
            header.style.color = "gray";
        }
        const snippet = document.createElement("p");
        snippet.className = "note-snippet";
        if (notes.content !== "") {
            snippet.textContent = notes.content.slice(0, 50) + (notes.content.length > 50 ? "..." : "");
        }
        else {
            snippet.textContent = "No content yet...";
            snippet.style.color = "gray";
        }
        card.addEventListener("click", (e) => {
            if (e.ctrlKey) {
                openDeleteConfirm(notes);
                return;
            }
        });
        card.addEventListener("click", () => {
            if (activeNote === notes) {
                noteEditor.style.display = "none";
                activeNote = null;
                activeCard = null;
                card.style.border = "none";
                return;
            }
            notesList.addEventListener("click", (e) => {
                const target = e.target;
                if (target.closest(".note-preview"))
                    return;
                noteEditor.style.display = "none";
                activeNote = null;
                if (activeCard) {
                    activeCard.classList.remove("active");
                    activeCard = null;
                }
            });
            activeNote = notes;
            activeCard = card;
            noteTextarea.value = "";
            noteTitle.value = "";
            card.classList.add("active");
            noteEditor.style.display = "flex";
            noteTextarea.value = notes.content;
            noteTitle.value = notes.title;
            noteTitle.oninput = () => {
                if (!activeNote)
                    return;
                activeNote.title = noteTitle.value;
                saveNotes();
                renderNotes();
                if (noteTitle.value === "" && noteTextarea.value === "") {
                    startDeleteCountdown(notes.id);
                }
                else {
                    cancelDeleteCountdown();
                }
            };
            noteTextarea.oninput = () => {
                if (!activeNote)
                    return;
                notes.content = noteTextarea.value;
                saveNotes();
                renderNotes();
                if (noteTitle.value === "" && noteTextarea.value === "") {
                    startDeleteCountdown(activeNote.id);
                }
                else {
                    cancelDeleteCountdown();
                }
            };
        });
        card.appendChild(header);
        card.appendChild(snippet);
        grid.appendChild(card);
    });
}
function startDeleteCountdown(noteId) {
    if (deleteTimeout)
        return;
    noteTitle.placeholder = "Deleting empty note in 10 seconds!";
    noteTextarea.placeholder = "Write to prevent deletion!";
    deleteTimeout = setTimeout(() => {
        deleteNote(noteId);
        noteEditor.style.display = "none";
        deleteTimeout = null;
    }, 10000);
}
function cancelDeleteCountdown() {
    if (!deleteTimeout)
        return;
    clearTimeout(deleteTimeout);
    deleteTimeout = null;
    noteTitle.placeholder = "No title...";
    noteTextarea.placeholder = "Start writing...";
}
function openDeleteConfirm(notes) {
    deleteConfirmModal.style.display = "flex";
    confirmDeleteBtn.addEventListener("click", () => {
        deleteConfirmModal.style.display = "none";
        deleteNote(notes.id);
    });
    confirmCancelBtn.addEventListener("click", () => { deleteConfirmModal.style.display = "none"; });
    confirmCloseBtn.addEventListener("click", () => { deleteConfirmModal.style.display = "none"; });
    deleteConfirmModal.addEventListener("click", (e) => { if (e.target === deleteConfirmModal)
        deleteConfirmModal.style.display = "none"; });
}
function deleteNote(id) {
    state.notes = state.notes.filter(h => h.id !== id);
    saveNotes();
    renderNotes();
}
document.addEventListener("DOMContentLoaded", () => {
    createNoteBtn.addEventListener("click", () => {
        createModal.style.display = "flex";
        console.log("ewfhewgjfm");
    });
    closeCreateModal.addEventListener("click", () => {
        createModal.style.display = "none";
    });
    cancelCreateModal.addEventListener("click", () => {
        createModal.style.display = "none";
    });
    createModal.addEventListener("click", (e) => {
        if (e.target === createModal)
            createModal.style.display = "none";
    });
    createNoteFinal.addEventListener("click", () => {
        if (noteNameInput.value !== "") {
            newNote(noteNameInput.value, noteContentInput.value); // je create note functie
            noteNameInput.value = "";
            noteContentInput.value = "";
            createModal.style.display = "none";
        }
        else if (noteNameInput.value == "") {
            noteNameInput.value = "";
            noteNameInput.placeholder = "Input a valid name!";
            setTimeout(() => {
                noteNameInput.placeholder = "Untitled";
            }, 2000);
        }
    });
});
function initApp() {
    loadNotes();
    renderNotes();
}
initApp();
//# sourceMappingURL=app.js.map