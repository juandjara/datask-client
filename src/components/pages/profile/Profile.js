import React, {Component} from 'react';
import { connect } from 'react-redux';
import Input from 'react-toolbox/lib/input/Input'
import Button from 'react-toolbox/lib/button/Button'
import ProgressBar from 'react-toolbox/lib/progress_bar/ProgressBar'
import Flex from 'components/shared/Flex'
import {
  fetchProfile, saveProfile, updateProfileField
} from 'reducers/profile.reducer'
import styled from 'styled-components'

const InputGroup = styled.div`
  display: flex;
  [data-react-toolbox="input"] {
    flex: 1;
  } 
`

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
        <h2 className="type-headline">Mi cuenta</h2>
        {profile.loading && (
          <Flex align="center" className="color-primary">
            <ProgressBar type='circular' mode='indeterminate' />
            <span>Cargando ...</span>
          </Flex>
        )}
        <div className="color-error">
          <pre>{JSON.stringify(profile.error)}</pre>
        </div>
        <form onSubmit={this.onSubmit}>
          <Input
            label="Email" icon="email" name="email" type="email"
            value={profile.email || ""} onChange={this.onChange} />
          <InputGroup>
            <Input
              label="Nombre" icon="person_outline" name="name" type="text"
              value={profile.name || ""} onChange={this.onChange} />
            <Input
              label="Apellidos" name="surname" type="text"
              value={profile.surname || ""} onChange={this.onChange} />
          </InputGroup>
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
