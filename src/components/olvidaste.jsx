import React, { useState } from 'react';

const Olvidaste = () => {
  const [correo, setCorreo] = useState('');
  const [error, setError] = useState(''); // Agrega el estado para el mensaje de error
  const [success, setSuccess] = useState(''); // Agrega el estado para el mensaje de éxito
  const [enviado, setEnviado] = useState(false);
  // Función para manejar los cambios en el campo de correo electrónico
  const handleEmailChange = (e) => {
    setCorreo(e.target.value);
  };

  // Función para manejar el envío del formulario de recuperación de contraseña
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación del formulario
    if (!correo) {
      setError("Por favor, ingresa tu dirección de correo electrónico.");
      return;
    }

    // Enviar la solicitud al servidor
    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo }),
      });

      if (response.ok) {
        // La solicitud fue exitosa, muestra un mensaje de éxito
        setSuccess("Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.");

        // Limpia el formulario
        setCorreo('');
        setError('');
        setEnviado(true);
      } else {
        // La solicitud falló, muestra un mensaje de error
        setError("Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo más tarde.");
      }
    } catch (error) {
      console.error('Error al enviar la solicitud de recuperación de contraseña:', error);
      // Maneja el error adecuadamente según tus necesidades
    }
  };

  return (
    <div>
      <h2>Recuperación de Contraseña</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      {enviado ? (
        <div>
          <p>Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.</p>
          {/* Puedes agregar un botón para permitir al usuario volver a enviar si es necesario */}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="correo">Correo Electrónico:</label>
          <input
            type="email"
            id="correo"
            name="email"
            value={correo}
            onChange={handleEmailChange}
            required
          />
          <button type="submit">Enviar Solicitud</button>
        </form>
      )}
    </div>
  );
};

export default Olvidaste;