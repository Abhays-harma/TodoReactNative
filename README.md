<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Project README</title>
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
  <h1>Project: Currency Converter</h1>

  <h2>Overview</h2>
  <p>This project is a web-based currency converter that allows users to select different currencies and get real-time conversion rates using a currency API. 
     It was built using modern web technologies like React and Vite to ensure fast and efficient performance. The project also utilizes React hooks such as 
     <code>useState</code>, <code>useCallback</code>, and <code>useEffect</code> to manage state and API calls efficiently.</p>

  <h2>Features</h2>
  <ul>
    <li>Select multiple currencies from dropdown menus.</li>
    <li>Fetch and display real-time conversion rates using a currency API.</li>
    <li>Responsive design with Tailwind CSS for seamless experience across devices.</li>
    <li>State management with hooks to improve code readability and performance.</li>
    <li>Lightweight setup with <code>Vite</code> for optimized development.</li>
  </ul>

  <h2>Design Choices</h2>
  <p>The project was designed with simplicity and responsiveness in mind. We used Tailwind CSS to style the components, ensuring that the layout adapts well to 
     different screen sizes. The dropdown currency selectors were implemented to provide a smooth user experience by limiting the options to valid currencies.</p>
  <p>Additionally, React hooks like <code>useState</code> and <code>useEffect</code> were used to handle API calls and state changes, keeping the codebase clean and modular.</p>

  <h2>Challenges Encountered</h2>
  <ul>
    <li>Ensuring responsive layout: The initial design looked too large on mobile screens, so additional CSS tweaks were required for better scaling.</li>
    <li>Dropdown menu issue: Fixing a problem where the currency dropdown options were not displaying correctly on mobile views.</li>
    <li>Handling async API calls: Managing asynchronous operations effectively using <code>useEffect</code> without causing unnecessary re-renders.</li>
  </ul>

  <h2>How to Run the Project</h2>
  <p>To run this project locally, follow these steps:</p>
  <ol>
    <li>Clone the repository from GitHub.</li>
    <li>Navigate to the project directory in your terminal.</li>
    <li>Install dependencies by running <code>npm install</code>.</li>
    <li>Start the development server using <code>npm run dev</code>.</li>
    <li>Open <code>http://localhost:3000</code> in your browser to see the application.</li>
  </ol>

  <h2>Technologies Used</h2>
  <ul>
    <li>React</li>
    <li>Vite</li>
    <li>Tailwind CSS</li>
    <li>Currency API</li>
    <li>JavaScript (ES6+)</li>
  </ul>

  <h2>Future Improvements</h2>
  <ul>
    <li>Add support for more currencies and exchange rate providers.</li>
    <li>Implement caching for API results to reduce load times.</li>
    <li>Add a feature to save frequently used currency pairs for quick access.</li>
  </ul>

  <div class="footer">
    <p>Created by Abhay Sharma | <a href="https://github.com/Abhays-harma" target="_blank">GitHub</a></p>
  </div>
</div>

</body>
</html>
