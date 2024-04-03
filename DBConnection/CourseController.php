<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Content-Type: application/json');

include("DatabaseCourse.php");

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
            echo $this->course->message($result["error"]->getMessage(), 404);
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

//
//$course = new DBConnection\Database();
//
//// create an api variable to get HTTP method dynamically
//$api = $_SERVER["REQUEST_METHOD"];

//Separate get by uni to separate file

//if ($api == 'GET') {
//    $id = intval($_GET['id'] ?? '');
//    $universityId = intval(getallheaders()['universityId'] ?? '');
//    if ($id != 0 xor $universityId != 0) {
//        if($universityId == 0) {
//            $data = $course->fetch($id);
//        } else {
//            $data = $course->fetchByUniversity($universityId);
//        }
//    } else {
//        $data = $course->fetch();
//    }
//    echo json_encode($data);
//}
//
//if ($api == 'POST') {
//    $name = $course->test_input(getallheaders()["name"]);
//    $universityId = $course->test_input(getallheaders()["universityId"]);
//
//    if ($course->insert($name, $universityId)) {
//        echo $course->message('Course added successfully!',false);
//    } else {
//        echo $course->message('Failed to add an Course!',true);
//    }
//}
//
//if ($api == 'DELETE') {
//    $idTest = intval(getallheaders()['id']);
//
//    if ($course->delete($idTest)) {
//        echo $course->message('Course deleted successfully!',false);
//    } else {
//        echo $course->message('Failed to delete an Course!',true);
//    }
//}
