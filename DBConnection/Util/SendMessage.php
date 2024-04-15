<?php
function message($content, $status) {
    return json_encode(['message' => $content, 'error' => $status]);
}