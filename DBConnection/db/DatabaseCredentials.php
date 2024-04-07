<?php
include_once(__DIR__ . "/../Config.php");

class DatabaseCredentials extends Config
{
    public function __construct()
    {
        parent::__construct();
    }

    public function fetchByUserId($id) {

        $sql = 'SELECT *
                    FROM credentials
                    WHERE userId = :userId';

        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['userId' => $id]);

        $rows = $stmt->fetchAll();
        return $rows;
    }

    public function fetchByEmail($email) {

        $sql = 'SELECT *
                    FROM credentials
                    WHERE mail = :email';

        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['email' => $email]);

        $rows = $stmt->fetchAll();
        return $rows;
    }

    public function insert($email, $password, $userId) {
        try {
            $sql = 'INSERT INTO credentials (mail, password, userId) VALUES (:mail, :password, :userId)';
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['mail' => $email, 'password' => $password, 'userId' => $userId]);
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

    public function delete($id) {
        $sql = 'DELETE FROM credentials WHERE userId = :id';
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['id' => $id]);
        return true;
    }
}