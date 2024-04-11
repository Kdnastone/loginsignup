function LoginValidation(values) {
    let errors = {}; // Objeto para almacenar errores de validación

    const usuario_pattern = /^[a-zA-Z0-9]{6,}$/; // Patrón para validar el formato del usuario
    const clave_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/; // Patrón para validar el formato de la contraseña

    if (typeof values.usuario === 'number') { // Verifica el campo de usuario
        } else {
            if (values.usuario === "") {
                errors.usuario = "El usuario no puede estar vacío";
            } else if (!usuario_pattern.test(values.usuario)) {
                errors.usuario = "El usuario no corresponde al formato requerido";
            }
        }

        if (values.clave === "") {
            errors.clave = "La clave no puede estar vacía";
        } else if (!clave_pattern.test(values.clave)) {
            errors.clave = "La clave no corresponde al formato requerido";
        }

        return errors;
    }

export default LoginValidation; // Exporta la función de validación para que pueda ser utilizada en otros archivos
