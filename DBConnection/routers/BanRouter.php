<?php
include_once (__DIR__ . "/../Util/UtilConfig.php");
include_once (__DIR__ . "/../controllers/BanController.php");
class BanRouter
{
    private  string $uri;
    private BanController $controller;
    public function __construct() {
        $this->uri = parse_url($_SERVER["REQUEST_URI"])['path'];
        $this->controller = new BanController();
    }
    function banRouter() {
        $explodeURI = explode("/", $this->uri);
        if (URI_API_OFFSET < sizeOf($explodeURI)) {
            $apiName = $explodeURI[URI_API_OFFSET];
        } else {
            $apiName = '';
        }
        switch ($apiName) {
            case "banUser" :
                return $this->controller->banUser();
                break;
            case 'unbanUser' :
                return $this->controller->unbanUser();
                break;
            case 'checkIfBanned' :
                return  $this->controller->checkIfBanned();
                break;
            case 'getAllBannedUserId' :
                return  $this->controller->getAllBannedUserId();
                break;
            default :
                return $this->controller->response404();
                break;
        }
    }
}