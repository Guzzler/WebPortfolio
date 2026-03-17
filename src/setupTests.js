import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

if (!window.matchMedia) {
  window.matchMedia = () => ({
    addListener: () => {},
    addEventListener: () => {},
    dispatchEvent: () => false,
    matches: false,
    media: '',
    onchange: null,
    removeListener: () => {},
    removeEventListener: () => {},
  })
}
