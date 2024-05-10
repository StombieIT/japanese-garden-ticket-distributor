<?php
    function all_set($arr, $keys) {
        foreach ($keys as $key) {
            if (!isset($arr[$key])) {
                return false;
            }
        }
        return true;
    }
?>