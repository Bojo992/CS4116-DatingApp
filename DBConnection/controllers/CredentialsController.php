<?php

include(__DIR__ . "/../db/DatabaseCredentials.php");

class CredentialsController
{
    private $credentials;

    public function __construct()
    {
        $this->credentials = new DatabaseCredentials();
    }

    public function getByUserId()
    {
        $id = intval($_SERVER["HTTP_ID"] ?? '');
        $data = $this->credentials->fetchByUserId($id);
        return json_encode($data);
    }

    public function getByEmail()
    {
        $email = $this->credentials->test_input($_SERVER["HTTP_EMAIL"] ?? '');
        $data = $this->credentials->fetchByEmail($email);
        return json_encode($data);
    }

    public function insertCredentials()
    {
        $mail = $this->credentials->test_input($_SERVER["HTTP_MAIL"]);
        $password = $this->credentials->test_input($_SERVER["HTTP_PASSWORD"]);
        $userId = $this->credentials->test_input($_SERVER["HTTP_USERID"]);

        $result = $this->credentials->insert($mail, $password, $userId);

        if ($result["status"]) {
            return $this->credentials->message('Credentials added successfully!',false);
        } else {
            return $this->credentials->message($result["error"], 404);
        }
    }

    public function deleteCredentials()
    {
        $id = intval($_SERVER["HTTP_USERID"]);

        if ($this->credentials->delete($id)) {
            return $this->credentials->message('Credentials deleted successfully!',false);
        } else {
            return $this->credentials->message('Failed to delete an Credentials!',true);
        }
    }

    public function response404(){
        return $this->credentials->message("API was not found", 404);
    }
}