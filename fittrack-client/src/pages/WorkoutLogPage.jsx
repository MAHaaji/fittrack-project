import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE from "../config";
import { useAuth } from "../context/AuthContext";

const fieldStyle = {
  width: "100%", padding: "9px 12px",
  border: "1px solid #e0e0d8", borderRadius: "8px",
  fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
  color: "#1a1a1a", background: "#fafaf8", outline: "none",
  marginTop: "5px",
};

const labelStyle = {
  display: "block", fontSize: "12px", fontWeight: 500,
  color: "#555", letterSpacing: "0.3px",
};

function WorkoutLogPage() {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ activity: "", date: "", duration: "", notes: "" });
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE}/api/workouts`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(setWorkoutLogs)
      .catch(err => console.error("Error loading workouts:", err));
  }, [token]);

  useEffect(() => {
    fetch(`${API_BASE}/api/activities`)
      .then(r => r.json())
      .then(setActivities)
      .catch(err => console.error("Error loading activities:", err));
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleEdit(log) {
    setEditingId(log.id);
    setFormData({
      activity: log.activity || "",
      date: log.date_completed ? String(log.date_completed).slice(0, 10) : "",
      duration: log.duration != null ? formatDuration(log.duration) : "",
      notes: log.notes || "",
    });
    setError("");
    setSuccess("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setFormData({ activity: "", date: "", duration: "", notes: "" });
    setError("");
    setSuccess("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.activity || !formData.date) {
      setError("Please select an activity and date.");
      setSuccess("");
      return;
    }

    if (formData.duration !== "") {
      const durationValid = /^\d+:[0-5]\d(:[0-5]\d)?$/.test(formData.duration.trim());
      if (!durationValid) {
        setError("Duration must be in MM:SS or HH:MM:SS format, e.g. 26:33");
        setSuccess("");
        return;
      }
    }

    const isEditing = editingId !== null;
    const endpoint = isEditing
      ? `${API_BASE}/api/workouts/${editingId}`
      : `${API_BASE}/api/workouts`;

    try {
      const response = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          activity: formData.activity,
          date_completed: formData.date,
          duration: parseDurationToSeconds(formData.duration),
          notes: formData.notes,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to save workout");

      if (isEditing) {
        setWorkoutLogs(curr => curr.map(l => l.id === editingId ? data : l));
        setSuccess("Workout updated successfully.");
      } else {
        setWorkoutLogs(curr => [data, ...curr]);
        setSuccess("Workout added successfully.");
      }

      setEditingId(null);
      setFormData({ activity: "", date: "", duration: "", notes: "" });
      setError("");
    } catch (err) {
      console.error("Workout save failed:", err);
      setError(err.message || "Something went wrong. Please try again.");
      setSuccess("");
    }
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(`${API_BASE}/api/workouts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Unable to delete workout");
      }

      setWorkoutLogs(curr => curr.filter(l => l.id !== id));
      setDeleteConfirmId(null);
      setSuccess("Workout deleted.");
      setError("");

      if (editingId === id) cancelEdit();
    } catch (err) {
      console.error("Delete failed:", err);
      setError(err.message || "Could not delete workout. Please try again.");
      setDeleteConfirmId(null);
    }
  }

  function formatDate(dateStr) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  }

  function formatDuration(seconds) {
    if (seconds == null || seconds === "") return null;
    const totalSecs = Number(seconds);
    if (isNaN(totalSecs)) return null;
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  function parseDurationToSeconds(str) {
    if (!str || str.trim() === "") return null;
    const parts = str.trim().split(":").map(Number);
    if (parts.some(isNaN)) return null;
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    return null;
  }

  return (
    <main style={{ background: "#f8f8f5", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
        <img src="/images/workout.jpg" alt="Gym equipment"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 32px" }}>
          <p style={{ fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#6ebc67", marginBottom: "6px" }}>
            My Fitness
          </p>
          <h1 style={{ fontFamily: "'Anton', serif", fontSize: "clamp(24px, 4vw, 32px)", color: "#fff", marginBottom: "4px" }}>
            Workout Log
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>
            Welcome back{user?.name ? `, ${user.name}` : ""}. Log a completed workout and track your history.
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", alignItems: "start" }}>

          {/* FORM CARD */}
          <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #ebebeb", padding: "24px" }}>
            <p style={{ fontFamily: "'Anton', serif", fontSize: "13px", letterSpacing: "0.5px", textTransform: "uppercase", color: "#1a1a1a", marginBottom: "18px", paddingBottom: "12px", borderBottom: "1px solid #f0f0ea" }}>
              {editingId !== null ? "Edit Workout" : "Log a Workout"}
            </p>

            {error && (
              <div style={{ background: "#fff0f0", border: "1px solid #ffc5c5", borderRadius: "8px", padding: "10px 14px", fontSize: "13px", color: "#c0392b", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#e24b4a", flexShrink: 0 }} />
                {error}
              </div>
            )}
            {success && (
              <div style={{ background: "#f0faf0", border: "1px solid #c5e8c3", borderRadius: "8px", padding: "10px 14px", fontSize: "13px", color: "#27682a", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#6ebc67", flexShrink: 0 }} />
                {success}
              </div>
            )}

            <div style={{ marginBottom: "14px" }}>
              <label style={labelStyle}>Activity</label>
              <select name="activity" value={formData.activity} onChange={handleChange} style={fieldStyle}>
                <option value="">Select an activity</option>
                {activities.map(a => (
                  <option key={a.activity_id ?? a.id} value={a.activity_name ?? a.name}>
                    {a.activity_name ?? a.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: "14px" }}>
              <label style={labelStyle}>Date completed</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} style={fieldStyle} />
            </div>

            <div style={{ marginBottom: "14px" }}>
              <label style={labelStyle}>Duration (mm:ss or hh:mm:ss)</label>
              <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g. 26:33" style={fieldStyle} />
            </div>

            <div style={{ marginBottom: "18px" }}>
              <label style={labelStyle}>Notes</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Optional notes…" rows={3} style={{ ...fieldStyle, resize: "vertical" }} />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button type="button" onClick={handleSubmit}
                style={{ width: "100%", background: "#6ebc67", color: "#fff", border: "none", borderRadius: "9px", padding: "13px", fontFamily: "'Anton', serif", fontSize: "14px", letterSpacing: "0.5px", textTransform: "uppercase", cursor: "pointer" }}>
                {editingId !== null ? "Save Changes" : "Add Workout"}
              </button>

              {editingId !== null && (
                <button type="button" onClick={cancelEdit}
                  style={{ background: "#f1f1ed", color: "#555", border: "1px solid #deded8", borderRadius: "9px", padding: "13px 18px", fontFamily: "'Anton', serif", fontSize: "14px", letterSpacing: "0.5px", textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap" }}>
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* HISTORY CARD */}
          <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #ebebeb", padding: "24px" }}>
            <p style={{ fontFamily: "'Anton', serif", fontSize: "13px", letterSpacing: "0.5px", textTransform: "uppercase", color: "#1a1a1a", marginBottom: "4px", paddingBottom: "12px", borderBottom: "1px solid #f0f0ea" }}>
              Workout History
            </p>

            {workoutLogs.length === 0 ? (
              <p style={{ fontSize: "13px", color: "#aaa", textAlign: "center", padding: "32px 0" }}>
                No workouts logged yet. Add one to get started!
              </p>
            ) : (
              workoutLogs.map((log, i) => (
                <div key={log.id ?? i} style={{ borderBottom: i < workoutLogs.length - 1 ? "1px solid #f0f0ea" : "none", padding: "14px 0" }}>
                  <p style={{ fontFamily: "'Anton', serif", fontSize: "15px", color: "#1a1a1a", letterSpacing: "0.3px" }}>{log.activity}</p>
                  <p style={{ fontSize: "12px", color: "#aaa", marginTop: "2px" }}>{formatDate(log.date_completed)}</p>

                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "8px" }}>
                    {log.duration && (
                      <span style={{ background: "#f0faf0", color: "#3b7a35", borderRadius: "99px", padding: "3px 10px", fontSize: "11px" }}>
                        {formatDuration(log.duration)}
                      </span>
                    )}
                  </div>

                  {log.notes && (
                    <p style={{ fontSize: "12px", color: "#888", marginTop: "6px", fontStyle: "italic" }}>{log.notes}</p>
                  )}

                  {/* Edit + Delete */}
                  <div style={{ display: "flex", gap: "8px", marginTop: "10px", alignItems: "center" }}>
                    <button type="button" onClick={() => handleEdit(log)}
                      style={{ background: "transparent", color: "#3b7a35", border: "1px solid #c5e8c3", borderRadius: "7px", padding: "6px 12px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>
                      Edit
                    </button>

                    {deleteConfirmId === log.id ? (
                      <>
                        <span style={{ fontSize: "11px", color: "#888" }}>Delete?</span>
                        <button type="button" onClick={() => handleDelete(log.id)}
                          style={{ background: "#c0392b", color: "#fff", border: "none", borderRadius: "7px", padding: "6px 12px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>
                          Yes
                        </button>
                        <button type="button" onClick={() => setDeleteConfirmId(null)}
                          style={{ background: "#f1f1ed", color: "#555", border: "1px solid #deded8", borderRadius: "7px", padding: "6px 12px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>
                          No
                        </button>
                      </>
                    ) : (
                      <button type="button" onClick={() => setDeleteConfirmId(log.id)}
                        style={{ background: "transparent", color: "#c0392b", border: "1px solid #f5c0bb", borderRadius: "7px", padding: "6px 12px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </main>
  );
}

export default WorkoutLogPage;
