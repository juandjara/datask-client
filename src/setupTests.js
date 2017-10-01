import 'jest-localstorage-mock'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

global.window = global.window || {}
global.window.matchMedia = () => ({
  matches: false,
  addListener: jest.fn()
})

configure({adapter: new Adapter()})
