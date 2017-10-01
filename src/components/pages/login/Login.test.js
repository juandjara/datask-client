import React from 'react'
import {Login} from './Login'
import renderer from 'react-test-renderer'
import {shallow, mount} from 'enzyme'

describe('Login', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <Login
        loading={false}
        authenticate={jest.fn()}
      />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
  it('matches snapshot for error', () => {
    const component = renderer.create(
      <Login
        error="Wrong credentials"
        authenticate={jest.fn()}
      />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
  it('matches snapshot for loading', () => {
    const component = renderer.create(
      <Login
        loading={true}
        authenticate={jest.fn()}
      />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
  it('calls authenticate on submit', () => {
    const component = shallow(
      <Login
        location={{query: {}}}
        authenticate={jest.fn()}
      />
    )
    const {props} = component.instance()
    component.find('form').props().onSubmit({
      preventDefault: () => {}
    })
    expect(props.authenticate).toHaveBeenCalled()
  })
  it('should change state when checkbox is toggled', () => {
    const component = mount(
      <Login />
    )
    expect(component.state('rememberMe')).toEqual(true)    
    component.find('input[type="checkbox"]').simulate('click')
    expect(component.state('rememberMe')).toEqual(false)
  })
  it('should change state when text is entered on input', () => {
    const component = mount(
      <Login />
    )
    expect(component.state('form').email).toEqual('')    
    component.find('input').first().props().onChange({
      target: {name: 'email', value: 'test'}
    })
    expect(component.state('form').email).toEqual('test')
  })
})