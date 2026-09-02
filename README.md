<p align="center">
  <img src="./assets/header.svg" alt="React Notes App Header Banner" width="100%" />
</p>

<p align="center">
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" /></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://img.shields.io/badge/CSS3-Modern_Flex%2FGrid-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" /></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"><img src="https://img.shields.io/badge/Storage-LocalStorage-38B2AC?style=for-the-badge&logo=html5&logoColor=white" alt="LocalStorage" /></a>
  <a href="https://github.com/uuidjs/uuid"><img src="https://img.shields.io/badge/ID_Gen-UUID_v4-8A2BE2?style=for-the-badge" alt="UUID" /></a>
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Plus+Jakarta+Sans&weight=600&size=20&duration=3000&pause=1000&color=2563EB&center=true&vCenter=true&width=620&lines=Welcome+to+your+lightweight+Notes+App!;Capture+thoughts+with+instant+LocalStorage+sync;Smart+auto-focus+powered+by+React+useRef;Seamless+Edit%2C+Update%2C+and+Delete+workflows" alt="Typing SVG" />
</p>

---

<p align="center">
  <img src="./assets/features-bar.svg" alt="Feature Highlights" width="100%" />
</p>

---

## 🌟 Highlights & Key Features

* **⚡ Real-Time Character Limit Counter:** Restricts input to **150 characters** and features an animated warning when 15 characters or fewer remain.
* **🎯 Programmatic Auto-Focus (`useRef`):** Textarea automatically receives focus on:
  * Initial page load
  * Saving a new note
  * Entering edit mode
  * Cancelling edit mode
* **🔄 Full CRUD Operations:**
  * **Create:** Instant note generation with a unique `uuidv4` identifier and human-readable creation date.
  * **Read:** Displayed in a responsive multi-column CSS Grid.
  * **Update:** In-place editing workflow with toggleable Save/Update and Cancel controls.
  * **Delete:** Smooth removal from state and local storage.
* **💾 Persistent Storage:** Notes are loaded lazily on app initialization (`useState(() => JSON.parse(...))`) and serialized automatically whenever state mutates (`useEffect`).
* **🎨 Clean Aesthetics:** Styled with a sleek light theme palette, sticky note card gradients, subtle micro-interactions, and accessibility tags.

---

## 🏗️ State Architecture & Lifecycle

```mermaid
flowchart TD
    A["Initial Page Load"] -->|Read LocalStorage| B["useState: notes (Lazy init)"]
    A -->|useRef.focus()| C["Auto-Focus Textarea"]

    D["User Inputs Note (max 150 chars)"] --> E["useState: inputText"]
    E -->|Save / Update| F{"Edit Mode?"}

    F -->|Yes| G["Update existing note by ID in notes array"]
    F -->|No| H["Create new note with uuidv4()"]

    G --> I["setNotes(newNotes)"]
    H --> I

    I -->|useEffect trigger| J["localStorage.setItem('react_notes_data', ...)"]
    I -->|Reset Form & focusInput()| C
    
    K["User clicks Delete"] -->|Filter by ID| I
    L["User clicks Edit"] -->|Populate state & focusInput()| E
```

---

## 📂 Project Structure

```
notes-app/
├── 📁 assets/
│   ├── header.svg            # Animated glowing gradient banner
│   └── features-bar.svg      # Animated floating feature badges
├── 📁 src/
│   ├── App.jsx               # Main container: State, hooks, handlers, UI
│   ├── App.css               # Vanilla CSS styling with light theme & grid
│   └── main.jsx              # React 18 DOM mount point
├── index.html                # HTML5 root with Plus Jakarta Sans webfont
├── package.json              # Scripts and dependencies
└── vite.config.js            # Vite configuration with @vitejs/plugin-react
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Make sure you have **Node.js 18+** installed on your machine.

### 2. Clone or Navigate to Directory
```bash
cd "notes app"
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Development Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the application with Hot Module Replacement (HMR).

### 5. Production Build
```bash
npm run build
```

---

## 🧩 Technical Stack Breakdown

| Technology | Role | Details |
| :--- | :--- | :--- |
| **React 18** | UI Library | Functional components with Hooks |
| **Vite 6** | Build Tool | Instant server start & sub-second HMR |
| **useRef** | Focus Hook | Seamless programmatic cursor positioning |
| **useState** | State Hook | Manages `notes`, `inputText`, and `editNoteId` |
| **useEffect** | Lifecycle Hook | Reactive serialization to `localStorage` |
| **UUID v4** | Identifier | Collision-resistant note keys |
| **CSS3** | Styling | Flexbox, Responsive Grid, Keyframe Animations |

---

## 🛡️ License

This project is open source and available under the [MIT License](LICENSE).
