import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import { observer } from 'mobx-react-lite'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Context } from './index'
import { check } from './http/userAPI'

const App = observer(() => {
	const { user } = useContext(Context)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		check()
			.then((data) => {
				user.setUser(true)
				user.setIsAuth(true)
			})
			.catch((error) => {
				console.error('Ошибка при проверке пользователя:', error)
			})
			.finally(() => setLoading(false))
	}, [user])
	if (loading) {
		return <main className='main container'>загрузка...</main>
	}

	return (
		<BrowserRouter>
			<NavBar />
			<AppRouter />
			<Footer />
			<ToastContainer />
		</BrowserRouter>
	)
})

export default App
