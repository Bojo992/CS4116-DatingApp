<?php
include_once(__DIR__ . "/../Config.php");

class DatabaseBan extends Config
{
    public function __construct()
    {
        parent::__construct();
    }

    public function ban($id, $description, $banTime)
    {
        try {
            $sql = "INSERT INTO ban_list (userId, description, banTime) VALUES (:id, :description, STR_TO_DATE( :banTime, '%d/%m/%Y'))";

            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['id' => $id, 'description' => $description, 'banTime' => $banTime]);

            $result = [
                "status" => true,
                "error" => null,

            ];
            return $result;
        } catch (PDOException $exception) {
            $error = [
                "status" => false,
                "error" => $exception->getMessage(),
            ];
            return $error;
        }
    }

    public function unban($id)
    {

        $sql = 'DELETE FROM ban_list WHERE userId = :id';

        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['id' => $id]);

        $result = [
            "status" => true,
            "error" => null,

        ];
        return $result;
    }

    public function checkIfbanned($userId)
    {
//        $userId = intval($_SERVER["HTTP_USERID"] ?? '');
//        $banTime = $this->ban->checkIfbanned($userId);
//        try {
//            $sql = 'SELECT banTime FROM bans WHERE userId = :userId';
//
//            $stmt = $this->conn->prepare($sql);
//            $stmt->execute(['userId' => $userId]);
//
//            $banTime = $stmt->fetchColumn();
//
//            return $banTime;
//        } catch (PDOException $exception) {
//            return false;
//        }
//
//        if ($banTime > date('Y-m-d H:i:s')) {
//            return json_encode(['message' => 'User is still banned.']);
//        } else {
//            return json_encode(['message' => 'User is not banned.']);
//        }

        try {
            $sql = 'SELECT * FROM ban_list WHERE userId = :userId';

            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['userId' => $userId]);

            $banInfo = $stmt->fetch(PDO::FETCH_ASSOC);

            return $banInfo;
        } catch (PDOException $exception) {
            return false;
        }
    }


}

