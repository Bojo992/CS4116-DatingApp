<?php
include_once (__DIR__ . "/../Util/UtilConfig.php");
include_once (__DIR__ . "/../controllers/MessagesController.php");

class MessagesRouter
{

    private string $uri;

    private MessagesController $controller;

    public function __construct() {
        $this->uri = parse_url($_SERVER["REQUEST_URI"])['path'];
        $this->controller = new MessagesController();
    }

    function messageRouter() {
        $explodeURI = explode("/", $this->uri);

        if (URI_API_OFFSET < sizeOf($explodeURI)) {
            $apiName = $explodeURI[URI_API_OFFSET];
        } else {
            $apiName = '';
        }

        switch ($apiName) {
            case "getAll" :
                return $this->controller->getAll();
                break;
            case 'getAllByChatId' :
                return $this->controller->getAllByChatId();
                break;
            case 'insertMessage' :
                return $this->controller->insertMessage();
                break;
            case 'deleteMessage' :
                return $this->controller->deleteMessage();
                break;
            case 'getMessageUpdate' :
                return $this->controller->getMessageUpdate();
                break;
            default :
                return $this->controller->response404();
                break;
        }
    }

}