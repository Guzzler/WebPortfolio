import './App.css'

import React, { Suspense, lazy } from 'react'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Base from './react-app/components/Base'

const LifeJourneyGame = lazy(() => import('./react-app/components/life-journey/LifeJourneyGame'))

const GameLoadingFallback = () => (
  <div style={{
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0f172a',
    color: '#e2e8f0',
    fontFamily: 'Inter, sans-serif'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '24px', marginBottom: '16px' }}>Loading Life Journey...</div>
      <div style={{ fontSize: '14px', opacity: 0.7 }}>Preparing your adventure</div>
    </div>
  </div>
)

const App = () => (
  <Router>
    <div className='height-100'>
      <Switch>
        <Route exact path="/life-journey">
          <Suspense fallback={<GameLoadingFallback />}>
            <LifeJourneyGame />
          </Suspense>
        </Route>
        <Route path="/" component={Base} />
      </Switch>
    </div>
  </Router>
)

export default App
