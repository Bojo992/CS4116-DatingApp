<?php
include_once (__DIR__ . "/../Config.php");
class DatabaseMessages extends Config
{

    public function __construct() {
        parent::__construct();
    }

    public function fetch($id = 0)
    {
        $sql = "SELECT * FROM messages";
        if ($id != 0) {
            $sql .= 'SELECT * FROM messages WHERE id = :id';
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['id' => $id]);
        } else {
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
        }

        $rows = $stmt->fetchAll();
        return $rows;
    }

    public function fetchByMessage($id) {
        $sql = "SELECT * FROM messages WHERE id = :id";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['id' => $id]);

        $rows = $stmt->fetchAll();

        return $rows;
    }
    public function insertMessage($chatId, $message, $senderId, $receiverId) {
        try {
            $sql = "INSERT INTO messages (message, chatId, `from`, `to`)
                        VALUES (:message, :chatId, :senderId, :receiverId)";


            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['message' => $message, 'chatId' => $chatId, 'senderId' => $senderId, 'receiverId' => $receiverId]);

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

    public function deleteMessage($id) {
        $sql = "DELETE FROM messages WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['id' => $id]);
        return true;
    }

}