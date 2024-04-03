<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Content-Type: application/json');

include_once('routers/CourseRouter.php');
include_once('routers/UniversityRouter.php');
include_once('routers/UserCourseRouter.php');
include_once('routers/CredentialsRouter.php');

rout();

function rout() {
    $uri = parse_url($_SERVER['REQUEST_URI'])['path'];


    switch (explode('/', $uri)[Util::URI_TABLE_OFFSET] ?? '') {
        case "course":
            {
                $course = new CourseRouter();
                $course->courseRouter();
            }
            break;

        case "university":
        {
            $course = new UniversityRouter();
            $course->courseRouter();
        }
        break;

        case "userCourse":
        {
            $course = new userCourseRouter();
            $course->courseRouter();
        }
        break;

        case "credentials":
        {
            $course = new CredentialsRouter();
            $course->courseRouter();
        }
        break;

        default:
            break;
    }
}