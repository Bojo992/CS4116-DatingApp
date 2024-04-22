<?php
include __DIR__ . "/../db/DatabasePersonal_Interest.php";

class Personal_InterestController
{

    private $personal_interest;

    public function __construct(){
        $this->personal_interest = new DatabasePersonal_Interest();
    }

    public function getAllForTheUser() {
        $userId = intval($_SERVER["HTTP_USERID"] ?? '');
        $data = $this->personal_interest->fetch($userId);
        return json_encode($data);
    }

    public function insertPersonalInterest() {

        $userId = intval($_SERVER["HTTP_USERID"] ?? '');
        $interest = intval($_SERVER["HTTP_INTEREST"] ?? '');
        $data = $this->personal_interest->insert($userId, $interest);
        return json_encode($data);
    }

    public function deletePersonalInterest() {
        $userId = intval($_SERVER["HTTP_USERID"] ?? '');
        $data = $this->personal_interest->delete($userId);
        return json_encode($data);
    }

    public function response404(){
        return message("API was not found", 404);
    }

}