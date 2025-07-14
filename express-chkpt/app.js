const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Working hours middleware
app.use((req, res, next) => {
    const now = new Date();
    const day = now.getDay(); // 0 (Sun) - 6 (Sat)
    const hour = now.getHours();
    
    const isWorkingHours = (day >= 1 && day <= 5) && (hour >= 9 && hour < 17);
    
    if (isWorkingHours) {
        next();
    } else {
        res.render('closed', { title: 'Closed' });
    }
});

// Routes
app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/services', (req, res) => {
    res.render('services', { title: 'Our Services' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});