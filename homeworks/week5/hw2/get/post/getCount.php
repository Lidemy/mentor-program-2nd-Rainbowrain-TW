<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
error_reporting(0);
header("Content-Type:text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
require_once("../../mysqlConnect.php");

 $sqlcmd = "select COUNT(*) from rain_posts";
 $result = $conn->query($sqlcmd);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}else{
  $row = mysqli_fetch_assoc($result);
  echo implode($row);  
}
?>