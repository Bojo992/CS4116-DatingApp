<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Content-Type: application/json');

include("./db/DatabaseUser.php");

class UserController
{
    private $user;

    public function __construct()
    {
        $this->user = new DatabaseUser();
    }

    public function getAll()
    {
        $data = $this->user->fetch();
        echo json_encode($data);
    }

    public function getById()
    {
        $id = intval(getallheaders()['id'] ?? '');
        $data = $this->user->fetch($id);
        echo json_encode($data);
    }

    public function insertUser()
    {
        $isAdmin = getallheaders()["isAdmin"];
        $result = $this->user->insert(date('Y-m-d', $isAdmin));

        if ($result["status"]) {
            echo $this->user->message('User added successfully!',false);
        } else {
            echo $this->user->message($result["error"], 404);
        }
    }

    public function deleteUser()
    {
        $userId = intval(getallheaders()['id']);

        $isUserDeleted = $this->user->delete($userId);

        if ($isUserDeleted) {
            echo $this->user->message('University deleted successfully!',false);
        } else {
            echo $this->user->message('Failed to delete an University!',true);
        }
    }

    public function response404(){
        echo $this->user->message("API was not found", 404);
    }
}