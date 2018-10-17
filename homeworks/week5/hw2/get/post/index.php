<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
error_reporting(0);
header("Content-Type:text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
require_once("../../mysqlConnect.php");

 $limit = $_GET['limit'];
 $index = $_GET['index'] * 10;

 $sqlcmd = "SELECT A.*,B.id,B.avatar FROM `rain_posts` as A inner join `rain_users` as B on A.uid = B.uid order by pid DESC limit $limit offset $index";
 
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