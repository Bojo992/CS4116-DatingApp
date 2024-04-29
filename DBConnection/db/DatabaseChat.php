<?php
include_once (__DIR__ . "/../Config.php");
class DatabaseChat extends Config
{
    public function __construct()
    {
        parent::__construct();
    }

    public function fetch($id = 0) {
        $sql = 'SELECT * FROM chats';
        if ($id != 0) {
            $sql = 'SELECT * FROM chats WHERE userId = :id';
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['id' => $id]);
        } else {
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
        }

        $rows = $stmt->fetchAll();
        return $rows;
    }

    public function fetchByChat($id) {
        $sql = 'SELECT * FROM chats WHERE id = :id';

        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['id' => $id]);

        $rows = $stmt->fetchAll();

        return $rows;
    }

    public function insertChat($id1, $id2) {
        try {
            $sql = 'INSERT INTO chats (userId, userId2) VALUES (:id, :id2)';

            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['id' => $id1, 'id' => $id2]);

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

    public function deleteChat($id) {

        $sql = 'DELETE FROM chats WHERE id = :id';
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['id' => $id]);
        return true;
    }
}




