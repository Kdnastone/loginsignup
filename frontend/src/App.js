// Importación de módulos necesarios
import React from 'react'; // Importa la librería React
import Login from './Login'; // Importa el componente Login desde './Login.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa BrowserRouter, Routes y Route de react-router-dom
import Singup from './Singup'; // Importa el componente Singup desde './Singup.js'
import Home from './Home'; // Importa el componente Home desde './Home.js'

function App() {
  return (
    <BrowserRouter> {/* Inicia el enrutador BrowserRouter */}
      <Routes> {/* Define un conjunto de rutas */}
        <Route path='/' element={<Login />} /> {/* Define una ruta para el componente Login */}
        <Route path='/Singup' element={<Singup />} /> {/* Define una ruta para el componente Singup */}
        <Route path='/Home' element={<Home />} /> {/* Define una ruta para el componente Home */}
      </Routes>
    </BrowserRouter>
  );
}

export default App; // Exporta el componente App como el componente principal de la aplicación
