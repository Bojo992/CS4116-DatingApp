<?php
include_once('./controllers/UserController.php');
include_once('./Util.php');
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
            case 'insertUser' :
                $this->controller->insertUser();
                break;
            case 'deleteUser' :
                $this->controller->deleteUser();
                break;
            default :
                $this->controller->response404();
                break;
        }
    }
}