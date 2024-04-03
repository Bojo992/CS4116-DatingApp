<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Content-Type: application/json');

include("./db/DatabaseUniversity.php");

class UniversityController
{
    private $university;

    public function __construct()
    {
        $this->university = new DatabaseUniversity();
    }


    public function getAll()
    {
        $data = $this->university->fetch();
        echo json_encode($data);
    }

    public function getById()
    {
        $id = intval(getallheaders()['id'] ?? '');
        $data = $this->university->fetch($id);
        echo json_encode($data);
    }

    public function insertUniversity()
    {
        $name = $this->university->test_input(getallheaders()["name"]);
        $result = $this->university->insert($name);

        if ($result["status"]) {
            echo $this->university->message('University added successfully!',false);
        } else {
            echo $this->university->message($result["error"], 404);
        }
    }

    public function deleteUniversity()
    {
        $idTest = intval(getallheaders()['id']);

        if ($this->university->delete($idTest)) {
            echo $this->university->message('University deleted successfully!',false);
        } else {
            echo $this->university->message('Failed to delete an University!',true);
        }
    }

    public function response404(){
        echo $this->university->message("API was not found", 404);
    }
}