<?php
include_once(__DIR__ . "/../Config.php");

class DatabaseProfile extends Config
{


    public function __construct()
    {
        parent::__construct();
    }

    public function getAllUserProfileInfo () {
        $sql = 'SELECT bio,
       smoking,
       age,
       vegan,
       Gender,
       drinking,
       course,
       user.userId,
       user.dateCreated,
       user.isAdmin,
       user.userName,
       user.userEmail,
       user.profilePicture,
       userCourse.universityId,
       userCourse.universityName,
       userCourse.courseName,
       userCourse.courseId
FROM personalinfo userPersonalInfo
         JOIN user user on userPersonalInfo.id = user.personalInfo
         JOIN (SELECT course.universityId,
                      university.name as universityName,
                      course.name     as courseName,
                      user_course.courseId,
                      user_course.id  as userCourse
               FROM user_course
                        JOIN university on user_course.universityId = university.id
                        JOIN course on user_course.courseId = course.id) userCourse on course = userCourse';

        $stmt = $this->conn->prepare($sql);
        $stmt->execute();

        $rows = $stmt->fetchAll();

        return $rows;
    }
}