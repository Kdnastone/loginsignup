// Importación de módulos necesarios
import React, { useRef, useEffect, useState } from 'react'; // Importa la librería React y varios hooks
import { Link } from 'react-router-dom'; // Importa el componente Link de react-router-dom
import SignupValidation from './SingupValidation'; // Importa la función de validación del formulario de registro desde './SignupValidation.js'
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importa iconos de ojo abierto y cerrado de react-icons/fa
import axios from 'axios'; // Importa axnios para realizar solicitudes HTTP
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate de react-router-dom

function Signup() {
    const inputRef = useRef(null); // Crea una referencia a un elemento de entrada

    useEffect(() => {
        console.log(inputRef.current); // Registra el valor actual de la referencia al montar el componente
    }, []);

    const [values, setValues] = useState({ // Estado para almacenar los valores del formulario
        nombre: '',
        apellido: '',
        cargo: '',
        usuario: '',
        clave: ''
    });

    const navigate = useNavigate(); // Obtiene la función de navegación del enrutador
    const [errors, setErrors] = useState({}); // Estado para almacenar errores de validación del formulario
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña

    const handleInput = (event) => { // Maneja cambios en los campos del formulario
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value })); // Actualiza los valores del formulario
    }

    const handleSubmit = (event) => { // Maneja el envío del formulario
        event.preventDefault(); // Evita el comportamiento predeterminado del formulario
        const validationErrors = SignupValidation(values); // Realiza la validación del formulario
        setErrors(validationErrors); // Actualiza los errores de validación
        if (Object.keys(validationErrors).length === 0) { // Verifica si no hay errores de validación
            axios.post('http://localhost:3001/create', values) // Realiza una solicitud POST para crear una cuenta
                .then(res => {
                    navigate('/'); // Navega de regreso a la página de inicio de sesión después de crear la cuenta
                    console.log(res);
                })
                .catch(err => console.log(err)); // Captura cualquier error en la solicitud
        }
    }

    const togglePasswordVisibility = () => { // Maneja el cambio de visibilidad de la contraseña
        setShowPassword(prev => !prev); // Cambia el estado para mostrar u ocultar la contraseña
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-30'>
                <h2>Crear Cuenta</h2>
                <form action='' onSubmit={handleSubmit}> {/* Define un formulario con manejador de envío */}
                    <div className='mb-3'>
                        <label htmlFor='nombre'><strong>Primer Nombre</strong></label> {/* Etiqueta para el campo de nombre */}
                        <input ref={inputRef} type='text' placeholder='Ingrese el nombre del usuario' name='nombre'
                        onChange={handleInput} className='form-control rounded-0' /> {/* Campo de entrada para el nombre */}
                        <span>{errors.nombre && <span className='text-danger'> {errors.nombre}</span>}</span> {/* Muestra errores de validación */}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='apellido'><strong>Primer Apellido</strong></label> {/* Etiqueta para el campo de apellido */}
                        <input type='text' placeholder='Ingrese el apellido del usuario'  name='apellido'
                        onChange={handleInput} className='form-control rounded-0' /> {/* Campo de entrada para el apellido */}
                        <span>{errors.apellido && <span className='text-danger'> {errors.apellido}</span>}</span> {/* Muestra errores de validación */}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='cargo'><strong>Cargo</strong></label> {/* Etiqueta para el campo de cargo */}
                        <input type='text' placeholder='Ingrese el cargo del usuario' name='cargo'
                        onChange={handleInput} className='form-control rounded-0' /> {/* Campo de entrada para el cargo */}
                        <span>{errors.cargo && <span className='text-danger'> {errors.cargo}</span>}</span> {/* Muestra errores de validación */}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='usuario'><strong>Usuario</strong></label> {/* Etiqueta para el campo de usuario */}
                        <input type='number' placeholder='Ingrese el código del usuario' name='usuario'
                        onChange={handleInput} className='form-control rounded-0' /> {/* Campo de entrada para el usuario */}
                        <span>{errors.usuario && <span className='text-danger'> {errors.usuario}</span>}</span> {/* Muestra errores de validación */}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='clave'><strong>Clave</strong></label> {/* Etiqueta para el campo de contraseña */}
                        <div className="d-flex align-items-center">
                            <input type={showPassword ? 'text' : 'password'} placeholder='Ingrese la clave de acceso' name='clave'
                            onChange={handleInput} className='form-control rounded-0' /> {/* Campo de entrada para la contraseña */}
                            <button type="button" className="btn btn-outline-secondary" onClick={togglePasswordVisibility}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Botón para mostrar u ocultar la contraseña */}
                            </button>
                        </div>
                        <span>{errors.clave && <span className='text-danger'> {errors.clave}</span>}</span> {/* Muestra errores de validación */}
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Crear Cuenta</button> {/* Botón de creación de cuenta */}
                    <p>Usted está de acuerdo con los términos y políticas de ingreso</p> {/* Texto de acuerdo con los términos */}
                    <Link to='/' className='btn btn-default border w-100 bg-ligth rounded-0 text-decoration-none'><strong>Ingresar</strong></Link> {/* Enlace para ir a la página de inicio de sesión */}
                </form>
            </div>
        </div>
    );
}

export default Signup; // Exporta el componente Signup para que pueda ser utilizado en otros archivos
