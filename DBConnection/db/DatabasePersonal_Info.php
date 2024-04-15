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
        $stmt->execute([':bio' => $bio, ':id' => $id]);
        $rows = $stmt->fetchAll();
        return $rows;
    }

    public function updateSmoking($id, $smoking)
    {
        $sql = "UPDATE personalinfo SET smoking = :smoking WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([':smoking' => $smoking, ':id' => $id]);
        $rows = $stmt->fetchAll();
        return $rows;
    }

    public function updateAge($id, $age)
    {
        $sql = "UPDATE personalinfo SET age = :age WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([':age' => $age, ':id' => $id]);
        $rows = $stmt->fetchAll();
        return $rows;
    }

    public function updateVegan($id, $vegan)
    {
        $sql = "UPDATE personalinfo SET vegan = :vegan WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([':vegan' => $vegan, ':id' => $id]);
        $rows = $stmt->fetchAll();
        return $rows;
    }

    public function updateLocation($id, $location)
    {
        $sql = "UPDATE personalinfo SET location = :location WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([':location' => $location, ':id' => $id]);
        $rows = $stmt->fetchAll();
        return $rows;
    }

    public function updateGender($id, $gender)
    {
        $sql = "UPDATE personalinfo SET gender = :gender WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([':gender' => $gender, ':id' => $id]);
        $rows = $stmt->fetchAll();
        return $rows;
    }

    public function updateDrinking($id, $drinking)
    {
        $sql = "UPDATE personalinfo SET drinking = :drinking WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([':drinking' => $drinking, ':id' => $id]);
        $rows = $stmt->fetchAll();
        return $rows;
    }


}