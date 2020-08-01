import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import AuthContext from '../../context/authContext';

function Header() {
	return (
		<AuthContext.Consumer>
			{context => {
				return (
					<header className='header'>
						<h1 className='header__title'>EZ-BOOK4U</h1>
						<nav className='header__nav'>
							{!context.token && 
								<Link className='header__link' to={'/auth'}>
									Auth
								</Link>
							}
							<Link className='header__link' to={'/events'}>
								Events
							</Link>
							{context.token &&
								<>
									<Link className='header__link' to={'/bookings'}>
										Bookings
									</Link>
									<button onClick={context.logout} className='header__link' to={'/bookings'}>
										Logout
									</button>
								</>
							}
						</nav>
					</header>
				)
			}}
		</AuthContext.Consumer>
	);
}

export default Header;