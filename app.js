
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static('public'));

app.get('/', (req, res) => {
  const dataPath = path.join(__dirname, 'data', 'about.json');
  fs.readFile(dataPath, 'utf8', (err, jsonData) => {
    if (err) {
      return res.status(500).send('Error loading data');
    }
    const data = JSON.parse(jsonData);
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${data.name}</title>
          <link rel="stylesheet" href="/styles.css" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
          <div class="container">
            <header>
              <h1>${data.name}</h1>
            </header>
            
            <main>
              <div class="profile-section">
                <p class="title"><strong>Title:</strong> ${data.title}</p>
                <p class="academy"><strong>Founder of:</strong> ${data.academy}</p>
                <p class="bio"><strong>Bio:</strong> ${data.bio}</p>
                <p class="certifications"><strong>Certifications:</strong> ${data.certifications.join(', ')}</p>
              </div>

              <div class="links-section">
                <h3>Links</h3>
                <ul>
                  ${data.links.map(link => `<li><a href="${link.url}" target="_blank">${link.label}</a></li>`).join('')}
                </ul>
              </div>
            </main>
            
            <footer>
              <p>&copy; ${new Date().getFullYear()} ${data.name}. All rights reserved.</p>
            </footer>
          </div>
        </body>
      </html>
    `;
    res.send(html);
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Create public/styles.css with following content:
/*
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f5f5;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.profile-section {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.profile-section p {
  margin-bottom: 1rem;
}

.links-section {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

ul {
  list-style: none;
}

li {
  margin-bottom: 0.5rem;
}

a {
  color: #3498db;
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: #2980b9;
}

footer {
  text-align: center;
  margin-top: 3rem;
  padding: 1rem;
  color: #7f8c8d;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  header {
    padding: 1rem;
  }
  
  h1 {
    font-size: 2rem;
  }
}
*/

