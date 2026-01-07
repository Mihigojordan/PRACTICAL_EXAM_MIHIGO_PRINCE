const db = require("../config/db.config");

class VehicleModel {
  static async create(vehicle) {
    const { plate_number, vehicle_type, user_id } = vehicle;
    const [result] = await db.execute(
      `INSERT INTO vehicles (plate_number, vehicle_type, user_id)
             VALUES (?, ?, ?)`,
      [plate_number, vehicle_type, user_id]
    );
    return result.insertId;
  }

  static async getAll() {
    const [rows] = await db.execute(
      `SELECT v.id, v.plate_number, v.vehicle_type, v.user_id, u.full_name
             FROM vehicles v
             JOIN users u ON v.user_id = u.id`
    );
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.execute(`SELECT * FROM vehicles WHERE id = ?`, [
      id,
    ]);
    return rows[0];
  }

  static async getByPlateNumber(plate) {
    const [rows] = await db.execute(
      `SELECT * FROM vehicles WHERE plate_number = ?`,
      [plate]
    );
    return rows[0];
  }

  static async update(id, updates) {
    const fields = [];
    const values = [];

    if (updates.plate_number) {
      fields.push("plate_number = ?");
      values.push(updates.plate_number);
    }
    if (updates.vehicle_type) {
      fields.push("vehicle_type = ?");
      values.push(updates.vehicle_type);
    }

    if (!fields.length) return null;

    values.push(id);
    const [result] = await db.execute(
      `UPDATE vehicles SET ${fields.join(", ")} WHERE id = ?`,
      values
    );

    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.execute(`DELETE FROM vehicles WHERE id = ?`, [
      id,
    ]);
    return result.affectedRows > 0;
  }

  // -----------------------------
  // ✅ New helper: Get all vehicles assigned to a user
  // -----------------------------
  static async getByUserId(user_id) {
    const [rows] = await db.execute(
      `SELECT * FROM vehicles WHERE user_id = ?`,
      [user_id]
    );
    return rows;
  }
}

module.exports = VehicleModel;
