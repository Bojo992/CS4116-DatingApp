-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 07, 2024 at 06:09 PM
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
-- Database: `coursemates`
--

-- --------------------------------------------------------

--
-- Table structure for table `ban_list`
--

CREATE TABLE `ban_list` (
  `id` int(11) NOT NULL,
  `description` varchar(300) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `universityId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `name`, `universityId`) VALUES
(1, 'test', 1),
(2, 'LM051', 1),
(22, 'it&#039;s works', 1),
(23, 'it&#039;s works', 1),
(24, 'test new uni', 2),
(25, 'test new uni', 2),
(31, 'test new uni', 1),
(32, 'test new uni', 1),
(33, 'test new uni', 1),
(35, 'test new uni', 1);

-- --------------------------------------------------------

--
-- Table structure for table `credentials`
--

CREATE TABLE `credentials` (
  `mail` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `userId` int(11) NOT NULL,
  `username` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `credentials`
--

INSERT INTO `credentials` (`mail`, `password`, `userId`, `username`) VALUES
('test@test.test', 'test', 1, 'test');

-- --------------------------------------------------------

--
-- Table structure for table `dislikes`
--

CREATE TABLE `dislikes` (
  `userId` int(11) NOT NULL,
  `recomendedUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `interest`
--

CREATE TABLE `interest` (
  `id` int(11) NOT NULL,
  `interestTypeId` int(11) NOT NULL,
  `settings` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `interest_type`
--

CREATE TABLE `interest_type` (
  `id` int(11) NOT NULL,
  `description` varchar(100) NOT NULL,
  `type` varchar(300) NOT NULL,
  `isImportant` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `userId` int(11) NOT NULL,
  `recomendedUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `chatId` int(11) NOT NULL,
  `message` varchar(500) NOT NULL,
  `from` int(11) NOT NULL,
  `to` int(11) NOT NULL,
  `reactionsNum` int(11) DEFAULT NULL,
  `isPhoto` bit(1) NOT NULL,
  `replyMessageId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personalinfo`
--

CREATE TABLE `personalinfo` (
  `id` int(11) NOT NULL,
  `bio` varchar(200) NOT NULL,
  `smoking` bit(1) NOT NULL,
  `age` int(11) NOT NULL,
  `vegan` bit(1) NOT NULL,
  `loction` varchar(50) DEFAULT NULL,
  `Gender` int(11) DEFAULT NULL,
  `drinking` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `personalinfo`
--

INSERT INTO `personalinfo` (`id`, `bio`, `smoking`, `age`, `vegan`, `loction`, `Gender`, `drinking`) VALUES
(1, 'test', b'1', 21, b'0', 'asfd', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `personal_interest`
--

CREATE TABLE `personal_interest` (
  `userId` int(11) NOT NULL,
  `interestId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reaction_type`
--

CREATE TABLE `reaction_type` (
  `reactionTypeId` int(11) NOT NULL,
  `location` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `university`
--

CREATE TABLE `university` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `university`
--

INSERT INTO `university` (`id`, `name`) VALUES
(1, 'UL test'),
(2, 'TUS'),
(3, 'test new uni'),
(8, 'asdf'),
(9, 'test'),
(10, 'asdfghh'),
(11, 'sfdgy'),
(24, 'marty');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `personalInfo` int(11) NOT NULL,
  `cource` int(11) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isAdmin` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userId`, `personalInfo`, `cource`, `dateCreated`, `isAdmin`) VALUES
(1, 1, 1, '2024-04-03 18:38:31', b'0');

-- --------------------------------------------------------

--
-- Table structure for table `user_course`
--

CREATE TABLE `user_course` (
  `id` int(11) NOT NULL,
  `universityId` int(11) NOT NULL,
  `couceId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_course`
--

INSERT INTO `user_course` (`id`, `universityId`, `couceId`) VALUES
(1, 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ban_list`
--
ALTER TABLE `ban_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ban_list_user_userId_fk` (`userId`);

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `table_name_user_userId_fk` (`userId`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cource___fk` (`universityId`);

--
-- Indexes for table `credentials`
--
ALTER TABLE `credentials`
  ADD PRIMARY KEY (`mail`),
  ADD UNIQUE KEY `credentials_pk` (`userId`),
  ADD UNIQUE KEY `credentials_pk_2` (`username`);

--
-- Indexes for table `dislikes`
--
ALTER TABLE `dislikes`
  ADD KEY `dislikes_user_userId_fk` (`userId`),
  ADD KEY `dislikes_user_userId_fk_2` (`recomendedUserId`);

--
-- Indexes for table `interest`
--
ALTER TABLE `interest`
  ADD PRIMARY KEY (`id`),
  ADD KEY `interest_interest_type_id_fk` (`interestTypeId`);

--
-- Indexes for table `interest_type`
--
ALTER TABLE `interest_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD KEY `likes_user_userId_fk` (`userId`),
  ADD KEY `likes_user_userId_fk_2` (`recomendedUserId`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `messages_chats_id_fk` (`chatId`),
  ADD KEY `messages_user_userId_fk` (`from`),
  ADD KEY `messages_user_userId_fk_2` (`to`);

--
-- Indexes for table `personalinfo`
--
ALTER TABLE `personalinfo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_interest`
--
ALTER TABLE `personal_interest`
  ADD KEY `personal_interest_interest_id_fk` (`interestId`),
  ADD KEY `personal_interest_user_userId_fk` (`userId`);

--
-- Indexes for table `reaction_type`
--
ALTER TABLE `reaction_type`
  ADD PRIMARY KEY (`reactionTypeId`);

--
-- Indexes for table `university`
--
ALTER TABLE `university`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `user_usercourse_id_fk` (`cource`),
  ADD KEY `user_table_name_id_fk` (`personalInfo`);

--
-- Indexes for table `user_course`
--
ALTER TABLE `user_course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userCourse_university_id_fk` (`universityId`),
  ADD KEY `userCourse_cource_id_fk` (`couceId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ban_list`
--
ALTER TABLE `ban_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `interest`
--
ALTER TABLE `interest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `interest_type`
--
ALTER TABLE `interest_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personalinfo`
--
ALTER TABLE `personalinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `university`
--
ALTER TABLE `university`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_course`
--
ALTER TABLE `user_course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ban_list`
--
ALTER TABLE `ban_list`
  ADD CONSTRAINT `ban_list_user_userId_fk` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `table_name_user_userId_fk` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON UPDATE CASCADE;

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `cource___fk` FOREIGN KEY (`universityId`) REFERENCES `university` (`id`);

--
-- Constraints for table `credentials`
--
ALTER TABLE `credentials`
  ADD CONSTRAINT `credentials_user_userId_fk` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`);

--
-- Constraints for table `dislikes`
--
ALTER TABLE `dislikes`
  ADD CONSTRAINT `dislikes_user_userId_fk` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dislikes_user_userId_fk_2` FOREIGN KEY (`recomendedUserId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `interest`
--
ALTER TABLE `interest`
  ADD CONSTRAINT `interest_interest_type_id_fk` FOREIGN KEY (`interestTypeId`) REFERENCES `interest_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_user_userId_fk` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_user_userId_fk_2` FOREIGN KEY (`recomendedUserId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_chats_id_fk` FOREIGN KEY (`chatId`) REFERENCES `chats` (`id`),
  ADD CONSTRAINT `messages_user_userId_fk` FOREIGN KEY (`from`) REFERENCES `user` (`userId`),
  ADD CONSTRAINT `messages_user_userId_fk_2` FOREIGN KEY (`to`) REFERENCES `user` (`userId`);

--
-- Constraints for table `personal_interest`
--
ALTER TABLE `personal_interest`
  ADD CONSTRAINT `personal_interest_interest_id_fk` FOREIGN KEY (`interestId`) REFERENCES `interest` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `personal_interest_user_userId_fk` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_table_name_id_fk` FOREIGN KEY (`personalInfo`) REFERENCES `personalinfo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_usercourse_id_fk` FOREIGN KEY (`cource`) REFERENCES `user_course` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_course`
--
ALTER TABLE `user_course`
  ADD CONSTRAINT `userCourse_cource_id_fk` FOREIGN KEY (`couceId`) REFERENCES `course` (`id`),
  ADD CONSTRAINT `userCourse_university_id_fk` FOREIGN KEY (`universityId`) REFERENCES `university` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
