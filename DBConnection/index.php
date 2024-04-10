<?php
include_once(__DIR__ . '/routers/CourseRouter.php');
include_once(__DIR__ . '/routers/UniversityRouter.php');
include_once(__DIR__ . '/routers/UserCourseRouter.php');
include_once(__DIR__ . '/routers/CredentialsRouter.php');
include_once(__DIR__ . '/routers/UserRouter.php');
include_once(__DIR__ . '/routers/ChatRouter.php');
include_once(__DIR__ . '/routers/MessagesRouter.php');
include_once(__DIR__ . '/Util.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] != "OPTIONS"){
    $uri = parse_url($_SERVER['REQUEST_URI'])['path'];

    switch (explode('/', $uri)[URI_TABLE_OFFSET] ?? '') {
        case "course":
            {
                $course = new CourseRouter();
                echo $course->courseRouter();
            }
            break;

        case "university":
            {
                $course = new UniversityRouter();
                echo $course->courseRouter();
            }
            break;

        case "userCourse":
            {
                $course = new userCourseRouter();
                echo $course->courseRouter();
            }
            break;

        case "credentials":
            {
                $course = new CredentialsRouter();
                echo $course->courseRouter();
            }
            break;

        case "user":
            {
                $course = new UserRouter();
                echo $course->courseRouter();
            }
            break;

        case "chat" :
            {
                $chat = new ChatRouter();
                echo $chat->chatRouter();
            }
            break;

        case "messages" :
            {
                $messages = new MessagesRouter();
                echo $messages->messageRouter();
            }
            break;

        default:
            echo "failed";
            break;
    }
} else {
    echo "";
}