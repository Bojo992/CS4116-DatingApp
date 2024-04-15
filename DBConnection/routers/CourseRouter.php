<?php
include_once(__DIR__ . '/../controllers/CourseController.php');
include_once(__DIR__ . '/../Util/UtilConfig.php');

class CourseRouter
{
    private string $uri;
    private CourseController $controller;
    public function __construct()
    {
        $this->uri = parse_url($_SERVER['REQUEST_URI'])['path'];
        $this->controller = new CourseController();
    }

    function courseRouter() {
        $explodedURI = explode("/", $this->uri);

        if (URI_API_OFFSET < sizeof($explodedURI)) {
            $apiName = $explodedURI[URI_API_OFFSET];
        } else {
            $apiName = '';
        }

        switch ($apiName) {
            case "getAll" :
                return $this->controller->getAll();
                break;
            case 'getById' :
                return $this->controller->getById();
                break;
            case 'getByUniversityId' :
                return $this->controller->getByUniversityId();
                break;
            case 'insertCourse' :
                return $this->controller->insertCourse();
                break;
            case 'deleteCourse' :
                return $this->controller->deleteCourse();
                break;
            default :
                return $this->controller->response404();
                break;
        }
    }
}