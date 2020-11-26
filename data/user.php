<?php
header('Content-Type: text/html;charset=utf-8');

$username = $_POST['username'];
$password = $_POST['password'];
$request_type = $_POST['request_type'];
$product_amount = $_POST['productAmount'];
$product_id = $_POST['productId'];

$user_data = file_get_contents('./user.json');

$data = json_decode($user_data, true);
$num = count($data);

$found = false;

if ($request_type == "getInfo") {
    for ($i = 0; $i < $num; $i++) {
        if ($username == $data[$i]["username"]) {
            $result = json_encode($data[$i]['cart']);
            echo $result;
            return;
        }
    }
}

if ($request_type == "update_cart") {
    for ($i=0; $i < $num; $i++) {
        if ($username == $data[$i]["username"]) {
            $cart = $data[$i]["cart"];
            if (count($cart) == 0) {
                $array = array("product_id" => $product_id, "product_amount" => $product_amount);
                Array_push($cart, $array);
            } else {
                for ($j = 0; $j < count($cart); $j++) {
                    if ($cart[$j]["product_id"] == $product_id) {
                        (int)$cart[$j]["product_amount"] += (int)$product_amount;
                        $found = true;
                    }
                }
                if ($found == false) {
                     $array = array("product_id" => $product_id, "product_amount" => $product_amount);
                     Array_push($cart, $array);
                }
            }
            $data[$i]["cart"] = $cart;
        }
    }
    $data = json_encode($data);
    $boolean = file_put_contents( './user.json', $data);
    if ($boolean != false) {
        echo '{"error": 0, "msg": "添加购物车成功"}';
        return;
    } else {
        echo '{"error": 1, "msg": "添加购物车失败"}';
        return;
    }
}

if ($request_type == 'login') {
    for ($i=0; $i<$num; $i++) {
        if ($username == $data[$i]['username']) {
            if ($password == $data[$i]['password']) {
                $cart = json_encode($data[$i]['cart']);
                echo "{'error': 0, 'msg': '登录成功','cart':$cart}";
                return;
            } else {
                echo '{"error": 1, "msg": "密码错误"}';
                return;
            }
        } 
    }
    echo '{"error": 2, "msg":"用户不存在"}';
    return;
}

if ($request_type == 'signin') {
    $cart = array();
    $array = array("username" => $username, "password" => $password, "cart" => $cart);
    Array_push($data, $array);

    $data = json_encode($data);
    $boolean = file_put_contents( './user.json', $data);
    if ($boolean != false) {
        echo '{"error": 0, "msg": "注册成功"}';
        return;
    } else {
        echo '{"error": 1, "msg": "写入失败"}';
        return;
    }
}
?>