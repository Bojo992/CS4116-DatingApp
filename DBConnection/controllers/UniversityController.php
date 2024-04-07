<?php

include_once(__DIR__ . "/../db/DatabaseUniversity.php");

class UniversityController
{
    private $database;

    public function __construct()
    {
        $this->database = new DatabaseUniversity();
    }


    public function getAll()
    {
        $data = $this->database->fetch();
        return json_encode($data);
    }

    public function getById()
    {
        $id = intval($_SERVER["HTTP_ID"] ?? '');
        $data = $this->database->fetch($id);
        return json_encode($data);
    }

    public function insertUniversity()
    {
        $name = $this->database->test_input($_SERVER["HTTP_NAME"]);
        $result = $this->database->insert($name);

        if ($result["status"]) {
            return $this->database->message('University added successfully!',false);
        } else {
            return $this->database->message($result["error"], 404);
        }
    }

    public function deleteUniversity()
    {
        $idTest = intval($_SERVER['HTTP_ID']);

        if ($this->database->delete($idTest)) {
            return $this->database->message('University deleted successfully!',false);
        } else {
            return $this->database->message('Failed to delete an University!',true);
        }
    }

    public function response404(){
        return $this->database->message("API was not found", 404);
    }
}