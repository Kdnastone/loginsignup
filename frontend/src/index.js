import React from 'react'; // Importa la librería React
import ReactDOM from 'react-dom/client'; // Importa el método render de ReactDOM
import './index.css'; // Importa estilos CSS
import App from './App'; // Importa el componente principal de la aplicación desde './App.js'
import reportWebVitals from './reportWebVitals'; // Importa la función para reportar métricas web
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos CSS de Bootstrap

const root = ReactDOM.createRoot(document.getElementById('root')); // Crea un punto de montaje para la aplicación React en el elemento con id 'root'
root.render( // Renderiza el copmonente App dentro del punto de montaje creado
  <React.StrictMode> {/* Activa el modo estricto de React */}
    <App />
  </React.StrictMode>
);

reportWebVitals(); // Llama a la función para reportar métricas web
