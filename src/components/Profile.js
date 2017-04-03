import React, {Component} from 'react';
import { connect } from 'react-redux';
import Input from 'react-toolbox/lib/input/Input'

class Profile extends Component {
  state = {
    form: {
      email: '',
      lastName: '',
      firstName: ''
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.profile !== this.props.profile) {
      this.setState({ form: nextProps.profile })
    }
  }
  onSubmit = (ev) => {
    ev.preventDefault();
    console.log(this.state.form);
  }
  onChange = (text, ev) => {
    const name = ev.target.name;
    this.setState(prevState => ({
      form: Object.assign(prevState.form, { [name]: text })
    }))
  }
  parseDate(dateProp) {
    if(!dateProp) {
      return '';
    }
    const date = new Date(dateProp);
    const dateStr = date.toLocaleDateString();
    const timeStr = date.toLocaleTimeString();
    return `el ${dateStr} a las ${timeStr}`
  }
  render() {
    const { form } = this.state;
    return (
      <div style={{padding: '.5em'}}>
        <h2 style={{marginBottom: 0}}>Perfil</h2>
        <p>Creado el {this.parseDate(form.createdDate)} </p>
        <p>Ultima modificación el {this.parseDate(form.lastModifiedDate)}</p>
        <p></p>
        <form onSubmit={this.onSubmit}>
          <Input label="Email" icon="email" name="email" type="email"
                 value={form.email} onChange={this.onChange} />
          <Input label="Nombre" icon="person" name="firstName" type="text"
                 value={form.firstName} onChange={this.onChange} />
          <Input label="Apellido" icon="person_outline" name="lastName" type="text"
                 value={form.lastName} onChange={this.onChange} />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({profile: state.profile});
export default connect(mapStateToProps)(Profile);
