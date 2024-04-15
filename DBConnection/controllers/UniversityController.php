<?php

include_once(__DIR__ . "/../db/DatabaseUniversity.php");
include_once(__DIR__ . "/../Util/UtilInclude.php");

error_reporting(E_ERROR | E_PARSE);

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
        $name = cleanInput(getRequestBody()["name"]);

        $result = $this->database->insert($name);

        if ($result["status"]) {
            return $this->database->message('University added successfully!',false);
        } else {
            return $this->database->message($result["error"], 404);
        }
    }

    public function deleteUniversity()
    {
        $id = intval(getRequestBody()["id"]);

        if ($this->database->delete($id)) {
            return message('University deleted successfully!',false);
        } else {
            return message('Failed to delete an University!',true);
        }
    }

    public function response404(){
        return message("API was not found", 404);
    }
}