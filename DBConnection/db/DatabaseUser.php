<?php
include_once(__DIR__ . "/../Config.php");

class DatabaseUser extends Config
{
    public function __construct()
    {
        parent::__construct();
    }

    public function fetch($id = 0) {
        $sql = 'SELECT * FROM user';
        if ($id != 0) {
            $sql .= ' WHERE userId = :id';
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['id' => $id]);
        } else {
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
        }

        $rows = $stmt->fetchAll();
        return $rows;
    }

    public function updateCourse($id, $courseId)
    {
        $sql = '
        UPDATE user
        SET course = :courseId
            WHERE userId = :id;
        ';

        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['courseId' => $courseId, 'id' => $id]);

        return true;
    }

    public function updateProfilePicture($id, $profilePicture)
    {
        $sql = '
        UPDATE user
        SET profilePicture = :profilePicture
            WHERE userId = :id;
        ';

        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['profilePicture' => $profilePicture, 'id' => $id]);

        return true;
    }

    public function updatePersonalInfo($id, $personalInterestId)
    {
        $sql = '
        UPDATE user
        SET personalInfo = :personalInfo
            WHERE userId = :id;
        ';

        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['id' => $id, 'personalInfo' => $personalInterestId]);

        return true;
    }

    public function changeAdminStatus($id)
    {
        $sql = '
        UPDATE user
        SET isAdmin = !isAdmin
            WHERE userId = :id;
        ';

        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['id' => $id]);

        return true;
    }

    public function insert($isAdmin, $userName, $userEmail) {
        try {
            $sql = '
                    INSERT INTO user (
                                          personalInfo,
                                          course,
                                          isAdmin,
                                          userName,
                                          userEmail,
                                          profilePicture
                                      ) 
                    VALUES (
                                1,
                                1,
                                :isAdmin,
                                :userName,
                                :userEmail,
                                NULL
                            );
            ';
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['isAdmin' => $isAdmin, 'userName' => $userName, 'userEmail' => $userEmail]);

            $sql = 'SELECT LAST_INSERT_ID() as userId';

            $stmt = $this->conn->prepare($sql);
            $stmt->execute();

            $data = $stmt->fetchAll();
            $result = [
                "data" => $data,
                "message" => "User added successfully",
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

    public function delete($id)
    {
        try {
        $sql = '
    DELETE FROM interest
       WHERE id IN (
            SELECT interestId
                FROM personal_interest
                WHERE userId = :id
       );
    
    DELETE FROM chats
        WHERE userId = :id OR userId2 = :id;
    
    DELETE FROM personalinfo
        WHERE id = (
            SELECT personalInfo
                FROM user
                WHERE userId = :id
        );
    
    DELETE FROM user_course
    WHERE id =  (
        SELECT course
        FROM user
        WHERE userId = :id
    );
    
    DELETE FROM user WHERE userId = :id;
    ';

        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['id' => $id]);

        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $result = [
            "data" => $data,
            "message" => "User deleted successfully",
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
}