<?php
include_once(__DIR__ . "/../db/DatabasePersonal_Info.php");
include_once(__DIR__ . "/../db/DatabaseUserCourse.php");
include_once(__DIR__ . "/../db/DatabaseUniversity.php");
include_once(__DIR__ . "/../db/DatabaseCourse.php");
include_once(__DIR__ . "/../db/DatabaseUser.php");

class ProfileController
{



    public function __construct()
    {

    }

    public function getProfileInfo()
    {
        $id = intval($_SERVER["HTTP_USERID"] ?? '');
        $userDB = new DatabaseUser();
        $user = $userDB->fetch($id);
//Getting the keys of the user to call them.
        $findKey = array_keys($user[0]);

        $piDB = new DatabasePersonal_Info();
        $pi = $piDB->fetch(intval($user[0][$findKey[1]]));

        $userCourseDB = new DatabaseUserCourse();
        $usercourse = $userCourseDB->fetch($user[0][$findKey[2]]);

        $findKey = array_keys($usercourse[0]);

        $universityDB = new DatabaseUniversity();
        $university = $universityDB->fetch($usercourse[0][$findKey[1]]);

        $courseDB = new DatabaseCourse();
        $course = $courseDB->fetch($usercourse[0][$findKey[2]]);


        $result = [
            "user" => $user,
            "personalInfo" => $pi,
            "university" => $university,
            "course" => $course,
            "userCourse" => $usercourse

        ];
        return json_encode($result);
    }

}