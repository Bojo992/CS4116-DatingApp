<?php
include_once(__DIR__ . '/../controllers/UserController.php');
include_once(__DIR__ . '/../Util/UtilConfig.php');
class UserRouter
{
    private string $uri;
    private UserController $controller;
    public function __construct()
    {
        $this->controller = new UserController();
        $this->uri = parse_url($_SERVER['REQUEST_URI'])['path'];
    }

    function courseRouter() {
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
            case 'insertUser' :
                return $this->controller->insertUser();
                break;
            case 'deleteUser' :
                return $this->controller->deleteUser();
                break;
            case 'updatePersonalInfo' :
                return $this->controller->updatePersonalInfo();
                break;
            case 'updateCourse' :
                return $this->controller->updateCourse();
                break;
            default :
                return $this->controller->response404();
                break;
        }
    }
}