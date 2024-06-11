import React, { useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import { observer } from 'mobx-react-lite'
// import { Context } from './index'
// import { check } from './http/userAPI'

const App = observer(() => {
	// const { user } = useContext(Context)

	return (
		<BrowserRouter>
			<NavBar />
			<AppRouter />
			<Footer />
		</BrowserRouter>
	)
})

export default App
