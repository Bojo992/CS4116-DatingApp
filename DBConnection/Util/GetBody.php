<?php
function getRequestBody()
{
    $body = file_get_contents('php://input');
    $body = json_decode($body, JSON_NUMERIC_CHECK);

    return $body["body"];
}