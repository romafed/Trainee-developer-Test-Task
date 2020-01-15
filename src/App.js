import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import LogInPage from './pages/LogInPage';
import RegistrationPage from './pages/RegistrationPage';
import TaskListPage from './pages/TaskListPage';
import { useTransition, animated } from 'react-spring';
import './App.css';

function App() {

  const location = useLocation()
  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 0, position: 'absolute' },
    enter: { opacity: 1, position: 'static' },
    leave: { opacity: 0, position: 'absolute' },
  })


  return (
    <div className="App">
      {transitions.map(({ item, props, key }) => (
        <animated.div className='page' key={key} style={props}>
          <Switch location={item}>
            <Route path='/registration' component={RegistrationPage} />
            <Route path='/login' component={LogInPage} />
            <Route path='/' component={TaskListPage} />
          </Switch>
        </animated.div>
      ))}
    </div>
  );
}

export default App;
