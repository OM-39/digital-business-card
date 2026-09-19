const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const cardRoutes = require("./routes/cardRoutes");
const publicRoutes = require("./routes/publicRoutes");
const socialLinkRoutes = require("./routes/socialLinkRoutes");
const qrRoutes = require("./routes/qrRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const publicLeadRoutes = require("./routes/publicLeadRoutes");
const leadRoutes = require("./routes/leadRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const userRoutes = require("./routes/userRoutes");
const planRoutes = require("./routes/planRoutes");



const app = express();

app.set("trust proxy", 1);

app.use(helmet());

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        next(error);
    }
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "API is running"
    });
});

app.use("/api/auth", authRoutes);

app.use("/api/cards", cardRoutes);

app.use("/api/public", publicRoutes);

app.use("/api", qrRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use("/api/public", publicLeadRoutes);

app.use("/api/leads", leadRoutes);

app.use("/api/subscriptions", subscriptionRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/users", userRoutes);

app.use("/api/plans", planRoutes);

module.exports = app;

const errorHandler = require("./middleware/errorMiddleware");

app.use(errorHandler);
