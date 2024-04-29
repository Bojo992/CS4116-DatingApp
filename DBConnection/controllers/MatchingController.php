<?php
include_once(__DIR__ . "/../db/DatabaseMatching.php");

class MatchingController
{

    private $matching;

    public function __construct()
    {
        $this->matching = new DatabaseMatching();
    }

    public function like()
    {
        $userId = intval(getRequestBody()['userId'] ?? '');
        $recommendedUserId = intval(getRequestBody()["recommendedUserId"] ?? '');
        $this->matching->like($userId, $recommendedUserId);
        $wasMatchSuccessful = $this->checkIfMatch($userId, $recommendedUserId);
        return json_encode($wasMatchSuccessful);
    }

    public function dislike()
    {
        $userId = intval(getRequestBody()['userId'] ?? '');
        $recommendedUserId = intval(getRequestBody()["recommendedUserId"] ?? '');
        $this->matching->dislike($userId, $recommendedUserId);


    }

    private function checkIfMatch(int $userId, int $recommendedUserId)
    {
        $matchValue = $this->matching->checkIfMatch($userId, $recommendedUserId);

        if ($matchValue['isMatch'] == 1) {
            $chatDB = new DatabaseChat();
            $chatDB->insertChat($userId, $recommendedUserId);
            return true;
        } else {
            return false;
        }
    }

public
function response404()
{
    return message("API was not found", 404);
}


}