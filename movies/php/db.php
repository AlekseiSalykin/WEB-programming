<?php

$host = "localhost";
$dbname = "pg_users";
$user = "postgres";
$password = "postgres";

$connection = pg_connect("host=$host dbname=$dbname user=$user password=$password");

if(!$connection){
    echo "Error";
    exit;
}