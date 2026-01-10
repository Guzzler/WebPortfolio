import './App.css'

import React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Base from './react-app/components/Base'
import mixpanel from 'mixpanel-browser'

// Initialize Mixpanel
mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN, {
  autocapture: true,
  record_sessions_percent: 100
})

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
