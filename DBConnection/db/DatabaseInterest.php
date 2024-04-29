<?php
include_once(__DIR__ . "/../Config.php");

class DatabaseInterest extends Config
{

    public function __construct()
    {
        parent::__construct();
    }

    public function insert($typeId, $value)
    {
        try {
            $sql = '
                    INSERT INTO interest (typeId, value)
                    VALUES (
                             :typeId, :value
                           );
            ';
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(['typeId' => $typeId, 'value' => $value]);

            $sql = 'SELECT LAST_INSERT_ID() as interestId';

            $stmt = $this->conn->prepare($sql);
            $stmt->execute();

            $data = $stmt->fetchAll();
            $result = [
                "data" => $data,
                "message" => "User added successfully",
                "status" => true,
                "error" => null,
            ];
            return $result;
        } catch (PDOException $exception) {
            $error = [
                "status" => false,
                "error" => $exception->getMessage(),
            ];
            return $error;
        }


    }

    public function delete(int $id)
    {
        $sql = "DELETE FROM interest WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['id' => $id]);
        return true;
    }

    public function update($id, $typeId, $value) {
        $sql = "
            UPDATE interest
                SET value = :value
                WHERE id = (
                    SELECT INTEREST.id
                        FROM personal_interest PERSONAL_INTEREST JOIN coursemates.interest INTEREST ON
                            INTEREST.id = PERSONAL_INTEREST.interestId
                                AND PERSONAL_INTEREST.userId = :id
                        WHERE INTEREST.typeId = :typeId
                    )
        ";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['value' => $value, 'typeId' => $typeId, 'id' => $id]);
        $rows = $stmt->fetchAll();
        return $rows;
    }

    public function getUsersInterest($id) {
        $sql = "
        SELECT INTEREST.typeId, value
                        FROM personal_interest PERSONAL_INTEREST JOIN coursemates.interest INTEREST ON
                            INTEREST.id = PERSONAL_INTEREST.interestId
                                AND PERSONAL_INTEREST.userId = :id
                        WHERE INTEREST.typeId > 0;
        ";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['id' => $id]);
        $rows = $stmt->fetchAll();
        return $rows;
    }

    public function setUpInterest(int $university, int $course, int $gender, int $drinking, int $smoking, int $vegan, int $max_age, int $min_age, int $userId)
    {
        $sql = "
            INSERT INTO interest (typeId, value)
            VALUES (
                       1, 0
                   );
            INSERT INTO personal_interest (userId, interestId)
            VALUES (
                       :userId, LAST_INSERT_ID()
                   );
            INSERT INTO interest (typeId, value)
            VALUES (
                       2, 0
                   );
            INSERT INTO personal_interest (userId, interestId)
            VALUES (
                       :userId, LAST_INSERT_ID()
                   );
            INSERT INTO interest (typeId, value)
            VALUES (
                       3, 0
                   );
            INSERT INTO personal_interest (userId, interestId)
            VALUES (
                       :userId, LAST_INSERT_ID()
                   );
            INSERT INTO interest (typeId, value)
            VALUES (
                       4, 0
                   );
            INSERT INTO personal_interest (userId, interestId)
            VALUES (
                       :userId, LAST_INSERT_ID()
                   );
            INSERT INTO interest (typeId, value)
            VALUES (
                       5, 0
                   );
            INSERT INTO personal_interest (userId, interestId)
            VALUES (
                       :userId, LAST_INSERT_ID()
                   );
            INSERT INTO interest (typeId, value)
            VALUES (
                       6, 0
                   );
            INSERT INTO personal_interest (userId, interestId)
            VALUES (
                       :userId, LAST_INSERT_ID()
                   );
            INSERT INTO interest (typeId, value)
            VALUES (
                       7, 120
                   );
            INSERT INTO personal_interest (userId, interestId)
            VALUES (
                       :userId, LAST_INSERT_ID()
                   );
            INSERT INTO interest (typeId, value)
            VALUES (
                       8, 18
                   );
            INSERT INTO personal_interest (userId, interestId)
            VALUES (
                       :userId, LAST_INSERT_ID()
                   );
            INSERT INTO interest (typeId, value)
            VALUES (
                       -1, :university
                   );
            INSERT INTO personal_interest (userId, interestId)
            VALUES (
                       :userId, LAST_INSERT_ID()
                   );
            INSERT INTO interest (typeId, value)
            VALUES (
                       -2, :course
                   );
            INSERT INTO personal_interest (userId, interestId)
            VALUES (
                       :userId, LAST_INSERT_ID()
                   );
            INSERT INTO interest (typeId, value)
            VALUES (
                       -3, :gender
                   );
            INSERT INTO personal_interest (userId, interestId)
            VALUES (
                       :userId, LAST_INSERT_ID()
                   );
            INSERT INTO interest (typeId, value)
            VALUES (
                       -4, :drinking
                   );
            INSERT INTO personal_interest (userId, interestId)
            VALUES (
                       :userId, LAST_INSERT_ID()
                   );
            INSERT INTO interest (typeId, value)
            VALUES (
                       -5, :smoking
                   );
            INSERT INTO personal_interest (userId, interestId)
            VALUES (
                       :userId, LAST_INSERT_ID()
                   );
            INSERT INTO interest (typeId, value)
            VALUES (
                       -6, :vegan
                   );
            INSERT INTO personal_interest (userId, interestId)
            VALUES (
                       :userId, LAST_INSERT_ID()
                   );
            INSERT INTO interest (typeId, value)
            VALUES (
                       -7, :max_age
                   );
            INSERT INTO personal_interest (userId, interestId)
            VALUES (
                       :userId, LAST_INSERT_ID()
                   );
            INSERT INTO interest (typeId, value)
            VALUES (
                       -8, :min_age
                   );
            INSERT INTO personal_interest (userId, interestId)
            VALUES (
                       :userId, LAST_INSERT_ID()
                   );
        ";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute([
            "university" => $university,
            "course" => $course,
            "gender" => $gender,
            "drinking" => $drinking,
            "smoking" => $smoking,
            "vegan" => $vegan,
            "max_age" => $max_age,
            "min_age" => $min_age,
            "userId" => $userId,
        ]);

        return true;
    }
}