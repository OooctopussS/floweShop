<?php


if (isset($_POST['modal-name'])) {
    $name = $_POST['modal-name'];
    if ($name == '') {
        unset($name);
    }
}

if (isset($_POST['modal-tel'])) {
    $tel = $_POST['modal-tel'];
    if ($tel == '') {
        unset($tel);
    }
}

if (isset($_POST['modal-flower'])) {
    $flower = $_POST['modal-flower'];
    if ($flower == '') {
        unset($flower);
    }
}

if (isset($_POST['modal-color'])) {
    $color = $_POST['modal-color'];
    if ($color == '') {
        unset($color);
    }
}

if (isset($_POST['modal-counter'])) {
    $counter = $_POST['modal-counter'];
    if ($counter == '') {
        unset($counter);
    }
}

if (isset($name)) {
    $name = stripslashes($name);
    $name = htmlspecialchars($name);
    $name = trim($name);
    $name = urldecode($name);
}

if (isset($tel)) {
    $tel = stripslashes($tel);
    $tel = htmlspecialchars($tel);
    $tel = urldecode($tel);
    $tel = trim($tel);
}

$address = "mail@mail.ru";
$note_text = '1';
// текст письма 
if(isset($flower) && isset($color) && isset($counter))
{
    $note_text = "Тема : 'FlowerShop' \r\nИмя : $name \r\n Tel : $tel \r\n Цветок: $flower \r\n Цвет: $color \r\n Количество: $counter";
}
else {
    $note_text = "Тема : 'FlowerShop' \r\nИмя : $name \r\n Tel : $tel";
}

if (mail($address, 'Заказ с сайта FlowerShop', $note_text, "Content-type:text/plain; windows-1251"))
{
    echo "<p style='color:#009900;'>Уважаемый(ая) <b>$name</b> Ваше письмо отправленно успешно. <br> Спасибо. <br>Вам скоро позвонят.</p>";
}
else{
    echo "при отправке сообщения возникли ошибки";
}

?>