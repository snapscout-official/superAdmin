import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './assets/styles/index.css';
import App from './App.jsx';
import { store } from './redux/store';
import { Provider } from 'react-redux';

// Disabling console.logs in production
if (process.env.NODE_ENV === 'production') {
	console.log = function () {};
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);
