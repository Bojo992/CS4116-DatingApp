<?php
include(__DIR__ . "/../db/DatabaseUserCourse.php");

class UserCourseController
{
    private $userCourse;

    public function __construct()
    {
        $this->userCourse = new DatabaseUserCourse();
    }


    public function getAll()
    {
        $data = $this->userCourse->fetch();
        return json_encode($data);
    }

    public function getById()
    {
        $id = intval($_SERVER["HTTP_ID"] ?? '');
        $data = $this->userCourse->fetch($id);
        return json_encode($data);
    }

    public function getByUniversityId()
    {
        $id = intval($_SERVER["HTTP_UNIVERSITYID"] ?? '');
        $data = $this->userCourse->fetchByUniversityId($id);
        return json_encode($data);
    }

    public function getByCourseId()
    {
        $id = intval($_SERVER["HTTP_COURSEID"] ?? '');
        $data = $this->userCourse->fetchByCourseId($id);
        return json_encode($data);
    }

    public function insertUserCourse()
    {
        $courseId = $this->userCourse->test_input($_SERVER["HTTP_COURSEID"]);
        $universityId = $this->userCourse->test_input($_SERVER["HTTP_UNIVERSITYID"]);
        $result = $this->userCourse->insert($courseId, $universityId);

        if ($result["status"]) {
            return $this->userCourse->message('University added successfully!',false);
        } else {
            return $this->userCourse->message($result["error"], 404);
        }
    }

    public function deleteUserCourse()
    {
        $idTest = intval($_SERVER["HTTP_ID"]);

        if ($this->userCourse->delete($idTest)) {
            return $this->userCourse->message('University deleted successfully!',false);
        } else {
            return $this->userCourse->message('Failed to delete an University!',true);
        }
    }

    public function response404(){
        return $this->userCourse->message("API was not found", 404);
    }

}