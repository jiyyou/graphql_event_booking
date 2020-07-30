import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {
	return (
		<header>
			<h1>EZ-BOOK4U</h1>
			<nav>
				<Link to={'/'}>
					Main
				</Link>
				<Link to={'/auth'}>
					Auth
				</Link>
				<Link>
				</Link>
			</nav>
		</header>
	);
}

export default Header;