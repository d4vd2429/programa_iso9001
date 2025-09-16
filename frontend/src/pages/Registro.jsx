import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';


function Registro() {
  const [razonSocial, setRazonSocial] = useState('');
  const [nit, setNit] = useState('');
  const [representante, setRepresentante] = useState('');
  const [sector, setSector] = useState('');
  const [tipoEmpresa, setTipoEmpresa] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefonos, setTelefonos] = useState('');
  const [numEmpleados, setNumEmpleados] = useState('');
  const [email, setEmail] = useState('');
  const [web, setWeb] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      const res = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razonSocial, nit, representante, sector, tipoEmpresa, direccion, telefonos, numEmpleados, email, web, facebook, instagram, tiktok, password
        })
      });
      const data = await res.json();
      if (!res.ok) return setError(data.message || 'Error al registrar');
      setSuccess('Registro exitoso, ahora puedes iniciar sesión');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError('Error de conexión');
    }
  };

  return (
    <div className="auth-container">
      <h2>REGISTRO ISO</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
        <div style={{ flex: '1 1 40%' }}>
          <input type="text" placeholder="Razón Social" value={razonSocial} onChange={e => setRazonSocial(e.target.value)} required />
          <input type="text" placeholder="NIT" value={nit} onChange={e => setNit(e.target.value)} required />
          <input type="text" placeholder="REPRESENTANTE LEGAL" value={representante} onChange={e => setRepresentante(e.target.value)} required />
          <input type="text" placeholder="Sector Económico" value={sector} onChange={e => setSector(e.target.value)} required />
          <input type="text" placeholder="Tipo de empresa" value={tipoEmpresa} onChange={e => setTipoEmpresa(e.target.value)} required />
          <input type="text" placeholder="Dirección" value={direccion} onChange={e => setDireccion(e.target.value)} required />
          <input type="text" placeholder="Teléfonos" value={telefonos} onChange={e => setTelefonos(e.target.value)} required />
        </div>
        <div style={{ flex: '1 1 40%' }}>
          <input type="number" placeholder="Número de Empleados" value={numEmpleados} onChange={e => setNumEmpleados(e.target.value)} required />
          <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="text" placeholder="WEB" value={web} onChange={e => setWeb(e.target.value)} />
          <input type="text" placeholder="Facebook" value={facebook} onChange={e => setFacebook(e.target.value)} />
          <input type="text" placeholder="Instagram" value={instagram} onChange={e => setInstagram(e.target.value)} />
          <input type="text" placeholder="TikTok" value={tiktok} onChange={e => setTiktok(e.target.value)} />
          <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12 }}>
          <button type="submit">GUARDAR</button>
          <button type="button" onClick={() => alert('Verificación de calidad I')}>VERIFICACIÓN DE CALIDAD I</button>
          <button type="button" onClick={() => alert('Verificación de calidad II')}>VERIFICACIÓN DE CALIDAD II</button>
          <button type="button" onClick={() => navigate('/inicio')}>REGRESAR</button>
        </div>
        {error && <div className="auth-error" style={{ width: '100%' }}>{error}</div>}
        {success && <div className="auth-success" style={{ width: '100%' }}>{success}</div>}
      </form>
      <p>¿Ya tienes cuenta? <span className="auth-link" onClick={() => navigate('/login')}>Inicia sesión</span></p>
    </div>
  );
}

export default Registro;
