const fs = require('fs');

// Create welcome.txt with one line "Hello Node"
fs.writeFileSync('welcome.txt', 'Hello Node');
console.log('welcome.txt created');

// Read and log data from hello.txt
fs.readFile('hello.txt', 'utf8', (err, data) => {
  if (err) {
    return console.error('Error reading hello.txt:', err.message);
  }
  console.log('Contents of hello.txt:', data);
});
