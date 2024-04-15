<?php

include_once(__DIR__ . "/../db/DatabaseCourse.php");
include_once(__DIR__ . "/../Util/UtilInclude.php");

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
        $universityId = intval($_SERVER["HTTP_UNIVERSITYID"] ?? '');
        $data = $this->course->fetchByUniversity($universityId);
        return json_encode($data);
    }

    function insertCourse() {
        $name = cleanInput(getRequestBody()["name"]);
        $universityId = cleanInput(getRequestBody()["universityId"]);
        $result = $this->course->insert($name, $universityId);

        if ($result["status"]) {
            return message('Course added successfully!',false);
        } else {
            return message($result["error"], 404);
        }
    }

    function deleteCourse() {
        $idTest = intval(getRequestBody()["id"] ?? '');

        if ($this->course->delete($idTest)) {
            return message('Course deleted successfully!',false);
        } else {
            return message('Failed to delete an Course!',true);
        }
    }

    public function response404(){
        return message("API was not found", 404);
    }
}