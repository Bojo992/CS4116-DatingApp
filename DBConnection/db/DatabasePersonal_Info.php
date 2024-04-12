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
        $sql = "SELECT * FROM personal_info";
        if ($id != 0) {
            $sql = 'SELECT * FROM messages WHERE id = :id';
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
        $sql = "UPDATE personal_info SET bio = :bio WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([':bio' => $bio, ':id' => $id]);
        $rows = $stmt->fetchAll();
        return $rows;
    }

    public function updateSmoking($id, $smoking)
    {
        $sql = "UPDATE personal_info SET smoking = :smoking WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([':smoking' => $smoking, ':id' => $id]);
        $rows = $stmt->fetchAll();
        return $rows;
    }

    public function updateAge($id, $age)
    {
        $sql = "UPDATE personal_info SET age = :age WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([':age' => $age, ':id' => $id]);
        $rows = $stmt->fetchAll();
        return $rows;
    }

    public function updateVegan($id, $vegan)
    {
        $sql = "UPDATE personal_info SET vegan = :vegan WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([':vegan' => $vegan, ':id' => $id]);
        $rows = $stmt->fetchAll();
        return $rows;
    }

    public function updateLocation($id, $location)
    {
        $sql = "UPDATE personal_info SET location = :location WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([':location' => $location, ':id' => $id]);
        $rows = $stmt->fetchAll();
        return $rows;
    }

    public function updateGender($id, $gender)
    {
        $sql = "UPDATE personal_info SET gender = :gender WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([':gender' => $gender, ':id' => $id]);
        $rows = $stmt->fetchAll();
        return $rows;
    }

    public function updateDrinking($id, $drinking)
    {
        $sql = "UPDATE personal_info SET drinking = :drinking WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([':drinking' => $drinking, ':id' => $id]);
        $rows = $stmt->fetchAll();
        return $rows;
    }


}