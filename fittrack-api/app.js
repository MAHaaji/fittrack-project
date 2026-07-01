import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Stripe from "stripe";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// --- STRIPE ---
// The secret key lives only here, on the server, read from an environment
// variable. It is never sent to the frontend and never appears in any
// response. The frontend only ever receives a Checkout Session URL (below).
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

// Base URL of the React app, used to build the redirect URLs Stripe sends
// the user back to after Checkout completes or is cancelled.
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Prototype-only plan definitions. In a production system these prices
// would normally be created once in the Stripe Dashboard (or via the API)
// and referenced by their Stripe Price ID, rather than rebuilt on every
// request. Keeping them inline here keeps the demo self-contained.
const PLAN_PRICES = {
  pro: { name: "FitTrack Pro", unitAmount: 499 },     // £4.99 / month
  elite: { name: "FitTrack Elite", unitAmount: 999 }, // £9.99 / month
};

// --- AUTH MIDDLEWARE ---
function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token provided" });

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

// --- HEALTH ---
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// --- AUTH ---

app.post("/api/auth/register", async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({ message: "A valid name is required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: "A valid email address is required" });
  }

  if (!password || password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters" });
  }

  try {
    const existing = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email.toLowerCase()]
    );

    if (existing.rows.length) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email`,
      [name.trim(), email.toLowerCase(), hashed]
    );

    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    console.error("register failed:", err.message);
    next(err);
  }
});

app.post("/api/auth/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email.toLowerCase()]
    );

    const user = result.rows[0];
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("login failed:", err.message);
    next(err);
  }
});

// --- USER ---
app.get("/api/users/me", requireAuth, async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [req.user.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("users/me failed:", err.message);
    next(err);
  }
});

// --- ACTIVITIES ---
app.get("/api/activities", async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, name, category FROM activities"
    );
    res.json(rows);
  } catch (err) {
    console.error("activities fetch failed:", err.message);
    next(err);
  }
});

// --- WORKOUTS ---
app.get("/api/workouts", requireAuth, async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM workout_logs WHERE user_id = $1 ORDER BY date_completed DESC",
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("workouts fetch failed:", err.message);
    next(err);
  }
});

app.post("/api/workouts", requireAuth, async (req, res, next) => {
  const { activity, date_completed, duration, notes } = req.body;

  if (!activity || typeof activity !== "string" || activity.trim().length === 0) {
    return res.status(400).json({ message: "A valid activity name is required" });
  }

  if (!date_completed || isNaN(Date.parse(date_completed))) {
    return res.status(400).json({ message: "A valid date is required" });
  }

  if (duration !== undefined && duration !== null) {
    const parsedDuration = Number(duration);
    if (isNaN(parsedDuration) || parsedDuration <= 0) {
      return res.status(400).json({ message: "Duration must be a positive number" });
    }
  }

  try {
    const result = await pool.query(
      `INSERT INTO workout_logs (user_id, activity, date_completed, duration, notes)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [req.user.id, activity.trim(), date_completed, duration || null, notes || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("workout save failed:", err.message);
    next(err);
  }
});

app.put("/api/workouts/:id", requireAuth, async (req, res, next) => {
  const workoutId = parseInt(req.params.id, 10);
  const { activity, date_completed, duration, notes } = req.body;

  if (isNaN(workoutId)) {
    return res.status(400).json({ message: "Invalid workout ID" });
  }

  if (
    !activity ||
    typeof activity !== "string" ||
    activity.trim().length === 0
  ) {
    return res
      .status(400)
      .json({ message: "A valid activity name is required" });
  }

  if (!date_completed || isNaN(Date.parse(date_completed))) {
    return res.status(400).json({ message: "A valid date is required" });
  }

  let parsedDuration = null;

  if (duration !== undefined && duration !== null && duration !== "") {
    parsedDuration = Number(duration);

    if (Number.isNaN(parsedDuration) || parsedDuration <= 0) {
      return res
        .status(400)
        .json({ message: "Duration must be a positive number" });
    }
  }

  try {
    const result = await pool.query(
      `UPDATE workout_logs
       SET activity = $1,
           date_completed = $2,
           duration = $3,
           notes = $4
       WHERE id = $5
         AND user_id = $6
       RETURNING *`,
      [
        activity.trim(),
        date_completed,
        parsedDuration,
        notes?.trim() || null,
        workoutId,
        req.user.id,
      ]
    );

    if (!result.rows.length) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("workout update failed:", err.message);
    next(err);
  }
});

app.delete("/api/workouts/:id", requireAuth, async (req, res, next) => {
  const workoutId = parseInt(req.params.id, 10);

  if (isNaN(workoutId)) {
    return res.status(400).json({ message: "Invalid workout ID" });
  }

  try {
    const result = await pool.query(
      "DELETE FROM workout_logs WHERE id = $1 AND user_id = $2 RETURNING id",
      [workoutId, req.user.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(204).send();
  } catch (err) {
    console.error("workout delete failed:", err.message);
    next(err);
  }
});

// --- DASHBOARD ---
app.get("/api/dashboard", requireAuth, async (req, res, next) => {
  try {
    const stats = await pool.query(
      `SELECT
        COUNT(*)::int AS total_workouts,
        COALESCE(SUM(duration), 0)::int AS total_duration,
        COALESCE(ROUND(AVG(duration)), 0)::int AS avg_duration
       FROM workout_logs
       WHERE user_id = $1`,
      [req.user.id]
    );

    const recent = await pool.query(
      `SELECT activity, date_completed, duration
       FROM workout_logs
       WHERE user_id = $1
       ORDER BY date_completed DESC
       LIMIT 5`,
      [req.user.id]
    );

    res.json({
      ...stats.rows[0],
      recent_workouts: recent.rows,
    });
  } catch (err) {
    console.error("dashboard fetch failed:", err.message);
    next(err);
  }
});

// --------------------------------------------------
// STRIPE CHECKOUT (commercial feasibility prototype)
// --------------------------------------------------
//

app.post("/api/payments/create-checkout-session", requireAuth, async (req, res, next) => {
  const { plan } = req.body;

  const selectedPlan = PLAN_PRICES[plan];
  if (!selectedPlan) {
    return res.status(400).json({ message: "Unknown or missing plan" });
  }

  if (!stripe) {
    return res.status(503).json({
      message: "Stripe Checkout is not configured"
    });
  }

  try {
    // Look up the user's email so Stripe can pre-fill / receipt to it.
    const userResult = await pool.query(
      "SELECT email FROM users WHERE id = $1",
      [req.user.id]
    );
    const userEmail = userResult.rows[0]?.email;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: userEmail,
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: { name: selectedPlan.name },
            unit_amount: selectedPlan.unitAmount,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
    
      success_url: `${CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${CLIENT_URL}/payment-cancelled`,
    });


    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe session creation failed:", err.message);
    next(err);
  }
});

// --------------------------------------------------
// COMPETITION LEADERBOARD
// --------------------------------------------------

app.get(
  "/api/competitions/leaderboard",
  requireAuth,
  async (req, res, next) => {
    try {
      const result = await pool.query(
        `SELECT
          users.id AS user_id,
          users.name,
          COUNT(workout_logs.id)::int AS total_workouts,
          COALESCE(SUM(workout_logs.duration), 0)::int AS total_duration
        FROM users
        LEFT JOIN workout_logs
          ON workout_logs.user_id = users.id
          AND workout_logs.date_completed >= DATE_TRUNC('month', CURRENT_DATE)
          AND workout_logs.date_completed < DATE_TRUNC('month', CURRENT_DATE)
              + INTERVAL '1 month'
        GROUP BY users.id, users.name
        HAVING COUNT(workout_logs.id) > 0
        ORDER BY total_duration DESC
        LIMIT 10`
      );

      const leaderboard = result.rows.map((entry, index) => ({
        rank: index + 1,
        user_id: entry.user_id,
        name: entry.name,
        total_workouts: entry.total_workouts,
        total_duration: entry.total_duration,
        is_current_user: entry.user_id === req.user.id,
      }));

      return res.json(leaderboard);
    } catch (err) {
      console.error("Leaderboard fetch failed:", err.message);
      next(err);
    }
  }
);

// --- ERROR HANDLER ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong",
  });
});

export { app, pool };