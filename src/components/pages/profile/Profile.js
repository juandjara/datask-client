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
import PropTypes from 'prop-types'

const InputGroup = styled.div`
  display: flex;
  [data-react-toolbox="input"] {
    flex: 1;
  } 
`

export class Profile extends Component {
  componentDidMount() {
    this.props.fetchProfile()
  }
  onSubmit = (ev) => {
    ev.preventDefault();
    const { profile, saveProfile } = this.props;
    saveProfile(profile)
  }
  onChange = (text, ev) => {
    const name = ev.target.name;
    this.props.updateProfileField(name, text)
  }
  render() {
    const { profile } = this.props;
    return (
      <div style={{padding: '1em'}}>
        <h2 className="type-headline">Mi cuenta</h2>
        {profile.loading && (
          <Flex align="center">
            <ProgressBar type='circular' mode='indeterminate' />
            <span style={{marginLeft: '1em'}}>Cargando ...</span>
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

Profile.propTypes = {
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
});
const actions = {fetchProfile, updateProfileField, saveProfile}
export default connect(mapStateToProps, actions)(Profile);
