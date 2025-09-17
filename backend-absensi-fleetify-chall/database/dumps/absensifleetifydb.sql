-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 17, 2025 at 03:32 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `absensifleetifydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendances`
--

CREATE TABLE `attendances` (
  `id` bigint UNSIGNED NOT NULL,
  `employee_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `attendance_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `clock_in` timestamp NULL DEFAULT NULL,
  `clock_out` timestamp NULL DEFAULT NULL,
  `attendance_date` date GENERATED ALWAYS AS (cast(`clock_in` as date)) STORED,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ;

--
-- Dumping data for table `attendances`
--

INSERT INTO `attendances` (`id`, `employee_id`, `attendance_id`, `clock_in`, `clock_out`, `created_at`, `updated_at`) VALUES
(1, 'EMP-006', '63801d00-fa22-4fed-acd7-8a6ace6a7d8e', '2025-09-16 07:08:13', '2025-09-16 07:12:05', '2025-09-16 07:08:13', '2025-09-16 07:12:05'),
(2, 'EMP-003', '0e6c3d45-26f5-4589-887f-7954fe6097a6', '2025-09-16 08:41:22', '2025-09-16 08:42:13', '2025-09-16 08:41:22', '2025-09-16 08:42:13'),
(3, 'EMP-002', '5298e570-afa2-49e9-b889-6670b9404152', '2025-09-16 08:57:14', '2025-09-16 17:34:21', '2025-09-16 08:57:14', '2025-09-16 17:34:21'),
(4, 'EMP-004', 'a60e3895-2307-497c-9cc7-89789de7662f', '2025-09-16 16:06:11', NULL, '2025-09-16 16:06:11', '2025-09-16 16:06:11'),
(5, 'EMP-006', 'b02f4701-1baa-445d-8094-6ff94cf52e66', '2025-09-16 17:44:09', '2025-09-16 17:44:19', '2025-09-16 17:44:09', '2025-09-16 17:44:19'),
(6, 'EMP-002', '87da98ec-5d7a-4d8d-b801-568081b1bdb0', '2025-09-17 03:16:44', NULL, '2025-09-17 03:16:44', '2025-09-17 03:16:44');

-- --------------------------------------------------------

--
-- Table structure for table `attendance_histories`
--

CREATE TABLE `attendance_histories` (
  `id` bigint UNSIGNED NOT NULL,
  `employee_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `attendance_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_attendance` timestamp NOT NULL,
  `attendance_type` tinyint NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attendance_histories`
--

INSERT INTO `attendance_histories` (`id`, `employee_id`, `attendance_id`, `date_attendance`, `attendance_type`, `description`, `created_at`, `updated_at`) VALUES
(1, 'EMP-006', '63801d00-fa22-4fed-acd7-8a6ace6a7d8e', '2025-09-16 07:08:13', 1, 'Check-in', '2025-09-16 07:08:13', '2025-09-16 07:08:13'),
(2, 'EMP-006', '63801d00-fa22-4fed-acd7-8a6ace6a7d8e', '2025-09-16 07:12:05', 2, 'Check-out', '2025-09-16 07:12:05', '2025-09-16 07:12:05'),
(3, 'EMP-003', '0e6c3d45-26f5-4589-887f-7954fe6097a6', '2025-09-16 08:41:22', 1, 'Check-in', '2025-09-16 08:41:22', '2025-09-16 08:41:22'),
(4, 'EMP-003', '0e6c3d45-26f5-4589-887f-7954fe6097a6', '2025-09-16 08:42:13', 2, 'Check-out', '2025-09-16 08:42:13', '2025-09-16 08:42:13'),
(5, 'EMP-002', '5298e570-afa2-49e9-b889-6670b9404152', '2025-09-16 08:57:14', 1, 'Check-in', '2025-09-16 08:57:14', '2025-09-16 08:57:14'),
(6, 'EMP-004', 'a60e3895-2307-497c-9cc7-89789de7662f', '2025-09-16 16:06:11', 1, 'Check-in', '2025-09-16 16:06:11', '2025-09-16 16:06:11'),
(7, 'EMP-002', '5298e570-afa2-49e9-b889-6670b9404152', '2025-09-16 17:34:21', 2, 'Check-out', '2025-09-16 17:34:21', '2025-09-16 17:34:21'),
(8, 'EMP-006', 'b02f4701-1baa-445d-8094-6ff94cf52e66', '2025-09-16 17:44:09', 1, 'Check-in', '2025-09-16 17:44:09', '2025-09-16 17:44:09'),
(9, 'EMP-006', 'b02f4701-1baa-445d-8094-6ff94cf52e66', '2025-09-16 17:44:19', 2, 'Check-out', '2025-09-16 17:44:19', '2025-09-16 17:44:19'),
(10, 'EMP-002', '87da98ec-5d7a-4d8d-b801-568081b1bdb0', '2025-09-17 03:16:44', 1, 'Check-in', '2025-09-17 03:16:44', '2025-09-17 03:16:44');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `departements`
--

CREATE TABLE `departements` (
  `id` bigint UNSIGNED NOT NULL,
  `departement_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `max_clock_in_time` time NOT NULL,
  `max_clock_out_time` time NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `departements`
--

INSERT INTO `departements` (`id`, `departement_name`, `max_clock_in_time`, `max_clock_out_time`, `created_at`, `updated_at`) VALUES
(1, 'Vehilcle Engineering', '09:00:00', '10:00:00', '2025-09-16 06:59:23', '2025-09-16 17:31:31'),
(2, 'Maintenance & Repair', '08:30:00', '19:30:00', '2025-09-16 06:59:24', '2025-09-17 03:20:20'),
(3, 'HR', '07:00:00', '15:33:00', '2025-09-16 17:33:50', '2025-09-16 17:33:50');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` bigint UNSIGNED NOT NULL,
  `employee_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `departement_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `employee_id`, `departement_id`, `name`, `address`, `created_at`, `updated_at`) VALUES
(1, 'EMP-006', 1, 'Izamul', 'Malang', '2025-09-16 06:59:24', '2025-09-17 03:17:11'),
(2, 'EMP-002', 3, 'Fikri Fahmi', 'Bandung', '2025-09-16 06:59:24', '2025-09-16 17:33:59'),
(3, 'EMP-003', 2, 'Fahmi', 'Banyuwangi', '2025-09-16 06:59:24', '2025-09-16 06:59:24'),
(4, 'EMP-004', 2, 'Brando', 'Bekasi', '2025-09-16 06:59:24', '2025-09-16 06:59:24');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_09_16_133444_create_departements_table', 1),
(5, '2025_09_16_133725_create_employees_table', 1),
(6, '2025_09_16_133735_create_attendances_table', 1),
(7, '2025_09_16_133747_create_attendance_histories_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendances`
--
ALTER TABLE `attendances`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `attendances_attendance_id_unique` (`attendance_id`),
  ADD UNIQUE KEY `uniq_employee_per_day` (`employee_id`,`attendance_date`);

--
-- Indexes for table `attendance_histories`
--
ALTER TABLE `attendance_histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attendance_histories_attendance_id_foreign` (`attendance_id`),
  ADD KEY `idx_histories_emp_att_type` (`employee_id`,`attendance_id`,`attendance_type`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `departements`
--
ALTER TABLE `departements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `employees_employee_id_unique` (`employee_id`),
  ADD KEY `employees_departement_id_index` (`departement_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendances`
--
ALTER TABLE `attendances`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `attendance_histories`
--
ALTER TABLE `attendance_histories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `departements`
--
ALTER TABLE `departements`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendances`
--
ALTER TABLE `attendances`
  ADD CONSTRAINT `attendances_employee_id_foreign` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `attendance_histories`
--
ALTER TABLE `attendance_histories`
  ADD CONSTRAINT `attendance_histories_attendance_id_foreign` FOREIGN KEY (`attendance_id`) REFERENCES `attendances` (`attendance_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendance_histories_employee_id_foreign` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_departement_id_foreign` FOREIGN KEY (`departement_id`) REFERENCES `departements` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
