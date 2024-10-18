<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todo List Project - README</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 20px;
    }
    h1, h2, h3 {
      color: #333;
    }
    h1 {
      text-align: center;
      margin-bottom: 30px;
    }
    p {
      line-height: 1.6;
      margin: 10px 0;
    }
    ul {
      margin-left: 20px;
    }
    .container {
      max-width: 800px;
      margin: auto;
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    code {
      background-color: #f4f4f4;
      padding: 2px 4px;
      border-radius: 4px;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      font-size: 14px;
      color: #666;
    }
  </style>
</head>
<body>

<div class="container">
  <h1>Todo List Application - README</h1>

  <h2>Overview</h2>
  <p>This Todo List application allows users to create groups, add todos within those groups, and manage them with full CRUD (Create, Read, Update, Delete) operations. 
     It also includes login and signup functionality to secure user data. The application is built with a focus on simplicity and responsiveness, and SQLite is used as the database for efficient data storage and retrieval.</p>

  <h2>Features</h2>
  <ul>
    <li>Create and manage multiple groups of todos.</li>
    <li>Add, edit, delete, and mark todos as completed within each group.</li>
    <li>Full user authentication with login and signup functionality.</li>
    <li>All data is stored locally using <code>SQLite</code> for fast access and persistence.</li>
    <li>Responsive design for smooth experience on different devices.</li>
  </ul>

  <h2>Design Choices</h2>
  <p>The application was designed with a focus on usability and performance. The grouping of todos helps users organize tasks efficiently. 
     User authentication ensures that each user's data is protected and only accessible after logging in. SQLite was chosen as the database because of its lightweight nature and ease of use in local environments.</p>
  <p>We utilized React for the frontend with hooks such as <code>useState</code> and <code>useEffect</code> for managing state and side effects. 
     Backend functionalities like CRUD operations and authentication are managed using Express.js, and all data is stored securely in SQLite.</p>

  <h2>Challenges Encountered</h2>
  <ul>
    <li><b>Database integration:</b> Handling migrations and relationships between groups and todos in SQLite required careful planning.</li>
    <li><b>User authentication:</b> Implementing secure login and signup with hashed passwords and session management.</li>
    <li><b>State management:</b> Ensuring todos update in real-time without unnecessary re-renders.</li>
    <li><b>Responsive design:</b> Tweaking CSS to ensure the layout adapts smoothly across different devices and screen sizes.</li>
  </ul>

  <h2>How to Run the Project</h2>
  <p>Follow these steps to run the project locally:</p>
  <ol>
    <li>Clone the repository from GitHub.</li>
    <li>Navigate to the project directory in your terminal.</li>
    <li>Install dependencies using <code>npm install</code>.</li>
    <li>Ensure SQLite is properly configured and initialize the database using the provided SQL migration scripts.</li>
    <li>Run the development server using <code>npm run dev</code>.</li>
    <li>Open <code>http://localhost:3000</code> in your browser to access the application.</li>
  </ol>

  <h2>Technologies Used</h2>
  <ul>
    <li>Frontend: React with hooks (useState, useEffect)</li>
    <li>Backend: Express.js for API and authentication management</li>
    <li>Database: SQLite for storing todos and user data</li>
    <li>Styling: Tailwind CSS for a responsive UI</li>
    <li>Node.js for server-side operations</li>
  </ul>

  <h2>Future Improvements</h2>
  <ul>
    <li>Add notifications or reminders for pending todos.</li>
    <li>Implement sorting and filtering of todos within each group.</li>
    <li>Support for OAuth login (e.g., Google, GitHub) to simplify authentication.</li>
    <li>Export data to CSV or PDF for easy sharing of todo lists.</li>
  </ul>

  <div class="footer">
    <p>Created by Abhay Sharma | <a href="https://github.com/Abhays-harma" target="_blank">GitHub</a></p>
  </div>
</div>

</body>
</html>
