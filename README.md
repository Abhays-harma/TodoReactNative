# Todo List Application (React Native)

## Overview
This **React Native Todo List application** allows users to manage tasks efficiently by organizing them into **groups**. Users can perform **CRUD operations** (Create, Read, Update, Delete) on todos within these groups. The app also features **login and signup functionality** for user authentication, and it uses **SQLite** as the local database for data persistence.

---

## Features
- **Create Groups**: Organize todos by grouping them.
- **CRUD Operations**: Add, edit, delete, and mark todos as complete within groups.
- **User Authentication**: Secure login and signup process.
- **Local Storage**: Uses **SQLite** to store tasks and user data offline.
- **Responsive Design**: Works seamlessly across iOS and Android devices.

---

## Design Choices
- **React Native**: Chosen for cross-platform development (iOS and Android).
- **SQLite**: Provides a lightweight local database for offline access.
- **User Authentication**: Ensures only authorized users can access their tasks.
- **State Management**: Uses hooks like `useState` and `useEffect` to manage application state efficiently.

---

## Challenges Encountered
1. **SQLite Integration**: Ensuring smooth read/write operations with minimal delays.
2. **Authentication Logic**: Storing user credentials securely on the device.
3. **Cross-Platform Compatibility**: Adapting styles to look consistent on both Android and iOS.
4. **State Persistence**: Managing state effectively to reflect updates instantly.

---

## How to Run the Project

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Abhays-harma/todo-list-project.git
