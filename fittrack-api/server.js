import { app, pool } from "./app.js";

const PORT = process.env.PORT || 5000;


pool.connect()
  .then(() => console.log("db connected"))
  .catch(err => console.error("db error:", err.message));

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});