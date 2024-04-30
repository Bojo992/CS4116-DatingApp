<?php
include_once(__DIR__ . "/../Util.php");
include_once(__DIR__ . "/../controllers/ReportController.php");

class ReportRouter
{
    private string $uri;

    private ReportController $controller;


    public function __construct()
    {
        $this->uri = parse_url($_SERVER["REQUEST_URI"])['path'];
        $this->controller = new ReportController();
    }

    function reportRouter()
    {
        $explodeURI = explode("/", $this->uri);

        if (URI_API_OFFSET < sizeOf($explodeURI)) {
            $apiName = $explodeURI[URI_API_OFFSET];
        } else {
            $apiName = '';
        }

        switch ($apiName) {
            case "reportUser" :
                return $this->controller->reportUser();
                break;
            case "getAllReports" :
                return $this->controller->getAllReports();
                break;
            default :
                return $this->controller->response404();
                break;
        }

    }
}