<?php
 $servername = "ip";
 $username = "id";
 $password = "pw";
 $dbname = "db";
 $table = "table";

 $conn = new mysqli($servername, $username, $password, $dbname);
 $conn->query("SET NAMES 'UTF8'");
?>