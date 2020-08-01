import React from 'react';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import AuthContext from './context/authContext';
import Main from './Pages/Main/Main';
import Auth from './Pages/Auth/Auth';
import Events from './Pages/Events/Events';
import Booking from './Pages/Booking/Booking';
import Header from './Components/Header/Header';
import './partials/_common.scss';

class App extends React.Component {
	state = {
		token: null,
		userId: null
	}

	login = (token, userId, tokenExpiration) => {
		this.setState({
			token: token,
			userId: userId
		});
	}

	logout = () => {
		this.setState({
			token: null,
			userId: null
		})
	};

	render() {
		return (
	    <BrowserRouter>
	    	<AuthContext.Provider value={{
	    			token: this.state.token,
	    			userId: this.state.userId,
	    			login: this.login,
	    			logout: this.logout
	    		}}
	    	>
					<Header />
		    	<Switch>
		    		{!this.state.token && <Redirect from='/' to='/auth' exact />}
		    		{this.state.token && <Redirect from='/' to='/events' exact />}
		    		{this.state.token && <Redirect from='/auth' to='/events' exact />}
		    		{!this.state.token && <Route path='/auth' component={Auth} />}
		    		<Route path='/events' component={Events} />
		    		{this.state.token && <Route path='/bookings' component={Booking} />}
		    	</Switch>    	
	    	</AuthContext.Provider>
	    </BrowserRouter>
	  );
	}
}

export default App;