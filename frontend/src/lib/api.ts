// /src/lib/api.ts

import axios from 'axios';

export const api = axios.create({
	baseURL: import.meta.env.VITE_baseURL,
});

// Attach token on every request
api.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// auto-logout on 401
api.interceptors.response.use(
	(res) => res,
	(err) => {
		if (err.response?.status === 401) {
			localStorage.removeItem('token');
			window.location.href = '/login';
		}
		return Promise.reject(err);
	},
);
