const stored = localStorage.getItem("notes") || "[]";
export const state = {
    notes: JSON.parse(stored)
};
//# sourceMappingURL=state.js.map