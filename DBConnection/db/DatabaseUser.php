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

    public function insert($isAdmin) {
        try {
            $sql = '
                    INSERT INTO user (
                                          personalInfo,
                                          cource,
                                          isAdmin
                                      ) 
                    VALUES (
                                1,
                                1,
                                :isAdmin
                            );
            ';
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['isAdmin' => $isAdmin]);

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
        $sql = 'DELETE FROM user WHERE userId = :id';
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['id' => $id]);
        return true;
    }
}