import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../../index'
import '../../css/Main.css'
import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'
import Bag from '../../img/header/bag.svg'
import Counts from '../../img/header/counts.svg'
import Menu from '../../img/header/menu.jpg'
import Logo from '../../img/header/logo.jpg'
import Search from '../../img/header/Search.jpg'
import { jwtDecode } from 'jwt-decode'

const NavBar = observer(() => {
	const { user } = useContext(Context)
	const { tovar } = useContext(Context)
	const [searchTerm, setSearchTerm] = useState('')
	const [name, setName] = useState('')
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const token = localStorage.getItem('token')
	const [isAdmin, setIsAdmin] = useState(false)
	const [loading, setLoading] = useState(true) // изначально ставим true

	useEffect(() => {
		const fetchUserInfo = async () => {
			setLoading(true)
			try {
				const token = localStorage.getItem('token')
				console.log('Token:', token) // отладочное сообщение
				if (!token) {
					console.error('Token not found')
					setIsAdmin(false)
					return
				}
				const decodedToken = jwtDecode(token)
				console.log('Decoded token:', decodedToken) // отладочное сообщение
				const roleId = decodedToken.roleId

				if (roleId === 1) {
					setIsAdmin(true)
				} else {
					setIsAdmin(false)
				}
			} catch (error) {
				console.error('Failed to fetch user info:', error)
				setIsAdmin(false)
			} finally {
				setLoading(false)
			}
		}

		fetchUserInfo()
	}, [])

	const handleNameChange = (e) => {
		setName(e.target.value)
	}

	const handleFilter = () => {
		tovar.setName(name)
	}

	const logOut = () => {
		user.setUser({})
		user.setIsAuth(false)
	}

	const openSearch = () => {
		setIsSearchOpen(true)
	}

	const closeSearch = () => {
		setIsSearchOpen(false)
	}

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const closeMenu = () => {
		setIsMenuOpen(false)
	}
	if (loading) {
		return <main className='main container'>загрузка...</main>
	}
	return (
		<section>
			<header className='header-container'>
				<div className='header-container-m-g'>
					<NavLink to='/' onClick={toggleMenu}>
						<img
							src={Menu}
							alt=''
							className={`Меню ${isMenuOpen ? 'rotated' : ''}`}
							onClick={toggleMenu}
						/>
						<p>Меню</p>
					</NavLink>


					<nav className={`menu-nav ${isMenuOpen ? 'show' : ''}`}>
						<ul className='menu-nav2'>
							<li>
								<NavLink className='menu-nav-text' to='/' onClick={closeMenu}>
									Главная
								</NavLink>
							</li>
							<li>
								<NavLink
									className='menu-nav-text'
									to='/about'
									onClick={closeMenu}
								>
									О нас
								</NavLink>
							</li>
							<li>
								<NavLink
									className='menu-nav-text'
									to='/catalog'
									onClick={closeMenu}
								>
									Каталог
								</NavLink>
							</li>
							<li>
								<NavLink
									className='menu-nav-text'
									to='/basket'
									onClick={closeMenu}
								>
									Корзина
								</NavLink>
							</li>
							<li>
								<NavLink
									className='menu-nav-text'
									to='/Favorite'
									onClick={closeMenu}
								>
									Избранное
								</NavLink>
							</li>
							<li>
								<NavLink
									className='menu-nav-text'
									to='/compare'
									onClick={closeMenu}
								>
									Сравнение
								</NavLink>
							</li>
							{isAdmin ?? (
								<li>
									<NavLink
										className='menu-nav-text'
										to='/admin'
										onClick={closeMenu}
									>
										Панель админа
									</NavLink>
								</li>
							)}
						</ul>
					</nav>
				</div>
				<div className='header-container-logo'>
					<NavLink to='/'>
						<img src={Logo} alt='' className='logo' />
					</NavLink>
				</div>
				<div className='header-container-button'>
					<div style={{ display: 'flex' }}>
						<input
							style={{ width: '200px ' }}
							type='text'
							placeholder='Поиск...'
							value={name}
							onChange={handleNameChange}
						/>
						<NavLink to={'/catalog'} onClick={handleFilter}>
							<img src={Search} alt='Поиск' />
						</NavLink>
					</div>
					<NavLink to='/basket'>
						<img src={Bag} alt='Корзина' />
					</NavLink>
					<NavLink to={'favorites/'}>
						<img src={Counts} alt='Понравившееся' />
					</NavLink>
					{user.isAuth ? (
						<NavLink onClick={logOut} to='/' className='button-custom'>
							Выйти
						</NavLink>
					) : (
						<NavLink to='/login' className='button-custom'>
							Войти
						</NavLink>
					)}
				</div>
			</header>
		</section>
	)
})

export default NavBar