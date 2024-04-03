<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Content-Type: application/json');

include("./db/DatabaseCredentials.php");

class CredentialsController
{
    private $credentials;

    public function __construct()
    {
        $this->credentials = new DatabaseCredentials();
    }

    public function getByUserId()
    {
        $id = intval(getallheaders()['id'] ?? '');
        $data = $this->credentials->fetchByUserId($id);
        echo json_encode($data);
    }

    public function getByEmail()
    {
        $email = $this->credentials->test_input(getallheaders()['email'] ?? '');
        $data = $this->credentials->fetchByEmail($email);
        echo json_encode($data);
    }

    public function insertCredentials()
    {
        $mail = $this->credentials->test_input(getallheaders()["mail"]);
        $password = $this->credentials->test_input(getallheaders()["password"]);
        $userId = $this->credentials->test_input(getallheaders()["userId"]);

        $result = $this->credentials->insert($mail, $password, $userId);

        if ($result["status"]) {
            echo $this->credentials->message('Credentials added successfully!',false);
        } else {
            echo $this->credentials->message($result["error"], 404);
        }
    }

    public function deleteCredentials()
    {
        $id = intval(getallheaders()['userId']);

        if ($this->credentials->delete($id)) {
            echo $this->credentials->message('Credentials deleted successfully!',false);
        } else {
            echo $this->credentials->message('Failed to delete an Credentials!',true);
        }
    }

    public function response404(){
        echo $this->credentials->message("API was not found", 404);
    }
}