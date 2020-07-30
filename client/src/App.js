import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './Pages/Main/Main';
import Auth from './Pages/Auth/Auth';

function App() {
  return (
    <BrowserRouter>
    	<Switch>
				<Route path='/' exact component={Main} />
    		<Route path='/auth' component={Auth} />
    	</Switch>
    	
    </BrowserRouter>
  );
}

export default App;
