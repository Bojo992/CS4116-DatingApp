<?php
include_once('./controllers/CourseController.php');
include_once('./Util.php');

class CourseRouter
{
    private string $uri;
    private CourseController $controller;
    public function __construct()
    {
        $this->controller = new CourseController();
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
            case "getAll" :
                $this->controller->getAll();
                break;
            case 'getById' :
                $this->controller->getById();
                break;
            case 'getByUniversityId' :
                $this->controller->getByUniversityId();
                break;
            case 'insertCourse' :
                $this->controller->insertCourse();
                break;
            case 'deleteCourse' :
                $this->controller->deleteCourse();
                break;
            default :
                $this->controller->response404();
                break;
        }
    }
}