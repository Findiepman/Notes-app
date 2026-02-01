import { state } from "./state.js";

export function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(state.notes));
}

export function loadNotes() {
    const stored = localStorage.getItem("notes");
    if (stored) state.notes = JSON.parse(stored);
}
