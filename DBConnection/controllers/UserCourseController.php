<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Content-Type: application/json');

include("./db/DatabaseUserCourse.php");

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
        echo json_encode($data);
    }

    public function getById()
    {
        $id = intval(getallheaders()['id'] ?? '');
        $data = $this->userCourse->fetch($id);
        echo json_encode($data);
    }

    public function getByUniversityId()
    {
        $id = intval(getallheaders()['universityId'] ?? '');
        $data = $this->userCourse->fetchByUniversityId($id);
        echo json_encode($data);
    }

    public function getByCourseId()
    {
        $id = intval(getallheaders()['courseId'] ?? '');
        $data = $this->userCourse->fetchByCourseId($id);
        echo json_encode($data);
    }

    public function insertUserCourse()
    {
        $courseId = $this->userCourse->test_input(getallheaders()["courseId"]);
        $universityId = $this->userCourse->test_input(getallheaders()["universityId"]);
        $result = $this->userCourse->insert($courseId, $universityId);

        if ($result["status"]) {
            echo $this->userCourse->message('University added successfully!',false);
        } else {
            echo $this->userCourse->message($result["error"], 404);
        }
    }

    public function deleteUserCourse()
    {
        $idTest = intval(getallheaders()['id']);

        if ($this->userCourse->delete($idTest)) {
            echo $this->userCourse->message('University deleted successfully!',false);
        } else {
            echo $this->userCourse->message('Failed to delete an University!',true);
        }
    }

    public function response404(){
        echo $this->userCourse->message("API was not found", 404);
    }

}