<?php
include_once(__DIR__ . "/../Config.php");

class DatabaseInterest extends Config
{

    public function __construct()
    {
        parent::__construct();
    }

    public function insert($typeId, $value)
    {
        try {
            $sql = '
                    INSERT INTO interest (typeId, value)
                    VALUES (
                             :typeId, :value
                           );
            ';
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['typeId' => $typeId, 'value' => $value]);

            $sql = 'SELECT LAST_INSERT_ID() as interestId';

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

    public function delete(int $id)
    {
        $sql = "DELETE FROM interest WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['id' => $id]);
        return true;
    }

    public function update($id, $typeId, $value) {
        $sql = "UPDATE interest SET typeId = :typeId, value = :value WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['typeId' => $typeId, 'value' => $value, 'id' => $id]);
        $rows = $stmt->fetchAll();
        return $rows;
    }


}