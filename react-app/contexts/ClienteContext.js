import React, { createContext, useState } from 'react';

export const ClienteContext = createContext();

export const ClienteProvider = ({ children }) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');

  return (
    <ClienteContext.Provider value={{ nombre, setNombre, telefono, setTelefono, email, setEmail }}>
      {children}
    </ClienteContext.Provider>
  );
};
