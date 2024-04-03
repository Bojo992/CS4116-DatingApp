<?php
include_once('./controllers/CredentialsController.php');
include_once('./Util.php');

class CredentialsRouter
{
    private string $uri;
    private $controller;
    public function __construct()
    {
        $this->controller = new CredentialsController();
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
            case "getByEmail" :
                $this->controller->getByEmail();
                break;
            case "getByUserId" :
                $this->controller->getByUserId();
                break;
            case 'insertCredentials' :
                $this->controller->insertCredentials();
                break;
            case 'deleteCredentials' :
                $this->controller->deleteCredentials();
                break;
            default :
                $this->controller->response404();
                break;
        }
    }
}