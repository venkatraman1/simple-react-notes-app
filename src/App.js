import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";

function App() {
  const notesData = [];
  const [notes, setNotes] = useState(notesData);
  const [darkMode, setDarkMode] = useState(false);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const handleDeleteNote = (id) => {
    let currentNotes = [...notes];
    const remainingNotes = currentNotes.filter((note) => note.id !== id);
    setNotes(remainingNotes);
  };

  const handleEditNote = (id, text) => {
    const date = new Date();
    const noteIndex = notes.findIndex((note) => note.id == id);
    let updatedNotes = [...notes];
    updatedNotes[noteIndex].text = text;
    updatedNotes[noteIndex].date = date.toLocaleDateString();
    setNotes(updatedNotes);
  };

  const [searchText, SetSearchText] = useState("");

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));
    console.log(savedNotes);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
  }, [notes, handleEditNote, handleDeleteNote]);

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleDarkMode={setDarkMode} />
        <Search handleSearchText={SetSearchText} />
        <NotesList
          notes={notes.filter((note) => note.text.includes(searchText))}
          handleAddNote={addNote}
          handleDeleteNote={handleDeleteNote}
          handleEditNote={handleEditNote}
        />
      </div>
    </div>
  );
}

export default App;
