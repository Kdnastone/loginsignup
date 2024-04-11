function SingupValidation(values) {
    let errors = {}; // Objeto para almacenar errores de validación

    const nombre_pattern = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]{1,20}$/; // Patrón para validar el formato del nombre
    const apellido_pattern = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]{1,20}$/; // Patrón para validar el formato del apellido
    const cargo_pattern = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\d]{1,20}$/; // Patrón para validar el formato del cargo
    const usuario_pattern = /^[a-zA-Z0-9]{6,}$/; // Patrón para validar el formato del usuario
    const clave_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/; // Patrón para validar el formato de la contraseña

    if (values.nombre === "") { // Verifica si el campo de nombre está vacío
        errors.nombre = "El nombre no puede estar vacío"; // Agrega un error al objeto de errores
    } else if (!nombre_pattern.test(values.nombre)) { // Verifica si el nomrbre no cumple con el patrón requerido
        errors.nombre= "El nombre no corresponde al formato requerido"; // Agrega un error al objeto de errores
    }

    if (values.apellido === "") { // Verifica si el campo de apellido está vacío
        errors.apellido = "El apellido no puede estar vacío"; // Agrega un error al objeto de errores
    } else if (!apellido_pattern.test(values.apellido)) { // Verifica si el apellido no cumple con el patrón requerido
        errors.apellido = "El apellido no corresponde al formato requerido"; // Agrega un error al objeto de errores
    }

    if (!values.cargo) { // Verifica si el campo de cargo no está definido
        errors.cargo = "El cargo no puede estar vacío"; // Agrega un error al objeto de errores
    } else if (!cargo_pattern.test(values.cargo)) { // Verifica si el cargo no cumple con el patrón requerido
        errors.cargo = "El cargo no corresponde al formato requerido"; // Agrega un error al objeto de errores
    }

    if (values.usuario === "") { // Verifica si el campo de usuario está vacío
        errors.usuario = "El usuario no puede estar vacío"; // Agrega un error al objeto de errores
    } else if (!usuario_pattern.test(values.usuario)) { // Verifica si el usuario no cumple con el patrón requerido
        errors.usuario = "El usuario no corresponde al formato requerido"; // Agrega un error al objeto de errores
    }

    if (values.clave === "") { // Verifica si el campo de contraseña está vacío
        errors.clave = "La clave no puede estar vacía"; // Agrega un error al objeto de errores
    } else if (!clave_pattern.test(values.clave)) { // Verifica si la contraseña no cumple con el patrón requerido
        errors.clave = "La clave no corresponde al formato requerido"; // Agrega un error al objeto de errores
    }

    return errors; // Retorna el objeto de errores de validación
}

export default SingupValidation; // Exporta la función de validación para que pueda ser utilizada en otros archivos
