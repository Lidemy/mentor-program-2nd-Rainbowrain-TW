<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
error_reporting(E_ALL & ~E_NOTICE);
header("Content-Type:text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
require_once("../../mysqlConnect.php");

 $id =urldecode($_POST['uid']);
 $nick =urldecode($_POST['unick']);
 $pw = urldecode($_POST['upw']);
 $avatar =urldecode($_POST['uavatar']);

 $sqlcmd = "SELECT COUNT(*) FROM `rain_users` WHERE id = '$id'";
 $result = $conn->query($sqlcmd);
 if ($conn->connect_error) {
   die("Connection failed: " . $conn->connect_error);
 }else{
   $row = mysqli_fetch_assoc($result);
   $isIdExist = (int)(implode($row));

   if ($isIdExist > 0) {
     echo "idExist";
     return;
   }
 }

 $sqlcmd = "INSERT INTO `rain_users` (`id`,`pw`,`nick`,`avatar`) VALUES ('$id', '$pw', '$nick', '$avatar')";
 $result = $conn->query($sqlcmd);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error."\r\nSqlcmd: ".$sqlcmd);
  echo "error";
}else{
  if ($result == 1) {
      echo "success,".$conn->insert_id;
  }else{
      echo "insert failed";
  }
} 
?>