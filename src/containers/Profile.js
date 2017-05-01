import React, {Component} from 'react';
import { connect } from 'react-redux';
import Input from 'react-toolbox/lib/input/Input'
import Button from 'react-toolbox/lib/button/Button'
import ProgressBar from 'react-toolbox/lib/progress_bar/ProgressBar'
import Flex from '../components/Flex'
import {
  fetchProfile, saveProfile, updateProfileField
} from '../reducers/profile.reducer'

class Profile extends Component {
  componentDidMount() {
    this.props.dispatch(fetchProfile())
  }
  onSubmit = (ev) => {
    ev.preventDefault();
    const { profile, dispatch } = this.props;
    dispatch(saveProfile(profile))
  }
  onChange = (text, ev) => {
    const name = ev.target.name;
    this.props.dispatch(updateProfileField(name, text))
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
    const { profile } = this.props;
    return (
      <div style={{padding: '1em'}}>
        <h2 style={{marginBottom: 0}}>Perfil</h2>
        {profile.loading && (
          <Flex align="center" className="color-primary">
            <ProgressBar type='circular' mode='indeterminate' />
            <span>Cargando ...</span>
          </Flex>
        )}
        <div className="color-error">
          <pre>{JSON.stringify(profile.error)}</pre>
        </div>
        <p>Creado el {this.parseDate(profile.createdDate)} </p>
        <p>Ultima modificación el {this.parseDate(profile.lastModifiedDate)}</p>
        <form onSubmit={this.onSubmit}>
          <Input
            label="Email" icon="email" name="email" type="email"
            value={profile.email || ""} onChange={this.onChange} />
          <div style={{display: 'flex'}}>
            <Input
              label="Nombre" icon="person_outline" name="firstName" type="text"
              value={profile.firstName || ""} onChange={this.onChange} />
            <Input
              label="Apellidos" name="lastName" type="text"
              value={profile.lastName || ""} onChange={this.onChange} />
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
  profile: state.profile
});
export default connect(mapStateToProps)(Profile);
