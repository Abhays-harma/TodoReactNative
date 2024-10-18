# Todo List Application

## Overview
This **Todo List application** allows users to create groups and manage individual todos within those groups. Users can perform **CRUD operations** on todos, and it includes **login and signup functionality** for authentication. The data is stored using **SQLite** for persistence.

---

## Features
- **Create Groups**: Organize todos into multiple groups.
- **CRUD Operations**: Add, edit, delete, and mark todos as completed.
- **Authentication**: Login and signup features for secured data access.
- **SQLite Database**: Fast and reliable storage for user and todo data.
- **Responsive Design**: Ensures a smooth experience across all devices.

---

## Design Choices
- **Grouping Structure**: Helps users categorize tasks efficiently.
- **Authentication**: Secures user data with login and signup features.
- **SQLite Database**: Chosen for its simplicity and lightweight nature.
- **Frontend with React**: State managed using hooks like `useState` and `useEffect`.
- **Backend with Express.js**: Manages API routes and authentication logic.

---

## Challenges Encountered
1. **Database Integration**: Managing relationships between groups and todos required careful design.
2. **Authentication**: Implementing secure login and session management with password hashing.
3. **State Management**: Ensuring smooth updates without unnecessary re-renders.
4. **Responsive Design**: Adapting UI across different screen sizes.

---

## How to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/Abhays-harma/todo-list-project.git
