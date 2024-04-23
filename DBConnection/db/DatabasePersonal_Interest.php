<?php

class DatabasePersonal_Interest extends Config
{
    public function __construct()
    {
        parent::__construct();
    }

    public function fetch($userId) {
        $sql = 'SELECT * FROM personal_interest WHERE userId = :userId';
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['userId' => $userId]);

        $rows = $stmt->fetchAll();
        return $rows;
    }

    public function insert(int $userId, int $interest)
    {
        try {
            $sql = '
                    INSERT INTO personal_interest (userId, interestId)
                    VALUES (
                            :userId, :interestId
                           );
            ';
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['userId' => $userId, 'interestId' => $interest]);

            $data = $stmt->fetchAll();
            $result = [
                "data" => $data,
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

    public function delete(int $userId)
    {
        $sql = "DELETE FROM personal_interest WHERE userId = :userId";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['userId' => $userId]);
        return true;
    }
}