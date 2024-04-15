<?php
include_once(__DIR__ . '/routers/CourseRouter.php');
include_once(__DIR__ . '/routers/UniversityRouter.php');
include_once(__DIR__ . '/routers/UserCourseRouter.php');
include_once(__DIR__ . '/routers/CredentialsRouter.php');
include_once(__DIR__ . '/routers/UserRouter.php');
include_once(__DIR__ . '/routers/ChatRouter.php');
include_once(__DIR__ . '/routers/MessagesRouter.php');
include_once(__DIR__ . '/Util/UtilConfig.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] != "OPTIONS"){
    $uri = parse_url($_SERVER['REQUEST_URI'])['path'];

    switch (explode('/', $uri)[URI_TABLE_OFFSET] ?? '') {
        case "course":
            {
                $router = new CourseRouter();
                echo $router->courseRouter();
            }
            break;

        case "university":
            {
                $router = new UniversityRouter();
                echo $router->courseRouter();
            }
            break;

        case "userCourse":
            {
                $router = new userCourseRouter();
                echo $router->courseRouter();
            }
            break;

        case "credentials":
            {
                $router = new CredentialsRouter();
                echo $router->courseRouter();
            }
            break;

        case "user":
            {
                $router = new UserRouter();
                echo $router->courseRouter();
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