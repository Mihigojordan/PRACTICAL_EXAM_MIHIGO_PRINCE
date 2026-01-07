const express = require("express");
const router = express.Router();
const {
  recordEntry,
  recordExit,
  viewActiveParking,
  viewVehicleHistory,
  viewUserHistory,
  dailyReport,
  monthlyReport,
} = require("../controller/parking.controller");

const {
  verifyToken,
  authorizeRoles,
} = require("../middlewares/auth.middleware");

// ---------------------------
// ParkingManager routes
// ---------------------------

// Record vehicle entry (only manager)
router.post(
  "/entry",
  verifyToken,
  authorizeRoles("ParkingManager"),
  recordEntry
);

// Record vehicle exit (only manager)
router.post("/exit", verifyToken, authorizeRoles("ParkingManager"), recordExit);

// View all active parking (only manager)
router.get(
  "/active",
  verifyToken,
  authorizeRoles("ParkingManager"),
  viewActiveParking
);

// View history of a specific vehicle (only manager)
router.get(
  "/vehicle/:id",
  verifyToken,
  authorizeRoles("ParkingManager"),
  viewVehicleHistory
);

// Daily report (only manager)
router.get(
  "/report/daily",
  verifyToken,
  authorizeRoles("ParkingManager"),
  dailyReport
);

// Monthly report (only manager)
router.get(
  "/report/monthly",
  verifyToken,
  authorizeRoles("ParkingManager"),
  monthlyReport
);

// ---------------------------
// Normal user routes
// ---------------------------

// View history of their assigned vehicles (Drivers can see only their vehicles, Manager sees all)
router.get(
  "/user/history",
  verifyToken,
  authorizeRoles("Driver", "ParkingManager"),
  viewUserHistory
);

module.exports = router;
