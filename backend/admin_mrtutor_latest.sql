-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 26, 2023 at 04:29 AM
-- Server version: 10.5.22-MariaDB
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `admin_mrtutor`
--

-- --------------------------------------------------------

--
-- Table structure for table `app_user`
--

CREATE TABLE `app_user` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `role` tinyint(4) NOT NULL DEFAULT 1 COMMENT '1 - STUDENT\r\n2 - TEACHER\r\n3 - ADMIN',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_active` tinyint(4) NOT NULL DEFAULT 1,
  `has_profile` tinyint(4) NOT NULL DEFAULT 0,
  `password` varchar(255) NOT NULL,
  `highest_qualification` varchar(225) DEFAULT NULL,
  `experience` varchar(225) DEFAULT NULL,
  `board` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='app all users';

--
-- Dumping data for table `app_user`
--

INSERT INTO `app_user` (`id`, `name`, `email`, `mobile`, `address`, `role`, `created_at`, `is_active`, `has_profile`, `password`, `highest_qualification`, `experience`, `board`) VALUES
('23423-dfgfdg-456fgdf-dfg', 'Super Admin', 'admin@gmail.com', '1234567890', 'Delhi', 3, '2023-04-15 13:45:52', 1, 0, 'test123', NULL, NULL, NULL),
('Aa7yXdqZksXXgde8rha9-bPvAOCdhChqdVn8pISJW-7Zu8DcvwxWUYXv8CA7tk-HJGQ0VCf3WXC5lKup4dF', 'Anisha ', 'christyanisha@gmail.com', '7987100207', 'noida', 1, '2023-07-03 07:20:55', 1, 0, 'Anisha@121', NULL, NULL, NULL),
('Dvu8svUu7nkat7Isim8X-ExpOt68MsAC2hzsGsAdP-BJ0ADOrZ1VGD7hABgiWA-73f9OMHTnDd5mCBh3Use', 'Subharun Mondal', 'Subharun@121', '9971319819', 'Noida', 1, '2023-07-11 14:29:19', 1, 1, 'Raunak@121', NULL, NULL, NULL),
('Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 'Arindam Mondal', 'arindam@gmail.com', '9756352016', 'Delhi', 2, '2023-04-15 08:20:03', 1, 0, 'test123', 'MSC', NULL, 'sadsad9asdsa9d7sa6dsadsad'),
('IwHeIkPtYOMExzGOiK2F-aUGIZOluEes4BeUpuSVk-2lSqQ0pWQwvOqYy5pjgO-QOGEKVxbHvcMnxCueQpC', 'TM', 'tm@121', '8860559653', 'Noida', 1, '2023-07-11 14:02:58', 1, 1, 'TM@121', NULL, NULL, NULL),
('R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 'Anika Christy', 'christyanika@gmail.com', '8827368478', 'bhopal, MP', 2, '2023-07-03 07:43:28', 1, 0, 'Anika@121', 'MA', NULL, 'sadsad9asdsa9d7sa6dsadsad'),
('wipqWHU1VO2Tz4Vjj46r-e6EmVcDgiUA0cAIKChg5-JOPnY8lPvMJKEaMz3cSH-fHODExoMAG6gHirXs8ja', 'Adriti Nandi', 'adriti@121', '9654627488', 'Faridabad', 1, '2023-07-03 07:30:07', 1, 1, 'Adriti@121', NULL, NULL, NULL),
('WVUfwxzuPsPT8SkrdEJi-2OzYOtOOQrTmZawAtxVO-lDW96OlY2VM6IH233VFi-Ze7D3X5ZDl6tEe0QGqaE', 'Mayank Dobriyal', 'mayankdobriyal1920@gmail.com', '7017935899', 'Umraonagar kotdwara', 1, '2022-11-28 09:56:29', 1, 1, 'test123', NULL, NULL, NULL),
('xo5fQSsiIOhn6UZ1JaQ3-Bo8HgzUXY3oetuxpeU4d-M7fUyIF47uqzqffOECKO-JIwVtjvn01ymyw5rrg27', 'T M ', 'sdd@121', '8800929105', 'Noida', 2, '2023-08-24 16:14:39', 1, 0, 'TM@121', 'B.Tech', NULL, 'sadsad9asdsa9d7sa6dsadsad'),
('xowsbOl3hb9uhIS41Osy-lsuqMuKCOGb2TxdO4vAQ-MUQOPuv8SSS2nzeheUW5-DOtvbxkL1Hm0lSFlOaKc', 'Saunak Mondal', 'saunak@121', '9667820763', 'Delhi India', 1, '2023-08-13 14:13:33', 1, 1, 'Saunak@121', NULL, NULL, NULL),
('ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 'Tapan Mondal ', 'tapanmondal@121', '9933322024', 'West Bengal', 2, '2023-07-11 14:16:43', 1, 0, 'Tapan@121', 'M.SC', NULL, 'sadsad9asdsa9d7sa6dsadsad');

-- --------------------------------------------------------

--
-- Table structure for table `classes_rating`
--

CREATE TABLE `classes_rating` (
  `id` varchar(255) NOT NULL,
  `rating` tinyint(4) NOT NULL DEFAULT 0,
  `user_id` varchar(255) NOT NULL DEFAULT '0',
  `class_timetable_with_class_batch_assigned_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `classes_rating`
--

INSERT INTO `classes_rating` (`id`, `rating`, `user_id`, `class_timetable_with_class_batch_assigned_id`) VALUES
('2FVF1Jv1xqlM78DzAaX7-p8l8CjJdHZvfOiBU5bgv-3cSCxiK3l1MOtwozXEDc-5kvGtp111i2Z0W0QEAsH', 3, 'WVUfwxzuPsPT8SkrdEJi-2OzYOtOOQrTmZawAtxVO-lDW96OlY2VM6IH233VFi-Ze7D3X5ZDl6tEe0QGqaE', 'Vw49IDLhCppLOIRzPdmj-i6TIC5vtOpmjLwDAAv3i-erQcEvsdZTOoiKBjwwKk-vdu3TRXSvbvATPLCn6ot'),
('4jzX5oTMmczOCY9fdD0O-vcrthAlMJEJKOPgbZ16x-tHndGvrP01ZyUGC0bdwQ-Qr5KGG7OsgvxzH7e6WJR', 3, 'WVUfwxzuPsPT8SkrdEJi-2OzYOtOOQrTmZawAtxVO-lDW96OlY2VM6IH233VFi-Ze7D3X5ZDl6tEe0QGqaE', 'bkXgup8oIWSx1jwOD3z3-cDVoSua7WprxS1DefF9E-oxHpqlvUdtn7cl1ABZfi-faLw5IDO7nQOUGkIB20d'),
('A6J9U95fsOXSjMpKbsy1-Cjukf0ypnotHT5BiMEOd-Eiqxj6GHQlOf7SYXhdXC-FAGiRKhmxEcgKu41vpeV', 2, 'WVUfwxzuPsPT8SkrdEJi-2OzYOtOOQrTmZawAtxVO-lDW96OlY2VM6IH233VFi-Ze7D3X5ZDl6tEe0QGqaE', '5UTBxmbCzxUzBBIalayA-KUI7bGoRD6gxUsk34hcb-CClxWhuI4zS2S3sdZF15-gKCJZOqQKGxEPlSeJJCw'),
('ac17ORdb6ahCBQgTeavW-swXfpyDMyjK2oo6o8IxJ-O9n4ORo6Gg2f7LumWCaH-KK8lPVv1D8IGTT0ZB9GP', 0, 'Dvu8svUu7nkat7Isim8X-ExpOt68MsAC2hzsGsAdP-BJ0ADOrZ1VGD7hABgiWA-73f9OMHTnDd5mCBh3Use', 'gBlIyxIgHOTAwZ42dsew-9D4v0484OSltz0n3pcAm-C4pUXYwxgvp3RemA39BQ-M8mqHRqTJ98wul55FhhR'),
('bIe4ZDrInYr5d26tCaSd-Y2Z9Hl0XvyZBF7n7JSiO-SaqODlrqI4nfbZeTdMbM-OPcxD89IaODmsDmZBidv', 3, 'WVUfwxzuPsPT8SkrdEJi-2OzYOtOOQrTmZawAtxVO-lDW96OlY2VM6IH233VFi-Ze7D3X5ZDl6tEe0QGqaE', 'mAjR1hK91SPhxLnBXikD-j8T2J9WSTfPVhTBDIrDF-c3Clo0SzoOLZbklrfpSW-UobIJOAMH0SdeOuqdgZJ'),
('c8uukdhLw01nL2pCfYhv-pfMx2ZYWFtOOj74IFKzj-9OgrGzAcyDP0dJpGYjij-kvoqTIQ2wLZq8gEML0AV', 0, 'wipqWHU1VO2Tz4Vjj46r-e6EmVcDgiUA0cAIKChg5-JOPnY8lPvMJKEaMz3cSH-fHODExoMAG6gHirXs8ja', 'c7KXtxA5bDyxcXreZYOM-2Y38Mc0of5pHdGuMOoeu-B54jIOLtiiKjsRTkVYwU-3kzJSfAYMF9jJzCiuoOK'),
('CcuIp6pFfYeukkAzAUOA-XcogxAZ4zS6zvRoAPkv9-ZStQuuyYn0lVFIizvHIe-aYyCsuSZlEeLMeGMzLvl', 5, 'IwHeIkPtYOMExzGOiK2F-aUGIZOluEes4BeUpuSVk-2lSqQ0pWQwvOqYy5pjgO-QOGEKVxbHvcMnxCueQpC', '6TzSZMQndAdCUeT1C80o-pkyjkQjTzcKKeKarI40H-dEPTIkZoMv72naGSuSq1-LndrOBLOlEdwBfHisVD4'),
('gfbLmbcBJMZtvDnSLYlI-0X3ysOdcslGjdyOGZlSp-82GssCIK5jGfVTOeL4Ce-6RB7BvlPxnOGvnb19x8L', 0, 'Dvu8svUu7nkat7Isim8X-ExpOt68MsAC2hzsGsAdP-BJ0ADOrZ1VGD7hABgiWA-73f9OMHTnDd5mCBh3Use', 'EhQROLDnG4V9Oag8iPrX-CWnjkknQEzTI29CU79yF-og7GBAYlJUspEMMLsbac-OkCs5sLjJ3AQj7XWx5aF'),
('LT19tSxFCEcytpXmV2T2-H14df097dX1RybV6aXPf-mM93nlPYhfjg8EGkwUcf-6YkAM80FT9fFWz6gpITS', 5, 'wipqWHU1VO2Tz4Vjj46r-e6EmVcDgiUA0cAIKChg5-JOPnY8lPvMJKEaMz3cSH-fHODExoMAG6gHirXs8ja', 'AagfGmCro4HTxUZyVmwL-UTgskP0wUlLSlShQA2xS-uniJuXXig69ZqqDWJGwQ-hG23nLORWiUSF0c35OJk'),
('M6xxvEqZGD5T9oA6YIQR-SraZA4stDtn2DMyGzYmw-kzYVrCBIjOTcjllrMMMb-66uFMQQftrBkplgQx00R', 4, 'WVUfwxzuPsPT8SkrdEJi-2OzYOtOOQrTmZawAtxVO-lDW96OlY2VM6IH233VFi-Ze7D3X5ZDl6tEe0QGqaE', '3OmwfLSF2BZ7tSViH2Dg-KUR8FcIGWCwdnOGcqxf3-KRuRvaQBYgfR9rAqryyb-W8ZImwm5alH1bnM01gdp'),
('nuUlGVhROmOH08z0XBA3-4YGkCXJGGbc7LQGU2rbG-ORxGayqLdPISfTM7b9hQ-3TSwkX4DPrLIsIrkgFAP', 5, 'Dvu8svUu7nkat7Isim8X-ExpOt68MsAC2hzsGsAdP-BJ0ADOrZ1VGD7hABgiWA-73f9OMHTnDd5mCBh3Use', 'xs650cTHoz0rfDGzd7Z4-8ftoSXjPGyFJaVsF3BpO-HMHFeEJbzr8O9BCL4Suy-tgcOhSkc7MBf9W42m42W'),
('QLktJdb12DziDEksn7jL-KBMidzwP5YcGt5vBYCCC-hMwfmryYb7wvats5mVcF-ScbxtskuQ6e84SQxUb9W', 0, 'Dvu8svUu7nkat7Isim8X-ExpOt68MsAC2hzsGsAdP-BJ0ADOrZ1VGD7hABgiWA-73f9OMHTnDd5mCBh3Use', 'LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz');

-- --------------------------------------------------------

--
-- Table structure for table `class_assigned_teacher_batch`
--

CREATE TABLE `class_assigned_teacher_batch` (
  `id` varchar(255) NOT NULL,
  `teacher_id` varchar(255) NOT NULL,
  `starting_from_date` datetime DEFAULT NULL,
  `batch` tinyint(4) NOT NULL DEFAULT 0,
  `is_demo_class` tinyint(4) NOT NULL DEFAULT 0,
  `subject_id` varchar(255) NOT NULL,
  `school_board` varchar(50) NOT NULL,
  `student_class` int(11) NOT NULL,
  `class_end_time` datetime DEFAULT NULL,
  `class_batch_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `class_assigned_teacher_batch`
--

INSERT INTO `class_assigned_teacher_batch` (`id`, `teacher_id`, `starting_from_date`, `batch`, `is_demo_class`, `subject_id`, `school_board`, `student_class`, `class_end_time`, `class_batch_name`) VALUES
('05rX4PgIRDnjtp9UTqnu-1teOq7QGVjDgl1hUswDu-71mYqpEeIuHFwXa5WvJB-4XrnrJFmkfsFiFX7R7E1', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', '1970-01-01 05:30:00', 2, 0, 'adas34yru567rtyr', 'sadsad9asdsa9d7sa6dsadsad', 10, NULL, 'fghhjgkj'),
('10skkeaGIMYpBLOBeCZq-oYWUDyskmjO1Fxs5R7Ef-uI4TTBuOEabCI1LKrDjK-mUlGQtTsxVe7xIMC328d', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', '1970-01-01 05:30:00', 1, 0, 'sad9rewer-sdff', 'sadsad9asdsa9d7sa6dsadsad', 9, NULL, 'Raunak\'s Science'),
('17KuzIHrrOiYJIliiZ33-83ywpBK9Xy2OvwB8bkmh-3uK5o1UKAzToq15OFrEc-uXtlkOqzgjsO6Zb48emw', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', '2023-07-11 19:34:00', 2, 1, 'dfs3424sdfsfsdf', 'sadsad9asdsa9d7sa6dsadsad', 10, '2023-07-11 19:48:03', ''),
('1IdlJAXoKdZeJj1LucST-UjsuDZ0gsq0r2rvO6Eh7-gMeWB9yFS1oMSLMnJ4MZ-d99pjyOEfIQfQSIv2ETP', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', NULL, 2, 0, 'asdsad9asdsad9asdsad', 'sadsad9asdsa9d7sa6dsadsad', 10, NULL, 'ARINDAM MATH BATCH 1'),
('3quJ1HAXtbESm98k44TX-DZlJvA1u3Wb3XM3hOeSn-qSqeUwS8rc7T2V1H6DWv-5VAus5nvbpePn6W27aBk', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', '1970-01-01 05:30:00', 1, 0, 'sad9rewer-sdff', 'sadsad9asdsa9d7sa6dsadsad', 9, NULL, 'Raunak Science'),
('54ZHbHr66Vqgd32vT5W9-YWOwZ6ncasECB2ygASBC-tnnuQ22xllqWOZl2pEIv-jC9OKYYKgAr5mQ4J5ujY', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', '2023-07-11 19:50:00', 1, 1, 'asdsad9asdsad9asdsad', 'sadsad9asdsa9d7sa6dsadsad', 7, NULL, 'fdsvdf'),
('5EuPt2u0ZgXOxAResxKG-Y8vFHOmEQnsvACKcvbce-D2rV3iCe9LlGdoydoELj-kDqb2xWhxhpqDtxvL1hF', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', '1970-01-01 05:30:00', 1, 0, 'sad9rewer-sdff', 'sadsad9asdsa9d7sa6dsadsad', 9, NULL, 'Raunak\'s Science'),
('5OojCFwdpXwM5e4KCVi3-LB7OzxqMvYbS89BejPYr-SdSKoZOwsFdZVGOyKu97-i2q8eh23fVRtWHZEzDTX', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', NULL, 2, 0, 'sad9rewer-sdff', 'sadsad9asdsa9d7sa6dsadsad', 10, NULL, 'ARINDAM SCIENCE BATCH'),
('aBxPV7AqOBtOvUBEuXTy-POEYRQTaO6gUUQQD7jzh-KAKYadzOpxO8rLymz5ek-cMlMoCxLoO8qxcgUY39E', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', '1970-01-01 05:30:00', 1, 0, 'asdsad9asdsad9asdsad', 'sadsad9asdsa9d7sa6dsadsad', 8, NULL, 'Saunak Maths'),
('aFbA3mLjBlC1MhOEwdvw-RcI5e9VJKVwVqXvUw1ul-MhybE8U8Z0mOSGEVR9wZ-GXhU50kBzXxEdATuboQt', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', '1970-01-01 05:30:00', 2, 0, '453-45gd', 'sadsad9asdsa9d7sa6dsadsad', 10, NULL, 'New class batch'),
('BETzLxnsGTzKDfJO7pYP-3kk83YBZpxd0UGbpaJG6-4WFC0O8cnYznKKAFu0mm-tWL1TMXcQwXUEJnQwQnZ', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', NULL, 2, 0, 'asdsad9asdsad9asdsad', 'sadsad9asdsa9d7sa6dsadsad', 10, NULL, 'Arindam Math batch 122121'),
('bkXgup8oIWSx1jwOD3z3-cDVoSua7WprxS1DefF9E-oxHpqlvUdtn7cl1ABZfi-faLw5IDO7nQOUGkIB20d', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', '2023-04-15 13:56:00', 2, 1, '453-45gd', 'sadsad9asdsa9d7sa6dsadsad', 10, NULL, NULL),
('cpJ6avA7wKtOcBAoo29K-GgtMhF8JrdhoVknbGdpp-iey8O9OnH0UZj3KCzOlo-xasIO6vx6xAYCA4Tiii9', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', '1970-01-01 05:30:00', 1, 0, 'sad9rewer-sdff', 'sadsad9asdsa9d7sa6dsadsad', 9, NULL, 'Raunak Science'),
('CYv50q3Wjdrhb7c65TOh-qjRwibcpOPfyIKPzmsHm-STxIjkKKnqhEHMQC5aVq-EgLGkLqIHq8BLi8IrfSb', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', NULL, 2, 0, 'adas34yru567rtyr', 'sadsad9asdsa9d7sa6dsadsad', 10, NULL, 'ARINDAM COMPUTER BATCH'),
('dggwidLi37WKES9qgKbS-9wVZk4ZDAm2cBcOm86x3-nPmtM5239iVnX47lw0qR-WgXRpQQoRQCOCv5VwG6e', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', '2023-04-15 13:56:00', 2, 1, 'sad2345terwfsdf', 'sadsad9asdsa9d7sa6dsadsad', 10, NULL, NULL),
('GAaIX1QLOmc3k66ntwsu-2VYbgWWHSH23tMUuhXpA-fo7O933d3XTPrmepsO7j-zKJxhH6kJudZ8XUyK5OK', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', '2023-08-13 19:45:00', 1, 1, 'asdsad9asdsad9asdsad', 'sadsad9asdsa9d7sa6dsadsad', 8, '2023-08-13 19:48:18', 'Saunak'),
('gjYHZB8PEelETkFzugoo-JqmdHTGTXtbYr6EPc9sJ-2C5X7k74PtcLwbPOV1E3-L9SobCzZUWkiDKsdqWik', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', '1970-01-01 05:30:00', 1, 0, 'sad9rewer-sdff', 'sadsad9asdsa9d7sa6dsadsad', 9, NULL, 'Raunak\'s Science'),
('GTVq1nMExA8tz2jJUP2v-e2tLWi9hlUMmvy9ZIu1D-tHh80sl45oWOrj0XwGzE-KQ4r6HorO0ial9UA3MFV', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', '1970-01-01 05:30:00', 2, 0, '453-45gd', 'sadsad9asdsa9d7sa6dsadsad', 10, NULL, 'new class'),
('H9AFTIcutdfVIcPZWdME-TkrZpntUd3ghB2U76iWL-rxeYhrDOeJIx6zwtBhX9-V1jqg7K5G5Zw78ZdwfHV', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', '1970-01-01 05:30:00', 1, 0, 'asdsad9asdsad9asdsad', 'sadsad9asdsa9d7sa6dsadsad', 6, NULL, 'ADRITI MATHS CLASS'),
('hXhX85uipnq17fao3cOS-ksM3ncrK5DLF77zKBizI-k1hq0JpFO8Ze8IiaxAi0-43L5yf7HBxhHH23D0Xxp', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', '1970-01-01 05:30:00', 1, 0, 'sad9rewer-sdff', 'sadsad9asdsa9d7sa6dsadsad', 9, NULL, 'Raunak\'s Science Class'),
('jJH1Kc24oxzhRpiOpu8a-1JrfJaMHEi8lV7stDwyl-iH9UcwXGxGD6Y2FUyJZO-KAOiZdV21ZAFefdg7tL5', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', '1970-01-01 05:30:00', 1, 0, 'asdsad9asdsad9asdsad', 'sadsad9asdsa9d7sa6dsadsad', 6, NULL, 'Adriti\'s Mathematics'),
('jWObklB253zLEBuhY9ei-gQDbyAQxKLPLXDpYF3It-2yb1tPnEIZ3zvUqAo9sX-XcBxg6XItQzSZ5TEATu8', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', '2023-04-15 13:56:00', 2, 1, 'sad9rewer-sdff', 'sadsad9asdsa9d7sa6dsadsad', 10, '2023-04-16 11:53:58', NULL),
('kpWMdAZ2EieMkaG6HlVc-zKBRVcEgyHXxBfDUCyHs-GkoGH6ULrVq7YFROXUo9-ALku13OlztErslMYV6S3', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', '1970-01-01 05:30:00', 2, 0, 'asdsad9asdsad9asdsad', 'sadsad9asdsa9d7sa6dsadsad', 10, NULL, 'news ss'),
('lC1vrxmSggWglwkIIQP8-AcwpQRuEc1zrqGa5zLuh-fpQ3CWrb4pfO2wqLi2Io-OC5a7p13OHaKcFu8vtHz', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', '2023-04-15 13:56:00', 2, 1, 'adas34yru567rtyr', 'sadsad9asdsa9d7sa6dsadsad', 10, '2023-04-16 11:59:16', NULL),
('mqtTbpUg0w43e6290p3z-czKbtVYkgJgjlGof4btO-qAHeAUk7kfQbmWoHjS8e-t4ESrZa6CPD9ux3MubE9', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', NULL, 2, 0, '34rwergdjghdjk', 'sadsad9asdsa9d7sa6dsadsad', 10, NULL, 'ARINDAM ENGLISH BATCH'),
('muVpLc2uqsr4US1gXr8R-r2avcrMrIdEk8SadseKr-Av8iI5lEzr1V2SuEyB1i-50OxDhe61sGXFdX4AROw', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', '1970-01-01 05:30:00', 1, 0, 'asdsad9asdsad9asdsad', 'sadsad9asdsa9d7sa6dsadsad', 6, NULL, 'Adriti Mathematics'),
('my887dJ71THLgHyTGEiW-g0aLI7lfLtYpK59vZznW-QIujdTCMdhR7q6EngmKa-YGSxQY6bJ4Au7nvYiFvs', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', '2023-07-11 20:02:00', 1, 1, 'sad9rewer-sdff', 'sadsad9asdsa9d7sa6dsadsad', 9, '2023-07-11 20:04:01', ''),
('nqaGuSKgkypnFbioGcr1-oqxhPJc8QwP2e7FHTcbc-RSBbFRhRt09W1ehZth05-ApT3iYce8VJCBG80IeKd', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', '2023-07-03 16:00:00', 1, 1, 'asdsad9asdsad9asdsad', 'sadsad9asdsa9d7sa6dsadsad', 6, '2023-07-03 17:05:16', 'Adriti'),
('oBDx1F6IqPSv1j4K1xA8-hyVjdjclSpkqAxBacqC7-cMGHXlUCs90hnAiOYoDI-l2v6ZpwB9U96FkGru2rA', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', NULL, 2, 0, 'asdsad9asdsad9asdsad', 'sadsad9asdsa9d7sa6dsadsad', 10, NULL, 'Arindam math ne batch'),
('ODO4stVRJCKXCp3rXHoC-pLTKB6W0Frd32WJoL9Bd-nrCnO8REM7Q8xCl33gso-OxEeGqolfRmSUw6Vi3rd', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', NULL, 2, 0, 'asdsad9asdsad9asdsad', 'sadsad9asdsa9d7sa6dsadsad', 10, NULL, 'New teacher batch math'),
('OKOf87kHIWYRkV1O5SnC-pqbfECIUsZSJcTMd3ebF-BH1eo8hDtCs6OVzOe2eL-JAtBCAsQhqK8k0uGJCfO', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', '2023-04-15 13:56:00', 2, 1, 'dsad4364yryhdfg', 'sadsad9asdsa9d7sa6dsadsad', 10, NULL, NULL),
('pfgvh9JaVxVOz8Y92OVd-o6OrGzc1rtgxVJikfcSM-kRlm4rclyPD4sHbmmUdo-lucsMqKOq5WwhxptHSid', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', '1970-01-01 05:30:00', 2, 0, '453-45gd', 'sadsad9asdsa9d7sa6dsadsad', 10, NULL, 'New class'),
('SFi3ubLhdAcpeVR7rkRD-OR3jlnwaPGSwbVjI8gZR-kDw4MOFiD7QD3lbhOBOj-qStBS1PEH011ggwvD7us', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', '1970-01-01 05:30:00', 1, 0, 'asdsad9asdsad9asdsad', 'sadsad9asdsa9d7sa6dsadsad', 6, NULL, 'Adriti\'s Maths'),
('Sl9tf1xs9SYqMbxlQV4n-nQE4VzjoM85fh0aRHPko-1ManCE8xpK4vssFhtHSp-7lWprSSM9vJJUrzrk7cY', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', '2023-07-11 19:47:00', 1, 1, 'sad9rewer-sdff', 'sadsad9asdsa9d7sa6dsadsad', 7, '2023-07-11 19:50:37', ''),
('Tzj9pVhFPs8cs4pbnKvk-OCSG7PWA9njf61h2GtOD-kVVMh3cpOOLXHUcLoAHo-nxoHz3dfzJ8JPEFOFrzA', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', '1970-01-01 05:30:00', 1, 0, 'sad9rewer-sdff', 'sadsad9asdsa9d7sa6dsadsad', 7, NULL, 'jkhk'),
('Ud4OJxMOrgvqEZJfRFrF-GZV7WatOKHFOqanT6i7V-s7WGvmOvRkacmdv3lUbJ-969cjXO6npeOOFPMZ2Hz', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', '2023-04-15 13:56:00', 2, 1, '324gedfsdafsdf', 'sadsad9asdsa9d7sa6dsadsad', 10, NULL, NULL),
('ueqUwOE4Hv4hSFFOZUjO-WXvXCgUiZQKnz5Mg1gXA-UI14G50LERCGko7x91ei-vDUJjWfkWIQsREcqvRwb', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', '1970-01-01 05:30:00', 2, 0, '453-45gd', 'sadsad9asdsa9d7sa6dsadsad', 10, NULL, 'New batch civics'),
('VaviDQhottXl6BLBrBml-OmM1QdqeaVqJwKqlcXEv-JtRc61gxos4bsy0jKdV4-SQh5YzAUSaHgFr4o2RSx', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', '2023-04-15 13:56:00', 2, 1, '34-ad-sadsad-sadasd', 'sadsad9asdsa9d7sa6dsadsad', 10, NULL, NULL),
('Vw49IDLhCppLOIRzPdmj-i6TIC5vtOpmjLwDAAv3i-erQcEvsdZTOoiKBjwwKk-vdu3TRXSvbvATPLCn6ot', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', '2023-04-15 13:56:00', 2, 1, 'asdsad9asdsad9asdsad', 'sadsad9asdsa9d7sa6dsadsad', 10, NULL, NULL),
('WaMPaQu2Sc6IsGS4OisG-45iegckvDDW8rOVyxo8a-x2YpzYaICO20Qo0anOjQ-ULo9Trb3kQfBxLJ5BDks', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', '1970-01-01 05:30:00', 1, 0, 'sad9rewer-sdff', 'sadsad9asdsa9d7sa6dsadsad', 9, NULL, 'Raunak\'s Science'),
('xGW1sZBmI56lWC8cUTnD-b4tUOQVkc90QBFiO9sBH-TRgTnWEVvyKThlGtsQyo-SYvWjrOrbTL9dZeTanwZ', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', '2023-04-15 13:56:00', 2, 1, '34rwergdjghdjk', 'sadsad9asdsa9d7sa6dsadsad', 10, '2023-04-16 11:55:56', NULL),
('xJWzMJiEVnzKDcTE1MAX-h64FTw0YhAp4aPdU345P-PlszHptD4ws0gl2GQ7lW-rq93OewUxGUW9Pnqd6vV', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', '2000-02-01 00:00:00', 2, 1, 'sadsad342rsfsdf', 'sadsad9asdsa9d7sa6dsadsad', 10, NULL, NULL),
('yZ8BsORImY5ke7qQ8poz-L8p8J5qvpmYcvkkp4vRI-FyM1Y3Jb9SSZPU2STt0n-dGG41ndX7iU6X326WXyU', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', '2023-04-15 13:56:00', 2, 1, 'sadsad-asdasd-adasd', 'sadsad9asdsa9d7sa6dsadsad', 10, NULL, NULL),
('ZKQMsjIJ1ra7Cdj8g4QQ-8420GGVDIWSkAcavDiQv-roBsGKKc2CuG7OJ6rHUP-mxvkvirHxLvbPiCcFB0a', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', '1970-01-01 05:30:00', 1, 0, 'asdsad9asdsad9asdsad', 'sadsad9asdsa9d7sa6dsadsad', 6, NULL, 'Mathematics');

-- --------------------------------------------------------

--
-- Table structure for table `class_call_recording`
--

CREATE TABLE `class_call_recording` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `class_timetable_with_class_batch_assigned_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `class_call_recording`
--

INSERT INTO `class_call_recording` (`id`, `name`, `created_at`, `class_timetable_with_class_batch_assigned_id`) VALUES
('7YWqh7ChCknyyPvdpAAA-q0QYxswD1ciRSSSrdmRM-pJ5Emc4v93gYJsMgbiEb-lmUMwY57YyX0JqDQ5eOc', 'RecordingVideo_new_12322_1688112346345.webm', '2023-06-30 08:05:46', 'mAjR1hK91SPhxLnBXikD-j8T2J9WSTfPVhTBDIrDF-c3Clo0SzoOLZbklrfpSW-UobIJOAMH0SdeOuqdgZJ'),
('bBFRGCw8X6XiPfP2f23a-kLLiI4J5C5dlXWdSB5CB-zJ2JOeemLBkIThhWV8ra-IIbKFIjJ9z48abP57UkD', 'RecordingVideo_1681551645618.webm', '2023-04-15 09:40:46', 'Vw49IDLhCppLOIRzPdmj-i6TIC5vtOpmjLwDAAv3i-erQcEvsdZTOoiKBjwwKk-vdu3TRXSvbvATPLCn6ot'),
('H9AJ1ClTLD46qmHo6Mdo-CCOSzxpTqgP9ZuK5vvSX-qOueZQIb94XWKGIeLdBe-XICQO4acwlcnYiPdpRCx', 'RecordingVideo_new_12322_1688963492313.webm', '2023-07-10 04:31:32', 'X823E3PsRuGIeod8s1Oj-OGowrOUjdqIKwOibjEW2-mnmz71BcXgVbpxhxO0ip-VMkFyOVWIrWZtyv7Lcci'),
('T4xzn8OwsdXgHRJRIgcE-9wg8XRwOul4OPoGhgxYK-ODtGZXFbOBuchXDl4uSh-ol0QWpkKfMphbBZZ6O9n', 'RecordingVideo_1681547427902.webm', '2023-04-15 08:30:28', 'bkXgup8oIWSx1jwOD3z3-cDVoSua7WprxS1DefF9E-oxHpqlvUdtn7cl1ABZfi-faLw5IDO7nQOUGkIB20d');

-- --------------------------------------------------------

--
-- Table structure for table `class_timetable_with_class_batch_assigned`
--

CREATE TABLE `class_timetable_with_class_batch_assigned` (
  `id` varchar(255) NOT NULL,
  `start_from_date_time` datetime NOT NULL,
  `class_end_date_time` datetime DEFAULT NULL,
  `class_assigned_teacher_batch_id` varchar(255) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='class timetable with batch';

--
-- Dumping data for table `class_timetable_with_class_batch_assigned`
--

INSERT INTO `class_timetable_with_class_batch_assigned` (`id`, `start_from_date_time`, `class_end_date_time`, `class_assigned_teacher_batch_id`, `created_at`) VALUES
('1xaVLGUdXu3O9HWCQb5S-32GpLLsnucmq36JfyTcf-vlEgLPiuP2KXZWzSVt6U-dytT3KhlRssyPj1GtOxI', '2023-08-01 16:00:00', NULL, 'jJH1Kc24oxzhRpiOpu8a-1JrfJaMHEi8lV7stDwyl-iH9UcwXGxGD6Y2FUyJZO-KAOiZdV21ZAFefdg7tL5', '2023-07-31 12:24:38'),
('22Q5OpxyBYrHFfXrAKhT-gQLMqUgVppWWlOzUHOW5-jAaE8sxMqdQx1SGBUrWf-QOpZWeGuf7IrbPr5ODCX', '2023-07-22 21:00:00', NULL, 'gjYHZB8PEelETkFzugoo-JqmdHTGTXtbYr6EPc9sJ-2C5X7k74PtcLwbPOV1E3-L9SobCzZUWkiDKsdqWik', '2023-07-18 09:58:29'),
('2hYe6q9pw3lrmm4Au7WO-S3s2hmFF6jWtnAuMYKVb-CYgCc7REqgD4mPjqoyKd-Fk9XFr7OPFtX0ykp05cg', '2023-04-21 11:11:00', NULL, 'ODO4stVRJCKXCp3rXHoC-pLTKB6W0Frd32WJoL9Bd-nrCnO8REM7Q8xCl33gso-OxEeGqolfRmSUw6Vi3rd', '2023-04-17 05:30:44'),
('2O2e0oTn28B6piIREc62-08xDozAvXDCvJbUsXd5T-UcGsimeSLBt72QrOjj8l-6OeVIc56y96Epld4ypAX', '2023-08-04 16:00:00', '2023-08-04 16:17:19', 'jJH1Kc24oxzhRpiOpu8a-1JrfJaMHEi8lV7stDwyl-iH9UcwXGxGD6Y2FUyJZO-KAOiZdV21ZAFefdg7tL5', '2023-07-31 12:24:38'),
('3heBxjrGpDLWCc0XHnCk-HgF6OSs4VA9ZdsynLk3s-4Mqyyn4lw5gRETCbyxFH-yQrE8S23w2WTGFMalD2s', '2023-07-24 11:01:00', NULL, 'ueqUwOE4Hv4hSFFOZUjO-WXvXCgUiZQKnz5Mg1gXA-UI14G50LERCGko7x91ei-vDUJjWfkWIQsREcqvRwb', '2023-07-24 05:16:53'),
('3OmwfLSF2BZ7tSViH2Dg-KUR8FcIGWCwdnOGcqxf3-KRuRvaQBYgfR9rAqryyb-W8ZImwm5alH1bnM01gdp', '2023-08-18 11:11:00', '2023-08-18 21:37:22', 'aFbA3mLjBlC1MhOEwdvw-RcI5e9VJKVwVqXvUw1ul-MhybE8U8Z0mOSGEVR9wZ-GXhU50kBzXxEdATuboQt', '2023-08-18 16:04:45'),
('3Vk9YqZK0AaO0VsOgIlh-GYEg6oZaZrLy1rjEyrwY-7b1WCE1BShJ112Xqdlpw-q8aZeOEHB3ADm9ghezXQ', '2023-07-14 11:21:00', NULL, '05rX4PgIRDnjtp9UTqnu-1teOq7QGVjDgl1hUswDu-71mYqpEeIuHFwXa5WvJB-4XrnrJFmkfsFiFX7R7E1', '2023-07-10 04:16:44'),
('5A3qmJ6tgWOjibWUXBfK-zdLitakyaPoeAocQuTbH-TB3YX7qA0E7bMi12oO4g-abvBYuQRbtjpbSwwcwML', '2023-07-08 16:00:00', NULL, 'H9AFTIcutdfVIcPZWdME-TkrZpntUd3ghB2U76iWL-rxeYhrDOeJIx6zwtBhX9-V1jqg7K5G5Zw78ZdwfHV', '2023-07-07 07:02:22'),
('5rtV6KjQ0ZcbC9JfPOWD-YU5Gq89ftt9tKmIoAxiI-XfdgpxCI6xfkyUeY3hue-TvrDuxXToowJiDpv9O0M', '2023-07-26 11:01:00', NULL, 'ueqUwOE4Hv4hSFFOZUjO-WXvXCgUiZQKnz5Mg1gXA-UI14G50LERCGko7x91ei-vDUJjWfkWIQsREcqvRwb', '2023-07-24 05:16:53'),
('5UTBxmbCzxUzBBIalayA-KUI7bGoRD6gxUsk34hcb-CClxWhuI4zS2S3sdZF15-gKCJZOqQKGxEPlSeJJCw', '2023-04-16 11:11:00', '2023-04-16 13:26:19', 'BETzLxnsGTzKDfJO7pYP-3kk83YBZpxd0UGbpaJG6-4WFC0O8cnYznKKAFu0mm-tWL1TMXcQwXUEJnQwQnZ', '2023-04-16 06:44:07'),
('6TzSZMQndAdCUeT1C80o-pkyjkQjTzcKKeKarI40H-dEPTIkZoMv72naGSuSq1-LndrOBLOlEdwBfHisVD4', '2023-07-11 19:52:00', '2023-07-11 19:57:52', 'Tzj9pVhFPs8cs4pbnKvk-OCSG7PWA9njf61h2GtOD-kVVMh3cpOOLXHUcLoAHo-nxoHz3dfzJ8JPEFOFrzA', '2023-07-11 14:21:27'),
('8BdFePrcxKKnTnoJgpb8-bP0Psx2wOJcYnLcCHnnu-OngUYgCiarSmRtt00Mh9-QRuzWhOXtGyFAtzaqUVT', '2023-08-01 11:11:00', NULL, 'kpWMdAZ2EieMkaG6HlVc-zKBRVcEgyHXxBfDUCyHs-GkoGH6ULrVq7YFROXUo9-ALku13OlztErslMYV6S3', '2023-08-03 16:25:56'),
('8MyESaTKE97XAk4V6aIY-VVeLH8QZ5PHom4Pmwbfh-7EegdZ6pLPE24ZH3CcTG-O5S7Z3VQ3spoihc01YK7', '2023-08-05 11:01:00', NULL, 'kpWMdAZ2EieMkaG6HlVc-zKBRVcEgyHXxBfDUCyHs-GkoGH6ULrVq7YFROXUo9-ALku13OlztErslMYV6S3', '2023-08-03 16:25:56'),
('AagfGmCro4HTxUZyVmwL-UTgskP0wUlLSlShQA2xS-uniJuXXig69ZqqDWJGwQ-hG23nLORWiUSF0c35OJk', '2023-08-07 16:30:00', NULL, 'ZKQMsjIJ1ra7Cdj8g4QQ-8420GGVDIWSkAcavDiQv-roBsGKKc2CuG7OJ6rHUP-mxvkvirHxLvbPiCcFB0a', '2023-08-07 10:15:42'),
('AfIB7mZoueYYXzwjEEcn-u7toPqnTtpmJZfHrtZJS-GsrOYM2c2JWuZA1R5IuB-Jl3w92O0mrJnf2w5y5bD', '2023-04-16 11:11:00', NULL, 'CYv50q3Wjdrhb7c65TOh-qjRwibcpOPfyIKPzmsHm-STxIjkKKnqhEHMQC5aVq-EgLGkLqIHq8BLi8IrfSb', '2023-04-16 06:46:20'),
('AOjMP3LKyi8OeYwwUE79-sUlUBJ8EYpb3GMF4Dzgk-15L40HOQjOK8hxn4o691-wxdHFyLiu2yqnm0IXKvO', '2023-07-25 11:01:00', NULL, 'ueqUwOE4Hv4hSFFOZUjO-WXvXCgUiZQKnz5Mg1gXA-UI14G50LERCGko7x91ei-vDUJjWfkWIQsREcqvRwb', '2023-07-24 05:16:53'),
('bGrrXdsJ4bLoTvSG6RWm-gaHBFWkBkOB2CtEaML5a-oqMTPh9DPzlCniTDOZ85-OnERZgUWnVmR4uuz57YA', '2023-07-11 08:00:00', NULL, '05rX4PgIRDnjtp9UTqnu-1teOq7QGVjDgl1hUswDu-71mYqpEeIuHFwXa5WvJB-4XrnrJFmkfsFiFX7R7E1', '2023-07-10 04:16:44'),
('bq7A9I4nHmlnXovOBvhv-SYPETaBvdQY8KEHbYPtn-lQTXmz8lHhmarh8FGRUI-2Xk2h7bk68W4oUeYdSjd', '2023-08-24 20:00:00', '2023-08-24 21:37:11', '3quJ1HAXtbESm98k44TX-DZlJvA1u3Wb3XM3hOeSn-qSqeUwS8rc7T2V1H6DWv-5VAus5nvbpePn6W27aBk', '2023-08-22 06:02:11'),
('bxxYFlGVMqFQkIbroFVi-HhxksmgiGq8QEH0OjtCW-5hKHuubb35Um6bq8RWAo-5dqwMBVnph9GxxPycjdn', '2023-08-19 11:01:00', NULL, 'aFbA3mLjBlC1MhOEwdvw-RcI5e9VJKVwVqXvUw1ul-MhybE8U8Z0mOSGEVR9wZ-GXhU50kBzXxEdATuboQt', '2023-08-18 16:04:45'),
('c7KXtxA5bDyxcXreZYOM-2Y38Mc0of5pHdGuMOoeu-B54jIOLtiiKjsRTkVYwU-3kzJSfAYMF9jJzCiuoOK', '2023-07-09 22:00:00', '2023-07-09 22:01:45', 'SFi3ubLhdAcpeVR7rkRD-OR3jlnwaPGSwbVjI8gZR-kDw4MOFiD7QD3lbhOBOj-qStBS1PEH011ggwvD7us', '2023-07-09 16:09:26'),
('cgj0iPicfFerxDOFdEO4-yclA9tnrgEtwkcLeBGB3-Il910Q7MtWQJZQ58F3KI-Uwc8ZJmPZYDY06uYokL0', '2023-07-30 11:01:00', NULL, 'kpWMdAZ2EieMkaG6HlVc-zKBRVcEgyHXxBfDUCyHs-GkoGH6ULrVq7YFROXUo9-ALku13OlztErslMYV6S3', '2023-08-03 16:25:56'),
('digDQfQWu0SOZOAO1dOa-zwbJFdSyfFMAJ9Vk01CU-g9Q4ezPF4iO1CavxOJrZ-JpMHCTZXUUftBIM42LA9', '2023-08-03 11:01:00', '2023-08-03 21:53:28', 'GTVq1nMExA8tz2jJUP2v-e2tLWi9hlUMmvy9ZIu1D-tHh80sl45oWOrj0XwGzE-KQ4r6HorO0ial9UA3MFV', '2023-08-03 16:20:45'),
('dQSVylnFQb1TbCfEIwRf-MGj5M5haAJWwA8rm6LoS-cpnVMOuj0GKDGKP5KMsv-ZVmTly9RIj5ssf4rfatZ', '2023-04-20 11:11:00', NULL, 'ODO4stVRJCKXCp3rXHoC-pLTKB6W0Frd32WJoL9Bd-nrCnO8REM7Q8xCl33gso-OxEeGqolfRmSUw6Vi3rd', '2023-04-17 05:30:44'),
('e55eH1Dx8gSXBGxWbgMu-X9KxABFSmPZWIZFrFOrS-U2LcMjY6VAEAyiAKorKX-RFYXB7ChUeu7hxy2eMGC', '2023-07-12 11:01:00', NULL, '05rX4PgIRDnjtp9UTqnu-1teOq7QGVjDgl1hUswDu-71mYqpEeIuHFwXa5WvJB-4XrnrJFmkfsFiFX7R7E1', '2023-07-10 04:16:44'),
('eC9ZDWMZiu5ZhLvMG2jS-lxy204tfla8WFL2IqZhy-ZKva4YrQxkjmu8SEOnmT-SIKvAyOolTrDYspUDEnv', '2023-07-03 16:00:00', NULL, 'H9AFTIcutdfVIcPZWdME-TkrZpntUd3ghB2U76iWL-rxeYhrDOeJIx6zwtBhX9-V1jqg7K5G5Zw78ZdwfHV', '2023-07-07 07:02:22'),
('ecTw4yaGCBgLP6OS7bdD-keJUEcd1yAw6g7nM2DCQ-yium88pOOZyMseTMCuJi-hX90jnEFObagHp2Q4DOl', '2023-04-18 11:11:00', NULL, 'ODO4stVRJCKXCp3rXHoC-pLTKB6W0Frd32WJoL9Bd-nrCnO8REM7Q8xCl33gso-OxEeGqolfRmSUw6Vi3rd', '2023-04-17 05:30:44'),
('EhQROLDnG4V9Oag8iPrX-CWnjkknQEzTI29CU79yF-og7GBAYlJUspEMMLsbac-OkCs5sLjJ3AQj7XWx5aF', '2023-08-15 21:00:00', '2023-08-15 22:48:57', '10skkeaGIMYpBLOBeCZq-oYWUDyskmjO1Fxs5R7Ef-uI4TTBuOEabCI1LKrDjK-mUlGQtTsxVe7xIMC328d', '2023-08-15 12:15:29'),
('ErrHq3djt1PZe2mIWALK-PMv12HfUjhxmBplFbT6F-OLdbpdn10XzG7O0LXG9V-TGwOjYTs3jz6Xeq3v8TW', '2023-08-08 21:00:00', '2023-08-08 22:39:13', 'WaMPaQu2Sc6IsGS4OisG-45iegckvDDW8rOVyxo8a-x2YpzYaICO20Qo0anOjQ-ULo9Trb3kQfBxLJ5BDks', '2023-08-07 10:16:05'),
('f3igd1EwkDah1nZxc0c7-2KU83rghclb8MigSYtoc-aJJwVRRaszkbByMvI84b-mGksIY0oq15aERxMBqVP', '2023-08-05 21:00:00', '2023-08-05 22:43:45', 'hXhX85uipnq17fao3cOS-ksM3ncrK5DLF77zKBizI-k1hq0JpFO8Ze8IiaxAi0-43L5yf7HBxhHH23D0Xxp', '2023-08-05 14:29:13'),
('FMx806XPuSr3u01qoWTZ-zy9cJRLpzHc4CVtrYr9Q-l4fLoOzSmbMhXgleYGRP-v30HwBLS8hLJuIsbIzDi', '2023-07-20 20:00:00', '2023-07-20 21:49:25', 'gjYHZB8PEelETkFzugoo-JqmdHTGTXtbYr6EPc9sJ-2C5X7k74PtcLwbPOV1E3-L9SobCzZUWkiDKsdqWik', '2023-07-18 09:58:29'),
('gBlIyxIgHOTAwZ42dsew-9D4v0484OSltz0n3pcAm-C4pUXYwxgvp3RemA39BQ-M8mqHRqTJ98wul55FhhR', '2023-08-22 21:00:00', '2023-08-22 22:29:08', '3quJ1HAXtbESm98k44TX-DZlJvA1u3Wb3XM3hOeSn-qSqeUwS8rc7T2V1H6DWv-5VAus5nvbpePn6W27aBk', '2023-08-22 06:02:11'),
('gXYKC6OayJuAieFBIkGr-wMxCmjSMte3sA0YrznJH-fMt8OAGhn4igynQYLsba-9hK2l9WLd2rQX02whwDx', '2023-07-05 16:00:00', NULL, 'H9AFTIcutdfVIcPZWdME-TkrZpntUd3ghB2U76iWL-rxeYhrDOeJIx6zwtBhX9-V1jqg7K5G5Zw78ZdwfHV', '2023-07-07 07:02:22'),
('HMq00TiuQz7GyOqihEDr-7U0hvCO6VrsLd48ztf8I-P8fMxOldFVB5k2fyTAAk-OlYeyuOoz9w8WonX0zqo', '2023-07-31 11:01:00', NULL, 'kpWMdAZ2EieMkaG6HlVc-zKBRVcEgyHXxBfDUCyHs-GkoGH6ULrVq7YFROXUo9-ALku13OlztErslMYV6S3', '2023-08-03 16:25:56'),
('hVf9OVAdvbt0JVwq93ye-W18VbAryoEuQz4YJPz5t-LZzPC4kvqMwgAvQJl4hO-DTvqw9rYzS4Gvqwrwk1k', '2023-04-17 11:11:00', NULL, 'ODO4stVRJCKXCp3rXHoC-pLTKB6W0Frd32WJoL9Bd-nrCnO8REM7Q8xCl33gso-OxEeGqolfRmSUw6Vi3rd', '2023-04-17 05:30:44'),
('igFrInQEu00GulOLboiY-F9ZLf5i03d1uckRJrAu8-ba8lWAXkPQOovAOgtoIj-lBqcSkGaGJdLMPDfpZB3', '2023-07-15 11:01:00', NULL, '05rX4PgIRDnjtp9UTqnu-1teOq7QGVjDgl1hUswDu-71mYqpEeIuHFwXa5WvJB-4XrnrJFmkfsFiFX7R7E1', '2023-07-10 04:16:44'),
('jEq9HXjRtaZGaAFr7FOG-7XajwleI8Gs9V0l2JeVx-HKeOHjZyJtcheuTdneV9-oPUOzuCz2pnVv5qO2yI9', '2023-04-22 11:11:00', NULL, 'ODO4stVRJCKXCp3rXHoC-pLTKB6W0Frd32WJoL9Bd-nrCnO8REM7Q8xCl33gso-OxEeGqolfRmSUw6Vi3rd', '2023-04-17 05:30:44'),
('jmtb8XTF5ClLeOgwl4IG-AbIj1WwPmttQVbmMGcAC-lJpIzLQtwnxJrEkQnz1C-jQ1yjvJlc4Z0OroofHz8', '2023-07-07 16:00:00', '2023-07-07 16:12:35', 'H9AFTIcutdfVIcPZWdME-TkrZpntUd3ghB2U76iWL-rxeYhrDOeJIx6zwtBhX9-V1jqg7K5G5Zw78ZdwfHV', '2023-07-07 07:02:22'),
('jpJ8C24x7Tju8cUUVR1Y-5yuYSBEnDS8cRyiZJFHz-OqlTkCkx519XyjUHPPmG-fmixLVFRkYm8YSgntVD8', '2023-07-19 16:00:00', NULL, 'muVpLc2uqsr4US1gXr8R-r2avcrMrIdEk8SadseKr-Av8iI5lEzr1V2SuEyB1i-50OxDhe61sGXFdX4AROw', '2023-07-17 10:02:08'),
('k8Wf039HgMZ76AG8Bz0r-f9plrJwsHMgBha5Ega6B-VbZKhD4g798vMuvyEGbb-UKxlVHS9pcgVneILzIvJ', '2023-08-24 21:45:00', NULL, 'aBxPV7AqOBtOvUBEuXTy-POEYRQTaO6gUUQQD7jzh-KAKYadzOpxO8rLymz5ek-cMlMoCxLoO8qxcgUY39E', '2023-08-24 15:33:31'),
('kbXLFwYCETWtBlrqO7kp-oEJmkzTPFAIVp3G8Sg5I-6MA8vsH3JK4JyZtbL5KK-MptTMD7IwpSYFv3xlOsR', '2023-08-02 11:01:00', NULL, 'GTVq1nMExA8tz2jJUP2v-e2tLWi9hlUMmvy9ZIu1D-tHh80sl45oWOrj0XwGzE-KQ4r6HorO0ial9UA3MFV', '2023-08-03 16:20:45'),
('LeXUOUMHAkka0u25SOuf-CD4w86xfy0PF3bzoIg8V-AbzP30VTw4Ep2OxduTch-fxgTO8trHorEfgtDc7aF', '2023-07-09 11:00:00', NULL, 'cpJ6avA7wKtOcBAoo29K-GgtMhF8JrdhoVknbGdpp-iey8O9OnH0UZj3KCzOlo-xasIO6vx6xAYCA4Tiii9', '2023-07-15 05:53:42'),
('LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz', '2023-08-03 20:30:00', NULL, 'hXhX85uipnq17fao3cOS-ksM3ncrK5DLF77zKBizI-k1hq0JpFO8Ze8IiaxAi0-43L5yf7HBxhHH23D0Xxp', '2023-07-31 12:23:57'),
('m17ORCmyTX3wtPT3Tr99-Io6fy75YnvvRvVAFwStS-6Co8v1B8ShLvTdsUazOO-LWcllPqaVcS3jmvrhgdL', '2023-08-01 11:01:00', NULL, 'GTVq1nMExA8tz2jJUP2v-e2tLWi9hlUMmvy9ZIu1D-tHh80sl45oWOrj0XwGzE-KQ4r6HorO0ial9UA3MFV', '2023-08-03 16:20:45'),
('mAjR1hK91SPhxLnBXikD-j8T2J9WSTfPVhTBDIrDF-c3Clo0SzoOLZbklrfpSW-UobIJOAMH0SdeOuqdgZJ', '2023-06-30 11:01:00', '2023-06-30 13:35:49', 'pfgvh9JaVxVOz8Y92OVd-o6OrGzc1rtgxVJikfcSM-kRlm4rclyPD4sHbmmUdo-lucsMqKOq5WwhxptHSid', '2023-06-30 04:39:09'),
('McAFxkXMEweB7Wb5OUgX-C9Vp16xbS7frRhOodZlk-pwqDCE5B2KStTyOFR6s8-g9IPdIcmWIwflsFEWsiY', '2023-07-14 16:00:00', '2023-07-14 16:08:56', 'SFi3ubLhdAcpeVR7rkRD-OR3jlnwaPGSwbVjI8gZR-kDw4MOFiD7QD3lbhOBOj-qStBS1PEH011ggwvD7us', '2023-07-09 16:09:27'),
('mOISgIMxeeehCoFBtfnc-KWZ7ohqlkzwf5iGSwA6x-lajd4lLCGoVAVmVp1J62-2ZZZlKp4ZDxmEr6HB6H8', '2023-08-09 16:00:00', NULL, 'ZKQMsjIJ1ra7Cdj8g4QQ-8420GGVDIWSkAcavDiQv-roBsGKKc2CuG7OJ6rHUP-mxvkvirHxLvbPiCcFB0a', '2023-08-07 10:15:42'),
('MXS1K2BgvPEAaGUzMzjn-vPvRrbD9seLr1CursZiV-e6tuBT3TreOKIztDdBZr-uyrPtmHrlFK5A3AKDRiV', '2023-07-30 11:01:00', NULL, 'GTVq1nMExA8tz2jJUP2v-e2tLWi9hlUMmvy9ZIu1D-tHh80sl45oWOrj0XwGzE-KQ4r6HorO0ial9UA3MFV', '2023-08-03 16:20:45'),
('myLROAYEDYtVWkkrDOFT-b70xO7U7nmBjEgHQQFa5-ELUvjvFbLmaCivpi07pc-SsaR6heXd1RKJUuPJqmQ', '2023-07-11 21:00:00', NULL, 'cpJ6avA7wKtOcBAoo29K-GgtMhF8JrdhoVknbGdpp-iey8O9OnH0UZj3KCzOlo-xasIO6vx6xAYCA4Tiii9', '2023-07-11 14:36:52'),
('nPKtz6OsHrWD5uEa2Xzj-nFWBJww5DBcwJ3ZwQ7gw-ksjkoGO8laZlb4KhqK6y-S7IwOd6FjqWa9jRJEBVG', '2023-07-12 16:00:00', '2023-07-12 16:03:04', 'SFi3ubLhdAcpeVR7rkRD-OR3jlnwaPGSwbVjI8gZR-kDw4MOFiD7QD3lbhOBOj-qStBS1PEH011ggwvD7us', '2023-07-09 16:09:27'),
('oKZeTKBHuqqD7bbzwOMf-mpAVj4nenHladGRG3RKX-opuz9rz5WJO8eJpGYidR-aB9ee4c9sHyRPGZ9QCzT', '2023-07-25 21:00:00', '2023-07-25 22:18:17', '5EuPt2u0ZgXOxAResxKG-Y8vFHOmEQnsvACKcvbce-D2rV3iCe9LlGdoydoELj-kDqb2xWhxhpqDtxvL1hF', '2023-07-25 15:26:57'),
('pJGxa1POHkBuOz0Wp0dv-dnCZVWSXi9pHzt3cS2B8-wyfYWps6yAQuTuOwKFDC-l4kHOcI83JdApAVWv60C', '2023-07-06 16:00:00', NULL, 'H9AFTIcutdfVIcPZWdME-TkrZpntUd3ghB2U76iWL-rxeYhrDOeJIx6zwtBhX9-V1jqg7K5G5Zw78ZdwfHV', '2023-07-07 07:02:22'),
('rB1FqHqMeCa33yE3BjtP-aznKxXz4ey9r3LKzfEL5-MRHiWcqXFBWa1IeJ2mcs-jIH69ETvYcYp3HwSGjrW', '2023-04-19 11:11:00', NULL, 'ODO4stVRJCKXCp3rXHoC-pLTKB6W0Frd32WJoL9Bd-nrCnO8REM7Q8xCl33gso-OxEeGqolfRmSUw6Vi3rd', '2023-04-17 05:30:44'),
('RE4lvAcvOLb1UXa6nwu4-mtJIUGpFRVtt3PmwqDX5-7a23tDGblQ3evMbeKqEg-wSSOjwO5Z5E5tGC0MSRa', '2023-08-02 11:01:00', NULL, 'kpWMdAZ2EieMkaG6HlVc-zKBRVcEgyHXxBfDUCyHs-GkoGH6ULrVq7YFROXUo9-ALku13OlztErslMYV6S3', '2023-08-03 16:25:56'),
('Rk4nY9qiObThczKDSOrY-J6u9zner3ScA7wdfs2xO-bzJrhusOow615v237IgF-PG0uSoSaGV6mjuMyXW5p', '2023-08-05 11:01:00', NULL, 'GTVq1nMExA8tz2jJUP2v-e2tLWi9hlUMmvy9ZIu1D-tHh80sl45oWOrj0XwGzE-KQ4r6HorO0ial9UA3MFV', '2023-08-03 16:20:45'),
('RtD2gzqnabqRFdBeTV7h-a6Cjc6M6xhQPutOI4lpW-nz1O9Ij4gRb3lAv4U54f-z4TcqOtxPO5AagxsL0q9', '2023-08-25 20:30:00', NULL, 'aBxPV7AqOBtOvUBEuXTy-POEYRQTaO6gUUQQD7jzh-KAKYadzOpxO8rLymz5ek-cMlMoCxLoO8qxcgUY39E', '2023-08-25 14:37:18'),
('TGLhgKQjdEPXZPuHiE8P-UC5TBlqSbDBRTCTjn5zI-vEhCL5WeCPggF9YQfU4Y-OpevRvxv4wt6WfEO7WqR', '2023-07-04 16:00:00', NULL, 'H9AFTIcutdfVIcPZWdME-TkrZpntUd3ghB2U76iWL-rxeYhrDOeJIx6zwtBhX9-V1jqg7K5G5Zw78ZdwfHV', '2023-07-07 07:02:22'),
('tn44zbXXDgYVGSiZ0b0R-aZu96qpICfen5rEQwEjw-OTKPixxWu1rkPplxzKQj-Kg96wUdMhBkEpaHhTRGe', '2023-08-10 20:00:00', '2023-08-10 21:42:01', 'WaMPaQu2Sc6IsGS4OisG-45iegckvDDW8rOVyxo8a-x2YpzYaICO20Qo0anOjQ-ULo9Trb3kQfBxLJ5BDks', '2023-08-07 10:16:05'),
('TtoM4yfPJa7SrqcHVrJr-FXPiMAPwSK8KOxpIwACA-HmDOancIfo0aGHCqwkxj-fQatKHPruJsT9LHAWuhd', '2023-04-16 11:11:00', NULL, '5OojCFwdpXwM5e4KCVi3-LB7OzxqMvYbS89BejPYr-SdSKoZOwsFdZVGOyKu97-i2q8eh23fVRtWHZEzDTX', '2023-04-16 06:46:09'),
('TUddUP7tGxrY5s7OGpn6-EWrIdm70b2OWmcAp2707-hJTnpsdXRpGuLO21ol9U-r2zBEiIJuemCk6FpBqPk', '2023-08-02 16:00:00', NULL, 'jJH1Kc24oxzhRpiOpu8a-1JrfJaMHEi8lV7stDwyl-iH9UcwXGxGD6Y2FUyJZO-KAOiZdV21ZAFefdg7tL5', '2023-07-31 12:24:38'),
('USAUZdvsTYTpyrbqIZt5-dtVZyHTHMzWqVXVJxroG-r8wHFCCrjaTOiWU3JPzP-UrGmtALGQOCHZArI3U7C', '2023-04-16 11:11:00', NULL, 'mqtTbpUg0w43e6290p3z-czKbtVYkgJgjlGof4btO-qAHeAUk7kfQbmWoHjS8e-t4ESrZa6CPD9ux3MubE9', '2023-04-16 06:45:54'),
('uyfWaO0bVcOnP0aOhzZm-Tmg6SVRUZfJ4Jwjk4gEj-hUlFIZjL1WMZLM5QvCV8-ED56p0xW3tnDlLT6xnwW', '2023-04-16 11:11:00', NULL, 'ODO4stVRJCKXCp3rXHoC-pLTKB6W0Frd32WJoL9Bd-nrCnO8REM7Q8xCl33gso-OxEeGqolfRmSUw6Vi3rd', '2023-04-17 05:30:44'),
('VwE7C3cUfy5gETcDu2MI-MospP3x7iY5wxXRmMMOS-YQntml6mv3kYiyKy5zTH-shsmq361J6U9h9PvTj2e', '2023-08-04 11:01:00', NULL, 'GTVq1nMExA8tz2jJUP2v-e2tLWi9hlUMmvy9ZIu1D-tHh80sl45oWOrj0XwGzE-KQ4r6HorO0ial9UA3MFV', '2023-08-03 16:20:45'),
('vxuc4MTJIZVeymOkDOTF-1OSf0RrDUMeuOM6DaHHk-PwlhUCpg5prr5ACmfKeY-FWs3JT1zY6z2nlAK1P5n', '2023-07-31 11:11:00', NULL, 'GTVq1nMExA8tz2jJUP2v-e2tLWi9hlUMmvy9ZIu1D-tHh80sl45oWOrj0XwGzE-KQ4r6HorO0ial9UA3MFV', '2023-08-03 16:20:45'),
('WV3ahjwdnXTB5TJR9UyM-FmI6gEu1vUGQL8YFCHhF-lFGTEeMZKIh7Jhtgu1XS-ZksyekuKqhoz6b64xGEk', '2023-07-02 16:00:00', NULL, 'H9AFTIcutdfVIcPZWdME-TkrZpntUd3ghB2U76iWL-rxeYhrDOeJIx6zwtBhX9-V1jqg7K5G5Zw78ZdwfHV', '2023-07-07 07:02:22'),
('ww8MhkAGKDghdlOTk0fB-I22z83wJ4AaYOSiGQjcO-GOpTdZDLLcROe06cfe3w-4fKdnwtvZU0GVM6Kg2Eb', '2023-08-17 20:00:00', NULL, '10skkeaGIMYpBLOBeCZq-oYWUDyskmjO1Fxs5R7Ef-uI4TTBuOEabCI1LKrDjK-mUlGQtTsxVe7xIMC328d', '2023-08-15 12:15:29'),
('x19AmPsHbnR5ROlSkCJV-ZRSoLyqmPK8Wy5T4wLlP-IhtF5s9kyL5GGW7Bavdi-eOH96fFqzF6zbACVqabw', '2023-07-15 21:00:00', '2023-07-15 22:40:42', 'cpJ6avA7wKtOcBAoo29K-GgtMhF8JrdhoVknbGdpp-iey8O9OnH0UZj3KCzOlo-xasIO6vx6xAYCA4Tiii9', '2023-07-15 06:00:48'),
('X823E3PsRuGIeod8s1Oj-OGowrOUjdqIKwOibjEW2-mnmz71BcXgVbpxhxO0ip-VMkFyOVWIrWZtyv7Lcci', '2023-07-10 11:01:00', NULL, '05rX4PgIRDnjtp9UTqnu-1teOq7QGVjDgl1hUswDu-71mYqpEeIuHFwXa5WvJB-4XrnrJFmkfsFiFX7R7E1', '2023-07-10 04:16:44'),
('xIwxO7mk5sG0RZs7Pfdq-uSmzXj78v0cdkW3t8YLL-xgT2L3KDObziuz66P0BJ-FO7YhnOjKawu8aGqoERQ', '2023-07-13 20:00:00', '2023-07-13 22:37:47', 'cpJ6avA7wKtOcBAoo29K-GgtMhF8JrdhoVknbGdpp-iey8O9OnH0UZj3KCzOlo-xasIO6vx6xAYCA4Tiii9', '2023-07-11 14:36:52'),
('xs650cTHoz0rfDGzd7Z4-8ftoSXjPGyFJaVsF3BpO-HMHFeEJbzr8O9BCL4Suy-tgcOhSkc7MBf9W42m42W', '2023-07-27 20:00:00', '2023-07-27 21:45:49', '5EuPt2u0ZgXOxAResxKG-Y8vFHOmEQnsvACKcvbce-D2rV3iCe9LlGdoydoELj-kDqb2xWhxhpqDtxvL1hF', '2023-07-25 15:26:57'),
('xY4txz77Oxh9yKSyWsfH-KtTnriz6mMLAFhaK6lVK-GKvqziR0eeFyZrIRXOUM-TPtAJvJk72uuiemWb0oH', '2023-08-03 11:01:00', NULL, 'kpWMdAZ2EieMkaG6HlVc-zKBRVcEgyHXxBfDUCyHs-GkoGH6ULrVq7YFROXUo9-ALku13OlztErslMYV6S3', '2023-08-03 16:25:56'),
('YS1bAispfjjxRzXkBGx1-LOxJu5qTQ1JQpj0Jy0Zu-O1ZhfdfO6Fk4vg3ha5XE-QjxOKVYpJhGce7oL3kb6', '2023-07-13 11:01:00', NULL, '05rX4PgIRDnjtp9UTqnu-1teOq7QGVjDgl1hUswDu-71mYqpEeIuHFwXa5WvJB-4XrnrJFmkfsFiFX7R7E1', '2023-07-10 04:16:44'),
('yYaaOkb37KmcXD1tME5b-EGEoLpfAPY5Y1t7rF7lz-tVChfMOfpQmAU6lQm3Gh-lCVPSQ19qDSuiB6bYDrg', '2023-08-11 16:00:00', NULL, 'ZKQMsjIJ1ra7Cdj8g4QQ-8420GGVDIWSkAcavDiQv-roBsGKKc2CuG7OJ6rHUP-mxvkvirHxLvbPiCcFB0a', '2023-08-07 10:15:42'),
('Z62RXl8Wf7B7OjiykkpK-B78Dw9h13PeqOqKZYzwQ-6PhUts9RlGWIUUODQ2Uz-QWuppOwVVLWZ0zrDzJjo', '2023-07-09 11:11:00', NULL, '05rX4PgIRDnjtp9UTqnu-1teOq7QGVjDgl1hUswDu-71mYqpEeIuHFwXa5WvJB-4XrnrJFmkfsFiFX7R7E1', '2023-07-10 04:16:44'),
('zFCYAS5QaRSx6zjSDOD1-OFJiQyLkfbhHOp2ODB1F-Ao9Cu25dchF68I86Krbv-1lmgrdPhHe734njceB3K', '2023-07-17 16:00:00', '2023-07-17 16:08:04', 'muVpLc2uqsr4US1gXr8R-r2avcrMrIdEk8SadseKr-Av8iI5lEzr1V2SuEyB1i-50OxDhe61sGXFdX4AROw', '2023-07-17 10:02:08'),
('zh8ITeo5VJUGgVLITPqt-0QswJQmJPaA2dTfh4cuF-toWy2PyzzdAP2ihpAx8o-M0cw6t7BMGvXta0vD0DT', '2023-08-01 21:00:00', NULL, 'hXhX85uipnq17fao3cOS-ksM3ncrK5DLF77zKBizI-k1hq0JpFO8Ze8IiaxAi0-43L5yf7HBxhHH23D0Xxp', '2023-07-31 12:23:57'),
('Zo8KOaZK3ur4isgQLCTW-aBLqvZRlSCaTPC1EVtx1-5aZkrxD4gQV1ZGUtghfR-ojcj3WIuY30Fp5OWabOr', '2023-07-21 16:00:00', '2023-07-21 16:06:42', 'muVpLc2uqsr4US1gXr8R-r2avcrMrIdEk8SadseKr-Av8iI5lEzr1V2SuEyB1i-50OxDhe61sGXFdX4AROw', '2023-07-17 10:02:08'),
('zOCQPhyxkslbHovnfqSA-KTvoFSf6Iexdjl7SXlis-1FafMKuhKHPbvRVbvQdC-s2kkqICSXlfwnQ9yc4xE', '2023-07-31 16:00:00', NULL, 'jJH1Kc24oxzhRpiOpu8a-1JrfJaMHEi8lV7stDwyl-iH9UcwXGxGD6Y2FUyJZO-KAOiZdV21ZAFefdg7tL5', '2023-07-31 12:24:38'),
('ZurjjYG9EeW2BPiqZsnl-YiwKLRkDP92hIuriPLRp-Ar0vjADE0YapWyeBJDER-1EChwMakMkXqxwSBDOOQ', '2023-07-10 01:00:00', NULL, 'cpJ6avA7wKtOcBAoo29K-GgtMhF8JrdhoVknbGdpp-iey8O9OnH0UZj3KCzOlo-xasIO6vx6xAYCA4Tiii9', '2023-07-15 05:56:55'),
('ZZw41GYC3eWKzP9eSmft-hQKb9QOOa5d7RuBdud5n-cmf3hylCQQ4xypBQJ3dO-MaWbLTL2A0qnEbHcKm78', '2023-08-04 11:01:00', NULL, 'kpWMdAZ2EieMkaG6HlVc-zKBRVcEgyHXxBfDUCyHs-GkoGH6ULrVq7YFROXUo9-ALku13OlztErslMYV6S3', '2023-08-03 16:25:56');

-- --------------------------------------------------------

--
-- Table structure for table `profile_subject_with_batch`
--

CREATE TABLE `profile_subject_with_batch` (
  `id` varchar(255) NOT NULL,
  `profile_id` varchar(255) NOT NULL,
  `subject_id` varchar(255) NOT NULL,
  `has_taken_demo` tinyint(4) NOT NULL DEFAULT 0,
  `batch` tinyint(4) NOT NULL COMMENT '1 - 1 - student\r\n2 - 3 - student\r\n3 - 5 - student',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `board` varchar(255) DEFAULT NULL,
  `class_assigned_teacher_batch_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='selected subjects by student with batch information';

--
-- Dumping data for table `profile_subject_with_batch`
--

INSERT INTO `profile_subject_with_batch` (`id`, `profile_id`, `subject_id`, `has_taken_demo`, `batch`, `created_at`, `board`, `class_assigned_teacher_batch_id`) VALUES
('0kXdaIxSphcPbRkCXww4-vf7ORPdubu4LGMhjaq5v-6FEwWEwjdZrhVuAhA227-9soTunF5eELLpzzYGUOi', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', '453-45gd', 1, 2, '2023-04-15 08:22:27', 'sadsad9asdsa9d7sa6dsadsad', 'aFbA3mLjBlC1MhOEwdvw-RcI5e9VJKVwVqXvUw1ul-MhybE8U8Z0mOSGEVR9wZ-GXhU50kBzXxEdATuboQt'),
('8SDvKTs83iyOutcKT1ah-CnoId3vkeaT9XDzWyRcp-z93SUe3Ja5k9AJpYs3Jv-jeYPpBTit1Y2aBJnqI5y', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', 'asdsad9asdsad9asdsad', 1, 2, '2023-04-15 08:22:27', 'sadsad9asdsa9d7sa6dsadsad', 'kpWMdAZ2EieMkaG6HlVc-zKBRVcEgyHXxBfDUCyHs-GkoGH6ULrVq7YFROXUo9-ALku13OlztErslMYV6S3'),
('9XEMZyraAtVt8TS00ioA-bFJtQFUnTiCDTrkYD41I-jBOD9HGvpWejHMUPOc4H-RjUD4fvtaqz9A0OuXqZr', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', '34rwergdjghdjk', 1, 2, '2023-04-15 08:22:27', 'sadsad9asdsa9d7sa6dsadsad', 'mqtTbpUg0w43e6290p3z-czKbtVYkgJgjlGof4btO-qAHeAUk7kfQbmWoHjS8e-t4ESrZa6CPD9ux3MubE9'),
('BgwF7cuOHE1BFmXxyu60-C8eIg20msE4VWliytExI-I4bIawVwR79PZAFnErmP-tWwqOhJ1AmRsjJy6gFcO', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', '34-ad-sadsad-sadasd', 0, 2, '2023-04-15 08:22:27', 'sadsad9asdsa9d7sa6dsadsad', 'VaviDQhottXl6BLBrBml-OmM1QdqeaVqJwKqlcXEv-JtRc61gxos4bsy0jKdV4-SQh5YzAUSaHgFr4o2RSx'),
('C3MCXJwiTVKJ3BxGMglw-IzcVYhAnSsWA2eIszaUH-UHvOQH0dk7RQH3LL4wOC-W4Tn0bcwHAzYjBOVVOOk', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', 'dsad4364yryhdfg', 0, 2, '2023-04-15 08:22:27', 'sadsad9asdsa9d7sa6dsadsad', 'OKOf87kHIWYRkV1O5SnC-pqbfECIUsZSJcTMd3ebF-BH1eo8hDtCs6OVzOe2eL-JAtBCAsQhqK8k0uGJCfO'),
('Dhts6Qx0lFaAxRKvEhqi-bxkhoF9hDWmb9JxAJME8-hppnJdVzLuAR5p7EkpXG-Mjt0OPl3AEmWgiW2arLn', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', 'sad9rewer-sdff', 1, 2, '2023-04-15 08:22:27', 'sadsad9asdsa9d7sa6dsadsad', '5OojCFwdpXwM5e4KCVi3-LB7OzxqMvYbS89BejPYr-SdSKoZOwsFdZVGOyKu97-i2q8eh23fVRtWHZEzDTX'),
('gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'sad9rewer-sdff', 1, 1, '2023-07-11 14:30:25', 'sadsad9asdsa9d7sa6dsadsad', '3quJ1HAXtbESm98k44TX-DZlJvA1u3Wb3XM3hOeSn-qSqeUwS8rc7T2V1H6DWv-5VAus5nvbpePn6W27aBk'),
('MAjbZS4sG8y9wUTY4OZ9-u5VX8nhrtfRkHJWPTqFh-f4etIyCFZhKgdUdB6oJ4-aDU1etXs0sjeh68YEhUc', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', '324gedfsdafsdf', 0, 2, '2023-04-15 08:22:27', 'sadsad9asdsa9d7sa6dsadsad', 'Ud4OJxMOrgvqEZJfRFrF-GZV7WatOKHFOqanT6i7V-s7WGvmOvRkacmdv3lUbJ-969cjXO6npeOOFPMZ2Hz'),
('mSHslnoeOCI74rCKJ4aw-H7JCdW9Q7M3gw2O1XSAk-FTMLi0Pr1OAZUOrdKhjC-JivGTOVSnTnqk8OYuAhG', 'WkGWUdaWPvJxgtoKP2Fu-fSje9MkfjluOT3UJRjPt-PKmRhYoPIotxEIiJGMUj-xfvrBEv1h01Q24D7rlpW', 'sad9rewer-sdff', 1, 1, '2023-07-11 14:03:42', '34324werter9wet345rwer', 'Tzj9pVhFPs8cs4pbnKvk-OCSG7PWA9njf61h2GtOD-kVVMh3cpOOLXHUcLoAHo-nxoHz3dfzJ8JPEFOFrzA'),
('okAIaaCCK8XDBRh9OMeo-cOBCvYCltu6ojqKMy3Z4-f6BkvkyE6w79PKW7uVaW-RfoS2BKprgrQSWhsVyoZ', 'WkGWUdaWPvJxgtoKP2Fu-fSje9MkfjluOT3UJRjPt-PKmRhYoPIotxEIiJGMUj-xfvrBEv1h01Q24D7rlpW', 'asdsad9asdsad9asdsad', 0, 1, '2023-07-11 14:03:42', '34324werter9wet345rwer', '54ZHbHr66Vqgd32vT5W9-YWOwZ6ncasECB2ygASBC-tnnuQ22xllqWOZl2pEIv-jC9OKYYKgAr5mQ4J5ujY'),
('pqQBcaDPK2YLTlgJhC0h-1PSg4oEvvdjHhET6aLh5-OzbYwApX9xhpy3TkQI9E-Ptz7jRIQ8QCaUa8OItPy', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', 'sad2345terwfsdf', 0, 2, '2023-04-15 08:22:27', 'sadsad9asdsa9d7sa6dsadsad', 'dggwidLi37WKES9qgKbS-9wVZk4ZDAm2cBcOm86x3-nPmtM5239iVnX47lw0qR-WgXRpQQoRQCOCv5VwG6e'),
('u5CB1LiOGDoGjRqZ7E6j-pGB6v0DhDmaTmLXDQq2U-7KgfOE31O24HTEorSO1b-nLukgAZ9Ow1zKb5atEfJ', '1hrGWwbHcB9HOSAr76rl-jsKbMS5l1FpFBLliOoc2-DATXySC0l6O18JAODkeT-VLl7HCkiPi29l6Rs85as', 'asdsad9asdsad9asdsad', 1, 1, '2023-08-13 14:14:24', 'sadsad9asdsa9d7sa6dsadsad', 'aBxPV7AqOBtOvUBEuXTy-POEYRQTaO6gUUQQD7jzh-KAKYadzOpxO8rLymz5ek-cMlMoCxLoO8qxcgUY39E'),
('UHd2HC1O5MIUafDR8uf7-HgRo4mLjjrETZY9wOT9I-GRhSLZYW2qOoIWpv12mv-3LtgTu9pqApoKOhHoCBA', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', 'adas34yru567rtyr', 1, 2, '2023-04-15 08:22:27', 'sadsad9asdsa9d7sa6dsadsad', '05rX4PgIRDnjtp9UTqnu-1teOq7QGVjDgl1hUswDu-71mYqpEeIuHFwXa5WvJB-4XrnrJFmkfsFiFX7R7E1'),
('V4QUFOWghXW7h3wyBhGZ-PtppZGWc7OqqUiCgx8su-kTQubKjhbkyTDiMvQgrc-K7Jxv1OPwWASObSPaBdh', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', 'sadsad-asdasd-adasd', 0, 2, '2023-04-15 08:22:27', 'sadsad9asdsa9d7sa6dsadsad', 'yZ8BsORImY5ke7qQ8poz-L8p8J5qvpmYcvkkp4vRI-FyM1Y3Jb9SSZPU2STt0n-dGG41ndX7iU6X326WXyU'),
('w2gsOOflHmoVxpsRhP4w-bdFT5rrSYQ5nR4AAIvY7-iy555Q6WUP2U9q7XJmga-7zhBeljOkjFeWzYXCYpR', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', 'sadsad342rsfsdf', 0, 2, '2023-04-15 08:22:27', 'sadsad9asdsa9d7sa6dsadsad', 'xJWzMJiEVnzKDcTE1MAX-h64FTw0YhAp4aPdU345P-PlszHptD4ws0gl2GQ7lW-rq93OewUxGUW9Pnqd6vV'),
('xf2zEavqv6RpHlr0jSa0-XZLk53XPqot9AmnciEyi-AlnSSsVuu0SKDRykB7oO-MJOhHPrSDOK0VfRl1C5S', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', 'dfs3424sdfsfsdf', 1, 2, '2023-04-15 08:22:27', 'sadsad9asdsa9d7sa6dsadsad', '17KuzIHrrOiYJIliiZ33-83ywpBK9Xy2OvwB8bkmh-3uK5o1UKAzToq15OFrEc-uXtlkOqzgjsO6Zb48emw'),
('z06MZBQHax1tfZ0aMTHR-ThpzMPsJj9qqeYuO9uy2-b6AjCpsDnZoiZ7ZodmDk-MEDj9AsimDZYtmK03qZc', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', 'sadas545gdfgas', 0, 2, '2023-04-15 08:22:27', 'sadsad9asdsa9d7sa6dsadsad', NULL),
('zU9Tdx6CiC5zG2Bmkneh-mWiu0UfBs95Fs5dYiCDl-1EDSPzE0t8CWe1n4e3zP-EQid9Z4szro0GQZiSei3', 'r9PrOgiVsSoK9OE2tiqP-WBLGsRX65V0v86iiOc35-2zxhp1IM3bO9KDWHEIsn-Ubk92Pxmn2B4KmsPX6j6', 'asdsad9asdsad9asdsad', 1, 1, '2023-07-03 07:53:44', 'sadsad9asdsa9d7sa6dsadsad', 'ZKQMsjIJ1ra7Cdj8g4QQ-8420GGVDIWSkAcavDiQv-roBsGKKc2CuG7OJ6rHUP-mxvkvirHxLvbPiCcFB0a');

-- --------------------------------------------------------

--
-- Table structure for table `school_board`
--

CREATE TABLE `school_board` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `school_board`
--

INSERT INTO `school_board` (`id`, `name`, `created_at`) VALUES
('34324werter9wet345rwer', 'Council for the Indian School Certificate Examination (CISCE)', '2022-11-29 09:23:27'),
('345rwerryertre', 'Cambridge International Examinations (CIE)', '2022-11-29 09:24:00'),
('34werw525wradsadasd', 'International Baccalaureate (IB)', '2022-11-29 09:23:51'),
('dsad8qweqwe4erwer2354ewre', 'National Institute of Open Schooling (NIOS)', '2022-11-29 09:23:38'),
('sadsad9asdsa9d7sa6dsadsad', 'Central Board of Secondary Education (CBSE)', '2022-11-29 09:22:56'),
('sadsad9sdsadsad9sad9sadasdas', 'State Boards (SB)', '2022-11-29 09:22:43'),
('werwer-r-t9etrtretret', 'Indian Certificate of Secondary Education (ICSE)', '2022-11-29 09:23:10');

-- --------------------------------------------------------

--
-- Table structure for table `sk_mondal_class_test_study_material`
--

CREATE TABLE `sk_mondal_class_test_study_material` (
  `id` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `topic_name` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `lecture_order` int(11) NOT NULL,
  `tab_type` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `sub_tab_heading` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `sk_mondal_class_test_study_material`
--

INSERT INTO `sk_mondal_class_test_study_material` (`id`, `subject`, `topic_name`, `link`, `lecture_order`, `tab_type`, `created_at`, `sub_tab_heading`) VALUES
(1, 'Calculus-Mathematics... LIVE', 'Limit, Continuity & Differentiability, L Hospital Rule', 'https://unacademy.com/class/limit-continuity-differentiability-l-hospital-rule/GR7C5449', 1, 2, '2023-07-23 10:34:19', 1),
(2, 'Calculus-Mathematics... LIVE', 'Algorithm of Calculus and Various Forms', 'https://unacademy.com/class/algorithm-of-calculus-and-various-forms/WWUDWU96', 2, 2, '2023-07-23 11:25:18', 1),
(3, 'Calculus-Mathematics... LIVE', 'Continuity and Differentiability & Questions Discussion', 'https://unacademy.com/class/continuity-and-differentiability-questions-discussion/FREVE78G', 3, 2, '2023-07-23 11:33:01', 1),
(4, 'Calculus-Mathematics... LIVE', 'Mean Value Theorem, Rolle\'s Theorem', 'https://unacademy.com/class/mean-value-theorem-rolles-theorem/1U2Y75BU', 4, 2, '2023-07-23 11:33:01', 1),
(5, 'Calculus-Mathematics... LIVE', 'Lagrange\'s MVT, Cauchy\'s MVT, Partial Derivatives', 'https://unacademy.com/class/lagranges-mvt-cauchys-mvt-partial-derivatives/5T8BJFE9', 5, 2, '2023-07-23 11:34:09', 1),
(6, 'Calculus-Mathematics... LIVE', 'Higher Order Partial Derivatives, Clairaut\'s Theorem, Maxima & Minima', 'https://unacademy.com/class/higher-order-partial-derivatives-clairauts-theorem-maxima-minima/TNPL6NWZ', 6, 2, '2023-07-23 11:34:09', 1),
(7, 'Calculus-Mathematics... LIVE', 'Maxima - Minima Condition for Two Variables', 'https://unacademy.com/class/maxima-minima-condition-for-two-variables/3CDC0QJI', 7, 2, '2023-07-23 11:34:09', 1),
(8, 'Calculus-Mathematics... LIVE', 'Condition for Maxima - Minima for three variables, Lower and Upper bounded', 'https://unacademy.com/class/condition-for-maxima-minima-for-three-variables-lower-and-upper-bounded/S2VH7BO6', 8, 2, '2023-07-23 11:34:09', 1),
(9, 'Calculus-Mathematics... LIVE', 'Types of Integral Calculus, ILATE Rule', 'https://unacademy.com/class/types-of-integral-calculus-ilate-rule/8HO5NJQP', 9, 2, '2023-07-23 11:36:01', 1),
(10, 'Calculus-Mathematics... LIVE', 'JUL20Gamma Function, Beta Function, Newtons\'s Leibnitz Theorem', 'https://unacademy.com/class/gamma-function-beta-function-newtonss-leibnitz-theorem/RHMERV4L', 10, 2, '2023-07-23 11:36:01', 1),
(11, 'Calculus-Mathematics... LIVE', 'JUL20Basic Methods of Integration', 'https://unacademy.com/class/basic-methods-of-integration/VGB8GWSZ', 11, 2, '2023-07-23 11:36:01', 1),
(12, 'Calculus-Mathematics... LIVE', 'JUL21Quadrature Rule, Degree of Polynomial, Multiple Integrals', 'https://unacademy.com/class/quadrature-rule-degree-of-polynomial-multiple-integrals/QH9ISX18', 12, 2, '2023-07-23 11:36:01', 1),
(13, 'Calculus-Mathematics... LIVE', 'L24Horizontal Strip, Line, Area calculations, Triple IntegrationLesson 13  •  4:30 PM', 'https://unacademy.com/class/horizontal-strip-line-area-calculations-triple-integration/3EDF16GH', 13, 2, '2023-07-23 11:36:01', 1),
(14, 'Calculus-Mathematics... LIVE', 'JUL25Area of Quadrant of Ellipse, Volume of Cylinder and Circle', 'https://unacademy.com/class/area-of-quadrant-of-ellipse-volume-of-cylinder-and-circle/1GNXHYBK', 14, 2, '2023-07-23 11:36:01', 1),
(15, 'GATE 2024 Topic list', 'Analysis and Strategy', 'https://drive.google.com/file/d/1Z01M5QuJijC5d21FWkvcBz6XZ8_iAcR0/preview?usp=drivesdk', 1, 1, '2023-07-29 04:34:03', NULL),
(16, 'Maths + Aptitude Probability for 2024 & 2025', 'Maths + Aptitude Probability for 2024 & 2025', 'https://drive.google.com/file/d/1HB49Wq6i7RMN82UV3j3kpIUUUdds8UHP', 1, 1, '2023-07-29 04:36:55', NULL),
(17, 'Fluid Mechanics', 'Fluid Mechanics Complete topics', 'https://drive.google.com/file/d/1lzp_p0PZtkg1m6m6sQnGd3MpSwBtJNCR', 1, 1, '2023-07-29 04:41:03', NULL),
(18, 'Heat Transfer', 'Heat Transfer Ch 1 Notes', 'https://drive.google.com/file/d/1NMRIfDkWdBezy4YFac0j9NBQlGOEoLP3', 1, 1, '2023-07-29 04:41:03', NULL),
(19, 'Heat Transfer', 'Heat Transfer Ch 2 Notes', 'https://drive.google.com/file/d/117WAAi4sJH6TmgzZs7MdVuPBwYnwhVBm', 2, 1, '2023-07-29 04:41:03', NULL),
(20, 'Heat Transfer', 'Heat Transfer Ch 3 Notes', 'https://drive.google.com/file/d/1QDR13J3n8xVDY-0Vrs-_wgTxDPjzyHP5', 3, 1, '2023-07-29 04:41:03', NULL),
(21, 'Theory of Mechanisms', 'TOM Mechanisms & Velocity – Acceleration Analysis', 'https://drive.google.com/file/d/1ym-WD2Q--uYFeCOMRoYXwackMOJEF4IF', 1, 1, '2023-07-29 04:43:31', NULL),
(22, 'Theory of Mechanisms', 'TOM Vibration', 'https://drive.google.com/file/d/1qKzr6VFwcHcZyCgqbUL9FhBLpWjPwZaR', 2, 1, '2023-07-29 04:43:31', NULL),
(23, 'Theory of Mechanisms', 'Gear and Gear Trains', 'https://drive.google.com/file/d/1qkM4Sja491TntCFWxq8LIF-yEqICrS0H', 3, 1, '2023-07-29 04:43:31', NULL),
(24, 'Industrial Engineering', 'Industrial Engineering Complete', 'https://drive.google.com/file/d/1You6f3nL91rsOuebBnRXx3wx6mGyCA-H', 1, 1, '2023-07-29 04:44:44', NULL),
(25, 'Break Even Analysis', 'Break Even Analysis Complete', 'https://drive.google.com/file/d/1UwA44PCuMQRdx2IpHXFT1FUIOWkbLPs7', 1, 1, '2023-07-29 04:46:41', NULL),
(26, 'Mathematics', 'Mathematics Complete', 'https://drive.google.com/file/d/1GcZAc3oML-1_9zhzUWtXrc2TF7Zefqxv', 1, 1, '2023-07-29 04:46:41', NULL),
(27, 'Producton', 'Theory of Metal Cutting', 'https://drive.google.com/file/d/1WOUmzc-P9rNmIn6HWQ47FuW5fdcKO0C4', 1, 1, '2023-07-29 04:52:01', NULL),
(28, 'Producton', 'Metal Forming', 'https://drive.google.com/file/d/1MXWkpMISKHtokEtlJpV3nnYZ_-z4dF91', 2, 1, '2023-07-29 04:52:01', NULL),
(29, 'Producton', 'NTMM', 'https://drive.google.com/file/d/1Lx1mZLvo8MSunPzkaZd0y92lRi3lrQzO', 3, 1, '2023-07-29 04:52:01', NULL),
(30, 'Producton', 'NC CNC DNC APT', 'https://drive.google.com/file/d/12ir0WjOcF1GJ3QSllHRsUfrHwdehZuJ-', 4, 1, '2023-07-29 04:52:01', NULL),
(31, 'Producton', 'Metrology', 'https://drive.google.com/file/d/1C5BucJ1c7XMdZ4Xj3CE6WRtYeu06Yzol', 5, 1, '2023-07-29 04:52:01', NULL),
(32, 'Producton', 'Welding', 'https://drive.google.com/file/d/1reAiVuDV3yNT2qCbZ2YcPnOIbj4fCxYc', 6, 1, '2023-07-29 04:52:01', NULL),
(33, 'Producton', 'Casting', 'https://drive.google.com/file/d/1wQeDpCYMMmVhJXSKph-18k38MXuuwaii', 7, 1, '2023-07-29 04:52:01', NULL),
(34, 'Producton', 'Powder Metallurgy', 'https://drive.google.com/file/d/1NuPPUdmubmfqcmLcfjF2oDwrV57eT1z3', 8, 1, '2023-07-29 04:52:01', NULL),
(35, 'Producton', 'Additive Manufacturing', 'https://drive.google.com/file/d/1uL5ySzKTlOvIRKVa7Hj0wd7q4frZGIIB', 9, 1, '2023-07-29 04:52:01', NULL),
(36, 'Producton', 'Machine Tools', 'https://drive.google.com/file/d/1ApAeCeJ6WWNLmpkOofkXOoXnnIlF1f0u', 10, 1, '2023-07-29 04:52:01', NULL),
(37, 'Producton', 'Jigs and Fixtures', 'https://drive.google.com/file/d/1HfZIULAr17ZRhQrPhFGBPDANKBe50l7E', 11, 1, '2023-07-29 04:52:01', NULL),
(38, 'Material Science', 'Material Science Complete', 'https://drive.google.com/file/d/1DvZPR08wIfzmWiT36e2_yRYz77opiWR2', 1, 1, '2023-07-29 04:53:42', NULL),
(39, 'ROBOTICS', 'ROBOTICS Complete', 'https://drive.google.com/file/d/1PglAkHIgNFRWnsYEmD6igC5N3WZqlGVU', 1, 1, '2023-07-29 04:53:42', NULL),
(40, 'GATE FAA (formula Algorithm  Application series and other)', 'Formula Algorithm  Application series', 'https://drive.google.com/file/d/1WvHqpAqe5_tko3osHpbTlVl8OLS7zf8e', 1, 1, '2023-07-29 04:53:42', NULL),
(41, 'Thermodynamics Tests', 'Thermodynamics Din-e-ilahi Test 1', 'https://forms.gle/RsKY3WiukTqSnuq5A', 1, 3, '2023-07-29 05:01:29', NULL),
(42, 'Thermodynamics Tests', 'Thermodynamics Din-e-ilahi Test 2', 'https://forms.gle/39qPxg1yeEU6oWv27', 2, 3, '2023-07-29 05:01:29', NULL),
(43, 'Thermodynamics Tests', 'Thermodynamics Din-e-ilahi Test 3', 'https://forms.gle/q4P13yac8EimzFDr9', 3, 3, '2023-07-29 05:01:29', NULL),
(44, 'Thermodynamics Tests', 'Thermodynamics Din-e-ilahi Test 4', 'https://forms.gle/jr39wd5dn8MbaSRK7', 4, 3, '2023-07-29 05:01:29', NULL),
(45, 'Thermodynamics Tests', 'Thermodynamics Din-e-ilahi Test 5', 'https://forms.gle/TfnJJ2ds5J72cspE9', 5, 3, '2023-07-29 05:01:29', NULL),
(46, 'Thermodynamics Tests', 'Thermodynamics Din-e-ilahi Test 6', 'https://forms.gle/4FEs5rhtnejwzZku6', 6, 3, '2023-07-29 05:01:29', NULL),
(47, 'Thermodynamics Tests', 'Thermodynamics Din-e-ilahi Test 7', 'https://forms.gle/USPtSzwf23bWtCQN6', 7, 3, '2023-07-29 05:01:29', NULL),
(48, 'NTMM Tests', 'NTMM Din-e-ilahi Test 1', 'https://forms.gle/hWPvcDRa6yAQi4EEA', 1, 3, '2023-07-29 05:04:06', NULL),
(49, 'NTMM Tests', 'NTMM Din-e-ilahi Test 2', 'https://forms.gle/sbNyvRhiTxpfstVq6', 1, 3, '2023-07-29 05:04:06', NULL),
(50, 'NTMM Tests', 'NTMM Din-e-ilahi Test 3', 'https://forms.gle/Zu31rxbUezgQefiq5', 1, 3, '2023-07-29 05:04:06', NULL),
(51, 'NTMM Tests', 'NTMM Din-e-ilahi Test 4', 'https://forms.gle/gpZ5oNPfGeU3TkSAA', 1, 3, '2023-07-29 05:04:06', NULL),
(52, 'NTMM Tests', 'NTMM Din-e-ilahi Test 5', 'https://forms.gle/GoVb77EN97DYoPsP8', 1, 3, '2023-07-29 05:04:06', NULL),
(53, 'NTMM Tests', 'NTMM Din-e-ilahi Test 6', 'https://forms.gle/ZwS3BYSf7EqScxFc9', 1, 3, '2023-07-29 05:04:06', NULL),
(54, 'NTMM Tests', 'NTMM Din-e-ilahi Test 7', 'https://forms.gle/FBaEvTQs34ciBTQi6', 1, 3, '2023-07-29 05:04:06', NULL),
(55, 'NTMM Tests', 'NTMM Din-e-ilahi Test 8', 'https://forms.gle/tCULhCVcX5RwoMaEA', 1, 3, '2023-07-29 05:04:06', NULL),
(56, 'NTMM Tests', 'NTMM Din-e-ilahi Test 9', 'https://forms.gle/Th5RxUueHqoptLsT7', 1, 3, '2023-07-29 05:04:06', NULL),
(57, 'NTMM Tests', 'NTMM Din-e-ilahi Test 10', 'https://forms.gle/fQCtz2RPJ7kAhSsN9', 1, 3, '2023-07-29 05:04:06', NULL),
(58, 'Welding Tests', 'Welding Din-e-ilahi Test 1', 'https://forms.gle/U4nNZGH8dixjqDLu8', 1, 3, '2023-07-29 05:08:32', NULL),
(59, 'Welding Tests', 'Welding Din-e-ilahi Test 2', 'https://forms.gle/AYpGerGjdSzsY7s2A', 2, 3, '2023-07-29 05:08:32', NULL),
(60, 'Welding Tests', 'Welding Din-e-ilahi Test 3', 'https://forms.gle/AYpGerGjdSzsY7s2A', 3, 3, '2023-07-29 05:08:32', NULL),
(61, 'Welding Tests', 'Welding Din-e-ilahi Test 4', 'https://forms.gle/se2tNUr7F6p5Zwpa9', 4, 3, '2023-07-29 05:08:32', NULL),
(62, 'Welding Tests', 'Welding Din-e-ilahi Test 5', 'https://forms.gle/nSNuCSyNoYg1ofgJ9', 5, 3, '2023-07-29 05:08:32', NULL),
(63, 'Welding Tests', 'Welding Din-e-ilahi Test 6', 'https://forms.gle/3UsPqRyR5gyBAMVf6', 6, 3, '2023-07-29 05:08:32', NULL),
(64, 'Welding Tests', 'Welding Din-e-ilahi Test 7', 'https://forms.gle/eFGvCwQLgSD52yeK9', 7, 3, '2023-07-29 05:08:32', NULL),
(65, 'Welding Tests', 'Welding Din-e-ilahi Test 8', 'https://forms.gle/zrLnawmrmyiVAGcV7', 8, 3, '2023-07-29 05:08:32', NULL),
(66, 'Welding Tests', 'Welding Din-e-ilahi Test 9', 'https://forms.gle/KEcgzuqatadmiMTX6', 9, 3, '2023-07-29 05:08:32', NULL),
(67, 'Welding Tests', 'Welding Din-e-ilahi Test 10', 'https://forms.gle/LpMkfBSFMe5L8JS3A', 10, 3, '2023-07-29 05:08:32', NULL),
(68, 'Welding Tests', 'Welding Din-e-ilahi Test 11', 'https://forms.gle/7Z2rHU1yqPniS7Ef6', 11, 3, '2023-07-29 05:08:32', NULL),
(69, 'Welding Tests', 'Welding Din-e-ilahi Test 12', 'https://forms.gle/P83bJSym165JXcNh6', 12, 3, '2023-07-29 05:08:32', NULL),
(70, 'Welding Tests', 'Welding Din-e-ilahi Test 13', 'https://forms.gle/b2uUfW55ffK7Wooa8', 13, 3, '2023-07-29 05:08:32', NULL),
(71, 'Welding Tests', 'Welding Din-e-ilahi Test 14', 'https://forms.gle/TtfhvmUEBxRXtuqA8', 14, 3, '2023-07-29 05:08:32', NULL),
(72, 'Welding Tests', 'Welding Din-e-ilahi Test 15', 'https://forms.gle/9RnUvPZ5hTybCZ7w7', 15, 3, '2023-07-29 05:08:32', NULL),
(73, 'Welding Tests', 'Welding Din-e-ilahi Test 16', 'https://forms.gle/zsUecxSuR22YH22L7', 16, 3, '2023-07-29 05:08:32', NULL),
(74, 'Welding Tests', 'Welding Din-e-ilahi Test 17', 'https://forms.gle/g1Nrwi2CJ9QekcjCA', 17, 3, '2023-07-29 05:08:32', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `student_class_attend`
--

CREATE TABLE `student_class_attend` (
  `id` varchar(255) NOT NULL,
  `class_timetable_with_class_batch_assigned_id` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `student_profile_id` varchar(255) NOT NULL,
  `profile_subject_with_batch_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `student_class_attend`
--

INSERT INTO `student_class_attend` (`id`, `class_timetable_with_class_batch_assigned_id`, `created_at`, `student_profile_id`, `profile_subject_with_batch_id`) VALUES
('0Iz0cazP667BeBcSlEsQ-TOWP93mu0J4RQPiSVECp-RsJLU5XWRBTrq7JX4MHu-Qq9YfMtW0HkXPBaev42y', 'xY4txz77Oxh9yKSyWsfH-KtTnriz6mMLAFhaK6lVK-GKvqziR0eeFyZrIRXOUM-TPtAJvJk72uuiemWb0oH', '2023-08-03 16:33:57', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', '8SDvKTs83iyOutcKT1ah-CnoId3vkeaT9XDzWyRcp-z93SUe3Ja5k9AJpYs3Jv-jeYPpBTit1Y2aBJnqI5y'),
('0K8gATRuhC3P6lVcsZ5L-2gTO0p5Vq6xxOnrkQMIZ-5T1S8WuuB7qw2A4CZpqz-OSjfO8w7BxOGwrfhu0xs', 'xs650cTHoz0rfDGzd7Z4-8ftoSXjPGyFJaVsF3BpO-HMHFeEJbzr8O9BCL4Suy-tgcOhSkc7MBf9W42m42W', '2023-07-27 15:40:45', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('1sRwGH5wUZH10k3izT0M-YPOgxkAO1r2G9lxQGtds-mY8uaWXtfCWceMmTQd0v-720EBWG7ccWixk0OYYzT', 'zh8ITeo5VJUGgVLITPqt-0QswJQmJPaA2dTfh4cuF-toWy2PyzzdAP2ihpAx8o-M0cw6t7BMGvXta0vD0DT', '2023-08-01 16:16:39', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('2FBV8tRyKv2ZqyBvdipE-9iC9O5qLRfm2XruaSRpR-LEDTr7RxzCC7iZrjCQDe-i1AK3BqwWFdjyAH8CoHz', 'bq7A9I4nHmlnXovOBvhv-SYPETaBvdQY8KEHbYPtn-lQTXmz8lHhmarh8FGRUI-2Xk2h7bk68W4oUeYdSjd', '2023-08-24 14:42:40', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('2ke0lGIWn4z8Hti4AAiY-dl2LOb94W4EA53WzFGVt-4cjrAnQ3oJwzRx8G1GEO-qIzM0zF6UnCiAvdAIHWX', 'oKZeTKBHuqqD7bbzwOMf-mpAVj4nenHladGRG3RKX-opuz9rz5WJO8eJpGYidR-aB9ee4c9sHyRPGZ9QCzT', '2023-07-25 16:06:54', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('2MBfURj2p48RLsqOTEir-C41SVXFOMCHxOzwZvOlm-YgWks4bpJcDHDRK7X9Wp-KLnPSeyt0qqbkH7DXDiA', 'xs650cTHoz0rfDGzd7Z4-8ftoSXjPGyFJaVsF3BpO-HMHFeEJbzr8O9BCL4Suy-tgcOhSkc7MBf9W42m42W', '2023-07-27 15:51:15', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('30OMtdY3IOzlovgDAAaB-0bQZUY9gybdh7KZH36Xd-r3z5h3EAw6W6ld3cj3R0-ikO9aOhvP31vWShUroIo', 'zh8ITeo5VJUGgVLITPqt-0QswJQmJPaA2dTfh4cuF-toWy2PyzzdAP2ihpAx8o-M0cw6t7BMGvXta0vD0DT', '2023-08-01 16:15:12', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('3D188YU6QwaCVbyoIbMM-gbf7dRR0uOsszqv7RYSz-mcJhrVLwBHjH0Y1IqmsE-PxsBS1rsr2pfiBmX73QR', 'FMx806XPuSr3u01qoWTZ-zy9cJRLpzHc4CVtrYr9Q-l4fLoOzSmbMhXgleYGRP-v30HwBLS8hLJuIsbIzDi', '2023-07-20 14:34:28', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('4ROJuwcBSAGgUwujyuBO-eq5tlm995PaPWeDvU3lF-j7go8HQazRKGZ0Pi9OGG-A55PInJ1ckPRxOVYfTCq', 'xIwxO7mk5sG0RZs7Pfdq-uSmzXj78v0cdkW3t8YLL-xgT2L3KDObziuz66P0BJ-FO7YhnOjKawu8aGqoERQ', '2023-07-13 15:09:15', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('4WJSvFzFbIpbqOgPt1IK-QY54yaFuPDV1pgVhXB1Q-la6mKOhnf6OIurF58jFS-UOwf441Cmp6M4jxUFnid', '8MyESaTKE97XAk4V6aIY-VVeLH8QZ5PHom4Pmwbfh-7EegdZ6pLPE24ZH3CcTG-O5S7Z3VQ3spoihc01YK7', '2023-08-05 05:33:24', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', '8SDvKTs83iyOutcKT1ah-CnoId3vkeaT9XDzWyRcp-z93SUe3Ja5k9AJpYs3Jv-jeYPpBTit1Y2aBJnqI5y'),
('529jUqVJTJPO9Q7rR9i8-P6bp0eirFOKuFOyDvVzd-I0YfheVIAWi9QVUhZwOF-k3xDyE3ra3xR4yxbw6kF', 'LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz', '2023-08-03 15:00:57', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('55L1zd6fh5rA638LRn4V-PYpg65WeDw06dz6opfeV-8u7LzCRA5hjcIa3Ou0ET-p7opxtfIQQgqVcv51tJ6', 'x19AmPsHbnR5ROlSkCJV-ZRSoLyqmPK8Wy5T4wLlP-IhtF5s9kyL5GGW7Bavdi-eOH96fFqzF6zbACVqabw', '2023-07-15 15:59:07', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('5S8GVy5taYRGHDKDL6ES-m6CgaPUoFIFiG3rvIHXr-HwUSOh3voF25q6xV65eK-MXZ6wrdzByplzluQd4KK', 'mAjR1hK91SPhxLnBXikD-j8T2J9WSTfPVhTBDIrDF-c3Clo0SzoOLZbklrfpSW-UobIJOAMH0SdeOuqdgZJ', '2023-06-30 08:05:33', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', '0kXdaIxSphcPbRkCXww4-vf7ORPdubu4LGMhjaq5v-6FEwWEwjdZrhVuAhA227-9soTunF5eELLpzzYGUOi'),
('5tAYyfQrKGW4pUpxAzhU-52clkBtDfmn89hOgtmWk-8W2hLVerYpRMc8GbuoMx-dK1VqzpOzOrO6esQ3xIs', 'xY4txz77Oxh9yKSyWsfH-KtTnriz6mMLAFhaK6lVK-GKvqziR0eeFyZrIRXOUM-TPtAJvJk72uuiemWb0oH', '2023-08-03 16:28:29', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', '8SDvKTs83iyOutcKT1ah-CnoId3vkeaT9XDzWyRcp-z93SUe3Ja5k9AJpYs3Jv-jeYPpBTit1Y2aBJnqI5y'),
('6DhYx6qXaGArSzODfFn8-IbLhfbV5GVQiqmfEh9wP-7P7eEw4STtlhllXf8boO-OtHVp6xUjSXVDqKWYFuF', 'McAFxkXMEweB7Wb5OUgX-C9Vp16xbS7frRhOodZlk-pwqDCE5B2KStTyOFR6s8-g9IPdIcmWIwflsFEWsiY', '2023-07-14 10:34:02', 'r9PrOgiVsSoK9OE2tiqP-WBLGsRX65V0v86iiOc35-2zxhp1IM3bO9KDWHEIsn-Ubk92Pxmn2B4KmsPX6j6', 'zU9Tdx6CiC5zG2Bmkneh-mWiu0UfBs95Fs5dYiCDl-1EDSPzE0t8CWe1n4e3zP-EQid9Z4szro0GQZiSei3'),
('6EzIEOr9YosSad733Emw-IIVVQgasCGfwaafs7u9k-FAlG7ZEetaLceKE3gqKZ-YRCub3aRpOYkvyGFwwTV', '8MyESaTKE97XAk4V6aIY-VVeLH8QZ5PHom4Pmwbfh-7EegdZ6pLPE24ZH3CcTG-O5S7Z3VQ3spoihc01YK7', '2023-08-05 05:20:10', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', '8SDvKTs83iyOutcKT1ah-CnoId3vkeaT9XDzWyRcp-z93SUe3Ja5k9AJpYs3Jv-jeYPpBTit1Y2aBJnqI5y'),
('6OJ9Xn2HmBxLtLlW7iMf-OOVoD554u43IpeCYrW06-VpfidPsfivfRVPSlI3c4-co8DoRVCS4rDCaDvvH9f', 'xIwxO7mk5sG0RZs7Pfdq-uSmzXj78v0cdkW3t8YLL-xgT2L3KDObziuz66P0BJ-FO7YhnOjKawu8aGqoERQ', '2023-07-13 15:18:08', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('6QMSv7L0XRxLZatRiggd-rmprpb9BLKcqiApGGJUb-h5FuKQL2MMyYwwuxuGdy-sLyZszvMo1fm2ohVtvzZ', '8MyESaTKE97XAk4V6aIY-VVeLH8QZ5PHom4Pmwbfh-7EegdZ6pLPE24ZH3CcTG-O5S7Z3VQ3spoihc01YK7', '2023-08-05 05:20:32', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', '8SDvKTs83iyOutcKT1ah-CnoId3vkeaT9XDzWyRcp-z93SUe3Ja5k9AJpYs3Jv-jeYPpBTit1Y2aBJnqI5y'),
('71HiMbmOd0mwYkqCg8Yc-yLd21Bw4yqM17AxtCyg9-BDbbVJaCmBH5pgXdO0vy-7192GDXi8xbleG8fozbJ', 'EhQROLDnG4V9Oag8iPrX-CWnjkknQEzTI29CU79yF-og7GBAYlJUspEMMLsbac-OkCs5sLjJ3AQj7XWx5aF', '2023-08-15 16:00:16', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('7T2g5suiT7OBCa6opBJK-abQrZSfWiYW2eHqwvM1F-ad0qhQToOZ5MR3hmtOT5-c19o6eLbCbP6aWgtcc4O', 'jmtb8XTF5ClLeOgwl4IG-AbIj1WwPmttQVbmMGcAC-lJpIzLQtwnxJrEkQnz1C-jQ1yjvJlc4Z0OroofHz8', '2023-07-07 10:40:28', 'r9PrOgiVsSoK9OE2tiqP-WBLGsRX65V0v86iiOc35-2zxhp1IM3bO9KDWHEIsn-Ubk92Pxmn2B4KmsPX6j6', 'zU9Tdx6CiC5zG2Bmkneh-mWiu0UfBs95Fs5dYiCDl-1EDSPzE0t8CWe1n4e3zP-EQid9Z4szro0GQZiSei3'),
('7xKxELVbbuWZGIafI1Pt-bRWxjQRZn5wrcKUbWmlz-83yj3EHOgWXe8HYAPWLO-sT3KtPMPJhaEcsPs64wz', 'k8Wf039HgMZ76AG8Bz0r-f9plrJwsHMgBha5Ega6B-VbZKhD4g798vMuvyEGbb-UKxlVHS9pcgVneILzIvJ', '2023-08-24 16:25:24', '1hrGWwbHcB9HOSAr76rl-jsKbMS5l1FpFBLliOoc2-DATXySC0l6O18JAODkeT-VLl7HCkiPi29l6Rs85as', 'u5CB1LiOGDoGjRqZ7E6j-pGB6v0DhDmaTmLXDQq2U-7KgfOE31O24HTEorSO1b-nLukgAZ9Ow1zKb5atEfJ'),
('7YE7gPpFY3DuCS5LlHWv-iBZOWbeEM35oWXeM48GH-l0t4PobAj0Bp0xRwdmQF-oW76nofUEETgoa2WaKEn', 'LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz', '2023-08-03 15:04:16', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('8bBeSE1jsufLMI3eEnnn-jWE0kOPu9OEx6lVWx01D-eoR9xRmywdMoDMCqsT4C-ktQSv2DDTaIubtjkEQvw', 'zh8ITeo5VJUGgVLITPqt-0QswJQmJPaA2dTfh4cuF-toWy2PyzzdAP2ihpAx8o-M0cw6t7BMGvXta0vD0DT', '2023-08-01 16:17:25', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('8dTrw4ODsCuMs1pIuPCg-v2ncgEDxWHXHMLCukE7M-K0qIkKWCmsWiDoQITXe5-LbIP4WhxafU3wuGx62gF', 'f3igd1EwkDah1nZxc0c7-2KU83rghclb8MigSYtoc-aJJwVRRaszkbByMvI84b-mGksIY0oq15aERxMBqVP', '2023-08-05 15:33:33', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('8fYpOZmEyMtOUe6TLA20-kU3SoTBdTTlKQ6FZTg3w-5t7usWdmxrBM3WbjKxXn-iPgFZ3K0tOcthoHaGDwX', 'LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz', '2023-08-03 14:34:30', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('8h9zvKCzamd0vu3O07iw-y1yq0Qm4799r5O3vRpGt-lvvrHkfxaKUsQ0jgj6aA-HrO7JHnggdsXOoettPwz', 'oKZeTKBHuqqD7bbzwOMf-mpAVj4nenHladGRG3RKX-opuz9rz5WJO8eJpGYidR-aB9ee4c9sHyRPGZ9QCzT', '2023-07-25 15:56:39', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('8hLiQeOOzkEXw6EDzym8-wFn4mqlkjUYu2DGIBASW-YWSJcqIWwHmin7ovppqM-5voqmzMDbYtJ0SAo0qIK', 'gBlIyxIgHOTAwZ42dsew-9D4v0484OSltz0n3pcAm-C4pUXYwxgvp3RemA39BQ-M8mqHRqTJ98wul55FhhR', '2023-08-22 15:42:47', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('8oppeoELmExHSKmGJpRb-12OrnItlJsEZLbY4DH7J-SifP84CLJHnGi64uXjzg-ilXLzw8YdXq9Ob3LBGOX', 'FMx806XPuSr3u01qoWTZ-zy9cJRLpzHc4CVtrYr9Q-l4fLoOzSmbMhXgleYGRP-v30HwBLS8hLJuIsbIzDi', '2023-07-20 14:39:52', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('96GKkneg9llid3YjvMOM-rc1dSLxITvgqfqeEiOOI-KaOdvmVpV1vvGdkTtDut-EQvlRjMW2BZKRqusCanf', 'LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz', '2023-08-03 14:55:47', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('96Jm2JrsGY6VOARdO4Q9-OqFWc6RlJnBOHgn4jTFl-Ydrv35jdm3mrYfHO631E-SmtEVg9IyALV9bVEuW8K', 'oKZeTKBHuqqD7bbzwOMf-mpAVj4nenHladGRG3RKX-opuz9rz5WJO8eJpGYidR-aB9ee4c9sHyRPGZ9QCzT', '2023-07-25 16:28:14', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('9CixrHYIeMWhISUs9CK0-YFU5YxXfzmTOalYBC6IA-tXvCe1omq4SjflB9Kde9-e9AQ7AdaRJUhGyU6wx85', 'xs650cTHoz0rfDGzd7Z4-8ftoSXjPGyFJaVsF3BpO-HMHFeEJbzr8O9BCL4Suy-tgcOhSkc7MBf9W42m42W', '2023-07-27 15:15:40', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('9ihJq51gQLiA7crwziUw-89fAnpKp33ZQailOjBtf-gAzt0u4xkmP9UIbwXII9-58otTDBfJmpEPBlULsvp', 'LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz', '2023-08-03 14:45:01', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('9JwbyOli0rumZ5Dyv8KL-RMuGpxZz7i6QlHkoICJH-OUM22XwXsw69V3yodSO8-68RF4zDwXCuLo0WkCOiT', 'LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz', '2023-08-03 14:52:15', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('9MBE5JOrgSqxrPgPEAtj-djBr9gH5FHoYwvO2SOiZ-xKUx5A7gmyODdQWZGBAr-Jp6qMRBgJFBAzbhC4hzR', 'EhQROLDnG4V9Oag8iPrX-CWnjkknQEzTI29CU79yF-og7GBAYlJUspEMMLsbac-OkCs5sLjJ3AQj7XWx5aF', '2023-08-15 16:03:09', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('AGQzVFGcbOrdc9eHRt10-dtIg0w1SSzDOrvRAOgOu-tVZZOawwd7Ajn3veIh3z-VC5iE6HhnFxOCFTCMUFd', 'xs650cTHoz0rfDGzd7Z4-8ftoSXjPGyFJaVsF3BpO-HMHFeEJbzr8O9BCL4Suy-tgcOhSkc7MBf9W42m42W', '2023-07-27 15:14:51', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('ApMZgS2ilV3i5Zvx0ddV-yMLcePfZeD9q6QtGM3W3-63pKDpCtazgOK4nTYryn-HawVv3KYYWUM5Lfh5a8S', 'xIwxO7mk5sG0RZs7Pfdq-uSmzXj78v0cdkW3t8YLL-xgT2L3KDObziuz66P0BJ-FO7YhnOjKawu8aGqoERQ', '2023-07-13 16:22:19', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('AqkxGJr21d9FeQZvLIdy-SRov2RKSyT3apG1PBknS-zOf9Ef9WUrH4stdaPoxr-Ib9DahB1IFEJMQCeHeXD', 'ww8MhkAGKDghdlOTk0fB-I22z83wJ4AaYOSiGQjcO-GOpTdZDLLcROe06cfe3w-4fKdnwtvZU0GVM6Kg2Eb', '2023-08-17 14:56:19', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('ar2IDROltQKGOAcyL43i-7sjmUni7Sq6HbEEgchKe-xGvLku5wDnykKBxqlmOj-YVTUqLLkSiP88OlkaOWl', 'xs650cTHoz0rfDGzd7Z4-8ftoSXjPGyFJaVsF3BpO-HMHFeEJbzr8O9BCL4Suy-tgcOhSkc7MBf9W42m42W', '2023-07-27 16:12:11', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('AU9EY514pFFbTEucVWJa-OuSn1K70kO8d4a1YIcWO-2Be2Jde5T3GCAjmAyO17-2dmppf2X4IEKknRZb6az', 'x19AmPsHbnR5ROlSkCJV-ZRSoLyqmPK8Wy5T4wLlP-IhtF5s9kyL5GGW7Bavdi-eOH96fFqzF6zbACVqabw', '2023-07-15 15:58:31', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('AUDRMmgVsOhkV9TKB2qH-EzXfhBkBUnW5AORuMSOh-7otU6daxVq8fQyoBr7Op-dbW70wV9pDgnTRt1nfAT', 'LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz', '2023-08-03 15:01:54', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('Be8JhJZv2sJaqmGbeSv1-SuBxuAhsTTMxBY75odjp-GmReUOuDUroBwQLB1A3I-z9oJwGylqQLUMp0pb6Kq', 'bq7A9I4nHmlnXovOBvhv-SYPETaBvdQY8KEHbYPtn-lQTXmz8lHhmarh8FGRUI-2Xk2h7bk68W4oUeYdSjd', '2023-08-24 15:59:22', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('bfJ2kgRqYedZFj48euCI-HvBu2V8roi3obMuicpRd-V77MO1rvPUzJyZ5bRCc7-FO5aQliZRm04hUxx52wq', 'oKZeTKBHuqqD7bbzwOMf-mpAVj4nenHladGRG3RKX-opuz9rz5WJO8eJpGYidR-aB9ee4c9sHyRPGZ9QCzT', '2023-07-25 16:07:02', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('bgKUFjumh7Dgy2ogp0nd-IDRPuTaGHxV9Jis3ymDL-Urf9eHHzlXBk8eE9Crnt-jOb0njKsuCofyj8m251R', 'oKZeTKBHuqqD7bbzwOMf-mpAVj4nenHladGRG3RKX-opuz9rz5WJO8eJpGYidR-aB9ee4c9sHyRPGZ9QCzT', '2023-07-25 16:17:29', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('BooITiWcWdfDVQrUsR9b-GXRuHcAtGrB7MV2iz9JW-tUG7AH8x7JMqm7zOXo8R-sMEsGqmrnt43ffLQo0Dp', 'k8Wf039HgMZ76AG8Bz0r-f9plrJwsHMgBha5Ega6B-VbZKhD4g798vMuvyEGbb-UKxlVHS9pcgVneILzIvJ', '2023-08-24 16:19:32', '1hrGWwbHcB9HOSAr76rl-jsKbMS5l1FpFBLliOoc2-DATXySC0l6O18JAODkeT-VLl7HCkiPi29l6Rs85as', 'u5CB1LiOGDoGjRqZ7E6j-pGB6v0DhDmaTmLXDQq2U-7KgfOE31O24HTEorSO1b-nLukgAZ9Ow1zKb5atEfJ'),
('bpunwjGDv5HCEKSEJKZd-oBKm5Bnb5v4Qwb5wtqzX-378xL8hiRmkj0R80JrF5-V8JpXLffGjRkAg2u2z1W', '8MyESaTKE97XAk4V6aIY-VVeLH8QZ5PHom4Pmwbfh-7EegdZ6pLPE24ZH3CcTG-O5S7Z3VQ3spoihc01YK7', '2023-08-05 05:35:40', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', '8SDvKTs83iyOutcKT1ah-CnoId3vkeaT9XDzWyRcp-z93SUe3Ja5k9AJpYs3Jv-jeYPpBTit1Y2aBJnqI5y'),
('bYQ9FM84pVuVF3IzBGQ7-LknrUVJz2TMPEHPksOtY-m0ssSkL1d5bvUQrREbjd-JW0AhQg7R5n1s3fjlX8o', 'FMx806XPuSr3u01qoWTZ-zy9cJRLpzHc4CVtrYr9Q-l4fLoOzSmbMhXgleYGRP-v30HwBLS8hLJuIsbIzDi', '2023-07-20 14:38:24', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('c9FOxpBqFDmHIl2knf3X-XgpnvyripO3acH465PSD-XSjGY0e5m3H0mSmDwQRD-sn8FqIDrbhP9QUXI9rZ2', 'FMx806XPuSr3u01qoWTZ-zy9cJRLpzHc4CVtrYr9Q-l4fLoOzSmbMhXgleYGRP-v30HwBLS8hLJuIsbIzDi', '2023-07-20 14:41:50', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('cbiz4wgKXEPqdOTtoYWL-S8RJwTdOrlipJdl0fChR-3r1kUtC53PuOWSMLCreg-Ov81L43QSgny164zjZCe', 'LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz', '2023-08-03 14:36:03', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('CI0EJJlPDo2AiB20zOCR-xukS3g516PCeVHFlCt9D-ltMa4814VXnmjtUiJXgZ-Q58YzWmayiunYYUfbU85', '8MyESaTKE97XAk4V6aIY-VVeLH8QZ5PHom4Pmwbfh-7EegdZ6pLPE24ZH3CcTG-O5S7Z3VQ3spoihc01YK7', '2023-08-05 03:37:10', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', '8SDvKTs83iyOutcKT1ah-CnoId3vkeaT9XDzWyRcp-z93SUe3Ja5k9AJpYs3Jv-jeYPpBTit1Y2aBJnqI5y'),
('CRWZrWCWJ2voLvLCjzyp-zB7Xr2FwLfL5uulGeY3O-MYluq2KrnQwnYWwRek9B-FqRLKjWAGzCoj8nGkcAM', 'FMx806XPuSr3u01qoWTZ-zy9cJRLpzHc4CVtrYr9Q-l4fLoOzSmbMhXgleYGRP-v30HwBLS8hLJuIsbIzDi', '2023-07-20 14:34:16', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('CS3psOtM1iCjjOnQHvt6-dRvDX7VRGPTtV2DjuuCD-wJ1hhmyZ7ijkOUzTxvb9-y9QoHq2w6HZiUDeiTsbt', 'xY4txz77Oxh9yKSyWsfH-KtTnriz6mMLAFhaK6lVK-GKvqziR0eeFyZrIRXOUM-TPtAJvJk72uuiemWb0oH', '2023-08-03 16:27:30', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', '8SDvKTs83iyOutcKT1ah-CnoId3vkeaT9XDzWyRcp-z93SUe3Ja5k9AJpYs3Jv-jeYPpBTit1Y2aBJnqI5y'),
('DdHHTK4W0OsEateO1iat-EUARxHMfmVuOEOOYulkj-6uC9AdgTtHSQxxbjPQdv-xvAdOvxq4OQB4rROTUxl', 'xIwxO7mk5sG0RZs7Pfdq-uSmzXj78v0cdkW3t8YLL-xgT2L3KDObziuz66P0BJ-FO7YhnOjKawu8aGqoERQ', '2023-07-13 15:47:16', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('DE9MepA8cvmdJhBeLZtu-YOKkAgCBT61YW0BmiBAS-fpg2yGLcz1zECBV9lhFs-VAGT4fa5yhKKkjv5093e', 'LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz', '2023-08-03 14:57:38', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('dJO1AZz2OXFsFH3tdhmj-ysb2hgpL4VpWx49wBtH6-uOBP7FalhlIiKO2g7XCs-JJbZoaOnfPHtvJtrZL5r', 'bq7A9I4nHmlnXovOBvhv-SYPETaBvdQY8KEHbYPtn-lQTXmz8lHhmarh8FGRUI-2Xk2h7bk68W4oUeYdSjd', '2023-08-24 14:41:55', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('dKDkF7eOsrEezDbH27H1-OV8auVrB6aVUkjrarYOo-Z5cnZxhjFUm0bwlERuPi-fdMdQxUwOSOKhpOxRnv9', 'oKZeTKBHuqqD7bbzwOMf-mpAVj4nenHladGRG3RKX-opuz9rz5WJO8eJpGYidR-aB9ee4c9sHyRPGZ9QCzT', '2023-07-25 15:56:51', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('dLyJ35Wf3FXgO3bgOqMM-OgvPdToRgH71Fc9Jaq0z-dCC2Z9vp1oiC3OG6DRdv-S4OeOfuPdXQptpe4KHFX', 'EhQROLDnG4V9Oag8iPrX-CWnjkknQEzTI29CU79yF-og7GBAYlJUspEMMLsbac-OkCs5sLjJ3AQj7XWx5aF', '2023-08-15 16:00:56', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('dqZYADwM4OXECj85RtIw-bpXdbejLtS5ul9mxrGkt-UgXFqGUP4qaQxx6noZOj-x3DhomgkO6XtCR15k3CT', 'xs650cTHoz0rfDGzd7Z4-8ftoSXjPGyFJaVsF3BpO-HMHFeEJbzr8O9BCL4Suy-tgcOhSkc7MBf9W42m42W', '2023-07-27 15:26:06', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('Dsg5IAChOCzePAHCGU6S-ShaRugFhI4QbCuJXbg52-W8uxZEkYjdVr40QymDFD-6Vo7QlK9QF1dpkJ7K8O0', 'xY4txz77Oxh9yKSyWsfH-KtTnriz6mMLAFhaK6lVK-GKvqziR0eeFyZrIRXOUM-TPtAJvJk72uuiemWb0oH', '2023-08-03 16:58:43', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', '8SDvKTs83iyOutcKT1ah-CnoId3vkeaT9XDzWyRcp-z93SUe3Ja5k9AJpYs3Jv-jeYPpBTit1Y2aBJnqI5y'),
('eK0k6z87rL2ZG4WlheOI-VPDqWRS9K56znOScn2L3-OoEVbEO0xphof203tu1S-yYOuVJ6g0Rk4imqxY4m6', 'tn44zbXXDgYVGSiZ0b0R-aZu96qpICfen5rEQwEjw-OTKPixxWu1rkPplxzKQj-Kg96wUdMhBkEpaHhTRGe', '2023-08-10 15:20:52', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('F30vHybLKw2ZbAy4j1SC-qzXRe23oZgtwPgmokf4b-zZkD2qxCZnnFWnwqWVTE-nZoazqCcHl9Lvurrk7hX', 'f3igd1EwkDah1nZxc0c7-2KU83rghclb8MigSYtoc-aJJwVRRaszkbByMvI84b-mGksIY0oq15aERxMBqVP', '2023-08-05 15:32:29', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('F7rEh3h777cCR0uhG8F4-M4FRpRm7l73Zx47fdRAs-rOJpjo6E0pX6xLVYIgKF-3BCptEdbVCWrihJvGSyF', 'FMx806XPuSr3u01qoWTZ-zy9cJRLpzHc4CVtrYr9Q-l4fLoOzSmbMhXgleYGRP-v30HwBLS8hLJuIsbIzDi', '2023-07-20 14:39:05', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('feDBHEQAen2Rq9sbRTXP-kcaF1gl9to73DrmYHBOj-4hiZgDnrICcL8xnm4l4P-5uoKeOKSTbO29b4tUcYw', 'x19AmPsHbnR5ROlSkCJV-ZRSoLyqmPK8Wy5T4wLlP-IhtF5s9kyL5GGW7Bavdi-eOH96fFqzF6zbACVqabw', '2023-07-15 16:57:10', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('feRGbLPb2TuJF7OERO9I-EwoDLdZf7dxyGwrBtcL1-7MQObPRz2zQ6WgkaouxV-IPQTSEJYhJBIuL9WedhU', 'nPKtz6OsHrWD5uEa2Xzj-nFWBJww5DBcwJ3ZwQ7gw-ksjkoGO8laZlb4KhqK6y-S7IwOd6FjqWa9jRJEBVG', '2023-07-12 10:35:54', 'r9PrOgiVsSoK9OE2tiqP-WBLGsRX65V0v86iiOc35-2zxhp1IM3bO9KDWHEIsn-Ubk92Pxmn2B4KmsPX6j6', 'zU9Tdx6CiC5zG2Bmkneh-mWiu0UfBs95Fs5dYiCDl-1EDSPzE0t8CWe1n4e3zP-EQid9Z4szro0GQZiSei3'),
('fgZwtDwoj8H4isnlcFfg-DMVl28hmaWmtyuROIjvp-EEj0pRmLFOBUXFZfbuJX-1M9nAzPSmlhWyghrlQVU', 'xs650cTHoz0rfDGzd7Z4-8ftoSXjPGyFJaVsF3BpO-HMHFeEJbzr8O9BCL4Suy-tgcOhSkc7MBf9W42m42W', '2023-07-27 14:52:07', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('FP0yetdeOgOfljkAY49F-vsb0o8EL55YlZUODSwka-O8DlfOly7sZqE3jzyVIS-ecHdbooVtr1J1cp6GZ8V', 'xs650cTHoz0rfDGzd7Z4-8ftoSXjPGyFJaVsF3BpO-HMHFeEJbzr8O9BCL4Suy-tgcOhSkc7MBf9W42m42W', '2023-07-27 15:25:55', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('Fy9424JnFvi6GubMhI4x-OBs3BAF6fEcTj501Wda4-RcohODVrG4kX7MWbyOOn-O8JpZKZOaCCqghEnd5k2', 'RtD2gzqnabqRFdBeTV7h-a6Cjc6M6xhQPutOI4lpW-nz1O9Ij4gRb3lAv4U54f-z4TcqOtxPO5AagxsL0q9', '2023-08-25 14:39:17', '1hrGWwbHcB9HOSAr76rl-jsKbMS5l1FpFBLliOoc2-DATXySC0l6O18JAODkeT-VLl7HCkiPi29l6Rs85as', 'u5CB1LiOGDoGjRqZ7E6j-pGB6v0DhDmaTmLXDQq2U-7KgfOE31O24HTEorSO1b-nLukgAZ9Ow1zKb5atEfJ'),
('fZWkyHeDqHLW0KheWTy3-stwzeyx0A8ZPAjOaoXOO-ixwy3GRLYzxYHdJm9WST-k4bu6D069tX3JvEx3z3K', 'xIwxO7mk5sG0RZs7Pfdq-uSmzXj78v0cdkW3t8YLL-xgT2L3KDObziuz66P0BJ-FO7YhnOjKawu8aGqoERQ', '2023-07-13 15:58:02', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('gcKRtd10AQO5gi6qSOkk-qR84afkSG7eF7ajYBBR3-Tjyoe5P9J3QoMTbbpQjO-VV9biROVSCu8IMjovs8d', 'xIwxO7mk5sG0RZs7Pfdq-uSmzXj78v0cdkW3t8YLL-xgT2L3KDObziuz66P0BJ-FO7YhnOjKawu8aGqoERQ', '2023-07-13 16:08:21', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('GKYSk4KGiVAGYdRyrdrX-OJOlX1cPowS9eOs6RZT3-ilpKcL952MnwLH5pRniY-QORuFVcFH0xbruBlWQbv', 'xs650cTHoz0rfDGzd7Z4-8ftoSXjPGyFJaVsF3BpO-HMHFeEJbzr8O9BCL4Suy-tgcOhSkc7MBf9W42m42W', '2023-07-27 14:54:49', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('gKYYId1e5QRsYz2LS12d-neZEgioOA29MZ8RPeQ09-9TudzRfRcld124qwmZZW-JhcDvAIuOxmqxnx3d0Cx', 'digDQfQWu0SOZOAO1dOa-zwbJFdSyfFMAJ9Vk01CU-g9Q4ezPF4iO1CavxOJrZ-JpMHCTZXUUftBIM42LA9', '2023-08-03 16:23:00', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', '0kXdaIxSphcPbRkCXww4-vf7ORPdubu4LGMhjaq5v-6FEwWEwjdZrhVuAhA227-9soTunF5eELLpzzYGUOi'),
('GLCRnPylSwY6fW1WBDRu-AvkOazDq7ebjJyA8c8vn-1uH4VsXosKP8tDqsWulI-zwMgh6gf6v72VDV2ABjj', 'x19AmPsHbnR5ROlSkCJV-ZRSoLyqmPK8Wy5T4wLlP-IhtF5s9kyL5GGW7Bavdi-eOH96fFqzF6zbACVqabw', '2023-07-15 17:07:32', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('GmYV1xKTmweb4pdW3pww-AziOb5o4cBXDS39HOl5g-Larxmhc7SQCBka4njUju-3goSOb4V1imvtpKegkCs', 'AagfGmCro4HTxUZyVmwL-UTgskP0wUlLSlShQA2xS-uniJuXXig69ZqqDWJGwQ-hG23nLORWiUSF0c35OJk', '2023-08-07 11:51:11', 'r9PrOgiVsSoK9OE2tiqP-WBLGsRX65V0v86iiOc35-2zxhp1IM3bO9KDWHEIsn-Ubk92Pxmn2B4KmsPX6j6', 'zU9Tdx6CiC5zG2Bmkneh-mWiu0UfBs95Fs5dYiCDl-1EDSPzE0t8CWe1n4e3zP-EQid9Z4szro0GQZiSei3'),
('GrPkSo8YBwRFyQ4vPtPK-3U1V7LOTeGwcSrrwZZ5L-qOQustxOsV9KLAhRqJ4S-fGBY3II8l277160qjdRQ', 'oKZeTKBHuqqD7bbzwOMf-mpAVj4nenHladGRG3RKX-opuz9rz5WJO8eJpGYidR-aB9ee4c9sHyRPGZ9QCzT', '2023-07-25 15:36:11', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('grRHHBhB3PMVkBmoB2Vm-hrtMCDtiqc3DpZmviaaX-xO2PEOaob06QF0Xi8DPA-sVAYQK7QSRrxBXoSWh4o', 'bq7A9I4nHmlnXovOBvhv-SYPETaBvdQY8KEHbYPtn-lQTXmz8lHhmarh8FGRUI-2Xk2h7bk68W4oUeYdSjd', '2023-08-24 14:43:05', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('gyg9ydc2P4OfLAYQyMWw-eV3Bf2coXPl9GT5GE1PO-HBvIjDu12mw73a02Z97g-0vlUcpZy1SH3sOqn5jqd', 'oKZeTKBHuqqD7bbzwOMf-mpAVj4nenHladGRG3RKX-opuz9rz5WJO8eJpGYidR-aB9ee4c9sHyRPGZ9QCzT', '2023-07-25 16:07:20', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('HD3GLpgDFZoQt1KWJB42-ARYUi7CS51qYm5gwzdkY-v6eXZWPakL0jPEM6bfqJ-OwWXpOSTizujijWW6YIE', '3heBxjrGpDLWCc0XHnCk-HgF6OSs4VA9ZdsynLk3s-4Mqyyn4lw5gRETCbyxFH-yQrE8S23w2WTGFMalD2s', '2023-07-24 05:54:04', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', '0kXdaIxSphcPbRkCXww4-vf7ORPdubu4LGMhjaq5v-6FEwWEwjdZrhVuAhA227-9soTunF5eELLpzzYGUOi'),
('HDh544q0gi4QhxmdlXAt-Wjs1pBBW1tFqJBKIHBqM-dYZTaE1WxAP3O5AdAGm4-TbccvdjjSXO3KBKxXycK', 'gBlIyxIgHOTAwZ42dsew-9D4v0484OSltz0n3pcAm-C4pUXYwxgvp3RemA39BQ-M8mqHRqTJ98wul55FhhR', '2023-08-22 15:41:59', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('HteQAjE6fHkxmbwnUdQl-fItifTfzOs8ax6BwnQUf-crLAWbiF4tjdLAfiEv6M-Cu9i05zF1BlxXRrabOHK', 'ErrHq3djt1PZe2mIWALK-PMv12HfUjhxmBplFbT6F-OLdbpdn10XzG7O0LXG9V-TGwOjYTs3jz6Xeq3v8TW', '2023-08-08 15:31:24', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('hUhMWA8oPSOBwc8nWvwR-Ea5g4OslHDtst0bfu1Mp-IZKOsn4PV0qaPYYoZYYh-RJADzjOmR6DpJOf2gAYw', 'x19AmPsHbnR5ROlSkCJV-ZRSoLyqmPK8Wy5T4wLlP-IhtF5s9kyL5GGW7Bavdi-eOH96fFqzF6zbACVqabw', '2023-07-15 15:48:01', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('iGHGcKqQmGfZ4bFYdttn-tgSuUOs7KOpD6jhAZWqd-pAeeBldMYBOZIzIy0ZVc-FJRBB4VE1Rvxixbp0dLB', '8MyESaTKE97XAk4V6aIY-VVeLH8QZ5PHom4Pmwbfh-7EegdZ6pLPE24ZH3CcTG-O5S7Z3VQ3spoihc01YK7', '2023-08-05 05:14:32', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', '8SDvKTs83iyOutcKT1ah-CnoId3vkeaT9XDzWyRcp-z93SUe3Ja5k9AJpYs3Jv-jeYPpBTit1Y2aBJnqI5y'),
('Iujq4kCoaTBE0n9dPMr2-g9VonKmsUHBaKl9Ph9Sf-Sqzj3uJAg1611PoI7pbK-fJ0skgCa20dTJetUMk7V', 'xIwxO7mk5sG0RZs7Pfdq-uSmzXj78v0cdkW3t8YLL-xgT2L3KDObziuz66P0BJ-FO7YhnOjKawu8aGqoERQ', '2023-07-13 15:57:18', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('JbIr7qSRfg4tloMwxUoO-f6pWkwLHhMWhcMD8uxog-bZfmP0HPiB4yquqMUPBG-7Gy46C5mKAIdoIGw3f32', 'AagfGmCro4HTxUZyVmwL-UTgskP0wUlLSlShQA2xS-uniJuXXig69ZqqDWJGwQ-hG23nLORWiUSF0c35OJk', '2023-08-07 11:03:31', 'r9PrOgiVsSoK9OE2tiqP-WBLGsRX65V0v86iiOc35-2zxhp1IM3bO9KDWHEIsn-Ubk92Pxmn2B4KmsPX6j6', 'zU9Tdx6CiC5zG2Bmkneh-mWiu0UfBs95Fs5dYiCDl-1EDSPzE0t8CWe1n4e3zP-EQid9Z4szro0GQZiSei3'),
('JhG5Xql5WErUsBrwdbZn-rgiavjYD1noJfO035BQl-M269AePK0S3tD0nUgPwj-2hTePZgxlvaJ9OP0O6V3', 'LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz', '2023-08-03 14:46:20', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('JJ7OEaRthgYYzGAO4RV6-iHTSVsjl5lxRMdxqcGdC-c6XRfoav9PHx6OhXA7A1-w1b4OyRm9sR5MHLvJqrU', 'xs650cTHoz0rfDGzd7Z4-8ftoSXjPGyFJaVsF3BpO-HMHFeEJbzr8O9BCL4Suy-tgcOhSkc7MBf9W42m42W', '2023-07-27 16:01:16', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('JJxvGClZFSW3lx1iPXXx-pJOWdOP82G2Gr21bTW1p-XFOeil1hAc2kj6XTECSO-p94f9B8HSgrWiVJP0RzJ', 'LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz', '2023-08-03 14:33:21', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('JPlwyA4aoQiLxCF3EMmz-9elo6bK6wljeWyBGsvsb-bJrDgZR0Lx8sgSCtFurM-aUxtViv7oz7OK7mkovqT', 'xs650cTHoz0rfDGzd7Z4-8ftoSXjPGyFJaVsF3BpO-HMHFeEJbzr8O9BCL4Suy-tgcOhSkc7MBf9W42m42W', '2023-07-27 15:04:55', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('JsPtRcXhkzrRTJlxECOA-qKiIUiKR0OjEFt1tILSz-wulxdiPnWpcGKhd23d50-6T0l60ZiF3ZXUSwIU8Ku', 'oKZeTKBHuqqD7bbzwOMf-mpAVj4nenHladGRG3RKX-opuz9rz5WJO8eJpGYidR-aB9ee4c9sHyRPGZ9QCzT', '2023-07-25 16:17:51', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('jVjCdaIRxcKtGqPMBwtF-IuA9nkGUP8E2jwOextdw-iqmtJBqsgzx5eH90OWC4-e6kZd3Af5DdSUXjHK0Jw', 'x19AmPsHbnR5ROlSkCJV-ZRSoLyqmPK8Wy5T4wLlP-IhtF5s9kyL5GGW7Bavdi-eOH96fFqzF6zbACVqabw', '2023-07-15 15:58:22', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('JXv3pnfcEsxmCR7ZmgVG-m5OQaYTbEO4YgiUKgFBw-LwRknCOiZFQD0lL3kUib-XJYyZaIeuRkMPFGiOJDU', 'bq7A9I4nHmlnXovOBvhv-SYPETaBvdQY8KEHbYPtn-lQTXmz8lHhmarh8FGRUI-2Xk2h7bk68W4oUeYdSjd', '2023-08-24 15:58:27', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('kO0u8K8B22Lw3lzWfXwh-HMH6SjG5V3QcR1btZfLI-5cdGnUAUT0BtqgZODlJa-uwIstik2DyLPKwSpbowK', 'AagfGmCro4HTxUZyVmwL-UTgskP0wUlLSlShQA2xS-uniJuXXig69ZqqDWJGwQ-hG23nLORWiUSF0c35OJk', '2023-08-07 10:57:56', 'r9PrOgiVsSoK9OE2tiqP-WBLGsRX65V0v86iiOc35-2zxhp1IM3bO9KDWHEIsn-Ubk92Pxmn2B4KmsPX6j6', 'zU9Tdx6CiC5zG2Bmkneh-mWiu0UfBs95Fs5dYiCDl-1EDSPzE0t8CWe1n4e3zP-EQid9Z4szro0GQZiSei3'),
('ksTCH3dBQW5z2xd6G6SH-1BeJKa3ITa8v60rFwXqF-jA715D8SaqpVkhpPqWET-FHb91LECllqyI7sgeglr', '8MyESaTKE97XAk4V6aIY-VVeLH8QZ5PHom4Pmwbfh-7EegdZ6pLPE24ZH3CcTG-O5S7Z3VQ3spoihc01YK7', '2023-08-05 05:17:19', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', '8SDvKTs83iyOutcKT1ah-CnoId3vkeaT9XDzWyRcp-z93SUe3Ja5k9AJpYs3Jv-jeYPpBTit1Y2aBJnqI5y'),
('KujOV9DbBhopTpEKPBIG-GxfSlvkVuP5xeh7MdPvu-Kzyuu4ub8mWnX8rYsDKx-kBEOXsv65lIm2PK7YO74', '6TzSZMQndAdCUeT1C80o-pkyjkQjTzcKKeKarI40H-dEPTIkZoMv72naGSuSq1-LndrOBLOlEdwBfHisVD4', '2023-07-11 14:22:42', 'WkGWUdaWPvJxgtoKP2Fu-fSje9MkfjluOT3UJRjPt-PKmRhYoPIotxEIiJGMUj-xfvrBEv1h01Q24D7rlpW', 'mSHslnoeOCI74rCKJ4aw-H7JCdW9Q7M3gw2O1XSAk-FTMLi0Pr1OAZUOrdKhjC-JivGTOVSnTnqk8OYuAhG'),
('l7WsnASj9URh2kbOEOkz-2xtPlCPkbTl5gYoZXtZ9-ahUh5qO1Hfv3tSK25lJa-AyEzmUGeZkt4MG6HE9TC', 'AagfGmCro4HTxUZyVmwL-UTgskP0wUlLSlShQA2xS-uniJuXXig69ZqqDWJGwQ-hG23nLORWiUSF0c35OJk', '2023-08-07 10:39:23', 'r9PrOgiVsSoK9OE2tiqP-WBLGsRX65V0v86iiOc35-2zxhp1IM3bO9KDWHEIsn-Ubk92Pxmn2B4KmsPX6j6', 'zU9Tdx6CiC5zG2Bmkneh-mWiu0UfBs95Fs5dYiCDl-1EDSPzE0t8CWe1n4e3zP-EQid9Z4szro0GQZiSei3'),
('L9ZgxwO9qL39wmTOaolu-gJhMiudkD6inH8lCGkYH-MHV3AFlj7IUTaS9WyTt6-dLqpsvKtefBH2aa3YosU', 'ww8MhkAGKDghdlOTk0fB-I22z83wJ4AaYOSiGQjcO-GOpTdZDLLcROe06cfe3w-4fKdnwtvZU0GVM6Kg2Eb', '2023-08-17 14:57:02', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('ldzQhdGaqp2aVuxsY92D-vit186t41W4s5Yx7GkwX-F9FLz4JAVd9P1b60esoE-53gnIkR7y9nURbwBXKUF', 'oKZeTKBHuqqD7bbzwOMf-mpAVj4nenHladGRG3RKX-opuz9rz5WJO8eJpGYidR-aB9ee4c9sHyRPGZ9QCzT', '2023-07-25 15:46:30', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('LGT545ZqWcmuZtD79CR1-8Q4nzXbV1cxOi0T2YSh6-4fdYkp3hDs0zV8vIGYTe-A9Vz5kY8YTghFoty4ung', 'xIwxO7mk5sG0RZs7Pfdq-uSmzXj78v0cdkW3t8YLL-xgT2L3KDObziuz66P0BJ-FO7YhnOjKawu8aGqoERQ', '2023-07-13 16:21:56', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('lp5ysEWCRCvhQGgHPyVg-7yYmx6AnK2f6vmJRfjye-MBaOR54ev80SOyok0Rd6-JaGZeu2HZZFjCw4wyhMJ', 'mAjR1hK91SPhxLnBXikD-j8T2J9WSTfPVhTBDIrDF-c3Clo0SzoOLZbklrfpSW-UobIJOAMH0SdeOuqdgZJ', '2023-06-30 08:00:54', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', '0kXdaIxSphcPbRkCXww4-vf7ORPdubu4LGMhjaq5v-6FEwWEwjdZrhVuAhA227-9soTunF5eELLpzzYGUOi'),
('lUVlQYEuGrS3LEct5Mw0-tjHJ9AFJIllBg9uXa7zu-BjG3zHwb8tLO2DP5O2bp-U04MHBVsjmrAWMId2CLu', 'bq7A9I4nHmlnXovOBvhv-SYPETaBvdQY8KEHbYPtn-lQTXmz8lHhmarh8FGRUI-2Xk2h7bk68W4oUeYdSjd', '2023-08-24 14:39:47', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('lvaG72KtG69JSB6Tak6b-MBaXIFAqCYdMEyq9ruyO-W70rIVjA0K53960imxuL-4rWemPMKSOBQbOTa27W6', 'xIwxO7mk5sG0RZs7Pfdq-uSmzXj78v0cdkW3t8YLL-xgT2L3KDObziuz66P0BJ-FO7YhnOjKawu8aGqoERQ', '2023-07-13 16:10:40', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('lvRIxXtXizF4wom97Yni-igXsH80eCTSstMwOsgW6-kvFzoXFiL73MnvThTG6L-6s0HAgqop2KvP6PIpOPX', 'xIwxO7mk5sG0RZs7Pfdq-uSmzXj78v0cdkW3t8YLL-xgT2L3KDObziuz66P0BJ-FO7YhnOjKawu8aGqoERQ', '2023-07-13 16:08:07', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('MJZpSMVnB6rnRhjAnhoc-tRqOjnrhZp84lHigpmpG-ef5pRjfz5gLerpFM93XB-WEOdJe57ghEWzGuxZAEP', 'xIwxO7mk5sG0RZs7Pfdq-uSmzXj78v0cdkW3t8YLL-xgT2L3KDObziuz66P0BJ-FO7YhnOjKawu8aGqoERQ', '2023-07-13 15:57:26', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('mPMJxsah4vY6yCq31Oh1-leJFLl6nnaRL1FDnP5fo-EM1pxpq7uiKGGySi17fx-AsZI1XrHfO5USc0zVDoM', 'x19AmPsHbnR5ROlSkCJV-ZRSoLyqmPK8Wy5T4wLlP-IhtF5s9kyL5GGW7Bavdi-eOH96fFqzF6zbACVqabw', '2023-07-15 16:46:12', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('MWkroiRMIful0cDktYty-ISMQOFfFrWBqc9dRl9W0-WAhFkk9zyPEfHsYrEoZC-cROZf5vI2MXFA2E9w6mr', 'AagfGmCro4HTxUZyVmwL-UTgskP0wUlLSlShQA2xS-uniJuXXig69ZqqDWJGwQ-hG23nLORWiUSF0c35OJk', '2023-08-07 11:50:12', 'r9PrOgiVsSoK9OE2tiqP-WBLGsRX65V0v86iiOc35-2zxhp1IM3bO9KDWHEIsn-Ubk92Pxmn2B4KmsPX6j6', 'zU9Tdx6CiC5zG2Bmkneh-mWiu0UfBs95Fs5dYiCDl-1EDSPzE0t8CWe1n4e3zP-EQid9Z4szro0GQZiSei3'),
('nqzlh6ZjzuCfZDwXwhYU-clHaivMKuS6baGdMeQy3-UtOXzSitl5DtOy73S8XH-XZmkLhbHpnqQoZO1ghS3', 'EhQROLDnG4V9Oag8iPrX-CWnjkknQEzTI29CU79yF-og7GBAYlJUspEMMLsbac-OkCs5sLjJ3AQj7XWx5aF', '2023-08-15 16:02:09', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('ODFlDlB7Hi7PaDkPYh1Y-LJArEmt4RxVjncvknULr-SQfVxJIOcMta3vDcI35g-TkK92rO0otfTbWt7AgfJ', 'xs650cTHoz0rfDGzd7Z4-8ftoSXjPGyFJaVsF3BpO-HMHFeEJbzr8O9BCL4Suy-tgcOhSkc7MBf9W42m42W', '2023-07-27 15:04:43', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('Oej6A29ahIpnyv0UOMKt-lbLjYmJ6w3LOVyeJ9fwj-oyVYAxExRu6AorvOPSpL-0Wknsn5xG8vL4zOADcXr', 'FMx806XPuSr3u01qoWTZ-zy9cJRLpzHc4CVtrYr9Q-l4fLoOzSmbMhXgleYGRP-v30HwBLS8hLJuIsbIzDi', '2023-07-20 14:33:59', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('OfRzKHe3ug6BpTRJzdLT-B1XubhulpVfOhKgqZxT5-ltdgTPMzC0uubRLOVJnr-bfS44HdwMYpAwAz4joGj', 'LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz', '2023-08-03 14:58:57', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('OKqrXf7y2DGbg1P1w1cm-PjIQWBsPsmiOHRAjzsGP-RU114kDTM6LnA3LjFQRV-criK37qK51krbB2Uz5A5', 'LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz', '2023-08-03 14:57:56', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('OO1iZ3JUpA6sReEdfDwW-IeE51pwvyEysRsJ2DMG3-g09WjWjaV4AZlAKhzVQ4-90bJD7o86OJKoRonFyqz', '3OmwfLSF2BZ7tSViH2Dg-KUR8FcIGWCwdnOGcqxf3-KRuRvaQBYgfR9rAqryyb-W8ZImwm5alH1bnM01gdp', '2023-08-18 16:06:28', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', '0kXdaIxSphcPbRkCXww4-vf7ORPdubu4LGMhjaq5v-6FEwWEwjdZrhVuAhA227-9soTunF5eELLpzzYGUOi'),
('OOYRXj0Zr71Rs4L4SrDd-WF35WRjFHize7jEiojh4-oB8d29CHX4JWWhBmkoeZ-Wa3IHb0kyGjiO5tiCkqR', 'jmtb8XTF5ClLeOgwl4IG-AbIj1WwPmttQVbmMGcAC-lJpIzLQtwnxJrEkQnz1C-jQ1yjvJlc4Z0OroofHz8', '2023-07-07 10:38:17', 'r9PrOgiVsSoK9OE2tiqP-WBLGsRX65V0v86iiOc35-2zxhp1IM3bO9KDWHEIsn-Ubk92Pxmn2B4KmsPX6j6', 'zU9Tdx6CiC5zG2Bmkneh-mWiu0UfBs95Fs5dYiCDl-1EDSPzE0t8CWe1n4e3zP-EQid9Z4szro0GQZiSei3'),
('OxllCY01Cz0PH2JjAeHO-qPFTaUMkyjUAW3jKyT2V-rPkdmlGDY8br7d8M6e6R-IqwyxsejxX7eDzLCC1a3', '3heBxjrGpDLWCc0XHnCk-HgF6OSs4VA9ZdsynLk3s-4Mqyyn4lw5gRETCbyxFH-yQrE8S23w2WTGFMalD2s', '2023-07-24 05:30:04', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', '0kXdaIxSphcPbRkCXww4-vf7ORPdubu4LGMhjaq5v-6FEwWEwjdZrhVuAhA227-9soTunF5eELLpzzYGUOi'),
('p96lrc9SnMnUI3eVun4d-Pf3eiFylEi2DOI4bpZTf-9IYzB0OUw9sdnKQoueWC-iteasOalOggtOEW0o4R2', 'xY4txz77Oxh9yKSyWsfH-KtTnriz6mMLAFhaK6lVK-GKvqziR0eeFyZrIRXOUM-TPtAJvJk72uuiemWb0oH', '2023-08-03 16:28:15', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', '8SDvKTs83iyOutcKT1ah-CnoId3vkeaT9XDzWyRcp-z93SUe3Ja5k9AJpYs3Jv-jeYPpBTit1Y2aBJnqI5y'),
('pBGdGLzuvIRrHgPpUy8g-6Hw3ERg8gRnQ9JQqtZ7A-H51QncuTPBMQRQ7i5f2Q-Dan1gh4O07xav1hfpO0P', 'c7KXtxA5bDyxcXreZYOM-2Y38Mc0of5pHdGuMOoeu-B54jIOLtiiKjsRTkVYwU-3kzJSfAYMF9jJzCiuoOK', '2023-07-09 16:29:51', 'r9PrOgiVsSoK9OE2tiqP-WBLGsRX65V0v86iiOc35-2zxhp1IM3bO9KDWHEIsn-Ubk92Pxmn2B4KmsPX6j6', 'zU9Tdx6CiC5zG2Bmkneh-mWiu0UfBs95Fs5dYiCDl-1EDSPzE0t8CWe1n4e3zP-EQid9Z4szro0GQZiSei3'),
('pPV3q97eC9nex6LFeIet-PjKEevO2xpMP4T8MtOOh-tvxlpslD5ReIl01Ja3wH-JDUpF5FOqExxTDXeOvrw', 'mAjR1hK91SPhxLnBXikD-j8T2J9WSTfPVhTBDIrDF-c3Clo0SzoOLZbklrfpSW-UobIJOAMH0SdeOuqdgZJ', '2023-06-30 07:56:42', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', '0kXdaIxSphcPbRkCXww4-vf7ORPdubu4LGMhjaq5v-6FEwWEwjdZrhVuAhA227-9soTunF5eELLpzzYGUOi'),
('PXoAp5duYFCo5QxDzDCR-vsLGsPr2sQ9okAxG7tRB-sZvaXTw1bXdBu4xaqadO-aAAwwDgAM5p3noHSmb1z', 'AagfGmCro4HTxUZyVmwL-UTgskP0wUlLSlShQA2xS-uniJuXXig69ZqqDWJGwQ-hG23nLORWiUSF0c35OJk', '2023-08-07 10:58:25', 'r9PrOgiVsSoK9OE2tiqP-WBLGsRX65V0v86iiOc35-2zxhp1IM3bO9KDWHEIsn-Ubk92Pxmn2B4KmsPX6j6', 'zU9Tdx6CiC5zG2Bmkneh-mWiu0UfBs95Fs5dYiCDl-1EDSPzE0t8CWe1n4e3zP-EQid9Z4szro0GQZiSei3'),
('Q9jHhAXMKJpYcScQszpk-BWi4EqlsOcIa7H9qlVGD-ZXAv0hlMQ6OL9wGj1He2-JzhZcatjOYUd78GgnRBJ', 'McAFxkXMEweB7Wb5OUgX-C9Vp16xbS7frRhOodZlk-pwqDCE5B2KStTyOFR6s8-g9IPdIcmWIwflsFEWsiY', '2023-07-14 10:35:44', 'r9PrOgiVsSoK9OE2tiqP-WBLGsRX65V0v86iiOc35-2zxhp1IM3bO9KDWHEIsn-Ubk92Pxmn2B4KmsPX6j6', 'zU9Tdx6CiC5zG2Bmkneh-mWiu0UfBs95Fs5dYiCDl-1EDSPzE0t8CWe1n4e3zP-EQid9Z4szro0GQZiSei3'),
('qcu5AnG1gyFBLIn6Vl7a-t5W9RKo8s0PlwbA8OTMa-870f09pUdYco9oiQMwc6-Mv7Du2jBCucSprCiv0jl', 'xY4txz77Oxh9yKSyWsfH-KtTnriz6mMLAFhaK6lVK-GKvqziR0eeFyZrIRXOUM-TPtAJvJk72uuiemWb0oH', '2023-08-03 16:49:26', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', '8SDvKTs83iyOutcKT1ah-CnoId3vkeaT9XDzWyRcp-z93SUe3Ja5k9AJpYs3Jv-jeYPpBTit1Y2aBJnqI5y'),
('qqX93Stny90knqCX3dJo-vPghmtshX3FdmQvOdpo4-oX4LV5KCggytDqrXc9eX-OTt5O63VGsD0AedL3jJk', 'FMx806XPuSr3u01qoWTZ-zy9cJRLpzHc4CVtrYr9Q-l4fLoOzSmbMhXgleYGRP-v30HwBLS8hLJuIsbIzDi', '2023-07-20 14:41:21', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('rgGCOcPxu7Oaywrg8n6f-2lZKO3yGxy45LZEHcIoo-B0f8DnYSErlUAGpGBmL1-LskvOdr8X9iQPWgULM13', 'LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz', '2023-08-03 15:01:30', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('RhfYOgjIuV1sAPOVtK33-D5OJl38LizOwxK2v9ifc-5lsZiCjHdKD1hm2DIhxo-LWDQpQRdQoS4IpItEyY1', 'oKZeTKBHuqqD7bbzwOMf-mpAVj4nenHladGRG3RKX-opuz9rz5WJO8eJpGYidR-aB9ee4c9sHyRPGZ9QCzT', '2023-07-25 16:28:24', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('rmy5t9CSGDgCeByCZTJS-JlwFe7IiAzOVPodBJPeV-RtF6gBWmr9OBhgFC9OzI-gtogLowfbjfBHkFk9WdO', 'LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz', '2023-08-03 14:58:33', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('sbGpSmevK7cLvp7gQD6i-yujg8XURXsj88rOvwQL5-OVPp77V22jQrFVhxKWzt-Xr5MHf4PdWE0MZljh9pw', 'xIwxO7mk5sG0RZs7Pfdq-uSmzXj78v0cdkW3t8YLL-xgT2L3KDObziuz66P0BJ-FO7YhnOjKawu8aGqoERQ', '2023-07-13 15:07:49', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('sFWqg7JOggO2ZnykyFX4-sR44nsSTBIW6z7urlApS-jAd897Or3W1PmbY5gYrA-AO3YEiLE0IFvRGFGoq4U', 'tn44zbXXDgYVGSiZ0b0R-aZu96qpICfen5rEQwEjw-OTKPixxWu1rkPplxzKQj-Kg96wUdMhBkEpaHhTRGe', '2023-08-10 14:33:06', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('Sh0xAnkoMY91v4uO9LYr-hgQ0dJPjBqOyzgwI3tOG-kX5nOmvvbfdwCnU0RqVp-ZDbMLbrcKWiWMJp8B2oG', 'LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz', '2023-08-03 14:50:29', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('SHSFpoRBZRyTxbjjHi9h-p0XgAJ24DFpTFF1mV9cV-ZXenz0DHkQ22jBLRbEEL-votnqWo5KyqGh8EU1q8o', 'f3igd1EwkDah1nZxc0c7-2KU83rghclb8MigSYtoc-aJJwVRRaszkbByMvI84b-mGksIY0oq15aERxMBqVP', '2023-08-05 15:32:55', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('sjarOhilueCJEM5z9Yfk-cLUDa2lJ4ZOT8BsKvZ4O-tmYt2EBYPOC0uTmvtrpJ-W80qY6FsYPPImeg3M997', 'xs650cTHoz0rfDGzd7Z4-8ftoSXjPGyFJaVsF3BpO-HMHFeEJbzr8O9BCL4Suy-tgcOhSkc7MBf9W42m42W', '2023-07-27 15:15:25', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('sjYfJutKF7us2EZhTc74-QSP8zyG1az4GSEgZRR4D-y8LjGqVqRhLwVxkZKmzV-lhMdi74HwLo07LyABOvr', 'oKZeTKBHuqqD7bbzwOMf-mpAVj4nenHladGRG3RKX-opuz9rz5WJO8eJpGYidR-aB9ee4c9sHyRPGZ9QCzT', '2023-07-25 16:39:04', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('sMXgKcgGB4ecH1uL2ZiO-x76RmOIOD2v0dVowgZen-JfKSH67UyS85WnfwP75l-CfuejD8wHvHjlwYQz7Ey', 'gBlIyxIgHOTAwZ42dsew-9D4v0484OSltz0n3pcAm-C4pUXYwxgvp3RemA39BQ-M8mqHRqTJ98wul55FhhR', '2023-08-22 15:33:57', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('t0fSKP9JOgJmLPi3nF2b-bZ3SkPOSHL1SA9z8WJth-dhCVHfXimbPA4flEJbnf-F2Q5LRpAl9zVL10xyQwu', 'xs650cTHoz0rfDGzd7Z4-8ftoSXjPGyFJaVsF3BpO-HMHFeEJbzr8O9BCL4Suy-tgcOhSkc7MBf9W42m42W', '2023-07-27 15:51:03', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('T278JbG4VQ8VD6B9KQc4-7bAn293t4IuZ2kVHlu1h-pRzXQPpd1AtOZ3OTuaAY-7mKMghodV1ULpjwP8ySU', '2O2e0oTn28B6piIREc62-08xDozAvXDCvJbUsXd5T-UcGsimeSLBt72QrOjj8l-6OeVIc56y96Epld4ypAX', '2023-08-04 10:45:42', 'r9PrOgiVsSoK9OE2tiqP-WBLGsRX65V0v86iiOc35-2zxhp1IM3bO9KDWHEIsn-Ubk92Pxmn2B4KmsPX6j6', 'zU9Tdx6CiC5zG2Bmkneh-mWiu0UfBs95Fs5dYiCDl-1EDSPzE0t8CWe1n4e3zP-EQid9Z4szro0GQZiSei3'),
('t9eqHJALg0KJ6xRwyntT-UYYMvmOp98VnW98t7Zdc-H7dxcdJIMtwFBFibY7Xo-4VYJFImjvfmwTMGbkRYU', 'EhQROLDnG4V9Oag8iPrX-CWnjkknQEzTI29CU79yF-og7GBAYlJUspEMMLsbac-OkCs5sLjJ3AQj7XWx5aF', '2023-08-15 16:02:49', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('Tjx5V9X6ZKchtt0Bp2i3-6TAyQWI9Wa7MMv5HDhgQ-nmHpJGgeYECWitGFtLJR-Ehf1nKwwgbXaRMPbIxyk', 'oKZeTKBHuqqD7bbzwOMf-mpAVj4nenHladGRG3RKX-opuz9rz5WJO8eJpGYidR-aB9ee4c9sHyRPGZ9QCzT', '2023-07-25 16:38:48', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('TrKmhecI28KreIgEVK0c-Od2reLgmlkEyt75AyvVF-FZrl4wRnQQ4746BKInr6-YS74Dg4bfiCiKFeFyg1f', 'yYaaOkb37KmcXD1tME5b-EGEoLpfAPY5Y1t7rF7lz-tVChfMOfpQmAU6lQm3Gh-lCVPSQ19qDSuiB6bYDrg', '2023-08-11 10:41:15', 'r9PrOgiVsSoK9OE2tiqP-WBLGsRX65V0v86iiOc35-2zxhp1IM3bO9KDWHEIsn-Ubk92Pxmn2B4KmsPX6j6', 'zU9Tdx6CiC5zG2Bmkneh-mWiu0UfBs95Fs5dYiCDl-1EDSPzE0t8CWe1n4e3zP-EQid9Z4szro0GQZiSei3'),
('Tvzpr6VEtlzUlu6JGIZw-eO9tRVZkLMnY5D1COL4a-sl6sLmgu1mo3HdZrorPX-345khDxwrLDhAH150Uhn', 'xs650cTHoz0rfDGzd7Z4-8ftoSXjPGyFJaVsF3BpO-HMHFeEJbzr8O9BCL4Suy-tgcOhSkc7MBf9W42m42W', '2023-07-27 14:54:37', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ');
INSERT INTO `student_class_attend` (`id`, `class_timetable_with_class_batch_assigned_id`, `created_at`, `student_profile_id`, `profile_subject_with_batch_id`) VALUES
('U8HixhjCpKv4AzxMmEx0-2poV8Wss8juMaO5JRqtp-lnlC55Hr6RnGjHGSE4pt-jAd56SYm70v2rfBJKACw', 'EhQROLDnG4V9Oag8iPrX-CWnjkknQEzTI29CU79yF-og7GBAYlJUspEMMLsbac-OkCs5sLjJ3AQj7XWx5aF', '2023-08-15 15:49:40', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('u9R3q3GlIj8G0GODVOrK-0VAZ9FFubOZpHhp0WRGX-4p155CVFhcj1IKzxT1uZ-SgFfJAicHkOUhsxd5cRs', 'EhQROLDnG4V9Oag8iPrX-CWnjkknQEzTI29CU79yF-og7GBAYlJUspEMMLsbac-OkCs5sLjJ3AQj7XWx5aF', '2023-08-15 16:01:53', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('uc3FUJ9HRDVzCXx2bnnt-MhiQdxEOS6rFgwcwjC1f-tVXhPSISR8dJDI7Lt8zo-WURhPfEuzkaw6AmpsLJU', '8MyESaTKE97XAk4V6aIY-VVeLH8QZ5PHom4Pmwbfh-7EegdZ6pLPE24ZH3CcTG-O5S7Z3VQ3spoihc01YK7', '2023-08-05 05:27:25', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', '8SDvKTs83iyOutcKT1ah-CnoId3vkeaT9XDzWyRcp-z93SUe3Ja5k9AJpYs3Jv-jeYPpBTit1Y2aBJnqI5y'),
('UoUGoIcCJzjfxJjGwpdZ-TITMHxa0soIKUGtRqmii-iw2Xm3aPSTcJk16ZKxId-RC4Zuu14B9FEmpt1ZHIR', 'X823E3PsRuGIeod8s1Oj-OGowrOUjdqIKwOibjEW2-mnmz71BcXgVbpxhxO0ip-VMkFyOVWIrWZtyv7Lcci', '2023-07-10 04:31:01', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', 'UHd2HC1O5MIUafDR8uf7-HgRo4mLjjrETZY9wOT9I-GRhSLZYW2qOoIWpv12mv-3LtgTu9pqApoKOhHoCBA'),
('URDJPy07AzdqGVhT5gKt-OtK72qlq2p4LTkWoLTAd-zPJyfjLKz78AMpYs2gID-JmUOQ3uSv4p6yq7VmFHc', 'AagfGmCro4HTxUZyVmwL-UTgskP0wUlLSlShQA2xS-uniJuXXig69ZqqDWJGwQ-hG23nLORWiUSF0c35OJk', '2023-08-07 11:02:43', 'r9PrOgiVsSoK9OE2tiqP-WBLGsRX65V0v86iiOc35-2zxhp1IM3bO9KDWHEIsn-Ubk92Pxmn2B4KmsPX6j6', 'zU9Tdx6CiC5zG2Bmkneh-mWiu0UfBs95Fs5dYiCDl-1EDSPzE0t8CWe1n4e3zP-EQid9Z4szro0GQZiSei3'),
('uZ6HbgAfGtIwzpMiHAvX-ZM41g9nkKJnJ6vUSFInk-DUh7ubZDBJoIyaH0Aj5f-X2Rgu4KSA3vzEeIm69Ob', 'oKZeTKBHuqqD7bbzwOMf-mpAVj4nenHladGRG3RKX-opuz9rz5WJO8eJpGYidR-aB9ee4c9sHyRPGZ9QCzT', '2023-07-25 15:46:13', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('v3mAB5YXO6TOrOPtEbsk-7dOcVUQwSsUgoI3W0VbL-Fmf2Gym3Dees162MWRrM-nbt7b254sDLKO0379sAe', 'x19AmPsHbnR5ROlSkCJV-ZRSoLyqmPK8Wy5T4wLlP-IhtF5s9kyL5GGW7Bavdi-eOH96fFqzF6zbACVqabw', '2023-07-15 17:07:23', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('V5zO8qAGi7hO5OejspYW-rp5jz6gO56Y8cWHx5xcw-JhPSrIAnkvBFi9SQSv7L-FGHyrsqMYk3vL9oG33AD', 'xs650cTHoz0rfDGzd7Z4-8ftoSXjPGyFJaVsF3BpO-HMHFeEJbzr8O9BCL4Suy-tgcOhSkc7MBf9W42m42W', '2023-07-27 16:01:38', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('v6943Vs9eRKh43uh7lL0-bcSbhAISShdLBDTqG1tp-ld0gCn7pbJxjKeiIarE8-Ax3zBVAkciduaUheTTaR', 'LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz', '2023-08-03 14:45:47', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('v9lxUBh9QbpyC6cwgolY-FaqzhyKSIez9ijR4jiby-K5OnUhpipbSeIWJo2vz3-GlY6IUmSBCxeykJ4wCD7', '8MyESaTKE97XAk4V6aIY-VVeLH8QZ5PHom4Pmwbfh-7EegdZ6pLPE24ZH3CcTG-O5S7Z3VQ3spoihc01YK7', '2023-08-05 05:12:15', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', '8SDvKTs83iyOutcKT1ah-CnoId3vkeaT9XDzWyRcp-z93SUe3Ja5k9AJpYs3Jv-jeYPpBTit1Y2aBJnqI5y'),
('vAbqj9qb9vFzEtxUjZT9-w9UkwQjvJS8K5LKszxLX-bK8y9zAoTWkeDeD4gWqI-eOCZnlOlVmJCTWZjcuXf', 'LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz', '2023-08-03 14:47:08', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('Vi09LJ1Yh1MBiEPgwUFP-XVjXGqky0K8CaXHH74TB-6FHtesQ3O5vzpqS4Sl0i-4R0C09wlypOcfZPEfjBW', 'LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz', '2023-08-03 14:59:36', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('vpracQOCswqXjle1UscZ-tcO23ydb507nX3gL5jjR-ZQs1s8nssBGmvhLmYfoL-lSqmmk603HAegiaMVkdv', 'oKZeTKBHuqqD7bbzwOMf-mpAVj4nenHladGRG3RKX-opuz9rz5WJO8eJpGYidR-aB9ee4c9sHyRPGZ9QCzT', '2023-07-25 16:38:38', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('vUjHGiGKknCXjhEW9LOJ-M4udS0zIQBfr3smVOW0K-7KmnS9kleTf3bTfcVQ5j-OyrgsQfED3OIALXCcnvY', 'LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz', '2023-08-03 14:33:10', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('W9iSDZBsxWT9v5Vsti4Y-dEwvzdLHqpvrnGF7YJBE-rOoZkEqQqlVmwiXI6P1e-Yvaw1IxoZyTlYMq3G8M4', 'xs650cTHoz0rfDGzd7Z4-8ftoSXjPGyFJaVsF3BpO-HMHFeEJbzr8O9BCL4Suy-tgcOhSkc7MBf9W42m42W', '2023-07-27 15:30:53', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('WCGMSG5yxpFXJSiUbbMO-7rlcphALfFVHDVFVfB3b-dVTHxoC1nCpZ9Cl46ltU-iioZZQCOaTvMp7f032Vs', 'FMx806XPuSr3u01qoWTZ-zy9cJRLpzHc4CVtrYr9Q-l4fLoOzSmbMhXgleYGRP-v30HwBLS8hLJuIsbIzDi', '2023-07-20 14:39:22', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('WgvnGreEwnZbgw4uGu2R-2MZKLhn2FI6Up9gUVftz-QPpWhgBUwBPBuuZwII9m-0SB5VHzJYCgpcVKqZfmf', 'LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz', '2023-08-03 14:35:38', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('wivI4r2Q6DARaZQkaleu-7h6ZTIRPmIW0ekjph1Kz-P0bkFJrmwEQYs7AvSfpz-5wCAouTqAlfqndSUIfjm', 'x19AmPsHbnR5ROlSkCJV-ZRSoLyqmPK8Wy5T4wLlP-IhtF5s9kyL5GGW7Bavdi-eOH96fFqzF6zbACVqabw', '2023-07-15 16:56:39', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('wl7y1VA9Zu86oTuximin-jQMME6jAyzHqksnQSPOV-1lnYjpuzKvoM3PWmmJEf-RIGeFY4koSj2HFvY35Ai', 'zFCYAS5QaRSx6zjSDOD1-OFJiQyLkfbhHOp2ODB1F-Ao9Cu25dchF68I86Krbv-1lmgrdPhHe734njceB3K', '2023-07-17 10:34:31', 'r9PrOgiVsSoK9OE2tiqP-WBLGsRX65V0v86iiOc35-2zxhp1IM3bO9KDWHEIsn-Ubk92Pxmn2B4KmsPX6j6', 'zU9Tdx6CiC5zG2Bmkneh-mWiu0UfBs95Fs5dYiCDl-1EDSPzE0t8CWe1n4e3zP-EQid9Z4szro0GQZiSei3'),
('WLZKO8lgdvsk3wBEpYx4-53yhlILemSwRYTDoEoK5-v6SVdGhcEOMjo2jwhp4o-ozODOpE7hIBepPUSVrw0', 'LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz', '2023-08-03 14:56:15', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('wo95zVqkt3GnpAFnZGlt-vwyjc1BCDJFRZ8xOUWhk-ZzsyllijeQC9oTGEBqD5-UOgVBzuWsvGSj1xDQJ0H', 'LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz', '2023-08-03 14:34:47', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('Woy6obWq1PXMqFojqkOa-rLc7sH8HP7rotjSzTa9e-tGpIO5bWFyROTVVv30aT-YsDd7nssvfLpP6yqQ5XQ', 'x19AmPsHbnR5ROlSkCJV-ZRSoLyqmPK8Wy5T4wLlP-IhtF5s9kyL5GGW7Bavdi-eOH96fFqzF6zbACVqabw', '2023-07-15 15:47:50', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('wYgkbIBd8PVwaR195g4p-Lh1XY0OOMcVPQDfzGhyS-GB6KMVgwEY2EgcEAdQfx-lURIdaYieKT69os7Ica2', 'x19AmPsHbnR5ROlSkCJV-ZRSoLyqmPK8Wy5T4wLlP-IhtF5s9kyL5GGW7Bavdi-eOH96fFqzF6zbACVqabw', '2023-07-15 15:48:14', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('x3cASBGzLlprDvHAJJnp-azYgjGUiFQ68cAEk80tc-8MumI6gSZP5y9QGkEPlK-L8MM5tmrHHpt0m2j4Pdp', 'xIwxO7mk5sG0RZs7Pfdq-uSmzXj78v0cdkW3t8YLL-xgT2L3KDObziuz66P0BJ-FO7YhnOjKawu8aGqoERQ', '2023-07-13 15:46:54', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('x8JDDidTQhWlBwYcXdwe-6Q5RhK8CxjhjZZRruTC1-rUk3Xi1ecUtiioGTyOub-1zXt0aQtVYOIsvOaSQOQ', 'xIwxO7mk5sG0RZs7Pfdq-uSmzXj78v0cdkW3t8YLL-xgT2L3KDObziuz66P0BJ-FO7YhnOjKawu8aGqoERQ', '2023-07-13 16:11:51', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('XmzV3wbyDMGu0lsMRGDs-mP2jXmTORHkmQKezKBM0-8Dfx0GmjvTOaeOZrIRgq-rshT2kPOrvmGpcqu8uQs', 'ww8MhkAGKDghdlOTk0fB-I22z83wJ4AaYOSiGQjcO-GOpTdZDLLcROe06cfe3w-4fKdnwtvZU0GVM6Kg2Eb', '2023-08-17 14:56:29', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('xPxwsanaqWczbl2Yyrex-SCFtPrsLzOQgVHAY23Tt-A5Q7GowdljTJPO9voCfk-5Yt9rdJhOMy5e3U78iRA', 'xIwxO7mk5sG0RZs7Pfdq-uSmzXj78v0cdkW3t8YLL-xgT2L3KDObziuz66P0BJ-FO7YhnOjKawu8aGqoERQ', '2023-07-13 15:20:10', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('XradUfF3J9tYcIlTXAYO-OxfMHP93dMzYZTeT4Ikh-tbD3YiDaDxRrqGwJOvFq-czzgBDwMKL0KJW41EDTa', 'xIwxO7mk5sG0RZs7Pfdq-uSmzXj78v0cdkW3t8YLL-xgT2L3KDObziuz66P0BJ-FO7YhnOjKawu8aGqoERQ', '2023-07-13 15:36:54', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('xS7V8gkbFVeOPHQa8yOg-MOvwXtTn7a9siYwWuPuJ-vmIMdkTEOKTfM3uejEOV-miFlGzb30ctXJDMLd7eT', 'xs650cTHoz0rfDGzd7Z4-8ftoSXjPGyFJaVsF3BpO-HMHFeEJbzr8O9BCL4Suy-tgcOhSkc7MBf9W42m42W', '2023-07-27 15:41:02', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('y5YItGeo36VcM9ahAKjw-f8qPVRgZ8Qrr4mTQfwC1-WMQMOOPVOGjO9FuOf6LO-iojdvRaD6kPjArryko5F', 'LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz', '2023-08-03 14:53:49', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('Y9qjXByAQHk34fkOw52s-qgOHyp67nObk0OOuJlmH-4hSogSOhJqGKcoPL4vQs-roaG7azWPX5GRxTUXuOY', 'xs650cTHoz0rfDGzd7Z4-8ftoSXjPGyFJaVsF3BpO-HMHFeEJbzr8O9BCL4Suy-tgcOhSkc7MBf9W42m42W', '2023-07-27 15:15:57', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('YKHf5LRqG9Pme8nhwEBv-tR6IY0mQlmLu3QMfUkce-BtIfOFtoxc9DDZc1W2f0-rA9uBmWTHh6qKOnfXuRP', 'zh8ITeo5VJUGgVLITPqt-0QswJQmJPaA2dTfh4cuF-toWy2PyzzdAP2ihpAx8o-M0cw6t7BMGvXta0vD0DT', '2023-08-01 16:15:29', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('YMn0xMXbOngKWcWn3kt4-Rw8oVRCQYqzwSrU77zRD-ehA6ATDOKwen5jHWMo5P-uzpVc3FpG52mXI8htvYh', 'myLROAYEDYtVWkkrDOFT-b70xO7U7nmBjEgHQQFa5-ELUvjvFbLmaCivpi07pc-SsaR6heXd1RKJUuPJqmQ', '2023-07-11 16:22:50', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('yQAcoLz4Brnued0sceul-DtYVEHbZeQ0asThHmSQl-WxCA6VAWWIwrlxrcthPc-Oe0brYZASWrEwgCJwn4U', 'LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz', '2023-08-03 14:43:25', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('YqtihXmgjFMDExyqxmQD-ekuIOnjrcUu9ZOHuzoqF-eQy7cYPO2XAksvOcuRVT-vME8X4TO3RTB0b2OTIWk', 'FMx806XPuSr3u01qoWTZ-zy9cJRLpzHc4CVtrYr9Q-l4fLoOzSmbMhXgleYGRP-v30HwBLS8hLJuIsbIzDi', '2023-07-20 14:38:07', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('YSx3z0D9ebFWlfI3zSad-ayUXFPrpZuTrTx2thMQI-EhXJBzp8TyO33Xmv5v7Z-2f6ctP8vDpHPtZ4jlZPW', 'LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz', '2023-08-03 14:54:16', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('YUBqqrrzYboo12ne2OjP-5tEOz8ulbFSLmmbFIYhF-KZdLr4em6qwGaA9QHAK9-Pollksu3AK9QE90qOhK8', 'ErrHq3djt1PZe2mIWALK-PMv12HfUjhxmBplFbT6F-OLdbpdn10XzG7O0LXG9V-TGwOjYTs3jz6Xeq3v8TW', '2023-08-08 16:37:04', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('yY0LJtb9bck90UzPYnfZ-VAVchfhs9OhHTWaV8IgG-I78lKrqDBU6CJJUS8zcr-hoC8556s8EV7Og4OvID4', 'mOISgIMxeeehCoFBtfnc-KWZ7ohqlkzwf5iGSwA6x-lajd4lLCGoVAVmVp1J62-2ZZZlKp4ZDxmEr6HB6H8', '2023-08-09 10:37:02', 'r9PrOgiVsSoK9OE2tiqP-WBLGsRX65V0v86iiOc35-2zxhp1IM3bO9KDWHEIsn-Ubk92Pxmn2B4KmsPX6j6', 'zU9Tdx6CiC5zG2Bmkneh-mWiu0UfBs95Fs5dYiCDl-1EDSPzE0t8CWe1n4e3zP-EQid9Z4szro0GQZiSei3'),
('Z1kD5yIYKV6oQA6ocKOR-SwF93tGp2TDGOqbhSrsc-25urq9hK7IOxH2gXbU5J-2iqwfltUy7hXvH9OT3IG', 'AagfGmCro4HTxUZyVmwL-UTgskP0wUlLSlShQA2xS-uniJuXXig69ZqqDWJGwQ-hG23nLORWiUSF0c35OJk', '2023-08-07 10:39:12', 'r9PrOgiVsSoK9OE2tiqP-WBLGsRX65V0v86iiOc35-2zxhp1IM3bO9KDWHEIsn-Ubk92Pxmn2B4KmsPX6j6', 'zU9Tdx6CiC5zG2Bmkneh-mWiu0UfBs95Fs5dYiCDl-1EDSPzE0t8CWe1n4e3zP-EQid9Z4szro0GQZiSei3'),
('ZGm7zE2eHiHHHYfEuKX0-YKAWbWOGX7XoLcTTVcrb-8Jycgkewgjy7AAjlK0Yv-mVBHayVHMFgQK11ujv5M', 'EhQROLDnG4V9Oag8iPrX-CWnjkknQEzTI29CU79yF-og7GBAYlJUspEMMLsbac-OkCs5sLjJ3AQj7XWx5aF', '2023-08-15 15:59:59', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('ZoexD29hkTfEw2ABKAGL-BprrAS7ROV535nlLOW5v-GOwkTd48zBMsvXFdiOet-uL4Bpvr5rWhvVPhnsij9', 'x19AmPsHbnR5ROlSkCJV-ZRSoLyqmPK8Wy5T4wLlP-IhtF5s9kyL5GGW7Bavdi-eOH96fFqzF6zbACVqabw', '2023-07-15 16:46:28', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ'),
('zR2J0QmSlMjXGP5Cy6YR-PR9gY9Eg0f1XlhLMucQe-nupgoxc4cf98Ey3SZSR5-ih0fObmkOqI6OKGs6jhh', '8MyESaTKE97XAk4V6aIY-VVeLH8QZ5PHom4Pmwbfh-7EegdZ6pLPE24ZH3CcTG-O5S7Z3VQ3spoihc01YK7', '2023-08-05 05:30:35', 'Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', '8SDvKTs83iyOutcKT1ah-CnoId3vkeaT9XDzWyRcp-z93SUe3Ja5k9AJpYs3Jv-jeYPpBTit1Y2aBJnqI5y'),
('zWwltePrn5AWsiBzByoT-GgvAMHrOCsU7zWQKXDof-51L3gY93TdOByZsAHC0t-OZIXKlWElIy0ZawkzBed', 'LjSpgG0ZpzCOIvoOr9JD-MgH9cI3p3zQ2fCleOLV5-8b9n01QO5CMk4YvWvdvp-tPD4HMqIQoJbFvA6WBwz', '2023-08-03 15:02:28', 'Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'gxcMcRUolAbPEd3DxMXv-gRCmWIhY3jvjaRk0yBxL-IL9K7iuRhs6cUZgs87Id-ZzZAwiXsYaLIyap8CbPQ');

-- --------------------------------------------------------

--
-- Table structure for table `student_class_attend_assignment`
--

CREATE TABLE `student_class_attend_assignment` (
  `id` varchar(255) NOT NULL,
  `student_class_attend_id` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `path` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_profile`
--

CREATE TABLE `student_profile` (
  `id` varchar(255) NOT NULL,
  `father_name` varchar(255) NOT NULL,
  `mother_name` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `school_name` varchar(255) NOT NULL,
  `school_board` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT 1,
  `created_by` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `student_class` int(11) NOT NULL,
  `batch` int(11) NOT NULL,
  `subscription_end_date` datetime DEFAULT NULL,
  `taken_single_demo` tinyint(4) NOT NULL DEFAULT 0,
  `subscription_amount_paid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='student profile creation';

--
-- Dumping data for table `student_profile`
--

INSERT INTO `student_profile` (`id`, `father_name`, `mother_name`, `name`, `school_name`, `school_board`, `state`, `city`, `is_active`, `created_by`, `email`, `created_at`, `student_class`, `batch`, `subscription_end_date`, `taken_single_demo`, `subscription_amount_paid`) VALUES
('1hrGWwbHcB9HOSAr76rl-jsKbMS5l1FpFBLliOoc2-DATXySC0l6O18JAODkeT-VLl7HCkiPi29l6Rs85as', 'S K Mondal ', 'Mausumi Mondal ', 'Saunak Mondal ', 'PGGS', 'sadsad9asdsa9d7sa6dsadsad', 'Delhi', 'Delhi', 1, 'xowsbOl3hb9uhIS41Osy-lsuqMuKCOGb2TxdO4vAQ-MUQOPuv8SSS2nzeheUW5-DOtvbxkL1Hm0lSFlOaKc', 'saunak@121', '2023-08-13 14:14:24', 8, 1, '2023-09-24 21:54:11', 1, NULL),
('Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3', 'Suresh chandra', 'Rupa devi', 'Mayank Dobriyal', 'DPS', 'sadsad9asdsa9d7sa6dsadsad', 'Delhi', 'Delhi', 1, 'WVUfwxzuPsPT8SkrdEJi-2OzYOtOOQrTmZawAtxVO-lDW96OlY2VM6IH233VFi-Ze7D3X5ZDl6tEe0QGqaE', 'mayank@gmail.com', '2023-04-15 08:22:27', 10, 2, '2024-04-15 14:01:44', 1, NULL),
('r9PrOgiVsSoK9OE2tiqP-WBLGsRX65V0v86iiOc35-2zxhp1IM3bO9KDWHEIsn-Ubk92Pxmn2B4KmsPX6j6', 'Samaresh', 'Suhita', 'Adriti Nandi', 'MVN Aravali School ', 'sadsad9asdsa9d7sa6dsadsad', 'Delhi', 'Faridabad', 1, 'wipqWHU1VO2Tz4Vjj46r-e6EmVcDgiUA0cAIKChg5-JOPnY8lPvMJKEaMz3cSH-fHODExoMAG6gHirXs8ja', 'Adriti@gmail.com', '2023-07-03 07:53:44', 6, 1, '2024-07-07 12:27:29', 1, NULL),
('WkGWUdaWPvJxgtoKP2Fu-fSje9MkfjluOT3UJRjPt-PKmRhYoPIotxEIiJGMUj-xfvrBEv1h01Q24D7rlpW', 'sdf', 'sdf', 'TM', 'ddd', 'sadsad9asdsa9d7sa6dsadsad', 'Delhi', 'noida', 1, 'IwHeIkPtYOMExzGOiK2F-aUGIZOluEes4BeUpuSVk-2lSqQ0pWQwvOqYy5pjgO-QOGEKVxbHvcMnxCueQpC', 'sdf@121', '2023-07-11 14:03:42', 7, 1, '2023-08-11 19:52:34', 1, NULL),
('Za4903xpAqER9OJUrRel-g4HCX6Afaq2n8vsAt5Hk-MfvZ4zfQJFq3VMqRzIbd-dccIbdgCOhTszb2WW35i', 'Jyotirmoy', 'Joyita', 'Subharun ', 'Noida', 'sadsad9asdsa9d7sa6dsadsad', 'Delhi', 'NCR', 1, 'Dvu8svUu7nkat7Isim8X-ExpOt68MsAC2hzsGsAdP-BJ0ADOrZ1VGD7hABgiWA-73f9OMHTnDd5mCBh3Use', 'Subharun@121', '2023-07-11 14:30:25', 9, 1, '2024-07-11 20:06:20', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='all classes suubjects';

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`id`, `name`, `created_at`) VALUES
('324gedfsdafsdf', 'Social', '2022-11-29 09:11:17'),
('34-ad-sadsad-sadasd', 'Hindi', '2022-11-29 09:08:05'),
('34rwergdjghdjk', 'English', '2022-11-29 09:10:01'),
('453-45gd', 'Civics', '2022-11-29 09:09:28'),
('adas34yru567rtyr', 'Computer', '2022-11-29 09:10:33'),
('asdsad9asdsad9asdsad', 'Maths', '2022-11-29 09:08:23'),
('dfs3424sdfsfsdf', 'History', '2022-11-29 09:09:11'),
('dsad4364yryhdfg', 'Biology', '2022-11-29 09:10:23'),
('sad2345terwfsdf', 'Resoning', '2022-11-29 09:10:49'),
('sad9rewer-sdff', 'Science', '2022-11-29 14:38:37'),
('sadas545gdfgas', 'Geography', '2022-11-29 09:09:40'),
('sadsad-asdasd-adasd', 'Physics', '2022-11-29 09:08:52'),
('sadsad342rsfsdf', 'Chemistry', '2022-11-29 09:10:12');

-- --------------------------------------------------------

--
-- Table structure for table `teacher_class_attend_assignment`
--

CREATE TABLE `teacher_class_attend_assignment` (
  `id` varchar(255) NOT NULL,
  `class_timetable_with_class_batch_assigned_id` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `teacher_class_attend_assignment`
--

INSERT INTO `teacher_class_attend_assignment` (`id`, `class_timetable_with_class_batch_assigned_id`, `path`, `name`, `created_at`) VALUES
('0ZZfqP0Q8kzosIenTyHK-jPwpo9XbROj4XzEyqOle-KTpn4blQeXjhBxdF8OzD-q9wDjQEXwFU6YxStgiLu', '6TzSZMQndAdCUeT1C80o-pkyjkQjTzcKKeKarI40H-dEPTIkZoMv72naGSuSq1-LndrOBLOlEdwBfHisVD4', '1689085667787_whiteboard_data.pdf', '1689085667787_whiteboard_data.pdf', '2023-07-11 14:27:55'),
('a3VFhtHm4fjr8pvcRl6x-iXyxmC8JHyPj8l4REawW-YzE4euEXrw4Xi1UW4X1T-UDtYxp6EG8tE6tDtqsLM', 'nPKtz6OsHrWD5uEa2Xzj-nFWBJww5DBcwJ3ZwQ7gw-ksjkoGO8laZlb4KhqK6y-S7IwOd6FjqWa9jRJEBVG', '1689157978751_whiteboard_data.pdf', '1689157978751_whiteboard_data.pdf', '2023-07-12 10:32:59'),
('A4kOGco85geCm77RLXBB-Mnf1Fe1etZMgOxHacyzK-dqcr4vvDnn5rSl9RwMCC-pnWmWUg2wSIzeBxxaKdt', 'AagfGmCro4HTxUZyVmwL-UTgskP0wUlLSlShQA2xS-uniJuXXig69ZqqDWJGwQ-hG23nLORWiUSF0c35OJk', '1691404751202_whiteboard_data.pdf', '1691404751202_whiteboard_data.pdf', '2023-08-07 10:39:11'),
('bizRihA9W6KmU6kmzXd6-tcuPYrMXKfvFs72iBSID-SH3TjeRDS5BXggOUDMLp-01CFLowCXTRxD2ID3xOR', 'bq7A9I4nHmlnXovOBvhv-SYPETaBvdQY8KEHbYPtn-lQTXmz8lHhmarh8FGRUI-2Xk2h7bk68W4oUeYdSjd', '1692893226735_whiteboard_data.pdf', '1692893226735_whiteboard_data.pdf', '2023-08-24 16:07:04'),
('Cp5O3TJvlOMxZ9RgeYGA-0aWLaOQBxHkn31xDE8lW-LuhanayujlnCQCUUgiKP-hSzzdPyAH5rnLghqzbms', 'bGrrXdsJ4bLoTvSG6RWm-gaHBFWkBkOB2CtEaML5a-oqMTPh9DPzlCniTDOZ85-OnERZgUWnVmR4uuz57YA', '1689053440988_whiteboard_data.pdf', '1689053440988_whiteboard_data.pdf', '2023-07-11 05:30:41'),
('ePjpyOzXbM7mKEMbiE79-rdRI9GwXKRrC8Lst6vDv-IH8DBpKbOjmuH9W4nbYZ-X34cE5YPulhhoVEMl4Ft', 'mAjR1hK91SPhxLnBXikD-j8T2J9WSTfPVhTBDIrDF-c3Clo0SzoOLZbklrfpSW-UobIJOAMH0SdeOuqdgZJ', '1688112344773_whiteboard_data.pdf', '1688112344773_whiteboard_data.pdf', '2023-06-30 08:05:45'),
('eyH7sdQQVbJ8ytf1BrlS-BqaCv1WulK4SYrfsaDRD-ifZM25bXvOfkOU2G4LOL-anOeILSCEH91BZLXYJeU', 'tn44zbXXDgYVGSiZ0b0R-aZu96qpICfen5rEQwEjw-OTKPixxWu1rkPplxzKQj-Kg96wUdMhBkEpaHhTRGe', '1691683916025_whiteboard_data.pdf', '1691683916025_whiteboard_data.pdf', '2023-08-10 16:12:08'),
('f7OSxdUg77c3crfbss5A-IkApwEPHTOInnOFWSCd6-9tSXTqoKobeACS8ZpvA6-nx5eo084L4sROmiv85y0', 'mOISgIMxeeehCoFBtfnc-KWZ7ohqlkzwf5iGSwA6x-lajd4lLCGoVAVmVp1J62-2ZZZlKp4ZDxmEr6HB6H8', '1691580606625_whiteboard_data.pdf', '1691580606625_whiteboard_data.pdf', '2023-08-09 11:30:07'),
('haMDF4XYA1DDpDFjTv53-3s1rlb7UDUEeWwkTMK5G-hQo9ojApOoWP2ln7nClV-VBqtrv0HzxGvxgEI3r75', 'xs650cTHoz0rfDGzd7Z4-8ftoSXjPGyFJaVsF3BpO-HMHFeEJbzr8O9BCL4Suy-tgcOhSkc7MBf9W42m42W', '1690474544300_whiteboard_data.pdf', '1690474544300_whiteboard_data.pdf', '2023-07-27 16:15:45'),
('hqvgOC7f14dTpKWRQMDH-ZPoEyHyq6fDS0w9wXmrs-sh2ljvyKsFSh7hmyUJWG-x8RS36lfweFixuZbqQTh', 'AagfGmCro4HTxUZyVmwL-UTgskP0wUlLSlShQA2xS-uniJuXXig69ZqqDWJGwQ-hG23nLORWiUSF0c35OJk', '1691422432777_whiteboard_data.pdf', '1691422432777_whiteboard_data.pdf', '2023-08-07 15:33:53'),
('iWnccBmyayB2GXhE4cjU-UOfMOC2QvPIK2yk2377m-czatziaaLTjDnV4QGEPh-WuHBAYlbqojOoe2FXqJD', 'AagfGmCro4HTxUZyVmwL-UTgskP0wUlLSlShQA2xS-uniJuXXig69ZqqDWJGwQ-hG23nLORWiUSF0c35OJk', '1691405852126_whiteboard_data.pdf', '1691405852126_whiteboard_data.pdf', '2023-08-07 10:57:32'),
('jQS8cdIA3HvP43bjRTKG-D5aVu8jcfMXYmL10AFbK-brTBZTAEL9jSAV1pbx2O-lQREiS8ZXQsjgIlzWoT5', 'X823E3PsRuGIeod8s1Oj-OGowrOUjdqIKwOibjEW2-mnmz71BcXgVbpxhxO0ip-VMkFyOVWIrWZtyv7Lcci', '1688963490336_whiteboard_data.pdf', '1688963490336_whiteboard_data.pdf', '2023-07-10 04:31:30'),
('KhbROoAUepHgw7p3a2rC-ZSSgLHIReAqgnuS2Xp0l-z25D3bqGlC2OVep8uFGc-ysW5fhwhWKUB0bfWBPVs', '2O2e0oTn28B6piIREc62-08xDozAvXDCvJbUsXd5T-UcGsimeSLBt72QrOjj8l-6OeVIc56y96Epld4ypAX', '1691146034824_whiteboard_data.pdf', '1691146034824_whiteboard_data.pdf', '2023-08-04 10:47:15'),
('kum4WdaHMasRpFT3WOdC-V0mwB9ubjLCC1bVulnUn-CZyRs2eI0AKo9v050yux-SqSbOag6ePnqxK5TV7ig', 'RtD2gzqnabqRFdBeTV7h-a6Cjc6M6xhQPutOI4lpW-nz1O9Ij4gRb3lAv4U54f-z4TcqOtxPO5AagxsL0q9', '1692974371999_whiteboard_data.pdf', '1692974371999_whiteboard_data.pdf', '2023-08-25 14:39:32'),
('Lauuh3dhw7L9JRUrwDTL-rQkiByfhY9hdgGJcQg9d-yqlHp4hwt33CaoJaQoQJ-x0vZgOPtswVLHMbcCmVD', 'mAjR1hK91SPhxLnBXikD-j8T2J9WSTfPVhTBDIrDF-c3Clo0SzoOLZbklrfpSW-UobIJOAMH0SdeOuqdgZJ', '1688112057806_whiteboard_data.pdf', '1688112057806_whiteboard_data.pdf', '2023-06-30 08:00:58'),
('MhjbkrD1g5rnJna4OowK-bsnoOsmDutakckcO9gpE-xrXJefEsiY7k7Lxphne8-82TqeygiE0o0DBwOlIWb', 'xIwxO7mk5sG0RZs7Pfdq-uSmzXj78v0cdkW3t8YLL-xgT2L3KDObziuz66P0BJ-FO7YhnOjKawu8aGqoERQ', '1689268062319_whiteboard_data.pdf', '1689268062319_whiteboard_data.pdf', '2023-07-13 17:07:45'),
('mx3UmsS9eUFUkviUro0n-CowBhm5X87zAIlxlmLSO-CAE124cmPCfPlYtfT3cr-R1PZy463OUCGvbH5Qwgw', 'EhQROLDnG4V9Oag8iPrX-CWnjkknQEzTI29CU79yF-og7GBAYlJUspEMMLsbac-OkCs5sLjJ3AQj7XWx5aF', '1692119932892_whiteboard_data.pdf', '1692119932892_whiteboard_data.pdf', '2023-08-15 17:19:00'),
('n2ubxOqbraqr8O2nKu2V-p9YvMnCPXeiQYjH8BFHX-SfoTJu5puJXPhojdEfqF-YPg8wn9PfTCtiy9y0fDH', '3OmwfLSF2BZ7tSViH2Dg-KUR8FcIGWCwdnOGcqxf3-KRuRvaQBYgfR9rAqryyb-W8ZImwm5alH1bnM01gdp', '1692374837609_whiteboard_data.pdf', '1692374837609_whiteboard_data.pdf', '2023-08-18 16:07:17'),
('O5uD4b0cVWv4oLi7XQ65-KjmYiFushFXykyVL20Sp-lloyXEAvZWiXZP0yRy3R-h7JncRVWCuDXXvK8nkrY', 'nPKtz6OsHrWD5uEa2Xzj-nFWBJww5DBcwJ3ZwQ7gw-ksjkoGO8laZlb4KhqK6y-S7IwOd6FjqWa9jRJEBVG', '1689158133028_whiteboard_data.pdf', '1689158133028_whiteboard_data.pdf', '2023-07-12 10:35:33'),
('QelGke4s16jlQT4SXw9u-5RwOnhoE27Czz7ZOajGi-lykvY5oEe8VKQQdkAOBI-ZijXd6ewhA3zeMv74Vba', 'digDQfQWu0SOZOAO1dOa-zwbJFdSyfFMAJ9Vk01CU-g9Q4ezPF4iO1CavxOJrZ-JpMHCTZXUUftBIM42LA9', '1691079803785_whiteboard_data.pdf', '1691079803785_whiteboard_data.pdf', '2023-08-03 16:23:21'),
('qsQDr76rl3lWjL22Ls3F-8HOS4h3pGC2Va2wnLXWE-b15uH0eirpp96xfPmUnn-DUYAIiue3sGXC56kdOEB', 'c7KXtxA5bDyxcXreZYOM-2Y38Mc0of5pHdGuMOoeu-B54jIOLtiiKjsRTkVYwU-3kzJSfAYMF9jJzCiuoOK', '1688920300643_whiteboard_data.pdf', '1688920300643_whiteboard_data.pdf', '2023-07-09 16:31:40'),
('rp0L8OxbFnIKIKr4f7UG-rTYsFP0t2MTpsII6RcEM-jRmzkozpt5H6otUcmCqD-JeXgyt6DMXoPiMttLmac', 'oKZeTKBHuqqD7bbzwOMf-mpAVj4nenHladGRG3RKX-opuz9rz5WJO8eJpGYidR-aB9ee4c9sHyRPGZ9QCzT', '1690303692774_whiteboard_data.pdf', '1690303692774_whiteboard_data.pdf', '2023-07-25 16:48:14'),
('t7WQTEbK7DB1v0eFcwwR-cGMvvufqo8eZJzOKsdJJ-0MIrfnyDRAfCwiO2Okje-pQzFgTDohmezaFkUPTJJ', 'ErrHq3djt1PZe2mIWALK-PMv12HfUjhxmBplFbT6F-OLdbpdn10XzG7O0LXG9V-TGwOjYTs3jz6Xeq3v8TW', '1691514548090_whiteboard_data.pdf', '1691514548090_whiteboard_data.pdf', '2023-08-08 17:09:11'),
('tdp5Fh9YbMKpkdFZiSsF-rUDdahItqSpW7yajsh0x-tZPERdRaaTeVXOdWSOBd-WBIQj6xh16Lz4xkHpofi', 'Zo8KOaZK3ur4isgQLCTW-aBLqvZRlSCaTPC1EVtx1-5aZkrxD4gQV1ZGUtghfR-ojcj3WIuY30Fp5OWabOr', '1689935809009_whiteboard_data.pdf', '1689935809009_whiteboard_data.pdf', '2023-07-21 10:36:49'),
('WPBQnOgYGglUqJO3CgTu-Hg2FDJMJ3MTReyCzuiCK-4bCITHahwrkhlseglMMK-mBQJv0O8cFdtrGnapzDY', 'AagfGmCro4HTxUZyVmwL-UTgskP0wUlLSlShQA2xS-uniJuXXig69ZqqDWJGwQ-hG23nLORWiUSF0c35OJk', '1691408607151_whiteboard_data.pdf', '1691408607151_whiteboard_data.pdf', '2023-08-07 11:43:27'),
('yCqPRt37ieY5YhmLDrsn-eXXWAFaFHKyYkjQyTM9e-aymiYq6UL6Ot4vb0abkA-sJOhOR7y2jkwPT4ACC9F', 'jmtb8XTF5ClLeOgwl4IG-AbIj1WwPmttQVbmMGcAC-lJpIzLQtwnxJrEkQnz1C-jQ1yjvJlc4Z0OroofHz8', '1688726550481_whiteboard_data.pdf', '1688726550481_whiteboard_data.pdf', '2023-07-07 10:42:32'),
('yrlL2QHzGMrBbrLzSPd8-53QqcFWBrZVbTW3nEhYa-VH6JQfdmpxx6S8zkIAou-m7iO2OAhaxwS99w04uUv', 'x19AmPsHbnR5ROlSkCJV-ZRSoLyqmPK8Wy5T4wLlP-IhtF5s9kyL5GGW7Bavdi-eOH96fFqzF6zbACVqabw', '1689441037067_whiteboard_data.pdf', '1689441037067_whiteboard_data.pdf', '2023-07-15 17:10:39'),
('Z4qPOLiC5ArtwdmbYrPW-d3bslsJAkSDTxMMloAyI-vQyrK075r86vCD8XDrzB-Ttl8AoWrvmOYzFSEsJX2', 'McAFxkXMEweB7Wb5OUgX-C9Vp16xbS7frRhOodZlk-pwqDCE5B2KStTyOFR6s8-g9IPdIcmWIwflsFEWsiY', '1689331131271_whiteboard_data.pdf', '1689331131271_whiteboard_data.pdf', '2023-07-14 10:38:53'),
('zJaGdlBF6XoPfutuVGJI-c5QXBTL3CwjTiu64Jffe-ol7hMp199VPTbdku8FZX-kLR8loairLLT8MBvMFtP', 'Zo8KOaZK3ur4isgQLCTW-aBLqvZRlSCaTPC1EVtx1-5aZkrxD4gQV1ZGUtghfR-ojcj3WIuY30Fp5OWabOr', '1689935797179_whiteboard_data.pdf', '1689935797179_whiteboard_data.pdf', '2023-07-21 10:36:37');

-- --------------------------------------------------------

--
-- Table structure for table `teacher_subject_and_class`
--

CREATE TABLE `teacher_subject_and_class` (
  `id` varchar(255) NOT NULL,
  `teacher_id` varchar(255) NOT NULL,
  `teacher_class` int(11) NOT NULL DEFAULT 0,
  `subject_id` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `teacher_subject_and_class`
--

INSERT INTO `teacher_subject_and_class` (`id`, `teacher_id`, `teacher_class`, `subject_id`, `created_at`) VALUES
('0c179tW8dvlJFRG70GhF-PQsHP4WO6A7w7jOuJCxX-FVoJfOwnaVArS0jXBmno-M5yjYs1M9VzgfVRe83MV', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 7, 'asdsad9asdsad9asdsad', '2023-07-03 07:43:29'),
('0wUL7YsfDsqowyc6uqh6-TyQtdJbODTyEZbHG2pXl-3pXORvaSETbr7tg2Icqy-FDEzkhs020Xpjch65guI', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 10, 'sad9rewer-sdff', '2023-04-15 08:20:05'),
('12Vv6LESacOsLXnL8A1d-o7HVQOpQ70TtIWtCkhha-mzFekdQlw9RWP4vA4Orf-ghKlPDywgA0B3519AI1l', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 12, 'asdsad9asdsad9asdsad', '2023-07-11 14:16:43'),
('1f94gvM3XsZ95eHSIKs7-ddQaXrDjX80CMaiymlpC-QkhmJACYQsgE64L8yqf6-I0OO8qTyRvGOjDC5lgFA', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 10, '34-ad-sadsad-sadasd', '2023-07-03 07:43:29'),
('1ociWUEgmZWkOpX30DJ0-UthIK4OQW0hQtp9dVaTx-LKJ9B33zfduDwPgAjE88-VJovwZ7SOjyMTtEvFYm6', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 6, 'sadsad342rsfsdf', '2023-07-11 14:16:43'),
('1R85X2iGX35iwuxnu4Vw-cZJOftXf6yaTgUXu9wok-4uOtaxfcZtFxEAKIuPu5-OLXTOJhzkk3iHSDlJaYW', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 10, 'sadas545gdfgas', '2023-07-03 07:43:29'),
('1S02tYVVkMatwklr8cSm-tJSQlG5lxnic53WF8hgu-sxckaQrS5pG1OwtQqfzb-dkMGZklfxajBmrCpDlvg', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 9, 'sad9rewer-sdff', '2023-07-03 07:43:29'),
('1yCIItgWuuWSqpOX38mH-2XhZg8HakHxtOnuzG4Os-uztaxZmctLxChrPqzoLi-KIs5qBsqOjfF35cjzqT4', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 10, '324gedfsdafsdf', '2023-07-03 07:43:29'),
('22Eal3Q0ZkwnjucA8b1z-7atqnbLI7i8o9U5mPzGj-VZzXJ6PC2GO3Sl5Lilmz-Gs70x260srLEaUVcJjwi', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 9, 'sadas545gdfgas', '2023-04-15 08:20:05'),
('23p5UuA44aMTKy7OK43K-gPJCWuuQEdSIOXX2WwrD-jsVLIWDDy1hV8yVCJBac-tBJphHtkAyjT4nBLf8g2', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 12, 'asdsad9asdsad9asdsad', '2023-04-15 08:20:04'),
('2SleghhD1PCSMg7jx8t4-BR8Rnb1QQgL4bQqaOeE1-yJfJ5hAsiqjno5eCRecH-DR6TBUDEaOk9DEavmwSk', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 7, '34-ad-sadsad-sadasd', '2023-07-11 14:16:43'),
('3iUFMd4Yu4L2qZQeooV5-2DYQfhHbfMhxdcoYw1OA-4LlvIHB0oGuhbbUt5mlW-vypB83nArXYiRwCbAGIw', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 8, 'sadsad-asdasd-adasd', '2023-07-11 14:16:43'),
('3K2y2Fi7iqT8nPzuW2mO-V3RhMGG4jI2POxxcYTBj-llbGdF5O5vi5UOu9O9WT-aYcyQVuL02zwHrhhdT6G', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 12, 'dfs3424sdfsfsdf', '2023-07-03 07:43:29'),
('4bKxvLWGmOGb2bfL83wr-gDrXyoTgUMOdYeXcy9Bv-xGkIkaESdBdLUuUnQ8Q0-2sivAdtO5eQocGxmKgLI', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 7, '34-ad-sadsad-sadasd', '2023-04-15 08:20:04'),
('4TjTTOFDMOupPuZyuFPk-9iu7mLoZze2vDdXv68iV-ru43ITp7lsUK2hGdG6j3-2TW2qjo94gnOiawgEydf', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 11, 'sadsad-asdasd-adasd', '2023-04-15 08:20:05'),
('4VAxQaOtMOlOAb3dgxJy-0FBCqeaa6QcheKssQ0gp-guMsQpumwfAfl7d7atls-kgYxnKbp4LQLtfqDOaBW', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 6, 'sadsad-asdasd-adasd', '2023-07-03 07:43:29'),
('5otLyuFViktOKM4y6uYX-iiyUwrgpYwUCfHq0pPit-PeyMjHPmszH7JU42B7XI-WlIU1vH8sFSeBlV2JliR', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 10, 'asdsad9asdsad9asdsad', '2023-04-15 08:20:04'),
('5U1TTUAMbVqVcjOd8cVu-6iPeOBdYFasgjGctontJ-Er9iLByroPwjlEqAkswO-G4ShxauCJRJHjpcIaAhy', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 11, 'sadsad342rsfsdf', '2023-04-15 08:20:05'),
('61lYkrEDnJIiAU2QhjWo-6n6hqu813sfAWbddVvln-bmW7kb3dhFLRvMfWEPxL-7xrOQhGsShzp5rGO4xo3', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 6, '34rwergdjghdjk', '2023-07-11 14:16:43'),
('6WwXWmo6BAsQzwX69KOV-UTGKlG3Xcs6mMdo3tRUa-ylLEcPgMRY5IV7MfaHia-q9GJkd2syVTvSI9cqEpr', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 11, 'sad9rewer-sdff', '2023-07-03 07:43:29'),
('75EKsgJHAX0xFVMwWCor-aZOeKL3j4dC18FTc8kU6-HPK1PqLFEflEnI88Ip8E-dYLfbtjOL2phF5pgTPUA', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 11, 'dsad4364yryhdfg', '2023-07-11 14:16:43'),
('7HUxnLOtFxlSuh8zyxhA-GwpAbm69hR9bxhEZkkYb-Bv2W4wngJirse5zIMHFU-FGpUAIsvdPhlLzOdXVZE', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 8, 'sad9rewer-sdff', '2023-04-15 08:20:05'),
('7mabq1O7LerAAyjL5Sta-FO14bYmFZXQyncmc1CCt-eGZI05KhbFR9LGdiK5RE-4xR3G4WyyTLK2btBz7Fs', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 12, '34-ad-sadsad-sadasd', '2023-04-15 08:20:04'),
('7Oh7lWhIYG0Xc76YXcMW-aeW8wDiaFMBA0RRKyH1E-DJhsPoAa8uMWitpAYpB0-15R826rtbiDw9zUQ4jJd', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 6, 'asdsad9asdsad9asdsad', '2023-04-15 08:20:04'),
('87ssb4JqhRK9xqEL4gxA-y4Is98eI2QGkPpUHTxoV-HcRX30LHgMRzu62KTjOm-xXfZl3XxD6LT0ZcZ3A0d', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 9, 'sadsad342rsfsdf', '2023-07-11 14:16:43'),
('8F4gmMnEcRC31sLEqUwO-VlJdmZ9p7hgjQ3xValen-btDfd9iDyATI4usPyLFF-h2ix74Ozlm5V9Fyyh343', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 11, '34-ad-sadsad-sadasd', '2023-07-03 07:43:29'),
('8G2O4rKW2E0SS3xaKRgY-iIBhl5mcdB6w6GZlJkUY-eASsPQP13AdTjAzvzjUI-OzTPaRfbBXOxGSzqqhAK', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 11, 'asdsad9asdsad9asdsad', '2023-07-11 14:16:43'),
('8g4A9wMj9WgZSnRFzfu1-giEasan87pwGZ506ZC42-J3px4EngQ6BAhoAftDSy-YAGsKjtyxK7dxp4kooj6', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 7, '324gedfsdafsdf', '2023-04-15 08:20:03'),
('8WOjPQGKD6sDhxOiPvGu-tAMByfkffqLgM1CcxhI6-aWD7qRRKE0DY8S20kCdZ-tOEfJblc2R2pqudtV5Ez', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 8, 'sadas545gdfgas', '2023-07-03 07:43:29'),
('9fUqUVRoZUWKJfY1sgs9-dVrOmx136pJBZ62c2Bg1-LkrQsrkzuTQFAetpL3Li-OGmymXPLllOHndvCqt93', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 9, 'dsad4364yryhdfg', '2023-04-15 08:20:04'),
('aE8eYwlcfwTLdshnfS4j-5JSOhUqBpyfdFOCOXGxa-fOJAOLr599nObE3rIOcT-JJ0g5stUa4GO99lEsA0c', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 10, 'sad9rewer-sdff', '2023-07-03 07:43:29'),
('atT1R6oYzke4yxtABHOU-oWHVu708XyBEJWTA9PfI-vUAiU5ZqKKxtivrBPOii-MPsnR7gq3rMRyFkYM298', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 8, '324gedfsdafsdf', '2023-07-03 07:43:29'),
('AWxFAnuxbDM48SYokndD-iVUMekRW5BiGREUK9k0W-vhsgTIZ1V0csBt82tOt3-ssau9lKQcu6SYmySy8rb', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 8, 'sad9rewer-sdff', '2023-07-11 14:16:43'),
('AZ6pPwfzPP18595oTdbL-qFfFOQeVAdWdtqlyKdOO-zLnuZKnCvlFWjmrFdDAa-kYJeiL0SkO0PcbOcOoxS', 'xo5fQSsiIOhn6UZ1JaQ3-Bo8HgzUXY3oetuxpeU4d-M7fUyIF47uqzqffOECKO-JIwVtjvn01ymyw5rrg27', 8, 'asdsad9asdsad9asdsad', '2023-08-24 16:14:39'),
('B02LhfcCZhRPOClnISe3-d5VdKrAixQHruChEBizk-i728erSpKCPe2pO0IeCE-2g4RZ7KqMRi1PcwO5OMP', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 10, 'sadsad342rsfsdf', '2023-07-11 14:16:43'),
('B0jDJOzjwzJ1CJPlAzM7-hTRT8jfpV4aOl0UEXOVR-3UI1ulbwEpWDce1nwk0z-YeYWD4l7RIqwenCTjfW3', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 12, '453-45gd', '2023-04-15 08:20:04'),
('B4MrpySusTqEr6V3eykY-Y8tu6Ru6zCFnbUuIRJLL-6pdHnBbtIPR1t6hYnfrQ-tfkcScz0l1KfqBIBbJLH', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 7, 'sadas545gdfgas', '2023-04-15 08:20:05'),
('B9jzORpaa3jQeUwOxAga-n6ogx6sluHMQLXyXRH1X-ODLWnhdLhO3Vui5BMI0Z-o6oJr6YOIqIYo5Ya1mvm', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 10, '453-45gd', '2023-04-15 08:20:04'),
('bDVDngaJrOd8dzF5BfmE-0bOvxyYzTHjWPWG9DxGX-lAzhbvX6v9AWrKUKoQSJ-nTTzMnA4EOQO4r37V7qj', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 9, 'asdsad9asdsad9asdsad', '2023-07-11 14:16:43'),
('BlGYDXOEyoDllCAqrYQ0-csMojpmqe3MyDh4RaSHu-iXVdVmhVzdE1cjjiAZel-2p22GlBh5yhXs9YxSp7K', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 8, 'sadsad-asdasd-adasd', '2023-07-03 07:43:29'),
('Bn55tULB6jdtZIengd2X-zVO2JL3Jdn1BP9BgcOH2-3rJLP8I9ngi8WvS9n8ZL-jg1TdkidCEKWY4ZMylDJ', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 12, 'sadsad-asdasd-adasd', '2023-07-11 14:16:43'),
('BnnzoIIjT3P1Tq9yb0hu-EsuQ3iiBrxv3X3L4re10-eK9YDznJqH6LgCORM9jM-0XOqwXSOOFT6A2hi3o7M', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 6, 'sadsad342rsfsdf', '2023-04-15 08:20:05'),
('BpuLOVQMKtounGUrvcEl-pSt9dTk4OXn8TVGpeYuj-jdGXFzsmwbwnhi5HmdgB-OOGBBSQoj35CsXeEwe2p', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 11, '34rwergdjghdjk', '2023-07-03 07:43:29'),
('C37UQW5Kgvl67oagmd7O-MAOjqBBB4Je1YdiZBDdB-C2vqUswMlTiVFFIpnhQk-Vuo0sRSov7SJAVmIOSFO', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 12, 'sad9rewer-sdff', '2023-07-11 14:16:43'),
('CfOSmvZ4BpXaVk9JALai-cF3Du9k3E1fABxtA0gQm-9IO1vFgmKtO8vDe2wdza-8jX7acFhOCju6DY4Of2D', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 8, '34-ad-sadsad-sadasd', '2023-04-15 08:20:04'),
('cjjZi43yTLIG73hVOrAX-Q3a3IEHVIWpgrXgBbebZ-OTB1aA71m7IZ0elJ7ius-7B1qS9I5GgJ4kdYlvTAb', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 12, 'sadsad-asdasd-adasd', '2023-07-03 07:43:29'),
('COILzoJu7DOUgzxYdpfp-V3EpVTgcCWxxkBkMyDU7-9fsgu9TGEm2oLsEKw4v1-uBfpBqPJoUzs3j3SIHA5', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 9, 'adas34yru567rtyr', '2023-04-15 08:20:04'),
('cRPooh22oX00HFRFWI7e-g9Dx9CWcIi0z5qyrvdaZ-KbgHzjq5OwzOqsZM1d7P-4IVH4Qq0l2aaT53Wtbg4', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 7, 'dfs3424sdfsfsdf', '2023-04-15 08:20:04'),
('CtWmhy6GvrbmmAFBHEwa-bXOLpE8LSjGcOp7mKWFO-6ufOdrrg8kyIxWPI8K4A-KKE5mn6IErOjVnKXEd5k', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 9, 'sad9rewer-sdff', '2023-07-11 14:16:43'),
('CZIXE8Z74A3TZeJewVjO-EUDhJJPgqj3T1zfv4eMx-vjtqGLmWmtwDrJzlVUCn-ybqEVyxlI8DaH74wY9rL', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 6, '34-ad-sadsad-sadasd', '2023-07-11 14:16:43'),
('D0HZ9dYO3uL0bpxc5piS-OElLycPUSxH74QrxJE7u-syJOa7G8EY5jVwgaqklH-tK6fQJXt3eclf0Wh2hAU', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 7, '34rwergdjghdjk', '2023-07-11 14:16:43'),
('D3BbPBSAwZjEDjxxwgXS-60AEK8M7XlpF6EDvo8cY-kc2qD5P7m4j7uxY6D1iP-2AQY94UjwWhxeOXjFyEG', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 8, '34rwergdjghdjk', '2023-04-15 08:20:04'),
('D3ju2slEwajtbo4Ziags-tpc0UzaEYS8Gm8U9o24S-PtrFOsfhaHY6lTyOpijD-EaAGL9lCPDSefLGX39yi', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 8, 'sadsad342rsfsdf', '2023-04-15 08:20:05'),
('dgcXXjt1h9QV6hn65OMg-DkCfGO7FD1HrukeBJsIo-apzkytbF8SHU6kYOlaWi-fmmSWiMSjKSTrQm2HnZI', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 9, '34-ad-sadsad-sadasd', '2023-07-03 07:43:29'),
('DIiBVdrLOZLbGEHOWJUW-1jHJoo2pyPb9KrSTGPWA-YJJ1kcXSV7biUUM9gg0b-Hvsg6suHMnW3oqoc1aJv', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 9, 'sadas545gdfgas', '2023-07-03 07:43:29'),
('dlAnZOIiiEnO6irXgLqG-09jcqzSC595Yy33A20r9-CiCpiGJCQrVF5BdhFDhL-1Ajv478krmergwwer8eG', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 11, 'sad9rewer-sdff', '2023-04-15 08:20:05'),
('DndEMJx8Vi7eLxxjyYM8-hl5ie1nV73xYfVAkTOnm-DM3Rm46kuqpahcL7Ei0Z-BQrZtQ4j5YAUCfmiK0pR', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 8, 'dsad4364yryhdfg', '2023-04-15 08:20:04'),
('DQt9xYemqiZaJTJoc7cC-lebF5jcIQrZdqvHDS11t-hvbAnlPynprbOgYQI7vK-B9UOyoGeHrMSgXiziEPX', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 11, 'sad9rewer-sdff', '2023-07-11 14:16:43'),
('dsF3U5opJpWPK07rDnHw-ZezOejOhMsGUta5oaxXv-G3opmzl4oVuGOrctbWFO-HVUSXijZOXKa7yO2FohU', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 6, '453-45gd', '2023-04-15 08:20:04'),
('dvgunfOa0i9ZTbgj3O6T-CF2KCn5cKe2tz0hwSPwX-vvpEdoJl4r2DjDF3bRY0-yP5HAdxVIsqOtKSQWctU', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 12, 'sadsad342rsfsdf', '2023-04-15 08:20:05'),
('e04n7VvSJ7bgfmt686Az-Hw6Fr4asW426al6JU4to-FgOZs9Pwt9Iw4ODXoAQv-BaFmDkPpZCySGDRtbGkv', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 10, '34rwergdjghdjk', '2023-04-15 08:20:04'),
('E4g6OOjhdunlSXzubGTX-MPKYmWo14OknYVlgbMZU-HOBlIwxJXJ18vDrMc13f-buxL5qqtbTyZmbKz0gK8', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 12, '34-ad-sadsad-sadasd', '2023-07-03 07:43:29'),
('EBM0O5LqsBfzEMlVpx2C-X4vwkSnnQUHXfIleKEMr-WB9OUvMS8piilrHisvp9-3OJ6lHxktS0RgRM0QfPo', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 11, 'sadsad-asdasd-adasd', '2023-07-11 14:16:43'),
('EkWBlbATSoA7QCkc8pLM-MoMsUTDEAuzVwnScCnbs-WLo5jjgHUOzKMnarT7Ha-0lBZ9PhjS2v7fE8OxM29', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 6, 'asdsad9asdsad9asdsad', '2023-07-03 07:43:29'),
('F06Dxzs3Pz200r8Qs9YR-rgK7BdaOLO1adk8JsiHn-JfLP21Sv0YlmzDQAC7Od-csGagqShvLXqqTb27hH1', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 12, '324gedfsdafsdf', '2023-07-03 07:43:29'),
('fC9pOYAI0jDuIofHpWMz-Fm9bdPm43PrxpsBswOOa-IQKG11BeJEnFcU44F4pO-52QqUq1ldp90QwOgxhVL', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 11, 'dsad4364yryhdfg', '2023-04-15 08:20:04'),
('fDpgaxeagySPOIm6tUoQ-BaJQQOf3cpdvTDjx9dev-RzYSPX4AjowWwrSGwXAa-sHcdy1uSSOsOJjeZAtis', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 11, 'sadsad342rsfsdf', '2023-07-11 14:16:43'),
('FE6vLPpMUaL11n9sE8cG-reni8LYwBaCflr8i8q8n-d0uFaIeElOeTJM954PJa-jBI2uQg5CRsQuO3OyuX9', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 7, '34rwergdjghdjk', '2023-04-15 08:20:04'),
('FfPRwtAsp3RX7brnqbIW-cksd6v0GRK3Q061TqgEJ-ejxH71OlOfOgO667Xc1m-qs1jSgLxsWru8MaROdz6', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 6, 'sadas545gdfgas', '2023-07-03 07:43:29'),
('Fh5FAEx3ZnIyDYzwrim0-0jKhPjfRXthSuZHr3O9z-EJEZa2q0etoAbA4Q0l3o-GyOmBcqm254ytDgguOWH', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 7, 'asdsad9asdsad9asdsad', '2023-04-15 08:20:04'),
('fq9YrdlBeV07pKKZW6Z2-JmAcJOKsqSUv2FAJWupn-lDf8CZw5Zht69aoOhn8s-P9oLOJOGMXt74nD9vl2V', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 11, '34-ad-sadsad-sadasd', '2023-04-15 08:20:04'),
('FsnvQZMC72UB2HIz527d-6HYbT7L9qRhcisjvwwra-DxW7VAQknJ7ynQzXOKlJ-zv4secTAvrdxJYEom2xg', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 9, '34rwergdjghdjk', '2023-04-15 08:20:04'),
('FUEd6JPfU05nEX8bSJmX-y31x3FCqR7Xdu3mliSnC-ijuTWzIF1mvHBAvY8wkO-ty90vByU3jTtFzMJvy0W', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 8, 'dfs3424sdfsfsdf', '2023-04-15 08:20:04'),
('FWVHK1Sb6pf4uiH55TTX-fV9L4vv3fRIiCQQnZMYP-bEm1jmXzmdPfjBv1Xhw3-t2EsdGAw4mFzUAEpMyqp', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 7, 'asdsad9asdsad9asdsad', '2023-07-11 14:16:43'),
('G6MDIntsJDAnYfWblXih-XKAfrY8S9nFDpDORC6wR-DMxvFdfdXukGwaek32XO-JbvUWZoZbXpy7a0Iw938', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 12, '34rwergdjghdjk', '2023-07-11 14:16:43'),
('geKHKeWJaqAcEKvy3muq-fZirY7CkOnAfLWzObgvb-fhHhFK9mw1Msyj7nXfWO-vF7O9ZjafJVUThCVp7J3', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 6, 'dfs3424sdfsfsdf', '2023-07-03 07:43:29'),
('GeXXOxvXFRI2Inz9uWoF-lQ5Drt8gZIgFFaC2RcEl-iE8OxdsIgrHJ7Q42GtIH-ddYXHwgfTyL66UEfCOTA', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 7, 'adas34yru567rtyr', '2023-04-15 08:20:04'),
('Gfb1Q8hDAAIGB6qABoj2-yM0h3OT6lTmVXLzBg0Wb-HxKpO70eTtTRdm40A2WU-fEwlkYnFv3onC51zaBB8', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 8, 'asdsad9asdsad9asdsad', '2023-07-11 14:16:43'),
('gfg4UC73kI2vppbPgRKS-vzLy7lTOlMBTJlrbWl3b-hV4x1XdGg5I5UL8Awkeq-DiHm9fQgvrfAopHyb3yO', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 8, 'adas34yru567rtyr', '2023-04-15 08:20:04'),
('gOF7MvsQgkcORDefqLy3-OytMD00s6o2Hh5zGDRG0-8vVbqQICU5zLDyHOdqIJ-Rm9bnZEIYPcT8ctQrrc3', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 12, 'sad9rewer-sdff', '2023-07-03 07:43:29'),
('GWRpHgnqq4KEVPr2XD53-dKgXO2OeRYGdX2CCrGvJ-5eQveL6zyC4BF1jSm1zD-B6qAnBwULW2FUDWx4yI5', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 7, 'dfs3424sdfsfsdf', '2023-07-03 07:43:29'),
('h4ilOifpCFWVljadrUoz-xYiSb5xUzSUFIX5HuWK8-XxLOR5dVXfC1PKTzjtjf-GKladSG7OywAnU63QOzS', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 8, '324gedfsdafsdf', '2023-04-15 08:20:04'),
('H5K3JDDEDd2qJjb2fPta-OYiXwSp6kPoGqPCMsF8G-Kr3GA5corHBZ4L1AkMJH-8kFi9muOODhD9IhDGQAF', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 10, '324gedfsdafsdf', '2023-04-15 08:20:04'),
('H7pOFRjOTBETdk7QqpTT-zvVpJzQ3nmOCeMkVQLvm-cEOQQWpBAeiME2tzYERH-IGjrHj6h9FqdRnZkr8a9', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 12, 'sadsad342rsfsdf', '2023-07-03 07:43:29'),
('H9QkFhgWDymjPikFh1oh-1v5R4a1nIjfq1AtUSqcV-RqZFBxKs0P1zDsZOIAYO-Kvqn5GRvKprg0bGTJez6', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 6, 'sadas545gdfgas', '2023-04-15 08:20:05'),
('IelOa1WuefBYLlpdvOzX-ffsXAPQdGv7MJFHYnhlx-H0u8D5pxj9tJMimeWukP-wQR68pA2MiwPiMzWwkJi', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 12, 'sadsad342rsfsdf', '2023-07-11 14:16:43'),
('iqsbnZfHmywQaDyofzkU-GJl9OgKtTSeEH7fcPBxr-n8zsyHR7WU3q08FEp3j3-ApnJadVYM7AzXqRFmqpI', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 6, 'sadsad-asdasd-adasd', '2023-07-11 14:16:43'),
('IXIrIjyIVAJyiXjvstzl-gVPrSwfkUbyALy58Ogpa-9lXt9Cxc5hESmDFCWvFy-zPO8BuF80kndgsuDp45k', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 6, 'sad9rewer-sdff', '2023-07-11 14:16:43'),
('JjGnpMsfGqlQpv5g8xL7-75zL2kwPydOFWBggJAd3-b4xVDKYb6y6tcKEjuWQ1-ZlXouLV50JTcyXBj5W4L', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 9, '34rwergdjghdjk', '2023-07-03 07:43:29'),
('JmRF6v0gp7gB3U8zEyDw-1iQyOXgobeFCZnvQz2Ds-HJcTA7ZPIm4a1MjkJc5L-mpb1hFhMn5XQOxvR0y32', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 10, 'asdsad9asdsad9asdsad', '2023-07-03 07:43:29'),
('JPGU2pODMfIFsiUPUEuw-5wCaXQv5IA39yt8UO4Pn-q7DeAZV2kKKJ5WT4f2K1-aBPkTRDqgDfHbbHOmlTC', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 12, 'dsad4364yryhdfg', '2023-07-11 14:16:43'),
('jUFejlVbYlWHI9nlxyVn-W3zYUUosHdqshYTDdFHs-p2ZplZyGbRGxjms6ofnO-DouqLSibyboHJ0AvKl3l', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 10, 'dsad4364yryhdfg', '2023-07-11 14:16:43'),
('k0rFhbR2OPQtE6lIHczl-aBgY5c5fdpgsvl9gsrHq-EQEZoRPQQbk4bVJkMH6V-9oD4WL6LnymuCnkJSO8x', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 10, 'sadsad342rsfsdf', '2023-07-03 07:43:29'),
('k3JmAfRDOnwimQcvjBy9-dYguwPOophpGfEZvg682-VOMpyAYq93c8CWZVjOtk-cqB4S0tbprAFfKM2w8Xg', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 9, '34rwergdjghdjk', '2023-07-11 14:16:43'),
('k3TwECfJj8ehcYu3kB6l-fDH7jAjB6SC05vRqOTsU-t9pXu6XYtBS7uh1l3Jwj-bSWGQEmQ4ncgE2Q2KJrO', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 8, 'sadas545gdfgas', '2023-04-15 08:20:05'),
('K6HYY7pqO5Q5zGACFn0D-1otwa0GE5ZL53Szwmg02-GMwPgV6ilPEKLmQyFZ30-2pEb8uF6TP7SIkhAyOv5', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 11, '324gedfsdafsdf', '2023-07-03 07:43:29'),
('KWRHGQwfpBRXHZ9rEPWq-ppARbL3HD4lTvIkIYbC5-KgOtMSMnUKBIsQO4HIAT-pH0B9MCbPiwFPMShO62c', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 7, 'dsad4364yryhdfg', '2023-07-11 14:16:43'),
('KX87gmkQ0qCxwWlEiFIa-H9mF6fjV7zqSufuAaeTp-kLQYZ724rWzasPLdXlxe-PxQRcOkQzSpHg5ORJKvk', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 10, 'dsad4364yryhdfg', '2023-04-15 08:20:04'),
('l4psXmJZ15g2OcMkhi5D-raB9cOU2uWub3KMGDOA4-xbPXTXpEcW9ILE2Zutwl-sygrUySytS6FQihoSz1D', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 8, '34rwergdjghdjk', '2023-07-11 14:16:43'),
('LC5XuWteY7ubP0vmpZpL-a9Py5AanlYvnEVviGgwv-5zexgPyUyHIcdUEj9Zip-StewpJlXEzhnWQYkraEZ', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 9, 'dsad4364yryhdfg', '2023-07-03 07:43:29'),
('ll53MQp0ig29jkDpaPo9-zKp0KjojKnlghiBOPn5b-0Tm7tIO8ayGt8t1aaOAW-a5n6lfTyj7jxlz1B6yof', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 11, 'sadas545gdfgas', '2023-07-03 07:43:29'),
('LloUg1SmmtSEPj79GAet-ijsG3WYrVe46LGJDOwV6-ABrqKpSURQ8x7Vq88FO7-Zl8PwuGyhzmb6T88DtfG', 'OJqISC8tbRO98ex2c4m4-WySsMSqiVOdFGovYraS1-RQXrjmiYHJgh46UjVWeM-xkLth0uPGiQ4c3PL6x49', 8, '34rwergdjghdjk', '2023-07-03 07:46:56'),
('LOrOfB12weq6DI7j2afS-3Kq1pOW6t5KKftwud6go-D6X017gJUmMYVyQ0Dl2K-L4vt7ne6Xc5OtG0V1JTr', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 7, 'dsad4364yryhdfg', '2023-04-15 08:20:04'),
('lPPdbVqjLhJWcX3PwJRX-0rVQO6C9ZyzCHp3rz95l-D8osiOZLQbiouQBtgCwO-o0P2Z1aJzaDRdI3ASEr3', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 11, 'dfs3424sdfsfsdf', '2023-04-15 08:20:04'),
('LuGBPvvfyIQegGBt0Tyq-xOWHw7tkXj1RYYo0pk0K-OmaTfAPPFIJqVBl8K6Ys-hyWbwHZvpPuMZe2qIyon', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 11, 'sadsad-asdasd-adasd', '2023-07-03 07:43:29'),
('Lur5p8m4sO2yYbA4QVky-W14gQisXJm8rHgFgPiYE-Ohpp6HGmBonG1bQiqHk7-VVHFlSMtET2TIZ0ovUOu', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 8, 'sad2345terwfsdf', '2023-04-15 08:20:05'),
('lzSoFiy6DOiqtpbC9e04-EsRFos0hDwE5sDkBOpDM-nDpLZ0mXtj95Gd1HSC0r-lLB2p67sSQfufpYmP5G1', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 8, 'dsad4364yryhdfg', '2023-07-11 14:16:43'),
('lzxVDO5rKdU1byoWtIdv-8gQBuFfgAdXSYEEYHXxs-shpu9SsE39A1Ysf3FKEr-FObf5L51oFDBwRUCbMjq', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 11, '34-ad-sadsad-sadasd', '2023-07-11 14:16:43'),
('MFODOxCvr3lS19FdZf84-JmmmTfBEROo09RsExWeG-o4BUMIsElJmsZ26lGc9d-VP69aKUZ2vOx4WHjGemb', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 9, '324gedfsdafsdf', '2023-07-03 07:43:29'),
('mIqvJKVlWxL0Awt601Cr-mpQTZCwI10WGTydnaQJs-rDorcQgmD07B6vOs4bPU-ZEywF0Ssc3y5IJruRooC', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 10, 'sad2345terwfsdf', '2023-04-15 08:20:05'),
('MjxhxioX2cz29VoOF39V-AdCAtj7KgAUYTcsO9BJF-ymzIHJYr1RBQY2qU7n9O-MyinbVTJ9x5JiI8ZhOgI', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 9, 'dfs3424sdfsfsdf', '2023-07-03 07:43:29'),
('MLKhz44W551Yod7vwUms-CIK3frSPqnkIhOnSdc7x-uSrcjKOQqHVj8BXYzywT-5jWDkQYEn3j1dl7BwAdh', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 8, 'dsad4364yryhdfg', '2023-07-03 07:43:29'),
('mpCzZnkfKQ4hH9pVfxeg-ubjyrKOhOz9eCIEuoUog-OGz9YPjnoGsUkOGgoJib-1OSv6Wf3DJfUdwuaDpzX', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 7, 'sadsad-asdasd-adasd', '2023-07-11 14:16:43'),
('mZx30l5RRRou1ZyQHXi0-8Il3rGgKXl1au7xexrQa-uxbVPylLEYud7kQF06A8-o4KzPUS0fz447zDH1AAD', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 8, 'sadsad342rsfsdf', '2023-07-11 14:16:43'),
('n5gwfIz1MKjOCacLTOBo-Vk81aBu7uyttL1VaJ7Ff-1Hp0Vs4yrmuxSXuppoAt-rbkAs1FTaqhio2U1Y0mL', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 10, 'dfs3424sdfsfsdf', '2023-07-03 07:43:29'),
('nel5jE1XjlqckKYhJFwE-slQ25C8zaPWeSROrOnLL-C6KyGs6Kg73ZDaTX0BoF-BQx1CcE6f9QcRdTgeCoO', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 11, '453-45gd', '2023-04-15 08:20:04'),
('neSCPeI5fO43EonvT0xP-lJDtGDKk3qMf0EPQMO5D-aEUX1aIj0lFgqfgehCGA-TJ3UIkGFbpwKkr48QHxO', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 11, '34rwergdjghdjk', '2023-04-15 08:20:04'),
('nnEOZvhqugOhYbmlChdC-mmDuzOoq2HO3epm19cOg-o3qpvee1GOuhT743rdct-CFmLOo6ULWd2QIG6kmse', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 8, 'dfs3424sdfsfsdf', '2023-07-03 07:43:29'),
('nTf6RftU5xbc0SR9y9Em-EJx38Obl1OkG9qyMdP5a-aH36tPapMbDtFwuoMalp-59yObs1GL45weIOlSZwe', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 9, 'dsad4364yryhdfg', '2023-07-11 14:16:43'),
('ntruaYD3gLvBRjUGeOkm-RghSygogFpEtLbkIFjw7-YC2XFo846rEHXGB0qkdk-sUdWeh4zo0IL6Uxo8ZA6', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 10, 'sadsad342rsfsdf', '2023-04-15 08:20:05'),
('nWTsxASlOsxHmqxuOvEa-Vl4LO6CoRsbxkmSiLQcI-2yrcyVPpvzxEYmAt5Y3b-VQJCM6ysy5g8v9jjOd94', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 9, 'sad2345terwfsdf', '2023-04-15 08:20:05'),
('nxqDlWvTOw8MZOAycJhX-OYYPBgwqSKiroO02EoWO-e6ejwyqaE5tZIB6OiEjV-6t7OJlAhO14dgUqhZViL', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 12, 'sadas545gdfgas', '2023-07-03 07:43:29'),
('O2kgeMzAn5bIlykEljpw-FbZh8yEpfC3TKWZRblho-O46Xn78RiKt5KBuieveH-HuPwzM2rXh5FQOSWgbIH', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 6, 'adas34yru567rtyr', '2023-04-15 08:20:04'),
('O3wkyEJBPjIcLcmHE5jK-HeMAGIMYStTwjdkoHVlc-2D2bBE1idyM3u4O0ZeFE-tRAceCpdhXOzjIi88Xgp', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 8, '453-45gd', '2023-04-15 08:20:04'),
('odOcraUE4PswtGuuHFLJ-r92HwlpkAzYEWSw460Ab-nPmm8Y2uG0jKI6jsWgqt-g4CY7MMPLFDGqY6pWVeI', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 7, 'sad9rewer-sdff', '2023-07-11 14:16:43'),
('oDORvwAR8pdVYhUJMgtp-lDPFAwMky279aO7guaS1-bbng1LaGb3ThyIXUXJkS-oCD8O7Xqq1CkmptupWzg', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 8, '34rwergdjghdjk', '2023-07-03 07:43:29'),
('oIuy6BmbVhZ9dHWUEYM4-lnjAxohkBlnJSjTxZXoh-tzKvXqfdZWdlWfwLWw9K-UTQUQm5tR94uRC3SHeqC', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 7, 'sadsad342rsfsdf', '2023-04-15 08:20:05'),
('OJd5nRyLgwJZnkrvPJZY-r05QZYws73yxStfvSsh8-Q011v8dBAq0xz1qJ0XHV-gWcIRYSqr7weJeJU7zcL', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 12, '34rwergdjghdjk', '2023-04-15 08:20:04'),
('OmiaCuAsZUQEiJ9LZqQ5-pEEnYkksBcpVMBjBtreA-8jCQTB7GZbv2pmCqGFKW-gVQabmktjwUvwhM7Rahx', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 11, 'sadas545gdfgas', '2023-04-15 08:20:05'),
('OpTgbKvbGTcCOgIEu2pW-9lm8Q9qoOdCc6lLX1huB-kg4EMj8yF9GafT9OwRqK-UGzdhHhtrSFQ5RkZER37', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 11, 'dsad4364yryhdfg', '2023-07-03 07:43:29'),
('OW3vVFzqjUiY5OFdKoqZ-FayuZndkP8SjUilaLWcn-FllVHBZkY9EYMn6y0Hnk-e5FSFwxrjROoQrphhwK1', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 6, 'sad9rewer-sdff', '2023-07-03 07:43:29'),
('OwznWmVnzwHyjOvCusiE-RVlJZq6WoJdHmL3nxUeO-djt1wGjHX7O23U7ldg0G-9IlPIJUAOICDqXRRKzvA', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 12, '34rwergdjghdjk', '2023-07-03 07:43:29'),
('OYV0WxInVDGrEgaCcr4L-nijoR6BwnXQ1BuuRin4v-47uTdahPWpZBztA39GLr-nIQfUJTjFYbvVO5Oyhg1', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 9, '453-45gd', '2023-04-15 08:20:04'),
('oZGD0e648HK0dyo4RTpW-uVovooaZ5eO8fxyX3pIq-w6M5vZtk3truYf4WLY1Q-BzWCcHfpDYRxJQkiheeE', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 9, 'sadsad-asdasd-adasd', '2023-04-15 08:20:05'),
('p0RmVfBMUpbX1y4AUQta-Cxr8EMR3g4EEYj9okerq-QOiYhstEDp60uYD8anTG-8GDy3TODUWl05S4yAkeO', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 6, '34-ad-sadsad-sadasd', '2023-04-15 08:20:04'),
('p4Kuj8SfacIZQ2DmRHVV-bmkB2rGsnHLxIaixZ1Oz-cxJnvHMaIp8Riicnx7e0-9oEkUYS2g3orwrryhpnM', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 9, 'dfs3424sdfsfsdf', '2023-04-15 08:20:04'),
('PBOZucgnYLOKIEQUPn47-LUqQQESXyEAfgaE6B8Tu-OKvTmwi5mpCnXTRT1IG5-aaoOI9wuVAfsAwi4umKv', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 12, 'asdsad9asdsad9asdsad', '2023-07-03 07:43:29'),
('PowkFJlYOXTZhBX6JAnv-06jLaoexECRj3gOYlpTz-zfmXpyVO1QBBhzHQShu7-zRX3ZUioIxxSXMZb39ID', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 9, '324gedfsdafsdf', '2023-04-15 08:20:04'),
('Pr4noQ9Gwj938PtSkFf2-FvWLhsfvMpUaKz9hpGK4-kDSRGstUFQ6OBKtHc3Qi-BaSBfiyfn8ZT8T34GHUw', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 6, 'asdsad9asdsad9asdsad', '2023-07-11 14:16:43'),
('psBDTfj82V3GM3mRgQtQ-15pkz3LnicRVghIRSJWb-z37qh62IldkAp2dzBhkU-k9iB2a10uooWTYSgGgMn', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 10, 'dsad4364yryhdfg', '2023-07-03 07:43:29'),
('PU3yaxrHk0PVIEusbWMq-tE9uzw8zSOJPOh3dplIA-9Kfpr4Ui49xyjJESrd6q-6ZBnIrP5zcY40GIRbbui', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 6, 'dfs3424sdfsfsdf', '2023-04-15 08:20:04'),
('pWOnomMmFvIb90eDnUQC-UrXl2gdCPijSykfTfdva-KWtUAB39CXTIRBsRd7Lh-K8ufow5rvj3hhkiyFFOS', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 7, '34-ad-sadsad-sadasd', '2023-07-03 07:43:29'),
('pWxo8l8OtaAxXRiw9g4K-HuMgm1E3X5ai2JPfeju8-rOF9OFXAgYGyIXjCOFdS-f02f9sehe9EKw3vRO69R', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 7, 'sadsad-asdasd-adasd', '2023-07-03 07:43:29'),
('Q1YbiqEkIDmDQXTaj3Bp-g44Xe0rGA1Xt6PaCPQp9-VjbgObMT2jR5y4AFMcn1-6QC9EzdYzjLIGQuCAhDG', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 7, 'sad2345terwfsdf', '2023-04-15 08:20:05'),
('QE7yq5X74KZ7PE6i05GC-75h3qqCkOTJXOTbCebuv-2S5UWOO2Ernk4ZYb1ylZ-9f3gAWCg1eTMX4GWr0gv', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 11, '34rwergdjghdjk', '2023-07-11 14:16:43'),
('QKxKjQLKbMH5rSD9UWb9-VpAZ8e39ZRJjKbOLGbeJ-sT3TB95vG8Qnwauh7wyV-pEW7eyGfPktvWROOwUZQ', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 6, '34rwergdjghdjk', '2023-04-15 08:20:04'),
('qp3fWKYzfB1glD2L4vCV-VI4OHXCGwHdJzhxyis4o-f4IZFRuZgmvShfsKpbVP-LlfbV6AVCudOPqn2AEbT', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 10, 'adas34yru567rtyr', '2023-04-15 08:20:04'),
('quJnjPdj0Pv8X3eyiLyt-o4o8ZwQuM3FM1algOAJk-xalnPyizIGVX0SjkvXx5-DhOa6dciMkKzSqX0kjVf', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 6, 'dsad4364yryhdfg', '2023-04-15 08:20:04'),
('QXddBvZUdhDDeWDWeBIh-ptZ6j31wn6cg6DUafk0l-e1lmvOOC2u2TMmiaCU75-qvyIZxKqKqXJerkOAw9o', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 12, 'sad9rewer-sdff', '2023-04-15 08:20:05'),
('qyiVhFhcH2hVzAOskhB6-3uW6la72uXJlpFLeZOqi-MnV2V30cJ1uwgHOe24uc-H92TVtELZl2S82c5sMRU', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 8, '34-ad-sadsad-sadasd', '2023-07-03 07:43:29'),
('QyXjHHpAC2zen1Pk6Wn3-r9986uPEtZytzDbeGxYW-CW007HUHo20ySaQl9zTf-K30Coc2acy05Zw4AtDft', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 8, 'sadsad342rsfsdf', '2023-07-03 07:43:29'),
('REDt3exh4OZqIgO4Df0A-44Lv52EmLCvOB4ZxW5qL-FuWzXfrnHXFgRD3t6tcS-5XY9sJX3X9cYCiFs3C2M', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 11, 'sad2345terwfsdf', '2023-04-15 08:20:05'),
('rqJW0bYZGHo8CU0wqMzb-C4F7qMMf8l87TWj4X0vA-eA0kZWlSqYFQsxJQAeHE-QPn1OHEl3B10ROvkS1Ua', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 9, 'sadsad-asdasd-adasd', '2023-07-03 07:43:29'),
('rua3Lafa7TfVqBfyhCep-VOqoOEOxAtXntKeijvq7-6F91M1QFk2UjH6z2x0GP-7UtoQO2P7vFmoyaZvfDj', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 10, 'sad9rewer-sdff', '2023-07-11 14:16:43'),
('S8BBJwqAuZzjWRGpBS1X-qGpuxaWc1L15dvTgDvp6-Ksq5bL1d2p747kOgWT2h-POT0bVgeLeOzWEJDQcRx', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 12, 'sad2345terwfsdf', '2023-04-15 08:20:05'),
('sfJIMHcm4puwg5yiX438-61T76MDQ7z50wLn4GYqa-hEmhdTCGkODLWtVlsdua-JClEuKvrFUSSwJeuwWwk', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 7, 'sadsad342rsfsdf', '2023-07-03 07:43:29'),
('sfsp7L7DGaMUUmel4vPK-L09FpZFE0CbAwjJZhnTZ-7UwY3w8ppLdYsutigQmx-e2Jx9AeOIsyWnt0xSz0J', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 12, 'adas34yru567rtyr', '2023-04-15 08:20:04'),
('sPWOtspOQXoyit3EcDCW-R6O58XMH8mZMpVlWur7c-ri970TJMsheYBUfPODYE-bR5fosU350HnrX5LwbLv', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 9, 'asdsad9asdsad9asdsad', '2023-07-03 07:43:29'),
('sqFRRQaF2qzKPRBEXylO-zCRaHoYjtxOa3FTJuTZJ-JWjEV8oO1hrgv4D0PpDz-Wa52QGCADof0MwiIItL1', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 6, 'dsad4364yryhdfg', '2023-07-11 14:16:43'),
('sqjSgeRwHHYjswM38a1g-ZCCblELHiyxxc15E1bFT-QkBQTBWCAdqtKeVjPpY7-v7i4FGZyn69sDVGiobT5', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 12, 'sadas545gdfgas', '2023-04-15 08:20:05'),
('su4I49Mp5dexWqstIPbP-ezzC7weaQc52hSJVRTv0-yjeuQPA7tfd5QaiCBwKj-dxsHO8W42RRPxUOpW36E', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 10, 'sadas545gdfgas', '2023-04-15 08:20:05'),
('sxHl3YXun8HJEq6klmAl-63lweeaATUX0CDqLRnpI-RwGojW3qD2KKZaEKMlMr-PyIRQ0unWnxXc4Tws83h', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 7, 'sadsad342rsfsdf', '2023-07-11 14:16:43'),
('Sy2E4R2YKZxRfuem8Cfp-YAhdrMnrgOpAnkzOyLF5-5yckMq0VlGMIqdviuljh-ZTEfzlPETbwFsISq92Ov', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 6, '34-ad-sadsad-sadasd', '2023-07-03 07:43:29'),
('t0Ovpz3iZLz9jmYH16uL-Bx9XL1E5aFbl8dOS4R69-aUfeqWzUjK5Ow6B5QkM6-SR7CrKJ7i1brHaXDBijV', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 6, '324gedfsdafsdf', '2023-07-03 07:43:29'),
('T24eIOUomZ79g4XnR0Zu-Tin1HcePmHMYOnAdtBut-8xEsOGy52mIwzW9pIliO-OBILHE81w0P3vBWD2agR', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 6, 'sadsad342rsfsdf', '2023-07-03 07:43:29'),
('t2zw13IHOsOrgCRb4Xgs-xB4y4QxiZzLtamLXdftq-FM9PFCk0IER5BOKM4swp-QAFOOqghlxWJSYwEfHi4', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 7, '324gedfsdafsdf', '2023-07-03 07:43:29'),
('tBrj1xWi8Yb0O1CGDaXx-kRc64SUmPck51BzXiMGm-S5MIOrPaj9Q4HSjT58Ah-9hOl0pgOvH5kQv9CXLV2', 'OJqISC8tbRO98ex2c4m4-WySsMSqiVOdFGovYraS1-RQXrjmiYHJgh46UjVWeM-xkLth0uPGiQ4c3PL6x49', 7, '34rwergdjghdjk', '2023-07-03 07:46:56'),
('tcBpaXVsVqOAkQfp5oEs-DdGYZWg7imUxYyQpKEHO-x3LhSWYetjWF3POA2vSE-X3KjfgOjOZ3IuitiOshn', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 8, 'asdsad9asdsad9asdsad', '2023-07-03 07:43:29'),
('tdF2FsdHTlB7Vxq0R7FP-JUfJrPB751a8DuJm4S36-dA51hdJXBzroCqzrZOmn-IDxSm0POm17aG6zJf7jC', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 8, 'sad9rewer-sdff', '2023-07-03 07:43:29'),
('TGq0A7DVYhlk3EJwlQOu-uiwh4bf2xwDDi5Om7xOI-vkRLAhzOdlk2AiEiSA5q-OJxa2EDGeBzSvfdnOa1V', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 12, '324gedfsdafsdf', '2023-04-15 08:20:04'),
('thX7eKGtPmQ3X89KGPOw-WdKsUHU83WzwXGKGTEdS-zy8qeD757lZH4mrI1bZr-4Sy67Pqbe4KDFHRGLSJB', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 9, 'sadsad342rsfsdf', '2023-04-15 08:20:05'),
('tKWE9aIfTMrWFled4M0k-kghaWDCWct34xJTnU9qV-gFZUupIUfPcuIb4u0Kp1-Apv6k56Oe88etWoUtDPO', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 6, 'dsad4364yryhdfg', '2023-07-03 07:43:29'),
('TrJMqXRUek29LEg3ORxI-YgDK5cUf5ZzKCG8fVgav-mupP8wEGWbi1LjKpLUkt-E0YPAW6WJ82IELM2ohJW', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 11, 'asdsad9asdsad9asdsad', '2023-07-03 07:43:29'),
('TuhVI8Od5cEObC8og2yz-PueTvdH1208C7BWtbWZS-PkIaog4C2PAG3VegoYnu-qq2IpYaW0YS4PrzOmuEW', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 10, '34-ad-sadsad-sadasd', '2023-04-15 08:20:04'),
('tV9gFFQpFZjYXV2p18CC-uiiOME1LXlT15dZ9VLLe-VvHh6nw2iEPk0oRMmS1s-Uilq58SnZAlUnktw44Mf', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 9, 'sadsad342rsfsdf', '2023-07-03 07:43:29'),
('TZqbsFG4btDz0ExH1DM9-TQhP8VOOeJczpqOrLrGo-CoDc9bgymUDFrf2iRx0i-Bn8RhjVgLKKMpwWysqQM', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 10, '34-ad-sadsad-sadasd', '2023-07-11 14:16:43'),
('U227c5j49CbwKtTdMiir-zO8WdTk4ohQ5zgIBK8ar-l1BeiMOQwBVIutzhRg3O-fel4gWmO0F00EuWiuVGc', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 12, 'dsad4364yryhdfg', '2023-07-03 07:43:29'),
('uCi59nq5n3hro1MnD0n2-iC7KQLc29xe46tFsSLhg-AXLItSrOVmBWSs77Iu0s-QXgydLxE3FS4pRwQOOom', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 12, '34-ad-sadsad-sadasd', '2023-07-11 14:16:43'),
('ucyMiyG5bf6O0WzWO3ws-K0nIz5dhSi3qf8geCfYB-l1ORLtSp6kvL66cp70d2-Jj1iPS7BHPEGVz55TLjW', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 7, 'sad9rewer-sdff', '2023-04-15 08:20:05'),
('uEpcaVBVwpp0vAqMhUe7-0OmmaAjRYuAjkUKBtr0z-1IgAT9kRXZUyZQ1EJ2IH-ouu8SRIChYFRJKUlvB0D', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 9, 'asdsad9asdsad9asdsad', '2023-04-15 08:20:04'),
('uHOPfMUJ2uFowEiOFtoi-5v66MIn6S9M33oKo5TwR-kO7CACigOqt4LLbSltpL-tySCP0zPcbmbiYKlQl1C', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 9, '34-ad-sadsad-sadasd', '2023-04-15 08:20:04'),
('upGTGGhUhTi6AGGef4Ho-d6HXUyxJjmGVCOy2KQWY-c1p5wE9hoEmG0dXkdVCw-Pe0cqiCJLnvFwH8UrPnE', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 7, '34rwergdjghdjk', '2023-07-03 07:43:29'),
('uRTMXhQD6SFbli8gfYiQ-s3Z6hA9myGe6rD4iR7GL-Gvm7qeACl0MXpkaDGRiT-0Fkg0O9JGShsBGpfYPQF', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 6, 'sadsad-asdasd-adasd', '2023-04-15 08:20:05'),
('uuaCeg5EzEWHpyutbQKu-AzTo79OXiLAX99oRUwP6-JGqoBt8frO9QOV0VU6Ht-955OUglowOlTyAeKz2vv', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 12, 'sadsad-asdasd-adasd', '2023-04-15 08:20:05'),
('uZixXRWgmMpdl239ba1O-mOITyP34lx4nJvb5BSzX-KCXOzAmom95uLQb3iPMI-aa5aY6ywP1CXGaDwZe6F', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 7, 'sad9rewer-sdff', '2023-07-03 07:43:29'),
('VeosnWlR53xkWbw5XKXF-uRdGf6I1jr3YrZbbpGvB-Ae0mxHxXBOClxDdFVxwx-xUc2q2AKAGbUFoaLXtw6', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 10, 'sadsad-asdasd-adasd', '2023-07-03 07:43:29'),
('VEZx3xgBerjnRW1XS8bz-b88MPdSMbKIpQB5nIwQS-gvbf0MQiEmFdRKkc6GGi-zmOq2CkjWLsAXIbE3E4R', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 11, 'sadsad342rsfsdf', '2023-07-03 07:43:29'),
('VngvaOtapSBZ9OyuxoSu-8YwhYduq341EaxLQSZMY-hHj6Hv5SfMOSclOWtg8f-eu5PCv51LzHt4jltnTn3', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 6, '324gedfsdafsdf', '2023-04-15 08:20:03'),
('VtD9Czuj2wCXMA6u2sM3-giJnr7Ebg4F5X3jFm2SB-3FG7RtSsM2OQlektHkzc-T5UQy1UxrMzJl5q0SIDr', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 11, '324gedfsdafsdf', '2023-04-15 08:20:04'),
('W0iZ1JD7FRXUcBHV11E8-Bwpn3O6oWKsHPypAFRPG-rcPQF7EGCRbbl9AUMm78-qdcuT4oo660IKYfCvHeH', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 10, '34rwergdjghdjk', '2023-07-03 07:43:29'),
('W9OqmYBhJuMbOacUBGUO-iRVQek3S44h9xu6hBU74-O0aubVXx5xKvotPOlwEw-dl0jwKdICKqk8x5skOAd', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 10, 'asdsad9asdsad9asdsad', '2023-07-11 14:16:43'),
('wjhDkH40BR6y5vzcCOP3-PhhxOYpv9Y9UDYCOcSPM-zBM7qnRq8T8jlajVvp5o-As0RlEfcBe0hPEI1esrT', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 10, 'dfs3424sdfsfsdf', '2023-04-15 08:20:04'),
('wWgYzst2RwcmIL1yduPb-kapnsJM9YHMr491PX8vp-WBRpJt7AVJyrbMop2Dib-5hrSYdillsrKLoqAOQxv', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 6, '34rwergdjghdjk', '2023-07-03 07:43:29'),
('WxIs2QjVJVCPzCpt3V9k-TWc1SrxXGIS6GB0h9UQ3-YOpLLUr4EgwnDvHBYxpv-Dzd86rpk2KVIOe0j1zwn', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 10, 'sadsad-asdasd-adasd', '2023-04-15 08:20:05'),
('wxOdz5XrqPYjxnCKxIWU-2nx2mxa1QkQk0U1HSHQ1-WYaJAhrzP2XuiwBtZKmj-JyLOltzQXIEVT0OASytV', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 9, 'sad9rewer-sdff', '2023-04-15 08:20:05'),
('X9ELtCqgfWG3ESex4yTA-56vSCkHMRvjYRxvK2HcY-a6KKm8cGWdOmbRjE8GGT-RxamISpDqWEAGtyLQj4a', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 11, 'adas34yru567rtyr', '2023-04-15 08:20:04'),
('xcP1K4SqsnknyumrGDhv-O9vTi431XSk6uTjgfoaP-BJLSbrE35u5mc8a9lJvv-1BA3T3ASBpjOKjQ1IV2V', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 12, 'dfs3424sdfsfsdf', '2023-04-15 08:20:04'),
('XeskYOfX7iU359mFlB7i-eQPe2WOMxvfcS8c88ujY-Br2r5pzAlvoztYlyU0Ft-S9Qg6WcsSRsKBHJHLDot', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 8, 'asdsad9asdsad9asdsad', '2023-04-15 08:20:04'),
('XHDvza5gL8w9Ixgyihjn-sSXOA1U6MF3D74Hpk9FR-4xf9dhcFVfIJmJujMrki-LMJuWE0pFJ6BwycTJdXj', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 7, 'dsad4364yryhdfg', '2023-07-03 07:43:29'),
('xQxkf1JBjYyoAoqDiyfs-cnUwRh4FZ3zQb4qE6aOG-xgK9VGS6iPiArG6Cf9na-eSOOumT9HMZWkHb0qSWr', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 8, 'sadsad-asdasd-adasd', '2023-04-15 08:20:05'),
('Y9OMW1Q0bTF1z1ArJR3P-piiMSthQlmawbgiXWBrQ-RW2TinIYPh5YQspun5OC-0KsPQEP2KIKOKX6ttkW6', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 8, '34-ad-sadsad-sadasd', '2023-07-11 14:16:43'),
('YFf53D9Fqh9lQQLI7SOM-QQ9x92BCVAOmAlIiewwO-AE1jSEfvwZSQOrc2HIME-R0n0ykIt6LoWWUp7wkVf', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 10, 'sadsad-asdasd-adasd', '2023-07-11 14:16:43'),
('YShoOGmOGLctuketr4CO-amePVWshJ9xxt2IHDRDv-hlXdO0aSEAhtAtDQfrLt-ThxuOP48HWbfubRKIQYs', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 11, 'asdsad9asdsad9asdsad', '2023-04-15 08:20:04'),
('yXlsioJQfRvomgJ65VQp-VdqzfXDes4nbd7xbZXEO-SbpHwhajHesMChLf1pPh-G8YUrcwcb8BZ8wIdA0kA', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 6, 'sad9rewer-sdff', '2023-04-15 08:20:05'),
('Z2bfy1z3BwdSsVRK7FCQ-KyOXH2azXJR0bMOrggsF-7uP4WMSGjKHOPnRHbv38-SqCZCIXmu7pFyae29YCn', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 7, 'sadsad-asdasd-adasd', '2023-04-15 08:20:05'),
('ZDyO9FO0fuDKaYaYHnOU-OxrJkwrA1et1iEQlShG1-d6P0I2QrObe6QC2XEsME-DFXQtsrbxTyuTxi5fYv1', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 7, 'sadas545gdfgas', '2023-07-03 07:43:29'),
('zftlmAI01mKCVvnTdwMp-jI8mK1J6BAKVnRvqCB7i-Oi4lkF0A6T0PiF5Bi4Vt-4TMYB6LwqEmxuBewzkkc', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 9, 'sadsad-asdasd-adasd', '2023-07-11 14:16:43'),
('ZFxxkzV0PnIyL0pexru5-q8cLz7RmZUJ6Ry5E36f0-YTQXmxMvgnqk7BWKSkPM-iAUM9GgJlGEVRzFOOdxk', 'R8VIzj6AqUaKKPFP2p5w-AUWaFtJTaUdFen0kUeEU-lBmPZy3Y9zXFQWPX3dZj-qod2LfkjF9Zn52zXjpZa', 11, 'dfs3424sdfsfsdf', '2023-07-03 07:43:29'),
('Zh4SquWpGAOybMKnhopz-hlP4kg5DcG3eRITsroU7-1ZTztUsMFE2lG7hZkvpv-SIhqIVkii6f1Jp3TrTey', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 9, '34-ad-sadsad-sadasd', '2023-07-11 14:16:43'),
('zmlVJQ11wzHz3QCTGYtw-z8y3ygY7HF5kVqv0QiB0-CmO6dpY7IXsCAZsWuZZ7-kXgXLlGlsH1zSkinbV0M', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 6, 'sad2345terwfsdf', '2023-04-15 08:20:04'),
('zOt5qvrjXV5OxRHz2ugQ-s96TaGTPBZvMee6UQtjY-F1eJno6Gz6OlohcBcyWl-ef1AmSbXqVQXPjmSPWPd', 'ycKA66nV5tIttfywGnzj-0MppghhT2XsAXVoXfvX1-vROXMOcYdWtygWn5OLEP-9061LuRdpJ2Rph3ljOhA', 10, '34rwergdjghdjk', '2023-07-11 14:16:43'),
('ZQ41EZRObiraQHDdSu4u-7xUpcwCTw7bFm8O6BT6d-ioCb41pkj64rWkfSumrg-DeMSSAWAWXERx9zosvfY', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 12, 'dsad4364yryhdfg', '2023-04-15 08:20:04'),
('ZrRZmcpF4ZtOMXE5bA2w-R6RBeQy7OK0UTZn2Iu86-5mACgsLLbOmx8ZX3Gda7-kirwrEQg3x44Uie0mxMZ', 'Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW', 7, '453-45gd', '2023-04-15 08:20:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `app_user`
--
ALTER TABLE `app_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `classes_rating`
--
ALTER TABLE `classes_rating`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `class_assigned_teacher_batch`
--
ALTER TABLE `class_assigned_teacher_batch`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `class_call_recording`
--
ALTER TABLE `class_call_recording`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `class_timetable_with_class_batch_assigned`
--
ALTER TABLE `class_timetable_with_class_batch_assigned`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profile_subject_with_batch`
--
ALTER TABLE `profile_subject_with_batch`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school_board`
--
ALTER TABLE `school_board`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sk_mondal_class_test_study_material`
--
ALTER TABLE `sk_mondal_class_test_study_material`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_class_attend`
--
ALTER TABLE `student_class_attend`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_class_attend_assignment`
--
ALTER TABLE `student_class_attend_assignment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_profile`
--
ALTER TABLE `student_profile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teacher_class_attend_assignment`
--
ALTER TABLE `teacher_class_attend_assignment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teacher_subject_and_class`
--
ALTER TABLE `teacher_subject_and_class`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sk_mondal_class_test_study_material`
--
ALTER TABLE `sk_mondal_class_test_study_material`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
