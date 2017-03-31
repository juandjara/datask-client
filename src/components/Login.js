import React from 'react';
import Input from 'react-toolbox/lib/input/Input'
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox'
import Button from 'react-toolbox/lib/button/Button'
import './Login.css'

const Login = () => {
  return (
    <div className="login-wrapper">
      <div style={{minHeight: '400px'}} >
        <h1 className="login-header">Open Crono</h1>
        <form onSubmit={ev => ev.preventDefault()} className="login-form shadow-z1">
          <Input label="Usuario" type="text" icon="person" required />
          <Input label="Contraseña" type="text" icon="lock" required />
          <div style={{marginTop: '1em'}}>
            <Checkbox style={{opacity: 0.5}} checked={true}
                      label="Recordarme durante 24h" />
            <Button type="submit" primary raised style={{width: '100%'}}>
              Entrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
