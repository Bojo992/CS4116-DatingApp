<?php

include_once(__DIR__ . "/../db/DatabaseCourse.php");

class CourseController {
    private $course;

    public function __construct()
    {
        $this->course = new DatabaseCourse();
    }

    public function getAll()
    {
        $data = $this->course->fetch();
        return json_encode($data);
    }

    public function getById()
    {
         $id = intval($_SERVER["HTTP_ID"] ?? '');
         $data = $this->course->fetch($id);
         return json_encode($data);
    }

    public function getByUniversityId() {
        $universityId = intval($_SERVER["HTTP_ID"] ?? '');
        $data = $this->course->fetchByUniversity($universityId);
        return json_encode($data);
    }

    function insertCourse() {
        $name = $this->course->test_input($_SERVER["HTTP_NAME"]);
        $universityId = $this->course->test_input($_SERVER["HTTP_UNIVERSITYID"]);
        $result = $this->course->insert($name, $universityId);

        if ($result["status"]) {
            return $this->course->message('Course added successfully!',false);
        } else {
            return $this->course->message($result["error"], 404);
        }
    }

    function deleteCourse() {
        $idTest = intval($_SERVER["HTTP_ID"]);

        if ($this->course->delete($idTest)) {
            return $this->course->message('Course deleted successfully!',false);
        } else {
            return $this->course->message('Failed to delete an Course!',true);
        }
    }

    public function response404(){
        return $this->course->message("API was not found", 404);
    }
}