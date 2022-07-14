const express = require('express');
const cors = require('cors');
const connectDB = require("./config/DBConfig");

const app = express();
const PORT = process.env.PORT || 4321;

if(process.env.NODE_ENV === 'development') {
    require("dotenv").config();
}

app.use(express.json());
app.use(cors()); // Cors
connectDB(); // DB Connection

app.get("/", (req, res) => {
    res.send("API Working Successfully");
});

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/article', require('./routes/article.routes'));

app.listen(PORT, (error) => {
    if(error) {
        console.error(error.message);
    }
    console.log(`Server Running on Port ${PORT}`);
})