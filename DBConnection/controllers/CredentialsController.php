<?php

include(__DIR__ . "/../db/DatabaseCredentials.php");
include_once(__DIR__ . "/../Util/UtilInclude.php");

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

    public function checkCredentials()
    {
        $mail = cleanInput(
            isset(getRequestBody()['email']) ? getRequestBody()["email"] : '');
        $userName = cleanInput(
            isset(getRequestBody()['username']) ? getRequestBody()["username"] : '');
        $password = cleanInput(
            isset(getRequestBody()['password']) ? getRequestBody()["password"] : '');

        $response = $this->credentials->checkCredentials($mail, $userName, $password);

        return json_encode($response);
    }

    public function insertCredentials()
    {
        $mail = cleanInput(getRequestBody()["email"]);
        $password = cleanInput(getRequestBody()["password"]);
        $userId = cleanInput(getRequestBody()["userId"]);
        $userName = cleanInput(getRequestBody()["username"]);

        $result = $this->credentials->insert($mail, $password, $userId, $userName);

        if ($result["status"]) {
            return message('Credentials added successfully!',false);
        } else {
            return message($result["error"], 404);
        }
    }

    public function deleteCredentials()
    {
        $id = intval(getRequestBody()["userId"]);

        if ($this->credentials->delete($id)) {
            return message('Credentials deleted successfully!',false);
        } else {
            return message('Failed to delete an Credentials!',true);
        }
    }

    public function response404(){
        return message("API was not found", 404);
    }
}