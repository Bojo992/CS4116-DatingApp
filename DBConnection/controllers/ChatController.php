<?php

include_once (__DIR__ . "/../db/DatabaseChat.php");
class ChatController
{
    private $chat;

    public function __construct()
    {
        $this->chat = new DatabaseChat();
    }

    public function getAll()
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
        $id1 = $this->chat->test_input($_SERVER ["HTTP_USERID1"]);
        $id2 = $this->chat->test_input($_SERVER ["HTTP_USERID2"]);
        $result = $this->chat->insertChat($id1, $id2);

        if ($result["status"]) {
            return $this->chat->message("chat was created", 200);
        } else {
            return $this->chat->message($result["error"], 404);
        }

    }

    public function deleteChat() {
        $chatId = intval($_SERVER ["HTTP_CHATID"] ?? '');
        if ($this->chat->deleteChat($chatId)) {
            return $this->chat->message("chat was deleted", 200);
        } else {
            return $this->chat->message("failed to delete chat", 404);
        }
    }

    public function response404() {
        return $this->chat->message("API not found" , 404);
    }

}







