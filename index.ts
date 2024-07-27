
// const express = require('express');
// const mongoose = require('mongoose');

// const app = express();
// const port = process.env.PORT || 3000;

// const mongoURI = process.env.MONGO_URI || 'mongodb+srv://Shyam:80560025MONGO@stella.qpw90og.mongodb.net/';
// let isConnected = false;
// let inactivityTimeout: number | Timer | undefined;

// const connectToDatabase = async () => {
//   if (!isConnected) {
//     try {
//       await mongoose.connect(mongoURI, {
//         //useNewUrlParser: true,
//         //useUnifiedTopology: true,
//       });
//       console.log('Connected to MongoDB');
//       isConnected = true;
//     } catch (err) {
//       console.error('Error connecting to MongoDB:', err);
//     }
//   }
// };

// const disconnectFromDatabase = async () => {
//   if (isConnected) {
//     try {
//       await mongoose.disconnect();
//       console.log('Disconnected from MongoDB');
//       isConnected = false;
//     } catch (err) {
//       console.error('Error disconnecting from MongoDB:', err);
//     }
//   }
// };

// const resetInactivityTimeout = () => {
//   if (inactivityTimeout) {
//     clearTimeout(inactivityTimeout);
//   }
//   inactivityTimeout = setTimeout(disconnectFromDatabase, 300000); // 5 minutes
// };

// const formDataSchema = new mongoose.Schema({
//   date: { type: Date, required: true },
//   prachitha: { type: String, default: 'master not yet filled' },
//   amudha: { type: String, default: 'worker not yet filled' },
// });

// const FormData = mongoose.model('prachi', formDataSchema);

// app.use(express.urlencoded({ extended: true }));

// // app.get('/', async (_req: any, res: { send: (arg0: string) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
// //   await connectToDatabase();
// //   resetInactivityTimeout();

// //   try {
// //     const formData = await FormData.find({});
// //     const tableRows = formData.map((entry: { date: { toISOString: () => string; }; prachitha: any; amudha: any; _id: any; }, index: any) => `
// //       <tr>
// //         <td>${entry.date.toISOString().split('T')[0]}</td>
// //         <td>${entry.prachitha}</td>
// //         <td>${entry.amudha}</td>
// //         <td>
// //           <form action="/update/${entry._id}" method="POST" style="display:inline;">
// //             <input type="date" name="date" value="${entry.date.toISOString().split('T')[0]}" required>
// //             <input type="text" name="prachitha" placeholder="Prachitha">
// //             <input type="text" name="amudha" placeholder="Amudha">
// //             <input type="submit" value="Update">
// //           </form>
// //         </td>
// //       </tr>
// //     `).join('');

// //     const html = `
// //     <!DOCTYPE html>
// //     <html lang="en">
// //     <head>
// //       <meta charset="UTF-8">
// //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
// //       <title>Sudhas's Task-Management</title>
// //       <style>
// //         body {
// //           font-family: Arial, sans-serif;
// //           background-color: #f8f9fa;
// //           margin: 0;
// //           padding: 20px;
// //           display: flex;
// //           justify-content: center;
// //           align-items: center;
// //           flex-direction: column;
// //         }
// //         h1 {
// //           color: #343a40;
// //         }
// //         form {
// //           margin-bottom: 20px;
// //           background-color: #ffffff;
// //           padding: 20px;
// //           border-radius: 8px;
// //           box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
// //         }
// //         label {
// //           display: block;
// //           margin-bottom: 8px;
// //           font-weight: bold;
// //         }
// //         input[type="text"], input[type="date"] {
// //           width: 100%;
// //           padding: 8px;
// //           margin-bottom: 10px;
// //           border: 1px solid #ced4da;
// //           border-radius: 4px;
// //         }
// //         input[type="submit"] {
// //           background-color: #007bff;
// //           color: white;
// //           padding: 10px 20px;
// //           border: none;
// //           border-radius: 4px;
// //           cursor: pointer;
// //           transition: background-color 0.2s;
// //         }
// //         input[type="submit"]:hover {
// //           background-color: #0056b3;
// //         }
// //         table {
// //           width: 100%;
// //           border-collapse: collapse;
// //           margin-top: 20px;
// //         }
// //         th, td {
// //           padding: 12px;
// //           border: 1px solid #dee2e6;
// //           text-align: left;
// //         }
// //         th {
// //           background-color: #007bff;
// //           color: white;
// //         }
// //       </style>
// //     </head>
// //     <body>
// //       <h1>Progress-FORM 2024</h1>
// //       <form action="/" method="POST">
// //         <label for="date">Date:</label>
// //         <input type="date" id="date" name="date" required>
// //         <label for="prachitha">Prachitha (master):</label>
// //         <input type="text" id="prachitha" name="prachitha" placeholder="Prachitha">
// //         <label for="amudha">Amudha (worker):</label>
// //         <input type="text" id="amudha" name="amudha" placeholder="Amudha">
// //         <input type="submit" value="Submit">
// //       </form>
// //       <table>
// //         <thead>
// //           <tr>
// //             <th>Date</th>
// //             <th>Prachitha (master)</th>
// //             <th>Amudha (worker)</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           ${tableRows}
// //         </tbody>
// //       </table>
// //     </body>
// //     </html>
// //     `;

// //     res.send(html);
// //   } catch (err) {
// //     console.error('Error retrieving data:', err);
// //     res.status(500).send('Internal Server Error');
// //   }
// // });


// app.get('/', async (_req: any, res: { send: (arg0: string) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
//   await connectToDatabase();
//   resetInactivityTimeout();

//   try {
//     const formData = await FormData.find({});
//     const tableRows = formData.map((entry: { date: { toISOString: () => string; }; prachitha: any; amudha: any; _id: any; }, index: any) => `
//       <tr>
//         <td>${entry.date.toISOString().split('T')[0]}</td>
//         <td>${entry.prachitha}</td>
//         <td>${entry.amudha}</td>
//         <td>
//           <form action="/update/${entry._id}" method="POST" style="display:inline;">
//             <input type="date" name="date" value="${entry.date.toISOString().split('T')[0]}" required>
//             <input type="text" name="prachitha" placeholder="Prachitha">
//             <input type="text" name="amudha" placeholder="Amudha">
//             <input type="submit" value="Update">
//           </form>
//         </td>
//       </tr>
//     `).join('');

//     const html = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <meta property="og:title" content="Sudhas's Task-Management">
//       <meta property="og:description" content="Progress-FORM 2024">
//       <meta property="og:image" content="https://media.licdn.com/dms/image/D5603AQE-o4qxXR34lg/profile-displayphoto-shrink_800_800/0/1699622997175?e=1727308800&v=beta&t=MzfFVK3TPlhdg5XZpXEffwniLmqrDYVSN9fyQjoJmY0">
//       <meta property="og:image:alt" content="Icon Image">
//       <meta property="og:type" content="website">
//       <meta property="og:url" content="https://sudhalakshmi-task-management.onrender.com/">
//       <link rel="icon" href="https://media.licdn.com/dms/image/D5603AQE-o4qxXR34lg/profile-displayphoto-shrink_800_800/0/1699622997175?e=1727308800&v=beta&t=MzfFVK3TPlhdg5XZpXEffwniLmqrDYVSN9fyQjoJmY0" type="image/svg+xml">
//       <title>Sudhas's Task-Management</title>
//       <style>
//         body {
//           font-family: Arial, sans-serif;
//           background-color: #f8f9fa;
//           margin: 0;
//           padding: 20px;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           flex-direction: column;
//         }
//         h1 {
//           color: #343a40;
//         }
//         form {
//           margin-bottom: 20px;
//           background-color: #ffffff;
//           padding: 20px;
//           border-radius: 8px;
//           box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//         }
//         label {
//           display: block;
//           margin-bottom: 8px;
//           font-weight: bold;
//         }
//         input[type="text"], input[type="date"] {
//           width: 100%;
//           padding: 8px;
//           margin-bottom: 10px;
//           border: 1px solid #ced4da;
//           border-radius: 4px;
//         }
//         input[type="submit"] {
//           background-color: #007bff;
//           color: white;
//           padding: 10px 20px;
//           border: none;
//           border-radius: 4px;
//           cursor: pointer;
//           transition: background-color 0.2s;
//         }
//         input[type="submit"]:hover {
//           background-color: #0056b3;
//         }
//         table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-top: 20px;
//         }
//         th, td {
//           padding: 12px;
//           border: 1px solid #dee2e6;
//           text-align: left;
//         }
//         th {
//           background-color: #007bff;
//           color: white;
//         }
//       </style>
//     </head>
//     <body>
//       <h1>Progress-FORM 2024</h1>
//       <form action="/" method="POST">
//         <label for="date">Date:</label>
//         <input type="date" id="date" name="date" required>
//         <label for="prachitha">Prachitha (master):</label>
//         <input type="text" id="prachitha" name="prachitha" placeholder="Prachitha">
//         <label for="amudha">Amudha (worker):</label>
//         <input type="text" id="amudha" name="amudha" placeholder="Amudha">
//         <input type="submit" value="Submit">
//       </form>
//       <table>
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Prachitha (master)</th>
//             <th>Amudha (worker)</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${tableRows}
//         </tbody>
//       </table>
//     </body>
//     </html>
//     `;

//     res.send(html);
//   } catch (err) {
//     console.error('Error retrieving data:', err);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.post('/', async (req: { body: { date: any; prachitha: any; amudha: any; }; }, res: { redirect: (arg0: string) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
//   await connectToDatabase();
//   resetInactivityTimeout();

//   try {
//     const { date, prachitha, amudha } = req.body;
//     const newEntry = new FormData({
//       date,
//       prachitha: prachitha || 'master not yet filled',
//       amudha: amudha || 'worker not yet filled',
//     });
//     await newEntry.save();
//     res.redirect('/');
//   } catch (err) {
//     console.error('Error saving data:', err);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.post('/update/:id', async (req: { body: { date: any; prachitha: any; amudha: any; }; params: { id: any; }; }, res: { redirect: (arg0: string) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
//     await connectToDatabase();
//     resetInactivityTimeout();
  
//     try {
//       const { date, prachitha, amudha } = req.body;
  
//       // Find the existing document
//       const existingEntry = await FormData.findById(req.params.id);
  
//       if (existingEntry) {
//         // Merge updates, only update fields that are provided
//         const updatedEntry = {
//           date: date || existingEntry.date,
//           prachitha: prachitha !== '' ? prachitha : existingEntry.prachitha,
//           amudha: amudha !== '' ? amudha : existingEntry.amudha,
//         };
  
//         // Update the document
//         await FormData.findByIdAndUpdate(req.params.id, updatedEntry, { new: true });
//       }
  
//       res.redirect('/');
//     } catch (err) {
//       console.error('Error updating data:', err);
//       res.status(500).send('Internal Server Error');
//     }
//   });
  
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session')

const app = express();
const port = process.env.PORT || 3000;

// Use express-session middleware to manage sessions
app.use(session({
  secret: process.env.Session || 'stella2019', // Change this to a long, random string
  resave: false,
  saveUninitialized: true, cookie: {
    maxAge: 30 * 60 * 1000, // 30 minutes in milliseconds
  }
}));

const mongoURI = process.env.MONGO_URI || 'mongodb+srv://Shyam:80560025MONGO@stella.qpw90og.mongodb.net/';
let isConnected = false;
let inactivityTimeout: number | Timer | undefined;



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

const resetInactivityTimeout = () => {
  if (inactivityTimeout) {
    clearTimeout(inactivityTimeout);
  }
  inactivityTimeout = setTimeout(disconnectFromDatabase, 300000); // 5 minutes
};

const formDataSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  prachitha: { type: String, default: 'master not yet filled' },
  amudha: { type: String, default: 'worker not yet filled' },
});

const FormData = mongoose.model('prachi', formDataSchema);

app.use(express.urlencoded({ extended: true }));

// Middleware to check authentication
function checkAuthentication(req: { session: { password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }, next: () => void) {
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
// Middleware to parse cookies (for demo purposes, you might use a package like cookie-parser in production)
app.use((req: { cookies: { [x: string]: string; password?: any; }; headers: { cookie: string; }; session: { password: string; }; }, res: any, next: () => void) => {
  req.cookies = {};
  if (req.headers.cookie) {
    req.headers.cookie.split(';').forEach((cookie: string) => {
      let parts = cookie.split('=');
      req.cookies[parts.shift().trim()] = decodeURI(parts.join('='));
    });
  }
  if (req.cookies.password === 'sudha') {
    req.session.password = 'sudha';
  }
  next();
});

// Database connection function (replace with your connection logic)
const connectToDatabase = async () => {
  if (!isConnected) {
    try {
      await mongoose.connect(mongoURI, {
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
      isConnected = true;
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
  }
};


// app.get('/', async (_req: any, res: { send: (arg0: string) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
//   await connectToDatabase();
//   resetInactivityTimeout();

//   try {
//     const formData = await FormData.find({});
//     const tableRows = formData.map((entry: { date: { toISOString: () => string; }; prachitha: any; amudha: any; _id: any; }, index: any) => `
//       <tr>
//         <td>${entry.date.toISOString().split('T')[0]}</td>
//         <td>${entry.prachitha}</td>
//         <td>${entry.amudha}</td>
//         <td>
//           <form action="/update/${entry._id}" method="POST" style="display:inline;">
//             <input type="date" name="date" value="${entry.date.toISOString().split('T')[0]}" required>
//             <input type="text" name="prachitha" placeholder="Prachitha">
//             <input type="text" name="amudha" placeholder="Amudha">
//             <input type="submit" value="Update">
//           </form>
//         </td>
//       </tr>
//     `).join('');

//     const html = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Sudhas's Task-Management</title>
//       <style>
//         body {
//           font-family: Arial, sans-serif;
//           background-color: #f8f9fa;
//           margin: 0;
//           padding: 20px;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           flex-direction: column;
//         }
//         h1 {
//           color: #343a40;
//         }
//         form {
//           margin-bottom: 20px;
//           background-color: #ffffff;
//           padding: 20px;
//           border-radius: 8px;
//           box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//         }
//         label {
//           display: block;
//           margin-bottom: 8px;
//           font-weight: bold;
//         }
//         input[type="text"], input[type="date"] {
//           width: 100%;
//           padding: 8px;
//           margin-bottom: 10px;
//           border: 1px solid #ced4da;
//           border-radius: 4px;
//         }
//         input[type="submit"] {
//           background-color: #007bff;
//           color: white;
//           padding: 10px 20px;
//           border: none;
//           border-radius: 4px;
//           cursor: pointer;
//           transition: background-color 0.2s;
//         }
//         input[type="submit"]:hover {
//           background-color: #0056b3;
//         }
//         table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-top: 20px;
//         }
//         th, td {
//           padding: 12px;
//           border: 1px solid #dee2e6;
//           text-align: left;
//         }
//         th {
//           background-color: #007bff;
//           color: white;
//         }
//       </style>
//     </head>
//     <body>
//       <h1>Progress-FORM 2024</h1>
//       <form action="/" method="POST">
//         <label for="date">Date:</label>
//         <input type="date" id="date" name="date" required>
//         <label for="prachitha">Prachitha (master):</label>
//         <input type="text" id="prachitha" name="prachitha" placeholder="Prachitha">
//         <label for="amudha">Amudha (worker):</label>
//         <input type="text" id="amudha" name="amudha" placeholder="Amudha">
//         <input type="submit" value="Submit">
//       </form>
//       <table>
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Prachitha (master)</th>
//             <th>Amudha (worker)</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${tableRows}
//         </tbody>
//       </table>
//     </body>
//     </html>
//     `;

//     res.send(html);
//   } catch (err) {
//     console.error('Error retrieving data:', err);
//     res.status(500).send('Internal Server Error');
//   }
// });


app.get('/', checkAuthentication, async (_req: any, res: { send: (arg0: string) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
  await connectToDatabase();
  resetInactivityTimeout();

  try {
    const formData = await FormData.find({});
    const tableRows = formData.map((entry: { date: { toISOString: () => string; }; prachitha: any; amudha: any; _id: any; }, index: any) => `
      <tr>
        <td>${entry.date.toISOString().split('T')[0]}</td>
        <td>${entry.prachitha}</td>
        <td>${entry.amudha}</td>
        <td>
          <form action="/update/${entry._id}" method="POST" style="display:inline;">
            <input type="date" name="date" value="${entry.date.toISOString().split('T')[0]}" required>
            <input type="text" name="prachitha" placeholder="Prachitha">
            <input type="text" name="amudha" placeholder="Amudha">
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
        form {
          margin-bottom: 20px;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
      <form action="/" method="POST">
        <label for="date">Date:</label>
        <input type="date" id="date" name="date" required>
        <label for="prachitha">Prachitha (master):</label>
        <input type="text" id="prachitha" name="prachitha" placeholder="Prachitha">
        <label for="amudha">Amudha (worker):</label>
        <input type="text" id="amudha" name="amudha" placeholder="Amudha">
        <input type="submit" value="Submit">
      </form>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Prachitha (master)</th>
            <th>Amudha (worker)</th>
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

app.post('/', checkAuthentication, async (req: { body: { date: any; prachitha: any; amudha: any; }; }, res: { redirect: (arg0: string) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
  await connectToDatabase();
  resetInactivityTimeout();

  try {
    const { date, prachitha, amudha } = req.body;
    const newEntry = new FormData({
      date,
      prachitha: prachitha || 'master not yet filled',
      amudha: amudha || 'worker not yet filled',
    });
    await newEntry.save();
    res.redirect('/');
  } catch (err) {
    console.error('Error saving data:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/update/:id', checkAuthentication, async (req: { body: { date: any; prachitha: any; amudha: any; }; params: { id: any; }; }, res: { redirect: (arg0: string) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
  await connectToDatabase();
  resetInactivityTimeout();

  try {
    const { date, prachitha, amudha } = req.body;

    // Find the existing document
    const existingEntry = await FormData.findById(req.params.id);

    if (existingEntry) {
      // Merge updates, only update fields that are provided
      const updatedEntry = {
        date: date || existingEntry.date,
        prachitha: prachitha !== '' ? prachitha : existingEntry.prachitha,
        amudha: amudha !== '' ? amudha : existingEntry.amudha,
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

