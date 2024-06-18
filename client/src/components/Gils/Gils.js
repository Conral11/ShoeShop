import React, { useContext } from 'react'
import '../../css/Main.css'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'
import { NavLink } from 'react-router-dom'

const Gils = observer(() => {
	const { tovar } = useContext(Context)

	const handleFilter = (pol) => {
		tovar.setSelectedBrend(pol.id)
	}

	return (
		<div className='conteiner-brends'>
			<NavLink
				to='/catalog'
				key={tovar.pol[0].id}
				onClick={() => handleFilter(tovar.pol[0])}
			>
				<h2>{pol.name}</h2>
			</NavLink>
		</div>
	)
})

export default Gils
