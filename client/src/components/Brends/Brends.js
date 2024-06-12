import React, { useContext } from 'react'
import '../../css/Main.css'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'
import { NavLink } from 'react-router-dom'

const Brends = observer(() => {
	const { tovar } = useContext(Context)

	const handleFilter = (brand) => {
		tovar.setSelectedBrend(brand.id)
	}

	return (
		<div className='conteiner-brends'>
			{tovar.brend.map((brand) => (
				<NavLink
					to='/catalog'
					key={brand.id}
					onClick={() => handleFilter(brand)}
				>
					<img className='branks' alt={brand.id} src={brand.img_url} />
				</NavLink>
			))}
		</div>
	)
})

export default Brends
