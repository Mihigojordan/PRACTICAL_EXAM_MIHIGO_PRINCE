-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 07, 2026 at 10:38 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nscps`
--

-- --------------------------------------------------------

--
-- Table structure for table `parking_records`
--

CREATE TABLE `parking_records` (
  `record_id` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `entry_time` datetime NOT NULL,
  `exit_time` datetime DEFAULT NULL,
  `total_hours` int(11) DEFAULT 0,
  `total_amount` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `recorded_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parking_records`
--

INSERT INTO `parking_records` (`record_id`, `id`, `entry_time`, `exit_time`, `total_hours`, `total_amount`, `created_at`, `recorded_id`) VALUES
(1, 1, '2026-01-07 10:02:27', '2026-01-07 10:05:24', 1, 1500, '2026-01-07 09:02:27', 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `role` enum('ParkingManager','Driver') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `phone`, `role`, `created_at`) VALUES
(1, 'mihigo', '0791813298', 'Driver', '2025-12-17 08:45:11'),
(2, 'mihigo prince', 'mihigojordan8@gmail.', 'ParkingManager', '2025-12-17 08:45:47'),
(3, 'kalimu', '0791813289', 'ParkingManager', '2025-12-17 08:53:23');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `plate_number` varchar(20) NOT NULL,
  `vehicle_type` enum('Car','Motorcycle','Truck','Bus') NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `plate_number`, `vehicle_type`, `user_id`, `created_at`) VALUES
(1, 'RAB123C', 'Car', 1, '2025-12-17 09:11:07'),
(2, 'RB12C', '', 1, '2025-12-17 09:20:39'),
(3, 'RAB 123 A', 'Car', 1, '2026-01-07 08:59:34'),
(4, 'RAB 123 B', 'Car', 1, '2026-01-07 09:00:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `parking_records`
--
ALTER TABLE `parking_records`
  ADD PRIMARY KEY (`record_id`),
  ADD KEY `id` (`id`),
  ADD KEY `fk_recorded_user` (`recorded_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `plate_number` (`plate_number`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `parking_records`
--
ALTER TABLE `parking_records`
  MODIFY `record_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `parking_records`
--
ALTER TABLE `parking_records`
  ADD CONSTRAINT `fk_recorded_user` FOREIGN KEY (`recorded_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `parking_records_ibfk_1` FOREIGN KEY (`id`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
