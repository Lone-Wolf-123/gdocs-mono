// /src/pages/AuthPage.tsx
//<Route path="/login" element={<AuthPage mode="login" />} />

import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {api} from '../lib/api';
import {useAuth} from '../store/useAuth';

export default function AuthPage({ mode }: { mode: 'login' | 'register' }) {
	const navigate = useNavigate();
	const setToken = useAuth((s) => s.setToken);

	const [form, setForm] = useState({
		email: '',
		password: '',
		name: '',
	});

	function handleInputs(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setForm((prevForm) => ({
			...prevForm,
			[name]: value,
		}));
	}

	async function submit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const endpoint = mode === 'register' ? '/auth/register' : '/auth/login';
		const payload = mode === 'register' ? form : { email: form.email, password: form.password };

		const res = await api.post(endpoint, payload);
		setToken(res.data.token);

		navigate('/docs');
	}

	return (
		<form onSubmit={submit}>
			{mode === 'register' && (
				<input placeholder="Name" value={form.name} onChange={handleInputs} />
			)}

			<input placeholder="Email" value={form.email} onChange={handleInputs} />

			<input type="password" placeholder="Password" value={form.password} onChange={handleInputs} />

			<button type="submit">{mode === 'register' ? 'Create Account' : 'Login'}</button>
		</form>
	);
}
