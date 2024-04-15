<?php
include_once(__DIR__ . '/../controllers/UserCourseController.php');
include_once(__DIR__ . '/../Util/UtilConfig.php');

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
            case 'getByCourseId' :
                return $this->controller->getByCourseId();
                break;
            case 'insertUserCourse' :
                return $this->controller->insertUserCourse();
                break;
            case 'deleteUserCourse' :
                return $this->controller->deleteUserCourse();
                break;
            default :
                return $this->controller->response404();
                break;
        }
    }
}