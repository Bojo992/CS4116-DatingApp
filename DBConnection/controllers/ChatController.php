<?php

include_once (__DIR__ . "/../db/DatabaseChat.php");
class ChatController
{
    private $chat;

    public function __construct()
    {
        $this->chat = new DatabaseChat();
    }

    public function getALl()
    {
        $data = $this->chat->fetch();
        return json_encode($data);

    }

    public function getByUserId()
    {
        $id = intval($_SERVER ["HTTP_USERID"] ?? '');
        $data = $this->chat->fetch($id);
        return json_encode($data);
    }

    public function insertChat()
    {
        $id = $this->chat->test_input($_SERVER ["HTTP_USERID"]);
        $result = $this->chat->insertChat($id);

        if ($result["status"]) {
            return $this->chat->message("chat was created");
        } else {
            return $this->chat->message($result["error"], 404);
        }

    }

    public function response404() {
        return $this->chat->message("API not found" , 404);
    }

}







