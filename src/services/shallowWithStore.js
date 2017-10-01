// https://medium.com/@visualskyrim/test-your-redux-container-with-enzyme-a0e10c0574ec
import { shallow } from 'enzyme';

const shallowWithStore = (component, store) => {
  const context = {
    store,
  };
  return shallow(component, { context });
};

export default shallowWithStore;