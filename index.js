
const express = require("express");
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// PORT
const PORT = 3000;

app.listen(PORT, () => {
   console.log(`Server is running on PORT: ${PORT}`);
});


