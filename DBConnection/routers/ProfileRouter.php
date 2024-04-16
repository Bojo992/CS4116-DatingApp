<?php
include_once(__DIR__ . "/../Util.php");
include_once(__DIR__ . "/../controllers/ProfileController.php");

class ProfileRouter
{
    private string $uri;

    private ProfileController $controller;


    public function __construct()
    {
        $this->uri = parse_url($_SERVER["REQUEST_URI"])['path'];
        $this->controller = new ProfileController();
    }

    function profileRouter()
    {
        $explodeURI = explode("/", $this->uri);

        if (URI_API_OFFSET < sizeOf($explodeURI)) {
            $apiName = $explodeURI[URI_API_OFFSET];
        } else {
            $apiName = '';
        }

        switch ($apiName) {
            case "getProfileInfo" :
                return $this->controller->getProfileInfo();
                break;
            case "getAllUserProfileInfo" :
                return $this->controller->getAllUserProfileInfo();
                break;
            default :
                return $this->controller->response404();
                break;
        }

    }
}