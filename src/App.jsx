import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [transformedUsers, setTransformedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Petición HTTP GET al endpoint usando fetch
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        
        const filteredData = data.filter(
          (user) => user.email.endsWith('.biz') || user.email.endsWith('.org')
        );

        
        
        const result = filteredData.map((user) => ({
          name: user.name,
          email: user.email,
          username: user.username,
          city: user.address.city, 
        }));

        
        console.log("Resultado esperado:", result);

        setTransformedUsers(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ padding: '20px' }}>Cargando datos...</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Usuarios Transformados (Actividad)</h1>
      <p>Abre la consola del navegador (F12) para ver el arreglo exacto solicitado.</p>
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {transformedUsers.map((user, index) => (
          <li 
            key={index} 
            style={{ 
              border: '1px solid #ddd', 
              margin: '10px 0', 
              padding: '15px', 
              borderRadius: '8px',
              backgroundColor: '#fafafa'
            }}
          >
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Ciudad:</strong> {user.city}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;