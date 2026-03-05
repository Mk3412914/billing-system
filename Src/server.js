require('dotenv').config();
const app = require('./app');
const sequelize = require('./Component/db/db.js');

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log(" Database connected");

        console.log(` Server running on port ${PORT}`);
    } catch (error) {
        console.error("Database connection failed:", error);
    }
});