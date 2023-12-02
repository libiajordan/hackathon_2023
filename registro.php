<?php
include("validacion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["nombre"];
    $correo = $_POST["correo"];
    $contrasena = password_hash($_POST["contrasena"], PASSWORD_DEFAULT); // Encripta la contraseña

    // Validación del correo electrónico 
    if (filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        // El correo es válido, realiza la inserción en la tabla "usuarios"
        $sql = "INSERT INTO usuarios (nombre, correo, contrasena) VALUES ('$nombre', '$correo', '$contrasena')";

        if ($conn->query($sql) === TRUE) {
            session_start(); // Inicia la sesión
            $_SESSION['registro_exitoso'] = true;

            // Muestra un mensaje de éxito en una ventana emergente usando JavaScript y redirige a categories2.php
            echo '<script>alert("Registro exitoso. ¡Bienvenido!"); window.location.href = "./user/categories2.php";</script>';
            // Limpia los campos del formulario
            echo '<script>document.getElementById("formularioRegistro").reset();</script>';
            exit();
        } else {
            // Muestra un mensaje de error más detallado
            echo "Error al insertar en la base de datos: " . $sql . "<br>" . $conn->error;
        }
    } else {
        // Muestra un mensaje de error en una ventana emergente usando JavaScript y redirige a signup.php
        echo '<script>alert("El correo electrónico ingresado no es válido."); window.location.href = "signup.php";</script>';
        exit();
    }
}
?>
