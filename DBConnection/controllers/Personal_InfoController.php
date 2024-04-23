<?php

include_once(__DIR__ . "/../db/DatabasePersonal_Info.php");

class Personal_InfoController
{
    private $personal_info;

    public function __construct()
    {
        $this->personal_info = new DatabasePersonal_Info();
    }

    public function getAll()
    {
        $data = $this->personal_info->fetch();
        return json_encode($data);
    }

    public function getById()
    {
        $id = intval($_SERVER["HTTP_ID"] ?? '');
        $data = $this->personal_info->fetch($id);
        return json_encode($data);
    }

    public function updateBio()
    {
        $id = intval($_SERVER["HTTP_ID"] ?? '');
        $bio = cleanInput($_SERVER["HTTP_BIO"] ?? '');
        echo "id: $id, bio: $bio";
        $data = $this->personal_info->updateBio($id, $bio);
        return json_encode($data);
    }

    public function updateSmoking()
    {
        $id = intval($_SERVER["HTTP_ID"] ?? '');
        $smoking = boolval($_SERVER["HTTP_SMOKING"] ?? '');
        $data = $this->personal_info->updateSmoking($id, $smoking);
        return json_encode($data);
    }

    public function updateAge()
    {
        $id = intval($_SERVER["HTTP_ID"] ?? '');
        $age = intval($_SERVER["HTTP_AGE"] ?? '');
        $data = $this->personal_info->updateAge($id, $age);
        return json_encode($data);
    }

    public function updateVegan()
    {
        $id = intval($_SERVER["HTTP_ID"] ?? '');
        $vegan = boolval($_SERVER["HTTP_VEGAN"] ?? '');
        $data = $this->personal_info->updateVegan($id, $vegan);
        return json_encode($data);
    }

    public function updateLocation()
    {
        $id = intval($_SERVER["HTTP_ID"] ?? '');
        $location = intval($_SERVER["HTTP_LOCATION"] ?? '');
        $data = $this->personal_info->updateLocation($id, $location);
        return json_encode($data);
    }

    public function updateGender()
    {
        $id = intval($_SERVER["HTTP_ID"] ?? '');
        $gender = intval($_SERVER["HTTP_GENDER"] ?? '');
        $data = $this->personal_info->updateGender($id, $gender);
        return json_encode($data);
    }

    public function updateDrinking()
    {
        $id = intval($_SERVER["HTTP_ID"] ?? '');
        $drinking = boolval($_SERVER["HTTP_DRINKING"] ?? '');
        $data = $this->personal_info->updateDrinking($id, $drinking);
        return json_encode($data);
    }

    public function insertPersonalInfo() {
        $bio = cleanInput(getRequestBody()["bio"]);
        $smoking = boolval(getRequestBody()["smoking"]);
        $age = intval(getRequestBody()["age"]);
        $vegan = boolval(getRequestBody()["vegan"]);
        $location = cleanInput(getRequestBody()["location"]);
        $gender = intval(getRequestBody()["gender"]);
        $drinking = boolval(getRequestBody()["drinking"]);

        $data = $this->personal_info->insertPersonalInfo(
            $bio,
            $smoking,
            $age,
            $vegan,
            $location,
            $gender,
            $drinking
        );

        return json_encode($data);
    }

    public function response404(){
        return message("API was not found", 404);
    }

}