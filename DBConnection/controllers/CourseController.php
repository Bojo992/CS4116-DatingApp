<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Content-Type: application/json');

include("./db/DatabaseCourse.php");

class CourseController {
    private $course;

    public function __construct()
    {
        $this->course = new DatabaseCourse();
    }

    public function getAll()
    {
        $data = $this->course->fetch();
        echo json_encode($data);
    }

    public function getById()
    {
        $id = intval(getallheaders()['id'] ?? '');
        $data = $this->course->fetch($id);
        echo json_encode($data);
    }

    public function getByUniversityId() {
        $universityId = intval(getallheaders()['universityId'] ?? '');
        $data = $this->course->fetchByUniversity($universityId);
        echo json_encode($data);
    }

    function insertCourse() {
        $name = $this->course->test_input(getallheaders()["name"]);
        $universityId = $this->course->test_input(getallheaders()["universityId"]);
        $result = $this->course->insert($name, $universityId);

        if ($result["status"]) {
            echo $this->course->message('Course added successfully!',false);
        } else {
            echo $this->course->message($result["error"], 404);
        }
    }

    function deleteCourse() {
        $idTest = intval(getallheaders()['id']);

        if ($this->course->delete($idTest)) {
            echo $this->course->message('Course deleted successfully!',false);
        } else {
            echo $this->course->message('Failed to delete an Course!',true);
        }
    }

    public function response404(){
        echo $this->course->message("API was not found", 404);
    }
}