const app = require("./utils/setup");

const contractRouter = require("./routers/contractRouter");

app.use("/contract", contractRouter);
