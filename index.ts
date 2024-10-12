
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

// Use express-session middleware to manage sessions
app.use(session({
  secret: process.env.Session || 'stella2019', // Change this to a long, random string
  resave: false,
  saveUninitialized: true, 
  cookie: {
    maxAge: 30 * 60 * 1000, // 30 minutes in milliseconds
  }
}));

const mongoURI = process.env.MONGO_URI ;
let isConnected = false;
let inactivityTimeout;

// Connect to MongoDB
const connectToDatabase = async () => {
  if (!isConnected) {
    try {
      await mongoose.connect(mongoURI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
      isConnected = true;
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
  }
};

// Disconnect from MongoDB after inactivity
const disconnectFromDatabase = async () => {
  if (isConnected) {
    try {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
      isConnected = false;
    } catch (err) {
      console.error('Error disconnecting from MongoDB:', err);
    }
  }
};

// Reset inactivity timeout
const resetInactivityTimeout = () => {
  if (inactivityTimeout) {
    clearTimeout(inactivityTimeout);
  }
  inactivityTimeout = setTimeout(disconnectFromDatabase, 300000); // 5 minutes
};

// Define Mongoose Schema and Model with updated field names
const formDataSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  anjutha: { type: String, default: 'master not yet filled' },
  chithra: { type: String, default: 'worker not yet filled' },
});

const FormData = mongoose.model('prachi', formDataSchema);

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies (for demo purposes, you might use a package like cookie-parser in production)
app.use((req, res, next) => {
  req.cookies = {};
  if (req.headers.cookie) {
    req.headers.cookie.split(';').forEach((cookie) => {
      let parts = cookie.split('=');
      req.cookies[parts.shift().trim()] = decodeURI(parts.join('='));
    });
  }
  if (req.cookies.password === 'sudha') {
    req.session.password = 'sudha';
  }
  next();
});

// Middleware to check authentication
function checkAuthentication(req, res, next) {
  if (!req.session.password) {
    res.status(401).send(`
      <script>
        var password = prompt("Please enter your password:");
        if (password === 'sudha') {
          // Store the password in the session
          document.cookie = "password=sudha; path=/";
          location.href = "/";
        } else {
          alert("Incorrect password.");
          location.href = "/";
        }
      </script>
    `);
  } else {
    next();
  }
}

// GET '/' Route - Main Page
app.get('/', checkAuthentication, async (_req, res) => {
  await connectToDatabase();
  resetInactivityTimeout();

  try {
    const formData = await FormData.find({});
    const tableRows = formData.map((entry) => `
      <tr>
        <td>${entry.date.toISOString().split('T')[0]}</td>
        <td>${entry.anjutha}</td>
        <td>${entry.chithra}</td>
        <td>
          <form action="/update/${entry._id}" method="POST" style="display:inline;">
            <input type="date" name="date" value="${entry.date.toISOString().split('T')[0]}" required>
            <input type="text" name="anjutha" placeholder="Anjutha" value="${entry.anjutha}">
            <input type="text" name="chithra" placeholder="Chithra" value="${entry.chithra}">
            <input type="submit" value="Update">
          </form>
        </td>
      </tr>
    `).join('');

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta property="og:title" content="Sudhas's Task-Management">
      <meta property="og:description" content="Progress-FORM 2024">
      <meta property="og:image" content="https://media.licdn.com/dms/image/D5603AQE-o4qxXR34lg/profile-displayphoto-shrink_800_800/0/1699622997175?e=1727308800&v=beta&t=MzfFVK3TPlhdg5XZpXEffwniLmqrDYVSN9fyQjoJmY0">
      <meta property="og:image:alt" content="Icon Image">
      <meta property="og:type" content="website">
      <meta property="og:url" content="https://sudhalakshmi-task-management.onrender.com/">
      <link rel="icon" href="https://media.licdn.com/dms/image/D5603AQE-o4qxXR34lg/profile-displayphoto-shrink_800_800/0/1699622997175?e=1727308800&v=beta&t=MzfFVK3TPlhdg5XZpXEffwniLmqrDYVSN9fyQjoJmY0" type="image/svg+xml">
      <title>Sudhas's Task-Management</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f8f9fa;
          margin: 0;
          padding: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        h1 {
          color: #343a40;
        }
        a {
          margin-bottom: 20px;
          text-decoration: none;
          color: #007bff;
          font-weight: bold;
        }
        a:hover {
          text-decoration: underline;
        }
        form {
          margin-bottom: 20px;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 500px;
        }
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
        }
        input[type="text"], input[type="date"] {
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ced4da;
          border-radius: 4px;
        }
        input[type="submit"] {
          background-color: #007bff;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        input[type="submit"]:hover {
          background-color: #0056b3;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          max-width: 800px;
        }
        th, td {
          padding: 12px;
          border: 1px solid #dee2e6;
          text-align: left;
        }
        th {
          background-color: #007bff;
          color: white;
        }
      </style>
    </head>
    <body>
      <h1>Progress-FORM 2024</h1>
      <a href="/d3calendar">View Calendar</a>
      <form action="/" method="POST">
        <label for="date">Date:</label>
        <input type="date" id="date" name="date" required>
        
        <label for="anjutha">Anjutha (master):</label>
        <input type="text" id="anjutha" name="anjutha" placeholder="Anjutha">
        
        <label for="chithra">Chithra (worker):</label>
        <input type="text" id="chithra" name="chithra" placeholder="Chithra">
        
        <input type="submit" value="Submit">
      </form>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Anjutha (master)</th>
            <th>Chithra (worker)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </body>
    </html>
    `;

    res.send(html);
  } catch (err) {
    console.error('Error retrieving data:', err);
    res.status(500).send('Internal Server Error');
  }
});

// POST '/' Route - Submit New Entry
app.post('/', checkAuthentication, async (req, res) => {
  await connectToDatabase();
  resetInactivityTimeout();

  try {
    const { date, anjutha, chithra } = req.body;
    const newEntry = new FormData({
      date,
      anjutha: anjutha || 'master not yet filled',
      chithra: chithra || 'worker not yet filled',
    });
    await newEntry.save();
    res.redirect('/');
  } catch (err) {
    console.error('Error saving data:', err);
    res.status(500).send('Internal Server Error');
  }
});

// POST '/update/:id' Route - Update Existing Entry
app.post('/update/:id', checkAuthentication, async (req, res) => {
  await connectToDatabase();
  resetInactivityTimeout();

  try {
    const { date, anjutha, chithra } = req.body;

    // Find the existing document
    const existingEntry = await FormData.findById(req.params.id);

    if (existingEntry) {
      // Merge updates, only update fields that are provided
      const updatedEntry = {
        date: date || existingEntry.date,
        anjutha: anjutha !== '' ? anjutha : existingEntry.anjutha,
        chithra: chithra !== '' ? chithra : existingEntry.chithra,
      };

      // Update the document
      await FormData.findByIdAndUpdate(req.params.id, updatedEntry, { new: true });
    }

    res.redirect('/');
  } catch (err) {
    console.error('Error updating data:', err);
    res.status(500).send('Internal Server Error');
  }
});

// GET '/d3calendar' Route - Display Data in Enhanced D3.js Calendar View
app.get('/d3calendar', checkAuthentication, async (_req, res) => {
  console.log('Accessing /d3calendar route'); // Debugging log
  await connectToDatabase();
  resetInactivityTimeout();

  try {
    const formData = await FormData.find({});

    // Prepare data for D3.js
    const data = formData.map(entry => ({
      date: entry.date.toISOString().split('T')[0],
      anjutha: entry.anjutha,
      chithra: entry.chithra
    }));

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Enhanced Calendar</title>
      <script src="https://d3js.org/d3.v7.min.js"></script>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          background-color: #f0f2f5;
        }
        h1 {
          text-align: center;
          margin-bottom: 20px;
        }
        .calendar-container {
          max-width: 1000px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .controls button {
          padding: 10px 20px;
          background-color: #007bff;
          border: none;
          color: white;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .controls button:hover {
          background-color: #0056b3;
        }
        .month-year {
          font-size: 1.2em;
          font-weight: bold;
        }
        .calendar {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          grid-gap: 5px;
        }
        .weekdays {
          font-weight: bold;
          text-align: center;
          background-color: #007bff;
          color: white;
          padding: 10px 0;
          border-radius: 5px;
        }
        .day {
          border: 1px solid #ddd;
          padding: 10px;
          min-height: 100px;
          position: relative;
          background-color: #f9f9f9;
          border-radius: 5px;
          overflow-y: auto;
        }
        .day-header {
          position: absolute;
          top: 5px;
          left: 5px;
          font-size: 0.9em;
          color: #666;
        }
        .entry {
          background-color: #e7f3fe;
          padding: 5px;
          margin-top: 25px;
          border-left: 4px solid #007bff;
          border-radius: 3px;
          font-size: 0.9em;
        }
        /* Scrollbar Styling */
        .day::-webkit-scrollbar {
          width: 6px;
        }
        .day::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .day::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 3px;
        }
        .day::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        /* Responsive Design */
        @media (max-width: 768px) {
          .day {
            min-height: 80px;
          }
          .controls button {
            padding: 8px 16px;
          }
        }
      </style>
    </head>
    <body>
      <div class="calendar-container">
        <h1>Calendar</h1>
        <div class="controls">
          <button id="prevMonth">Previous</button>
          <div class="month-year" id="monthYear"></div>
          <button id="nextMonth">Next</button>
        </div>
        <div class="calendar" id="calendar">
          <div class="weekdays">Sunday</div>
          <div class="weekdays">Monday</div>
          <div class="weekdays">Tuesday</div>
          <div class="weekdays">Wednesday</div>
          <div class="weekdays">Thursday</div>
          <div class="weekdays">Friday</div>
          <div class="weekdays">Saturday</div>
          <!-- Days will be populated here by D3.js -->
        </div>
      </div>

      <script>
        const data = ${JSON.stringify(data)};

        // Initialize current month and year
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();

        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const calendar = d3.select("#calendar");
        const monthYearLabel = d3.select("#monthYear");
        const prevButton = d3.select("#prevMonth");
        const nextButton = d3.select("#nextMonth");

        // Function to render the calendar
        function renderCalendar(month, year) {
          // Update month and year label
          monthYearLabel.text(\`\${monthNames[month]} \${year}\`);

          // Calculate first day of the month
          const firstDay = new Date(year, month, 1);
          const startingDay = firstDay.getDay();

          // Calculate number of days in the month
          const monthLength = new Date(year, month + 1, 0).getDate();

          // Clear previous days
          calendar.selectAll(".day").remove();

          // Add weekdays headers (already in HTML)

          // Create array for days
          const days = [];
          // Add empty cells for days before the first day
          for (let i = 0; i < startingDay; i++) {
            days.push(null);
          }
          // Add days of the month
          for (let i = 1; i <= monthLength; i++) {
            days.push(new Date(year, month, i));
          }

          // Bind data to day cells
          const dayCells = calendar.selectAll(".day")
            .data(days)
            .enter()
            .append("div")
            .attr("class", "day");

          // Add date labels
          dayCells.append("div")
            .attr("class", "day-header")
            .text(d => d ? d.getDate() : '');

          // Add entries to the days
          dayCells.each(function(d) {
            if (d) {
              const dateStr = d.toISOString().split('T')[0];
              const entries = data.filter(entry => entry.date === dateStr);
              const cell = d3.select(this);
              entries.forEach(entry => {
                cell.append("div")
                  .attr("class", "entry")
                  .html(\`<strong>Anjutha:</strong> \${entry.anjutha}<br><strong>Chithra:</strong> \${entry.chithra}\`);
              });
            }
          });
        }

        // Initial render
        renderCalendar(currentMonth, currentYear);

        // Event listeners for navigation buttons
        prevButton.on("click", () => {
          currentMonth--;
          if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
          }
          renderCalendar(currentMonth, currentYear);
        });

        nextButton.on("click", () => {
          currentMonth++;
          if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
          }
          renderCalendar(currentMonth, currentYear);
        });
      </script>
    </body>
    </html>
    `;

    res.send(html);
  } catch (err) {
    console.error('Error retrieving data for D3.js calendar:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Start the Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
