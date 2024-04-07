<?php
include_once(__DIR__ . "/Util.php");
class Config
{
    private $dsn;

    // conn variable
    protected $conn = null;

    // Constructor Function
    public function __construct() {
        try {
            $this->dsn = "mysql:host=" . DBHOST . "; dbname=" . DBNAME;

            $this->conn = new PDO($this->dsn, DBUSER, DBPASS);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            die('Connectionn Failed : ' . $e->getMessage());
        }
        return $this->conn;
    }

    // Sanitize Inputs
    public function test_input($data) {
        $data = strip_tags($data);
        $data = htmlspecialchars($data);
        $data = stripslashes($data);
        $data = trim($data);
        return $data;
    }

    // JSON Format Converter Function
    public function message($content, $status) {
        return json_encode(['message' => $content, 'error' => $status]);
    }

}