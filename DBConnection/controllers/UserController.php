<?php
include(__DIR__ . "/../db/DatabaseUser.php");
include_once(__DIR__ . "/../Util/UtilInclude.php");

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
        $isAdmin = boolval(getRequestBody()["isAdmin"]);
        $userName = cleanInput(getRequestBody()["username"]);
        $userEmail = cleanInput(getRequestBody()["userEmail"]);
        $result = $this->user->insert($isAdmin, $userName, $userEmail);

        if ($result["status"]) {
            return json_encode($result);
        } else {
            return message($result["error"], 404);
        }
    }

    public function deleteUser()
    {
        $userId = intval(getRequestBody()["id"]);

        $isUserDeleted = $this->user->delete($userId);

        if ($isUserDeleted) {
            return message('University deleted successfully!',false);
        } else {
            return message('Failed to delete an University!',true);
        }
    }

    public function response404(){
        return message("API was not found", 404);
    }
}