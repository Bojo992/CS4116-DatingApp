<?php
include_once('./controllers/UniversityController.php');
include_once('./Util.php');


class UniversityRouter
{
    private string $uri;
    private UniversityController $controller;
    public function __construct()
    {
        $this->controller = new UniversityController();
        $this->uri = parse_url($_SERVER['REQUEST_URI'])['path'];
    }

    function courseRouter() {
        $explodedURI = explode("/", $this->uri);

        if (Util::URI_API_OFFSET < sizeof($explodedURI)) {
            $apiName = $explodedURI[Util::URI_API_OFFSET];
        } else {
            $apiName = '';
        }

        switch ($apiName) {
            case "getAll" :
                $this->controller->getAll();
                break;
            case 'getById' :
                $this->controller->getById();
                break;
            case 'insertUniversity' :
                $this->controller->insertUniversity();
                break;
            case 'deleteUniversity' :
                $this->controller->deleteUniversity();
                break;
            default :
                $this->controller->response404();
                break;
        }
    }
}