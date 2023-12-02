<?php
include("validacion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = $_POST["correo"];
    $contrasena = $_POST["contrasena"];

    // Realiza la validación del correo electrónico
    if (filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        // El correo cumple con las condiciones
        // Consulta la información del usuario almacenada en la base de datos
        $sql = "SELECT id, nombre, correo, contrasena FROM usuarios WHERE correo = '$correo'";
        $result = $conn->query($sql);

        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            $contrasena_hash = $row["contrasena"];

            // Verifica la contraseña ingresada
            if (password_verify($contrasena, $contrasena_hash)) {
                // Inicia la sesión y redirige al usuario a la página "categories2.php"
                session_start();
                $_SESSION["usuario_id"] = $row["id"];
                $_SESSION["nombre_usuario"] = $row["nombre"]; // Almacena el nombre de usuario en la sesión
                $_SESSION["registro_exitoso"] = true;
                header("Location: ./user/categories2.php");
                exit();
            } else {
                // Contraseña incorrecta - Muestra un mensaje de alerta y redirige a login.php
                echo '<script>alert("Contraseña incorrecta"); window.location.href = "login.php";</script>';
            }
        } else {
            // Correo electrónico no encontrado - Muestra un mensaje de alerta y redirige a login.php
            echo '<script>alert("Correo electrónico no encontrado"); window.location.href = "login.php";</script>';
        }
    } else {
        // Correo electrónico no válido - Muestra un mensaje de alerta y redirige a login.php
        echo '<script>alert("Correo electrónico no válido"); window.location.href = "login.php";</script>';
    }
    
    // Debugging: Asegúrate de que llegue hasta aquí - Muestra un mensaje de alerta y redirige a login.php
    echo '<script>alert("Algo salió mal durante la validación"); window.location.href = "login.php";</script>';
    exit();
}
?>
