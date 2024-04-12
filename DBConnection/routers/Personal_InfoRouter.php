<?php
include_once(__DIR__ . "/../Util.php");
include_once(__DIR__ . "/../controllers/Personal_InfoController.php");

class Personal_InfoRouter
{

    private string $uri;

    private Personal_InfoController $controller;

    public function __construct()
    {
        $this->uri = parse_url($_SERVER["REQUEST_URI"])['path'];
        $this->controller = new Personal_InfoController();
    }

    function personal_InfoRouter()
    {
        $exploded_uri = explode("/", $this->uri);

        if (URI_API_OFFSET < sizeOf($exploded_uri)) {
            $apiName = $exploded_uri[URI_API_OFFSET];
        } else {
            $apiName = '';
        }

        switch ($apiName) {
            case "getAll" :
                return $this->controller->getAll();
                break;
            case 'getById' :
                return $this->controller->getById();
                break;
            case 'updateBio' :
                return $this->controller->updateBio();
                break;
            case 'updateSmoking' :
                return $this->controller->updateSmoking();
                break;
            case 'updateAge' :
                return $this->controller->updateAge();
                break;
            case 'updateVegan' :
                return $this->controller->updateVegan();
                break;
            case 'updateLocation' :
                return $this->controller->updateLocation();
                break;
            case 'updateGender' :
                return $this->controller->updateGender();
                break;
            case 'updateDrinking' :
                return $this->controller->updateDrinking();
                break;
            default :
                return $this->controller->response404();
                break;
        }
    }
}