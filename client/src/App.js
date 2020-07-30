import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './Pages/Main/Main';
import Auth from './Pages/Auth/Auth';
import Header from './Components/Header/Header';

function App() {
  return (
    <BrowserRouter>
    	<Header />
    	<Switch>
				<Route path='/' exact component={Main} />
    		<Route path='/auth' component={Auth} />
    	</Switch>    	
    </BrowserRouter>
  );
}

export default App;
