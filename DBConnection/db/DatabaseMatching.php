<?php
include_once(__DIR__ . "/../Config.php");

class DatabaseMatching extends Config
{

    public function __construct()
    {
        parent::__construct();
    }

    public function like(int $userId, int $recommendedUserId)
    {
        try {
            $sql = "INSERT INTO likes (userId, recommendedUserId) VALUES (:userId, :recommendedUserId)";

            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['userId' => $userId, 'recommendedUserId' => $recommendedUserId]);

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

    public function checkIfMatch(int $userId, int $recommendedUserId)
    {
        $sql = 'SELECT IF(
    (SELECT COUNT(distinct recommendedUserId)
     FROM likes
     WHERE (userId = :userId AND recommendedUserId = :recommendedUserId) OR
         (userId = :recommendedUserId AND recommendedUserId = :userId)
    ) > 1 AND NOT EXISTS(SELECT * FROM chats WHERE (userId = :userId AND userId2 = :recommendedUserId) OR
         (userId = :recommendedUserId AND userId2 = :userId)), true, false
    ) as isMatch;';
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['userId' => $userId, 'recommendedUserId' => $recommendedUserId]);
        $isMatch = $stmt->fetch(PDO::FETCH_ASSOC);
        return $isMatch;
    }

    public function dislike(int $userId, int $recommendedUserId)
    {
        $sql = "INSERT INTO dislikes (userId, recommendedUserId) VALUES (:userId, :recommendedUserId)";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['userId' => $userId, 'recommendedUserId' => $recommendedUserId]);
        return true;
    }


}