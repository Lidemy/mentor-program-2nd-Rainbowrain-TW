<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
error_reporting(E_ALL & ~E_NOTICE);
header("Content-Type:text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
require_once("../../mysqlConnect.php");

 $id = $_POST['uid'] ? $_POST['uid'] : "1";
 $title = $_POST['title'] ? $_POST['title'] : "non-title";
 $content = urldecode($_POST['content'] ? $_POST['content'] : "non-content");
 
 $sqlcmd = "INSERT INTO `rain_posts` (`uid`, `title`, `content`) VALUES ($id, '$title', '$content')";

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