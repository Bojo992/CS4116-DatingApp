<?php
include_once(__DIR__ . '/routers/CourseRouter.php');
include_once(__DIR__ . '/routers/UniversityRouter.php');
include_once(__DIR__ . '/routers/UserCourseRouter.php');
include_once(__DIR__ . '/routers/CredentialsRouter.php');
include_once(__DIR__ . '/routers/UserRouter.php');
include_once(__DIR__ . '/routers/ChatRouter.php');
include_once(__DIR__ . '/routers/MessagesRouter.php');
include_once(__DIR__ . '/routers/Personal_InfoRouter.php');
include_once(__DIR__ . '/routers/ProfileRouter.php');
include_once(__DIR__ . '/Util/UtilConfig.php');
include_once(__DIR__ . '/routers/InterestRouter.php');
include_once(__DIR__ . '/routers/Personal_InterestRouter.php');
include_once(__DIR__ . '/routers/BanRouter.php');
include_once(__DIR__ . '/routers/MatchingRouter.php');
include_once(__DIR__ . '/routers/ReportRouter.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] != "OPTIONS") {
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

        case "personal_info" :
            {
                $personal_info = new Personal_InfoRouter();
                echo $personal_info->personal_InfoRouter();
            }
            break;

        case "profile" :
            {
                $personal_info = new ProfileRouter();
                echo $personal_info->profileRouter();
            }
            break;

        case "interest" :
            {
                $interest = new InterestRouter();
                echo $interest->interestRouter();
            }
            break;
        case "personal_interest" :
            {
                $personal_info = new Personal_InterestRouter();
                echo $personal_info->personal_InterestRouter();
            }
            break;

        case "ban":
            {
                $ban = new BanRouter();
                echo $ban->banRouter();
            }
            break;
        case "matching":
            {
                $matching = new MatchingRouter();
                echo $matching->matchingRouter();
            }
            break;
        case "report":
            {
                $matching = new ReportRouter();
                echo $matching->reportRouter();
            }
            break;
        default:
            echo "failed";
            break;
    }
} else {
    echo "";
}