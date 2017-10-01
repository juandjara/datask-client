import React from 'react'
import ProfileConnected, {Profile} from './Profile'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import shallowWithStore from 'services/shallowWithStore'
import {createMockStore} from 'redux-test-utils'

const profile = {
  name: 'Juan D.',
  surname: 'Jara',
  email: 'juanorigami@gmail.com'
}

describe('Profile', () => {
  it('renders with store without crashing', () => {
    const state = {profile: {}}
    const store = createMockStore(state)
    shallowWithStore(<ProfileConnected />, store)
  })
  it('matches snapshot with profile', () => {
    const component = renderer.create(
      <Profile 
        profile={profile}
        saveProfile={jest.fn()}
        fetchProfile={jest.fn()}
        updateProfileField={jest.fn()}
      />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
  it('matches snapshot with loading', () => {
    const component = renderer.create(
      <Profile 
        profile={{loading: true}}
        saveProfile={jest.fn()}
        fetchProfile={jest.fn()}
        updateProfileField={jest.fn()}
      />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
  it('calls fetchProfile on mount', () => {
    const component = renderer.create(
      <Profile 
        profile={profile}
        saveProfile={jest.fn()}
        fetchProfile={jest.fn()}
        updateProfileField={jest.fn()}
      />
    )
    const {props} = component.getInstance()
    expect(props.fetchProfile).toHaveBeenCalled()
  })
  it('calls saveProfile on submit', () => {
    const component = shallow(
      <Profile 
        profile={profile}
        saveProfile={jest.fn()}
        fetchProfile={jest.fn()}
        updateProfileField={jest.fn()}
      />
    )
    const props = component.instance().props
    component.find('form').props().onSubmit({
      preventDefault: () => {}
    })
    expect(props.saveProfile).toHaveBeenCalled()
  })
  it('calls updateProfileField on change', () => {
    const component = mount(
      <Profile 
        profile={profile}
        saveProfile={jest.fn()}
        fetchProfile={jest.fn()}
        updateProfileField={jest.fn()}
      />
    )
    const props = component.instance().props
    component.find('input').first().props().onChange({
      target: {name: 'someName', value: 'some text'}
    })
    expect(props.updateProfileField).toHaveBeenCalled()
  })
})
