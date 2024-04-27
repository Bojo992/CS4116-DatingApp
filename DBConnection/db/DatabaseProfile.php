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

    public function suggestionResult($userId)
    {
        $sql = "
                SELECT
                    bio,
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
                FROM user user
                    JOIN personalinfo personalInfo
                        ON user.personalInfo = personalInfo.id AND user.userId != :userId
                    JOIN (
                        SELECT
                            user_course.id as userCourseId,
                            user_course.universityId as universityId,
                            courseId as courseId,
                            course.name as courseName,
                            university.name as universityName
                        FROM user_course
                            JOIN coursemates.course course on user_course.courseId = course.id
                            JOIN coursemates.university university on user_course.universityId = university.id
                    ) userCourse
                        on user.course = userCourse.userCourseId
                    JOIN (
                        SELECT userId , count(interestId) AS interestIntersection
                            FROM personal_interest user1PersonalInterest JOIN interest user1Interest ON
                                user1Interest.id = user1PersonalInterest.interestId
                                    AND user1PersonalInterest.userId != :userId
                                    AND user1Interest.typeId < 0
                            WHERE EXISTS (
                                SELECT *
                                FROM personal_interest user2PersonalInterest JOIN interest user2Interest ON
                                    user2Interest.id = user2PersonalInterest.interestId
                                        AND user2PersonalInterest.userId = :userId
                                        AND user2Interest.typeId > 0
                                        AND (
                                            (
                                                user2Interest.typeId = user1Interest.typeId * -1
                                                    AND user1Interest.value = user2Interest.value 
                                                    OR (user2Interest.value = 0 AND user2Interest.typeId = user1Interest.typeId * -1)
                                            ) OR (
                                               user1Interest.typeId = -7
                                                   AND user2Interest.typeId = 7
                                                   AND user1Interest.value <= user2Interest.value
                                            ) OR (
                                               user1Interest.typeId = -8
                                                   AND user2Interest.typeId = 8
                                                   AND user1Interest.value >= user2Interest.value
                                               )
                                        )
                            )
                            GROUP BY userId
                    ) userInterest
                            on user.userId = userInterest.userId
                WHERE user.userId != :userId
                ORDER BY interestIntersection desc
        ";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute( ["userId" => $userId]);

        $rows = $stmt->fetchAll();

        return $rows;
    }
}