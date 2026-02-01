# Notes App

A simple, modern notes application built with TypeScript, HTML, and CSS.
Create, edit, and delete notes with live autosave, all in your browser.

# Features

Create Notes – Add new notes with a title and content.

Edit Notes – Click a note to open it in the editor and update it live.

Autosave – Notes are automatically saved as you type.

Delete Notes – Empty notes can be deleted automatically after a countdown.

Active Note Highlight – The currently selected note is highlighted.

Responsive Design – Works on desktop and mobile devices.

Search Notes – Filter notes by title (coming soon).



# Installation

Clone the repository:

git clone https://github.com/FinDiepman/notes-app.git


# Navigate to the project folder:

cd notes-app


# Install dependencies (if using a bundler or TypeScript compiler):

npm install


# Compile TypeScript:

tsc


Open index.html in your browser or serve with a local server:

npx live-server

# Usage

Click "+ New Note" to create a new note.

Select a note from the list to open it in the editor.

Edit the title or content; changes are saved automatically.

If both the title and content are empty, the note will be deleted after 10 seconds unless you type something.

Click outside the note editor (in the empty notes list) to close the editor.

# File Structure
notes-app/
├─ src/          # TypeScript source files
├─ dist/         # Compiled JavaScript
├─ styles/       # CSS files
├─ icons/        # Favicon and icons
├─ index.html    # Main HTML page
└─ README.md     # This file

# Technologies

TypeScript – Strong typing for safer JavaScript

HTML5 & CSS3 – Modern layout and responsive design

DOM API – Dynamic note rendering and events

# Contributing

Contributions are welcome!
Please fork the repository, create a branch, and submit a pull request.

# License

This project is licensed under the MIT License.
