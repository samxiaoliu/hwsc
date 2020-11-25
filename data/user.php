<?php
header('Content-Type: text/html;charset=utf-8');

$username = $_POST['username'];
$password = $_POST['password'];

$user_data = file_get_contents('./user.json');

$data = json_decode($user_data, true);
$num = count($data);

for ($i=0; $i<$num; $i++) {
   if ($username == $data[$i]['username']) {
       if ($password == $data[$i]['password']) {
           echo '{"msg": "成功登录"}';
           return;
       } else {
           echo '{"msg": "密码错误"}';
           return;
       }
   } 
}

echo '{"msg":"查无此人"}';
?>