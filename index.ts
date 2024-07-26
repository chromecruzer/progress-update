const express = require('express');

const app = express();
const port = process.env.PORT ||  3000;

// In-memory storage for form data
const formData: { date: any; prachitha: any; amudha: any; }[] = [];

app.use(express.urlencoded({ extended: true }));

app.get('/', (_req: any, res: { send: (arg0: string) => void; }) => {
    const tableRows = formData.map((entry, index) => `
        <tr>
            <td>${entry.date}</td>
            <td>${entry.prachitha}</td>
            <td>${entry.amudha}</td>
            <td>
                <form action="/update/${index}" method="POST" style="display:inline;">
                    <input type="date" name="date" required>
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
});

app.post('/', (req: { body: { date: any; prachitha: any; amudha: any; }; }, res: { redirect: (arg0: string) => void; }) => { 
    const { date, prachitha, amudha } = req.body;  
    formData.push({
        date,
        prachitha: prachitha || "master not yet filled",  
        amudha: amudha || "worker not yet filled"
    });
    res.redirect('/');
});

app.post('/update/:index', (req: { body: { date: any; prachitha: any; amudha: any; }; params: { index: any; }; }, res: { redirect: (arg0: string) => void; }) => {
    const { date, prachitha, amudha } = req.body;
    const index = req.params.index;
    formData[index] = {
        date,
        prachitha: prachitha || "master not yet filled",
        amudha: amudha || "worker not yet filled"
    };
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
