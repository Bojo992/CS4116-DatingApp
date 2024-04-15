<?php
include_once(__DIR__ . "/../controllers/UniversityController.php");
include_once(__DIR__ . "/../Util/UtilConfig.php");



class UniversityRouter
{
    private string $uri;
    private UniversityController $controller;
    public function __construct()
    {
        $this->uri = parse_url($_SERVER['REQUEST_URI'])['path'];
        $this->controller = new UniversityController();
    }

    public function courseRouter() : string {
        $explodedURI = explode("/", $this->uri);

        if (URI_API_OFFSET < sizeof($explodedURI)) {
            $apiName = $explodedURI[URI_API_OFFSET];
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
            case 'insertUniversity' :
                return $this->controller->insertUniversity();
                break;
            case 'deleteUniversity' :
                return $this->controller->deleteUniversity();
                break;
            default :
                return $this->controller->response404();
                break;
        }
    }
}