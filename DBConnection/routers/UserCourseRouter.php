<?php
include_once('./controllers/UserCourseController.php');
include_once('./Util.php');

class UserCourseRouter
{
    private string $uri;
    private $controller;
    public function __construct()
    {
        $this->controller = new UserCourseController();
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
            case 'getByCourseId' :
                $this->controller->getByCourseId();
                break;
            case 'insertUserCourse' :
                $this->controller->insertUserCourse();
                break;
            case 'deleteUserCourse' :
                $this->controller->deleteUserCourse();
                break;
            default :
                $this->controller->response404();
                break;
        }
    }
}