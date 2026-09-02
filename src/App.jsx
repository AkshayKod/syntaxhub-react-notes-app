import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

export default function App() {
  // 1. useState for Notes List - Lazy initial state load from LocalStorage
  const [notes, setNotes] = useState(() => {
    try {
      const savedNotes = localStorage.getItem("react_notes_data");
      return savedNotes ? JSON.parse(savedNotes) : [];
    } catch (error) {
      console.error("Failed to parse notes from localStorage:", error);
      return [];
    }
  });

  // State triggers for input and editing operations
  const [inputText, setInputText] = useState("");
  const [editNoteId, setEditNoteId] = useState(null);

  // 2. useRef Hook to programmatically manage focus on the input area
  const inputRef = useRef(null);

  const CHARACTER_LIMIT = 150;

  // Programmatically focus the textarea
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Auto-focus the input on initial page load
  useEffect(() => {
    focusInput();
  }, []);

  // 3. Store notes in localStorage whenever notes state updates
  useEffect(() => {
    try {
      localStorage.setItem("react_notes_data", JSON.stringify(notes));
    } catch (error) {
      console.error("Failed to save notes to localStorage:", error);
    }
  }, [notes]);

  // Add or Update Note Handler
  const handleSaveNote = (e) => {
    if (e) e.preventDefault();

    const trimmedText = inputText.trim();
    if (!trimmedText) return;

    if (editNoteId) {
      // Update existing note immutably
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === editNoteId
            ? {
                ...note,
                text: trimmedText,
                date: new Date().toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }),
              }
            : note
        )
      );
      setEditNoteId(null);
    } else {
      // Create new note
      const newNote = {
        id: uuidv4(),
        text: trimmedText,
        date: new Date().toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
      setNotes((prevNotes) => [newNote, ...prevNotes]);
    }

    // Reset Form Input and restore focus
    setInputText("");
    focusInput();
  };

  // Populate Input for Editing
  const handleEditNote = (note) => {
    setEditNoteId(note.id);
    setInputText(note.text);
    focusInput();
  };

  // Delete Note Handler
  const handleDeleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    if (editNoteId === id) {
      setEditNoteId(null);
      setInputText("");
      focusInput();
    }
  };

  // Cancel Editing
  const handleCancelEdit = () => {
    setEditNoteId(null);
    setInputText("");
    focusInput();
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-badge">👋 Hello, Welcome!</div>
        <h1>My Notes</h1>
        <p className="subtitle">Capture your thoughts, ideas, and reminders effortlessly</p>
      </header>

      {/* Main Creator Component (Form/Input) */}
      <div className={`note-creator ${editNoteId ? "editing-mode" : ""}`}>
        <div className="creator-header">
          <span className="mode-indicator">
            {editNoteId ? "Editing Note" : "Create a New Note"}
          </span>
        </div>

        <textarea
          ref={inputRef}
          rows="4"
          placeholder="Type your note here..."
          value={inputText}
          maxLength={CHARACTER_LIMIT}
          onChange={(e) => setInputText(e.target.value)}
          aria-label="Note content"
        />

        <div className="note-footer">
          <small className={`char-count ${CHARACTER_LIMIT - inputText.length <= 15 ? "limit-warning" : ""}`}>
            {CHARACTER_LIMIT - inputText.length} characters left
          </small>

          <div className="button-group">
            {editNoteId && (
              <button
                type="button"
                className="btn btn-cancel"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            )}
            <button
              type="button"
              className="btn btn-save"
              disabled={!inputText.trim()}
              onClick={handleSaveNote}
            >
              {editNoteId ? "Update Note" : "Save Note"}
            </button>
          </div>
        </div>
      </div>

      {/* Notes Grid Display */}
      <section className="notes-section" aria-label="Saved notes">
        <div className="section-header">
          <h2>All Notes</h2>
          <span className="notes-count">
            {notes.length} {notes.length === 1 ? "note" : "notes"}
          </span>
        </div>

        <div className="notes-grid">
          {notes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <p className="empty-message">No notes yet. Start typing above!</p>
              <span className="empty-subtext">Your notes will automatically persist in local storage.</span>
            </div>
          ) : (
            notes.map((note) => (
              <article key={note.id} className="note-card">
                <p className="note-text">{note.text}</p>
                <div className="note-card-footer">
                  <time className="note-date">{note.date}</time>
                  <div className="card-actions">
                    <button
                      type="button"
                      className="action-btn edit-btn"
                      onClick={() => handleEditNote(note)}
                      title="Edit note"
                      aria-label={`Edit note: ${note.text.slice(0, 20)}`}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteNote(note.id)}
                      title="Delete note"
                      aria-label={`Delete note: ${note.text.slice(0, 20)}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
