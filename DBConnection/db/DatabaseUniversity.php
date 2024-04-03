<?php

class DatabaseUniversity extends Config
{
    public function __construct()
    {
        parent::__construct();
    }

    public function fetch($id = 0) {
        $sql = 'SELECT * FROM university';
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

    public function insert($name) {
        try {
            $sql = 'INSERT INTO university (name) VALUES (:name)';
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['name' => $name]);
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

    public function delete($id)
    {
        $sql = 'DELETE FROM university WHERE id = :id';
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['id' => $id]);
        return true;
    }
}