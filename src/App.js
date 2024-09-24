import React, { useState } from 'react';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strengthMessage, setStrengthMessage] = useState('');
  const [strengthClass, setStrengthClass] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [length, setLength] = useState(8);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(true);
  const [copiedMessage, setCopiedMessage] = useState('');
  
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    classifyPasswordStrength(newPassword);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const classifyPasswordStrength = (password) => {
    if (password.length < 6) {
      setStrengthMessage('Poco segura');
      setStrengthClass('weak');
    } else if (password.length >= 6 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[\W]/.test(password)) {
      setStrengthMessage('Muy segura');
      setStrengthClass('strong');
    } else if (password.length >= 6) {
      setStrengthMessage('Segura');
      setStrengthClass('medium');
    } else {
      setStrengthMessage('');
      setStrengthClass('');
    }
  };

  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopiedMessage('¡Contraseña copiada al portapapeles!');
    setTimeout(() => {
      setCopiedMessage('');
    }, 3000);
  };

  const generateRandomPassword = () => {
    let chars = '';
    if (includeLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) chars += '0123456789';
    if (includeSpecial) chars += '!@#$%^&*()_+[]{}|;:,.<>?';

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
    classifyPasswordStrength(newPassword);
  };

  return (
    <div className="container">
      {/* Título enmarcado */}
      <h1 className="title">Fortaleza de Contraseñas</h1>

      <input
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={handlePasswordChange}
        placeholder="Ingresa una contraseña"
      />

      <button onClick={toggleShowPassword}>
        {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
      </button>

      <button onClick={copyToClipboard}>Copiar contraseña</button>

      {copiedMessage && <p className="copied-message">{copiedMessage}</p>}

      <button onClick={generateRandomPassword}>Generar contraseña aleatoria</button>

      {password && (
        <p className={`password-strength ${strengthClass}`}>
          Fortaleza: {strengthMessage}
        </p>
      )}

      <button onClick={() => setShowAdvanced(!showAdvanced)}>
        {showAdvanced ? 'Ocultar opciones avanzadas' : 'Mostrar opciones avanzadas'}
      </button>

      {showAdvanced && (
        <div className="advanced-options">
          <label>
            Largo de la contraseña:
            <input 
              type="number" 
              value={length} 
              onChange={(e) => setLength(e.target.value)} 
              min="1" 
            />
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={includeLower} 
              onChange={() => setIncludeLower(!includeLower)} 
            /> Incluir letras minúsculas
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={includeUpper} 
              onChange={() => setIncludeUpper(!includeUpper)} 
            /> Incluir letras mayúsculas
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={includeNumbers} 
              onChange={() => setIncludeNumbers(!includeNumbers)} 
            /> Incluir números
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={includeSpecial} 
              onChange={() => setIncludeSpecial(!includeSpecial)} 
            /> Incluir caracteres especiales
          </label>
        </div>
      )}
    </div>
  );
}

export default App;













