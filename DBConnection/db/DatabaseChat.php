<?php
include_once (__DIR__ . "/../Config.php");
class DatabaseChat extends Config
{
    public function __construct()
    {
        parent::__construct();
    }

    public function fetch($id = 0) {
        $sql = 'SELECT * FROM chats WHERE id = :id';
        if ($id != 0) {
            $sql = 'SELECT * FROM chats WHERE id = :id';
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['id' => $id]);
        } else {
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
        }

        $rows = $stmt->fetchAll();
        return $rows;
    }

    public function fetchByChat($id) { // do I make $chatId or use $id ?
        $sql = 'SELECT * FROM chats WHERE id = :id';

        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['id' => $id]);

        $rows = $stmt->fetchAll();

        return $rows;
    }

    public function insertChat($id) {
        try {
            $sql = 'INSERT INTO chats (userId) VALUES (:id)';

            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['id' => $id]);

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

    public function deleteChat($id) {

        $sql = 'DELETE FROM chats WHERE id = :id';
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['id' => $id]);
        return true;
    }
}

?>

<?php

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://coursemates.infinityfreeapp.com/DBConnection/course/insertChat',
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

