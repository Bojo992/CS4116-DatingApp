<?php

include_once ("Config.php");

class DatabaseCourse extends Config
{
    public function __construct()
    {
        parent::__construct();
    }

    public function fetch($id = 0) {
        $sql = 'SELECT * FROM course';
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

    public function fetchByUniversity($universityId) {
        $sql = 'SELECT *
                FROM course
                WHERE universityId = :universityId';

        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['universityId' => $universityId]);

        $rows = $stmt->fetchAll();

        return $rows;
    }

    public function insert($name, $universityId) {
        try {
            $sql = 'INSERT INTO course (name, universityId) VALUES (:name, :universityId)';
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['name' => $name, 'universityId' => $universityId]);
            $result = [
                "status" => false,
                "error" => null,
            ];
            return $result;
        } catch (PDOException $exception) {
            $error = [
                "status" => false,
                "error" => $exception,
                ];
            return $error;
        }
    }

    public function delete($id)
    {
        $sql = 'DELETE FROM course WHERE id = :id';
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['id' => $id]);
        return true;
    }
}