const db = require("../config/db.config");

class ParkingRecordModel {
  // -----------------------------
  // Get active parking for a vehicle
  // -----------------------------
  static async getActiveByVehicle(id) {
    const [rows] = await db.execute(
      `SELECT * FROM parking_records
             WHERE id = ? AND exit_time IS NULL`,
      [id]
    );
    return rows[0];
  }

  // -----------------------------
  // Create parking entry
  // -----------------------------
  static async createEntry({ id, recorded_id }) {
    const [result] = await db.execute(
      `INSERT INTO parking_records (id, recorded_id, entry_time)
             VALUES (?, ?, NOW())`,
      [id, recorded_id]
    );
    return result.insertId;
  }

  // -----------------------------
  // Record parking exit and calculate duration & fee
  // -----------------------------
  static async recordExit(record_id) {
    const [rows] = await db.execute(
      `SELECT entry_time FROM parking_records WHERE record_id = ?`,
      [record_id]
    );
    if (!rows[0]) throw new Error("Record not found");

    const entry_time = new Date(rows[0].entry_time);
    const exit_time = new Date();

    let total_hours = Math.ceil((exit_time - entry_time) / (1000 * 60 * 60));
    let total_amount = 1500;
    if (total_hours > 1) total_amount += (total_hours - 1) * 1000;

    const [result] = await db.execute(
      `UPDATE parking_records
             SET exit_time = NOW(), total_hours = ?, total_amount = ?
             WHERE record_id = ?`,
      [total_hours, total_amount, record_id]
    );

    return result.affectedRows > 0 ? { total_hours, total_amount } : null;
  }

  // -----------------------------
  // Get parking history by vehicle
  // -----------------------------
  static async getHistoryByVehicle(id) {
    const [rows] = await db.execute(
      `SELECT p.*, v.plate_number, v.vehicle_type, u.full_name AS recorded_by
             FROM parking_records p
             JOIN vehicles v ON p.id = v.id
             JOIN users u ON p.recorded_id = u.id
             WHERE p.id = ? ORDER BY entry_time DESC`,
      [id]
    );
    return rows;
  }

  // -----------------------------
  // Get history for multiple vehicles (used by normal users)
  // -----------------------------
  static async getHistoryByVehicles(vehicleIds) {
    if (!vehicleIds.length) return [];
    const placeholders = vehicleIds.map(() => "?").join(",");
    const [rows] = await db.execute(
      `SELECT p.*, v.plate_number, v.vehicle_type, u.full_name AS recorded_by
             FROM parking_records p
             JOIN vehicles v ON p.id = v.id
             JOIN users u ON p.recorded_id = u.id
             WHERE p.id IN (${placeholders})
             ORDER BY entry_time DESC`,
      vehicleIds
    );
    return rows;
  }

  // -----------------------------
  // Get all parking history (used by manager)
  // -----------------------------
  static async getAllHistory() {
    const [rows] = await db.execute(
      `SELECT p.*, v.plate_number, v.vehicle_type, u.full_name AS recorded_by
             FROM parking_records p
             JOIN vehicles v ON p.id = v.id
             JOIN users u ON p.recorded_id = u.id
             ORDER BY entry_time DESC`
    );
    return rows;
  }

  // -----------------------------
  // Get all active parking
  // -----------------------------
  static async getActiveParking() {
    const [rows] = await db.execute(
      `SELECT p.*, v.plate_number, v.vehicle_type, u.full_name AS recorded_by
             FROM parking_records p
             JOIN vehicles v ON p.id = v.id
             JOIN users u ON p.recorded_id = u.id
             WHERE exit_time IS NULL`
    );
    return rows;
  }

  // -----------------------------
  // Daily report
  // -----------------------------
  static async getDailyReport(date) {
    const [rows] = await db.execute(
      `SELECT DATE(entry_time) AS date, COUNT(*) AS total_entries, SUM(total_amount) AS total_amount
             FROM parking_records
             WHERE DATE(entry_time) = ?
             GROUP BY DATE(entry_time)`,
      [date]
    );
    return rows;
  }

  // -----------------------------
  // Monthly report
  // -----------------------------
  static async getMonthlyReport(month) {
    const [rows] = await db.execute(
      `SELECT MONTH(entry_time) AS month, COUNT(*) AS total_entries, SUM(total_amount) AS total_amount
             FROM parking_records
             WHERE MONTH(entry_time) = ?
             GROUP BY MONTH(entry_time)`,
      [month]
    );
    return rows;
  }

  // -----------------------------
  // Get user-specific parking history (records they created)
  // -----------------------------
  static async getHistoryByUser(user_id) {
    const [rows] = await db.execute(
      `SELECT p.*, v.plate_number, v.vehicle_type
             FROM parking_records p
             JOIN vehicles v ON p.id = v.id
             WHERE p.recorded_id = ? ORDER BY entry_time DESC`,
      [user_id]
    );
    return rows;
  }
}

module.exports = ParkingRecordModel;
