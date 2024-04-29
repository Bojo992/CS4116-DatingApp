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


    public function getUsersInterest()
    {
        $id = intval($_SERVER["HTTP_ID"] ?? '');
        $data = $this->interest->getUsersInterest($id);
        return json_encode($data);
    }

    public function setUpInterest()
    {
        $university = intval(getRequestBody()["university"] ?? "");
        $course = intval(getRequestBody()["course"] ?? "");
        $gender = intval(getRequestBody()["gender"] ?? "");
        $drinking = intval(getRequestBody()["drinking"] ?? "");
        $smoking = intval(getRequestBody()["smoking"] ?? "");
        $vegan = intval(getRequestBody()["vegan"] ?? "");
        $max_age = intval(getRequestBody()["max_age"] ?? "");
        $min_age = intval(getRequestBody()["min_age"] ?? "");
        $userId = intval(getRequestBody()["userId"] ?? "");

        return json_encode(
            $this->interest->setUpInterest(
                $university,
                $course,
                $gender,
                $drinking,
                $smoking,
                $vegan,
                $max_age,
                $min_age,
                $userId
        ));
    }

    public function response404(){
        return message("API was not found", 404);
    }

}