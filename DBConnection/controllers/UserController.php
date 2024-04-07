<?php
include(__DIR__ . "/../db/DatabaseUser.php");

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
        return json_encode($data);
    }

    public function getById()
    {
        $id = intval($_SERVER["HTTP_ID"] ?? '');
        $data = $this->user->fetch($id);
        return json_encode($data);
    }

    public function insertUser()
    {
        $isAdmin = $_SERVER["HTTP_ISADMIN"];
        $result = $this->user->insert($isAdmin);

        if ($result["status"]) {
            return json_encode($result);
        } else {
            return $this->user->message($result["error"], 404);
        }
    }

    public function deleteUser()
    {
        $userId = intval($_SERVER["HTTP_ID"]);

        $isUserDeleted = $this->user->delete($userId);

        if ($isUserDeleted) {
            return $this->user->message('University deleted successfully!',false);
        } else {
            return $this->user->message('Failed to delete an University!',true);
        }
    }

    public function response404(){
        return $this->user->message("API was not found", 404);
    }
}