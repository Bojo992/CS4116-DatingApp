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

        return $isUserDeleted;
    }

    public function updateCourse()
    {
        $id = intval(getRequestBody()["id"]);
        $courseId = intval(getRequestBody()["courseId"]);


        $this->user->updateCourse($id, $courseId);

        return json_encode(true);
    }

    public function updateProfilePicture()
    {
        $id = intval(getRequestBody()["id"]);
        $courseId = cleanInput(getRequestBody()["profilePicture"]);


        $this->user->updateProfilePicture($id, $courseId);

        return json_encode(true);
    }

    public function updatePersonalInfo()
    {
        $id = intval(getRequestBody()["id"]);
        $personalInterestId = intval(getRequestBody()["personalInterestId"]);


        $this->user->updatePersonalInfo($id, $personalInterestId);

        return json_encode(true);
    }

    public function changeAdminStatus()
    {
        $id = intval(getRequestBody()["id"]);

        $this->user->changeAdminStatus($id);

        return json_encode(true);
    }

    public function response404(){
        return message("API was not found", 404);
    }
}