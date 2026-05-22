
import app from "./src/app.js"
import { connectDB } from "./src/config/db.js"


const PORT = 8000
const startServer = async () => {
    try {
        const response = await connectDB();

        app.listen(PORT, () => {
            console.log("✅ server is running at port", PORT);
        });
    } catch (err) {
        console.error("❌ connection failed while db", err.message);
    }
};

startServer();