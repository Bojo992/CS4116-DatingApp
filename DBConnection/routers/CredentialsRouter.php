<?php
include_once(__DIR__ . '/../controllers/CredentialsController.php');
include_once(__DIR__ . '/../Util/UtilConfig.php');

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

        if (URI_API_OFFSET < sizeof($explodedURI)) {
            $apiName = $explodedURI[URI_API_OFFSET];
        } else {
            $apiName = '';
        }

        switch ($apiName) {
            case "getByEmail" :
                return $this->controller->getByEmail();
                break;
            case "getByUserId" :
                return $this->controller->getByUserId();
                break;
            case "checkCredentials":
                return $this->controller->checkCredentials();
                break;
            case 'insertCredentials' :
                return $this->controller->insertCredentials();
                break;
            case 'deleteCredentials' :
                return $this->controller->deleteCredentials();
                break;
            default :
                return $this->controller->response404();
                break;
        }
    }
}