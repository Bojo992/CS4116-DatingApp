<?php

include_once(__DIR__ . "/../Config.php");

class DatabaseUserCourse extends Config
{ public function __construct()
{
    parent::__construct();
}

    public function fetch($id = 0) {
        $sql = 'SELECT * FROM user_course';
        if ($id != 0) {
            $sql .= ' WHERE id = :id';
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['id' => $id]);
        } else {
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
        }

        $rows = $stmt->fetchAll();
        return $rows;
    }

    function fetchByUniversityId($courseId)
    {
        $sql = '
                SELECT *
                    FROM user_course
                    WHERE universityId = :id';

        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['id' => $courseId]);

        $rows = $stmt->fetchAll();
        return $rows;
    }

    function fetchByCourseId($courseId)
    {
        $sql = '
                SELECT *
                    FROM user_course
                    WHERE couceId = :id';

        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['id' => $courseId]);

        $rows = $stmt->fetchAll();
        return $rows;
    }

    public function insert($universityId, $courseId) {
        try {
            $sql = '
                    INSERT INTO user_course (universityId, courseId)
                        VALUES (:universityId, :courseId)';
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['universityId' => $universityId, 'courseId' => $courseId]);

            $sql = 'SELECT LAST_INSERT_ID() as userCourseId';

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
        $sql = '
                DELETE FROM user_course 
                       WHERE id = :id';
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['id' => $id]);
        return true;
    }
}