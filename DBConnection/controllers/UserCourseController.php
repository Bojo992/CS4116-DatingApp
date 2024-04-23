<?php
include_once(__DIR__ . "/../db/DatabaseUserCourse.php");
include_once(__DIR__ . "/../Util/UtilInclude.php");

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
        $courseId = cleanInput(getRequestBody()["courseId"]);
        $universityId = cleanInput(getRequestBody()["universityId"]);
        $result = $this->userCourse->insert($courseId, $universityId);

        return json_encode($result);
    }

    public function deleteUserCourse()
    {
        $id = intval(getRequestBody()["id"]);

        if ($this->userCourse->delete($id)) {
            return message('University deleted successfully!',false);
        } else {
            return message('Failed to delete an University!',true);
        }
    }

    public function response404(){
        return message("API was not found", 404);
    }

}