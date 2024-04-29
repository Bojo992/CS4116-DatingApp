<?php
include_once(__DIR__ . "/../db/DatabaseMessages.php");

class MessagesController
{
    private $messages;

    public function __construct()
    {
        $this->messages = new DatabaseMessages();
    }

    public function getAll()
    {
        $data = $this->messages->fetch();
        return json_encode($data);
    }

    public function getAllByChatId()
    {
        $chatId = intval($_SERVER["HTTP_CHATID"] ?? '');
        $data = $this->messages->fetch($chatId);
        return json_encode($data);
    }

    public function getMessageUpdate()
    {
        $chatId = intval(getRequestBody()["chatId"] ?? '');
        $messageId = intval(getRequestBody()["messageId"] ?? '');
        $data = $this->messages->getMessageUpdate($chatId, $messageId);
        return json_encode($data);
    }

    public function insertMessage()
    {

        $chatId = intval($_SERVER["HTTP_CHATID"] ?? '');
        $message = $this->messages->test_input($_SERVER["HTTP_MESSAGE"] ?? '');
        $senderId = intval($_SERVER["HTTP_SENDERID"] ?? '');
        $receiverId = intval($_SERVER["HTTP_RECEIVERID"] ?? '');
        $result = $this->messages->insertMessage($chatId, $message, $senderId, $receiverId);

        if ($result["status"]) {
            return $this->messages->message("message was inserted successfully", 200);
        } else {
            return $this->messages->message("message was not inserted", 404);
        }
    }

    public function deleteMessage()
    {
        $messageId = intval($_SERVER["HTTP_MESSAGEID"] ?? '');
        if ($this->messages->deleteMessage($messageId)) {
            return $this->messages->message("message was deleted", 200);
        } else {
            return $this->messages->message("failed to delete message", 404);
        }
    }


    public function response404()
    {
        return $this->messages->message("API was not found", 404);
    }
}