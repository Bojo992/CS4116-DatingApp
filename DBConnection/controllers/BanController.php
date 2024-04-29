<?php
include_once(__DIR__ . "/../db/DatabaseBan.php");

class BanController
{
    private $ban;

    public function __construct()
    {
        $this->ban = new DatabaseBan();
    }

    public function banUser()
    {
        $id = intval($_SERVER["HTTP_USERID"] ?? '');
        $description = cleanInput($_SERVER["HTTP_DESCRIPTION"] ?? '');
        $banTime = ($_SERVER["HTTP_BANTIME"] ?? '');
        $data = $this->ban->ban($id, $description, $banTime);
        return json_encode($data);
    }

    public function unbanUser()
    {
        $id = intval($_SERVER["HTTP_USERID"] ?? '');
        $data = $this->ban->unban($id);
        return json_encode($data);
    }

    public function checkIfBanned()
    {
        $userId = intval($_SERVER["HTTP_USERID"] ?? '');
        $description = $this->ban->checkIfbanned($userId);

        if ($description != null && $description['banTime'] > date('Y-m-d H:i:s') || $description['banTime'] == null) {
            return json_encode(['message' => 'User is still banned.', 'description' => $description['description'] , 'status' => true]);
        } else {
            $this->unbanUser();
            return json_encode(['message' => 'User is not banned.', 'description' => $description['description'], 'status' => false]);
        }
    }

    public function response404()
    {
        return message("API was not found", 404);
    }

}