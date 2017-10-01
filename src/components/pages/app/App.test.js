import React from 'react'
import {App} from './App'
import renderer from 'react-test-renderer'
import {createMockStore} from 'redux-test-utils'
import {shallow} from 'enzyme'
import shallowWithStore from 'services/shallowWithStore'

let store;

describe('App', () => {
  beforeEach(() => {
    store = createMockStore({
      sidenav: {},
      profile: {},
      responsive: {}
    })
  })
  xit('matches snapshot', () => {
    const component = renderer.create(
      <App
        sidenav={{pinned: false}}
      />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
  xit('matches snapshot with sidenav pinned', () => {
    const component = renderer.create(
      <App
        sidenav={{pinned: true}}
      />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
  it('calls fetchProfile on mount', () => {
    const component = shallowWithStore(
      <App
        sidenav={{pinned: false}}
        actions={{fetchProfile: jest.fn()}}
      />
    , store)
    const {props} = component.instance()
    expect(props.actions.fetchProfile).toHaveBeenCalled()
  })
  it('adds style when sidenav is pinned', () => {
    const component = shallow(
      <App
        sidenav={{pinned: false}}
        actions={{fetchProfile: jest.fn()}}
      />
    , {context: {store}})
    
    expect(component.childAt(1).props().style.paddingLeft).toBeUndefined()
    component.setProps({sidenav: {pinned: true}})
    component.update()
    expect(component.childAt(1).props().style.paddingLeft).toEqual(256)    
  })
})