import React from 'react';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom';

import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" render={ () => <Login /> } exact />
          <Route path="/carteira" render={ () => <Wallet /> } />
        </Switch>
      </div>
    );
  }
}

export default App;
