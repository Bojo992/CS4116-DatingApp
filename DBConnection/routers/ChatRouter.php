<?php

include_once (__DIR__ . "/../Util/UtilConfig.php");
include_once (__DIR__ . "/../controllers/ChatController.php");

class ChatRouter
{
    private  string $uri;

    private ChatController $controller;

    public function __construct() {
        $this->uri = parse_url($_SERVER["REQUEST_URI"])['path'];
        $this->controller = new ChatController();
    }

    function chatRouter() {
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
            case 'getByUserId' :
                return $this->controller->getByUserId();
                break;
            case 'insertChat' :
                return  $this->controller->insertChat();
                break;
            case 'deleteChat' :
                return $this->controller->deleteChat();
                break;
            default :
                return $this->controller->response404();
                break;

        }
    }

}