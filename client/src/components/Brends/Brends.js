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

	// Exclude 6 brands
	const excludedBrands = [6]

	return (
		<div className='conteiner-brends' style={{ overflowX: 'scroll', whiteSpace: 'nowrap' }}>
			{tovar.brend.filter(brand => !excludedBrands.includes(brand.id)).map((brand) => (
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
