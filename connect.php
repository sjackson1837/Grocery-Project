<?php

$serverName = "srjdb.c9g2xoa52vhw.us-east-1.rds.amazonaws.com";
$userName = "admin";
$password = "ert33MNB";
$dbName = "jacksongrocerydb";

//create connection
$con = new mysqli($serverName, $userName, $password, $dbName);

if(mysqli_connect_errno()) {
    echo "Failed to connect!";
    exit();
}
echo "Connection success!"

?>