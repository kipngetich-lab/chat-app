import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import Login from './components/Auth/Login';
import PrivateRoute from './components/common/PrivateRoute';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <Switch>
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute path="/chat" component={ChatPage} />
            <Route path="/login" component={Login} />
            <Redirect to="/" />
          </Switch>
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;