<?php
include_once(__DIR__ . "/../db/DatabaseReport.php");

class ReportController
{
    private $report;

    public function __construct()
    {
        $this->report = new DatabaseReport();
    }

    public function reportUser()
    {
        $id = intval(getRequestBody()['id'] ?? '');
        $description = (getRequestBody()['description'] ?? '');

        return json_encode($this->report->reportUser($id, $description));
    }

    public function getAllReports()
    {
        return json_encode($this->report->getAllReports());
    }

    public function response404()
    {
        return message("API was not found", 404);
    }

}