<?php

include_once (__DIR__ . "/../Config.php");

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
        $sql = 'DELETE FROM course WHERE id = :id';
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['id' => $id]);
        return true;
    }
}
?>

<?php

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://coursemates.infinityfreeapp.com/DBConnection/course/insertCourse',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_HTTPHEADER => array(
        'name: test new uni',
        'universityId: 1'
    ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;

?>
