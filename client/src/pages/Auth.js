import React, { useContext, useState } from 'react'
import '../css/Main.css'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { login, registration } from '../http/userAPI'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Auth = observer(() => {
	const { user } = useContext(Context)
	const location = useLocation()
	const navigate = useNavigate()

	const isLogin = location.pathname === '/login'
	const [name, setName] = useState('') // Новое поле для имени
	const [email, setEmail] = useState('') // Новое поле для электронной почты
	const [telephone, setTelephone] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	const phoneRegex = /^\+7\d{10}$/ // Регулярное выражение для проверки номера телефона
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Регулярное выражение для проверки электронной почты

	const click = async () => {
		try {
			if (!phoneRegex.test(telephone)) {
				toast.error(
					'Некорректный номер телефона. Убедитесь, что он начинается с +7 и содержит 10 цифр.'
				)
				return
			}
			if (isLogin) {
				await login(telephone, password)
				toast.success('Успешная авторизация!')
			} else {
				if (!emailRegex.test(email)) {
					toast.error('Некорректный адрес электронной почты.')
					return
				}
				await registration({ name, telephone, email, password })
				toast.success('Успешная регистрация!')
			}
			user.setUser(user)
			user.setIsAuth(true)
			navigate('/')
		} catch (e) {
			toast.error(e.response.data.message)
		}
	}

	return (
		<div className='auth-container'>
			<div className='auth-tabs'>
				<button
					className={`auth-tab ${isLogin ? 'active' : ''}`}
					onClick={() => navigate('/login')}
				>
					Авторизоваться
				</button>
				<button
					className={`auth-tab ${!isLogin ? 'active' : ''}`}
					onClick={() => navigate('/registration')}
				>
					Зарегистрироваться
				</button>
			</div>

			<div className='auth-box'>
				<h2 className='auth-title medium-title'>
					Добро пожаловать в Русский стиль
				</h2>
				<div className='auth-links'>
					{isLogin ? (
						<div className='auth-link'>
							Вы здесь впервые?{' '}
							<NavLink to='/registration' className='auth-navlink'>
								Зарегистрироваться!
							</NavLink>
						</div>
					) : (
						<div className='auth-link'>
							У вас уже есть аккаунт?{' '}
							<NavLink to='/login' className='auth-navlink'>
								Войти!
							</NavLink>
						</div>
					)}
				</div>
				{!isLogin && (
					<div>
						<input
							type='text'
							placeholder='Введите имя'
							value={name}
							onChange={(e) => setName(e.target.value)}
							className='input-custom-dark auth-input'
						/>
						<input
							type='email'
							placeholder='Введите email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className='input-custom-dark auth-input'
						/>
					</div>
				)}
				<input
					placeholder='Введите Телефон'
					type='text'
					value={telephone}
					onChange={(e) => setTelephone(e.target.value)}
					className='input-custom-dark auth-input'
				/>
				<div className='password-input-wrapper'>
					<input
						type={showPassword ? 'text' : 'password'}
						name='password'
						placeholder='Введите пароль'
						value={password}
						autoComplete='on'
						onChange={(e) => setPassword(e.target.value)}
						className='input-custom-dark auth-input'
					/>
					<button
						type='button'
						onClick={() => setShowPassword(!showPassword)}
						className='show-password-button'
					>
						<p style={{ marginBottom: '10px' }}>
							{showPassword ? 'Скрыть пароль' : 'Показать пароль'}
						</p>
					</button>
				</div>

				<button className='button-custom auth-button' onClick={click}>
					{isLogin ? 'Войти' : 'Регистрация'}
				</button>
			</div>
			<ToastContainer />
		</div>
	)
})

export default Auth
