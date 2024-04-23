<?php

include __DIR__ . "/../db/DatabaseInterest.php";

class InterestController
{

    private $interest;

    public function __construct()
    {
        $this->interest = new DatabaseInterest();
    }

    public function insertNewInterest()
    {
        $typeId = intval($_SERVER["HTTP_TYPEID"] ?? '');
        $value = intval($_SERVER["HTTP_VALUE"] ?? '');
        $data = $this->interest->insert($typeId, $value);
        return json_encode($data);
    }

    public function deleteInterest()
    {
        $id = intval($_SERVER["HTTP_ID"] ?? '');
        $data = $this->interest->delete($id);
        return json_encode($data);
    }

    public function updateInterest()
    {
        $id = intval($_SERVER["HTTP_ID"] ?? '');
        $typeId = intval($_SERVER["HTTP_TYPEID"] ?? '');
        $value = intval($_SERVER["HTTP_VALUE"] ?? '');
        $data = $this->interest->update($id, $typeId, $value);
        return json_encode($data);
    }

    public function response404(){
        return message("API was not found", 404);
    }

}