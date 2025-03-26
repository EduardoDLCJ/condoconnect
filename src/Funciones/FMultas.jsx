import React, { useEffect } from 'react';

const FMultas = ({ departamento, torre, onNewMultas }) => {
  useEffect(() => {
    const fetchMultas = async () => {
      try {
        const response = await fetch(`https://apicondominio-7jd1.onrender.com/notificaciones/${departamento}/${torre}`);
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          // Notificar al componente padre con las multas encontradas
          onNewMultas(data);
        } else if (data.message) {
          // Mensaje cuando no hay registros
          console.log(data.message);
          onNewMultas([]); // Enviar un arreglo vacío al componente padre
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMultas();

    const intervalId = setInterval(fetchMultas, 20000); // Actualizar cada 20 segundos

    return () => clearInterval(intervalId);
  }, [departamento, torre, onNewMultas]);

  return null; // Este componente sigue siendo observador
};

export default FMultas;