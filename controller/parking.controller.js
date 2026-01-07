const ParkingRecordModel = require("../models/parking.model");
const VehicleModel = require("../models/vehicle.model");

// ---------------------
// Record vehicle entry
// ---------------------
const recordEntry = async (req, res) => {
  try {
    const { id } = req.body; // vehicle id
    const recorded_id = req.user.id; // logged-in user

    // Check vehicle exists
    const vehicle = await VehicleModel.getById(id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    // Check if vehicle is already parked
    const active = await ParkingRecordModel.getActiveByVehicle(id);
    if (active)
      return res.status(400).json({ message: "Vehicle already parked" });

    // Create parking record
    const recordId = await ParkingRecordModel.createEntry({ id, recorded_id });
    res.status(201).json({ message: "Entry recorded", recordId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------
// Record vehicle exit
// ---------------------
const recordExit = async (req, res) => {
  try {
    const { record_id } = req.body;

    const result = await ParkingRecordModel.recordExit(record_id);
    if (!result)
      return res
        .status(404)
        .json({ message: "Record not found or already exited" });

    res.json({ message: "Exit recorded", ...result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------
// View active parking
// ---------------------
const viewActiveParking = async (req, res) => {
  try {
    const data = await ParkingRecordModel.getActiveParking();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------
// View parking history by vehicle
// ---------------------
const viewVehicleHistory = async (req, res) => {
  try {
    const { id } = req.params; // vehicle id
    const data = await ParkingRecordModel.getHistoryByVehicle(id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------
// User parking history (role-based)
// ---------------------
const viewUserHistory = async (req, res) => {
  try {
    const { id: user_id, role } = req.user;
    let data;

    if (role === "ParkingManager") {
      // Manager sees all records
      data = await ParkingRecordModel.getAllHistory();
    } else {
      // Regular user sees only their vehicle history
      const vehicles = await VehicleModel.getByUserId(user_id);
      const vehicleIds = vehicles.map((v) => v.id);
      data = await ParkingRecordModel.getHistoryByVehicles(vehicleIds);
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------
// Daily report
// ---------------------
const dailyReport = async (req, res) => {
  try {
    const date = req.query.date;
    if (!date)
      return res.status(400).json({ message: "Date is required (YYYY-MM-DD)" });

    const data = await ParkingRecordModel.getDailyReport(date);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------
// Monthly report
// ---------------------
const monthlyReport = async (req, res) => {
  try {
    let month = req.query.month;
    month = parseInt(month, 10);

    if (!month || month < 1 || month > 12)
      return res
        .status(400)
        .json({ message: "Month must be a number between 1 and 12" });

    const data = await ParkingRecordModel.getMonthlyReport(month);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  recordEntry,
  recordExit,
  viewActiveParking,
  viewVehicleHistory,
  viewUserHistory,
  dailyReport,
  monthlyReport,
};
