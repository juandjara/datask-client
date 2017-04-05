import React, {Component} from 'react';
import { connect } from 'react-redux';
import Input from 'react-toolbox/lib/input/Input'
import Button from 'react-toolbox/lib/button/Button'
import { setAll, setValue, reset } from '../reducers/form.reducer'

class Profile extends Component {
  componentDidMount() {
    this.props.dispatch(setAll(this.props.profile))
  }
  componentWillUnmount() {
    this.props.dispatch(reset())
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.profile !== this.props.profile) {
      this.props.dispatch(setAll(nextProps.profile))
    }
  }
  onSubmit = (ev) => {
    ev.preventDefault();
    console.log(this.state.form);
  }
  onChange = (text, ev) => {
    const name = ev.target.name;
    this.props.dispatch(setValue(name, text))
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
    const { form } = this.props;
    return (
      <div style={{padding: '.5em'}}>
        <h2 style={{marginBottom: 0}}>Perfil</h2>
        <p>Creado el {this.parseDate(form.createdDate)} </p>
        <p>Ultima modificación el {this.parseDate(form.lastModifiedDate)}</p>
        <form onSubmit={this.onSubmit}>
          <Input
            label="Email" icon="email" name="email" type="email"
            value={form.email || ""} onChange={this.onChange} />
          <div style={{display: 'flex'}}>
            <Input
              label="Nombre" icon="person_outline" name="firstName" type="text"
              value={form.firstName || ""} onChange={this.onChange} />
            <Input
              label="Apellidos" name="lastName" type="text"
              value={form.lastName || ""} onChange={this.onChange} />
          </div>
          <Button type="submit" raised primary>
            Guardar
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  form: state.form
});
export default connect(mapStateToProps)(Profile);
