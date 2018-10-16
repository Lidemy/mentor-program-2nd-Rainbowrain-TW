<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
error_reporting(E_ALL & ~E_NOTICE);
header("Content-Type:text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
require_once("../../mysqlConnect.php");
 $uid = $_POST['uid'] ? $_POST['uid'] : "1"; 
 $pid = $_POST['pid'] ? $_POST['pid'] : "1"; 
 $content = $_POST['content'] ? $_POST['content'] : "non-content";
 
 $sqlcmd = "INSERT INTO `rain_comments` (`pid`, `uid`, `content`) VALUES ($pid, $uid, '$content')"; 
 
 $result = $conn->query($sqlcmd);  

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error."\r\nSqlcmd: ".$sqlcmd);
  echo "error";
}else{
  if ($result == 1) {
      echo "success";
  }else{
      echo "insert failed";
  }
} 
?>