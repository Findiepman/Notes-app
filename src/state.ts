import { Note } from "./types"

const stored = localStorage.getItem("notes") || "[]";
export const state: { notes: Note[] } = {
    notes: JSON.parse(stored) as Note[]
};