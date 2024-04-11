// Importación de módulos necesarios
import React, { useRef, useEffect, useState } from 'react'; // Importa la librería React y varios hooks
import { Link, useNavigate } from 'react-router-dom'; // Importa el hook useNavigate y el componente Link de react-router-dom
import LoginValidation from './LoginValidation'; // Importa la función de validación del formulario de inicio de sesión desde './LoginValidation.js'
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importa iconos de ojo abierto y cerrado de react-icons/fa
import axios from 'axios'; // Importa axnios para realizar solicitudes HTTP

function Login() {
  const inputRef = useRef(null); // Crea una referencia a un elemento de entrada
  const navigate = useNavigate(); // Obtiene la función de navegación del enrutador
  const [values, setValues] = useState({ // Estado para almacenar los valores del formulario
    usuario: '',
    clave: ''
  });
  
  useEffect(() => {
    console.log(inputRef.current); // Registra el valor actual de la referencia al montar el componente
  }, []);

  const [errors, setErrors] = useState({}); // Estado para almacenar errores de validación del formulario
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña

  const handleInput = (event) => { // Maneja cambios en los campos del formulario
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value })); // Actualiza los valores del formulario
  }

  const handleSubmit = (event) => { // Maneja el envío del formulario
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario
    const validationErrors = LoginValidation(values); // Realiza la validación del formulario
    setErrors(validationErrors); // Actualiza los errores de validación
    if (Object.keys(validationErrors).length === 0) { // Verifica si no hay errores de validación
      axios.post('http://localhost:3001/access', {
        usuario: parseInt(values.usuario), // Convertir a número
        clave: values.clave
    }) // Realiza una solicitud POST para iniciar sesión
      .then(res => {
        console.log(res);
        if (res.data.length > 0) { // Verifica si se recibió algún dato en la respuesta
          console.log("Ingreso Exitoso"); // Registra un mensaje de ingreso exitoso en la consola
          navigate('/Home'); // Navega a la página de inicio después del inicio de sesión exitoso
        } else {
          console.log("Usuario o contraseña incorrectos"); // Registra un mensaje de error de inicio de sesión en la consola
          alert("Usuario o contraseña incorrectos"); // Muestra una alerta de error de inicio de sesión
        }
      })
      .catch(err => { // Captura cualquier error en la solicitud
        console.log(err); // Registra el error en la consola
        alert("Ocurrió un error al intentar acceder"); // Muestra una alerta de error
      });
    }
  }    

  const togglePasswordVisibility = () => { // Maneja el cambio de visibilidad de la contraseña
    setShowPassword(prev => !prev); // Cambia el estado para mostrar u ocultar la contraseña
  }

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-30'>
        <h2>Ingreso</h2>
        <form action='' onSubmit={handleSubmit}> {/* Define un formulario con manejador de envío */}
          <div className='mb-3'>
            <label htmlFor='usuario'><strong>Usuario</strong></label> {/* Etiqueta para el campo de usuario */}
            <input type='number' placeholder='Ingrese el código del usuario' name='usuario'
              onChange={handleInput} className='form-control rounded-0' /> {/* Campo de entrada para el usuario */}
            <span>{errors.usuario && <span className='text-danger'> {errors.usuario}</span>}</span> {/* Muestra errores de validación */}
          </div>
          <div className='mb-3'>
            <label htmlFor='clave'><strong>Clave</strong></label> {/* Etiqueta para el campo de contraseña */}
            <div className="input-group">
              <input type={showPassword ? 'text' : 'password'} placeholder='Ingrese la clave de acceso' name='clave'
                onChange={handleInput} className='form-control rounded-0' /> {/* Campo de entrada para la contraseña */}
              <button type="button" className="btn btn-outline-secondary" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Botón para mostrar u ocultar la contraseña */}
              </button>
            </div>
            <span>{errors.clave && <span className='text-danger'> {errors.clave}</span>}</span> {/* Muestra errores de validación */}
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'>Ingreso</button> {/* Botón de inicio de sesión */}
          <p>Usted está de acuerdo con los términos y políticas de ingreso</p> {/* Texto de acuerdo con los términos */}
          <Link to='/Singup' className='btn btn-default border w-100 bg-ligth rounded-0 text-decoration-none'><strong>Crear una cuenta</strong></Link> {/* Enlace para crear una cuenta */}
        </form>
      </div>
    </div>
  );
}

export default Login; // Exporta el componente Login para que pueda ser utilizado en otros archivos
