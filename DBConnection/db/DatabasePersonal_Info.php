<?php
include_once(__DIR__ . "/../Config.php");

class DatabasePersonal_Info extends Config
{
    public function __construct()
    {
        parent::__construct();
    }

    public function fetch($id = 0)
    {
        $sql = "SELECT * FROM personalinfo";
        if ($id != 0) {
            $sql = 'SELECT * FROM personalinfo WHERE id = :id';
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([':id' => $id]);
        } else {
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
        }

        $rows = $stmt->fetchAll();
        return $rows;

    }

    public function updateBio($id, $bio)
    {
        $sql = "UPDATE personalinfo SET bio = :bio WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['bio' => $bio, 'id' => $id]);
        $rows = $stmt->fetchAll();
        print_r($rows);
        return $rows;
    }

    public function updateSmoking($id, $smoking)
    {
        $sql = "UPDATE personalinfo SET smoking = :smoking WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['smoking' => $smoking, 'id' => $id]);
        $rows = $stmt->fetchAll();
        return $rows;
    }

    public function updateAge($id, $age)
    {
        $sql = "UPDATE personalinfo SET age = :age WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['age' => $age, 'id' => $id]);
        $rows = $stmt->fetchAll();
        return $rows;
    }

    public function updateVegan($id, $vegan)
    {
        $sql = "UPDATE personalinfo SET vegan = :vegan WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['vegan' => $vegan, 'id' => $id]);
        $rows = $stmt->fetchAll();
        return $rows;
    }

    public function updateLocation($id, $location)
    {
        $sql = "UPDATE personalinfo SET location = :location WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['location' => $location, 'id' => $id]);
        $rows = $stmt->fetchAll();
        return $rows;
    }

    public function updateGender($id, $gender)
    {
        $sql = "UPDATE personalinfo SET gender = :gender WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['gender' => $gender, 'id' => $id]);
        $rows = $stmt->fetchAll();
        return $rows;
    }

    public function updateDrinking($id, $drinking)
    {
        $sql = "UPDATE personalinfo SET drinking = :drinking WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['drinking' => $drinking, 'id' => $id]);
        $rows = $stmt->fetchAll();
        return $rows;
    }

    public function insertPersonalInfo($bio,
                           $smoking,
                           $age,
                           $vegan,
                           $location,
                           $gender,
                           $drinking) {
        try {
            $sql = '
                    INSERT INTO personalinfo (
                                          bio,
                                          smoking,
                                          age,
                                          vegan,
                                          location,
                                          Gender,
                                          drinking
                                      ) 
                    VALUES (
                                :bio,
                                :smoking,
                                :age,
                                :vegan,
                                :location,
                                :gender,
                                :drinking
                            );
            ';
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([
                "bio" => $bio,
                "smoking" => $smoking,
                "age" => $age,
                "vegan" => $vegan,
                "location" => $location,
                "gender" => $gender,
                "drinking" => $drinking
            ]);

            $sql = 'SELECT LAST_INSERT_ID() as personalInfoId';

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

}