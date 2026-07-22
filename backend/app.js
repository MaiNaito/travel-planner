const express = require("express");
const cors = require("cors");

require("./db/connection");

const tripRoutes = require("./routes/tripRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/trips", tripRoutes);
app.use("/schedules", scheduleRoutes);

const PORT = 3001;

app.get("/",(req,res)=>{
    res.send("Express Server Start!");
});

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

