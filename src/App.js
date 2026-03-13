import './App.css'

import React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Base from './react-app/components/Base'
import mixpanelBrowser from 'mixpanel-browser'

const mixpanelDisabledClient = {
  track: () => {}
}

let mixpanel = mixpanelDisabledClient

if (process.env.REACT_APP_MIXPANEL_TOKEN) {
  mixpanelBrowser.init(process.env.REACT_APP_MIXPANEL_TOKEN, {
    autocapture: true,
    record_sessions_percent: 100
  })
  mixpanel = mixpanelBrowser
}

// Export for use in other components
export { mixpanel }

const App = () => (
  <Router>
    <div className='height-100'>
      <Switch>
        <Route path="/" component={Base} />
      </Switch>
    </div>
  </Router>
)

export default App
