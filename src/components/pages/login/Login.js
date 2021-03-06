import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input/Input'
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox'
import Button from 'react-toolbox/lib/button/Button'
import { connect } from 'react-redux'
import { authenticate } from 'reducers/auth.reducer'
import './Login.css'

export class Login extends Component {
  state = {
    rememberMe: true,
    form: {
      email: '',
      password: ''
    }
  }
  onSubmit = (ev) => {
    ev.preventDefault();
    const { form, rememberMe } = this.state;
    const { location } = this.props;
    this.props.authenticate(form, rememberMe, location.query.next)
  }
  onChange = (text, ev) => {
    const name = ev.target.name;
    this.setState(prevState => ({
      form: {
        ...prevState.form, 
        [name]: text
      }
    }))
  }
  onCheckboxChange = (checked) => {
    this.setState({ rememberMe: checked })
  }
  render() {
    const {loading, error} = this.props;
    const {form, rememberMe} = this.state
    return (
      <div className="login-wrapper">
        <div style={{minHeight: '400px'}} >
          <h1 className="login-header">Open Crono</h1>
          <p className="color-primary" style={{textAlign: 'center'}}>
            {loading && 'Cargando ...'}
          </p>
          <p style={{color: 'tomato', textAlign: 'center'}}>{error}</p>
          <form onSubmit={this.onSubmit} className="login-form shadow-z1">
            <Input
              label="Correo electronico" icon="email"
              name="email" type="text" required
              value={form.email} onChange={this.onChange} />
            <Input
              minLength={4}
              label="Contraseña" type="password"
              name="password" icon="lock" required
              value={form.password} onChange={this.onChange} />
            <div style={{marginTop: '1em'}}>
              <Checkbox
                name="rememberMe"
                style={{opacity: 0.5}}
                onChange={this.onCheckboxChange} checked={rememberMe}
                label="Recordarme durante 24h" />
              <Button
                primary raised style={{width: '100%'}}
                type="submit" disabled={loading}>
                {loading ? 'Cargando ...' : 'Entrar'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state.auth;
const actions = {authenticate}

export default connect(mapStateToProps, actions)(Login);
