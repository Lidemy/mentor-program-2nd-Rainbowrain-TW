<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
error_reporting(E_ALL & ~E_NOTICE);
header("Content-Type:text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
require_once("mysqlConnect.php");

 $id = urldecode($_POST['uid']);
 $pw = urldecode($_POST['upw']);
 
 $sqlcmd = "SELECT uid,id,nick,avatar FROM `rain_users` WHERE id='$id' and pw='$pw'";

 $result = $conn->query($sqlcmd);  

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error."\r\nSqlcmd: ".$sqlcmd);
  echo "error";
}else{
  if ($result->num_rows > 0) {
    $row = $result->fetch_row();
    echo json_encode($row);
  }else{
    echo "fail";
  }
} 
?>