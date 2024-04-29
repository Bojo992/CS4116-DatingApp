<?php
include_once(__DIR__ . "/../Util/UtilConfig.php");
include_once(__DIR__ . "/../controllers/MatchingController.php");

class MatchingRouter
{
    private string $uri;
    private MatchingController $controller;

    public function __construct()
    {
        $this->uri = parse_url($_SERVER["REQUEST_URI"])['path'];
        $this->controller = new MatchingController();
    }

    function matchingRouter()
    {
        $explodeURI = explode("/", $this->uri);
        if (URI_API_OFFSET < sizeOf($explodeURI)) {
            $apiName = $explodeURI[URI_API_OFFSET];
        } else {
            $apiName = '';
        }
        switch ($apiName) {
            case "like" :
                return $this->controller->like();
                break;
            case 'dislike' :
                return $this->controller->dislike();
                break;
            default :
                return $this->controller->response404();
                break;
        }
    }

}