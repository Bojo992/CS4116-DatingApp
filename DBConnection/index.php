<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Content-Type: application/json');

include_once('routers/CourseRouter.php');

rout();

function rout() {
    $uri = parse_url($_SERVER['REQUEST_URI'])['path'];
    $course = new CourseRouter();

    switch (explode('/', $uri)[Util::URI_TABLE_OFFSET] ?? '') {
        case "course":
            $course->courseRouter();
            break;

        default:
            break;
    }
}