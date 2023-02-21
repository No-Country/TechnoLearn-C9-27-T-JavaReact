import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { apiSlice } from './store/api/apiSlice';
import { store } from './store/store';
import { Provider } from 'react-redux';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider api={apiSlice} store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
