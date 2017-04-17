import React, {Component} from 'react';
import { connect } from 'react-redux';
import Input from 'react-toolbox/lib/input/Input'
import Button from 'react-toolbox/lib/button/Button'
import ProgressBar from 'react-toolbox/lib/progress_bar/ProgressBar'
import Flex from './Flex'
import { setAll, setValue, reset } from '../reducers/form.reducer'
import { saveProfile } from '../reducers/profile.reducer'

class Profile extends Component {
  componentDidMount() {
    this.updateForm(this.props);
  }
  componentWillUnmount() {
    this.props.dispatch(reset())
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.profile !== this.props.profile) {
      this.updateForm(nextProps);
    }
  }
  updateForm(props) {
    const { email, firstName, lastName } = props.profile
    props.dispatch(setAll({ email, firstName, lastName }))
  }
  onSubmit = (ev) => {
    ev.preventDefault();
    const { profile, form, dispatch } = this.props;
    dispatch(saveProfile(Object.assign(form, {
      login: profile.login
    })));
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
    const { form, profile } = this.props;
    return (
      <div style={{padding: '1em'}}>
        <h2 style={{marginBottom: 0}}>Perfil</h2>
        {profile.loading && (
          <Flex align="center" className="color-teal">
            <ProgressBar type='circular' mode='indeterminate' />
            <span>Cargando ...</span>
          </Flex>
        )}
        <div className="color-red">
          <pre>{JSON.stringify(profile.error)}</pre>
        </div>
        <p>Creado el {this.parseDate(profile.createdDate)} </p>
        <p>Ultima modificación el {this.parseDate(profile.lastModifiedDate)}</p>
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
