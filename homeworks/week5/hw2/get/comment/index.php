<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
error_reporting(0);
header("Content-Type:text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
require_once("../../mysqlConnect.php");

$pid = $_GET['pid'] ? $_GET['pid'] : "1"; 

//$sqlcmd = "SELECT * FROM `comments` WHERE pid = $pid";
$sqlcmd = "SELECT c.*, u.avatar, u.id FROM `rain_comments` c inner join `rain_users` u on c.uid = u.uid WHERE pid = '$pid'";

 //$sqlcmd = "select * from ".$table;
 $result = $conn->query($sqlcmd);
 $json = array();

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}else{
    while($row = mysqli_fetch_assoc($result)){        
        //$json[] = (json_encode($row));
        $json[] = $row;
    }
  //echo implode($json);
  echo json_encode($json);
} 
?>