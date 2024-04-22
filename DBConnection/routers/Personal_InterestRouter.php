<?php
include_once(__DIR__ . "/../Util.php");
include_once(__DIR__ . "/../controllers/Personal_InterestController.php");

class Personal_InterestRouter
{

    private string $uri;

    private Personal_InterestController $controller;

    public function __construct()
    {
        $this->uri = parse_url($_SERVER["REQUEST_URI"]) ['path'];
        $this->controller = new Personal_InterestController();
    }

    function personal_interestRouter()
    {
        $explode_uri = explode("/", $this->uri);

        if (URI_API_OFFSET < sizeOf($explode_uri)) {
            $apiName = $explode_uri[URI_API_OFFSET];
        } else {
            $apiName = '';
        }

        switch ($apiName) {
            case "getAllForTheUser" :
                return $this->controller->getAllForTheUser();
                break;
            case "insertPersonalInterest" :
                return $this->controller->insertPersonalInterest();
                break;
            case "deletePersonalInterest" :
                return $this->controller->deletePersonalInterest();
                break;
            default :
                return $this->controller->response404();
                break;
        }
    }
}