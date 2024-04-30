<?php

class DatabaseReport extends Config
{
    public function __construct()
    {
        parent::__construct();
    }

    public function reportUser(int $id, $description)
    {
        try {
            $sql = "
                INSERT INTO report (reportedUser, description) VALUE (:id, :description);
            ";

            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['id' => $id, 'description' => $description]);

            $stmt->fetchAll(PDO::FETCH_ASSOC);

            return true;
        } catch (PDOException $exception) {
            return false;
        }
    }

    public function getAllReports()
    {
        try {
            $sql = "
                SELECT reportedUser, GROUP_CONCAT(description SEPARATOR '&*&') AS description
                        FROM report
                        GROUP BY reportedUser;
            ";

            $stmt = $this->conn->prepare($sql);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $exception) {
            return false;
        }
    }
}