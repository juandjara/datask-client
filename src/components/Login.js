import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input/Input'
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox'
import Button from 'react-toolbox/lib/button/Button'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import { connect } from 'react-redux'
import { authenticate } from '../reducers/user.reducer'
import './Login.css'

class Login extends Component {
  state = {
    form: {
      username: '',
      password: ''
    }
  }
  onSubmit = (ev) => {
    ev.preventDefault();
    this.props.dispatch(authenticate(this.state.form))
  }
  onChange = (text, ev) => {
    const el = ev.target;
    this.setState(prevState => ({
      form: Object.assign(prevState.form, { [el.name]: text })
    }))
  }
  render() {
    const {loading, error} = this.props;
    const {form} = this.state
    return (
      <div className="login-wrapper">
        <div style={{minHeight: '400px'}} >
          <h1 className="login-header">Open Crono</h1>
          <p style={{color: 'tomato', textAlign: 'center'}}>{error}</p>
          <form onSubmit={this.onSubmit} className="login-form shadow-z1">
            <Input
              label="Usuario" icon="person"
              name="username" type="text" required
              value={form.username} onChange={this.onChange} />
            <Input
              minLength={3}
              label="Contraseña" type="password"
              name="password" icon="lock" required
              value={form.password} onChange={this.onChange} />
            <div style={{marginTop: '1em'}}>
              <Checkbox style={{opacity: 0.5}} checked={true}
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

const mapStateToProps = state => state.user || state;
export default connect(mapStateToProps)(Login);
