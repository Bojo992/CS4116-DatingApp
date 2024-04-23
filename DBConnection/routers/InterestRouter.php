<?php
include_once(__DIR__ . "/../Util.php");
include_once(__DIR__ . "/../controllers/InterestController.php");


class InterestRouter
{

    private string $uri;

    private InterestController $controller;

    public function __construct()
    {
        $this->uri = parse_url($_SERVER["REQUEST_URI"]) ['path'];
        $this->controller = new InterestController();
    }

    function interestRouter()
    {

        $explode_uri = explode("/", $this->uri);

        if (URI_API_OFFSET < sizeOf($explode_uri)) {
            $apiName = $explode_uri[URI_API_OFFSET];
        } else {
            $apiName = '';
        }

        switch ($apiName) {
            case "insertNewInterest" :
                return $this->controller->insertNewInterest();
                break;
            case "deleteInterest" :
                return $this->controller->deleteInterest();
                break;
            case "updateInterest" :
                return $this->controller->updateInterest();
                break;
            default :
                return $this->controller->response404();
                break;
        }
    }


}