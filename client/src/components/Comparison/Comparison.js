import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'
import '../../css/Main.css'

const Comparison = observer(() => {
	const { tovar } = useContext(Context)

	if (!tovar.comparisonList || tovar.comparisonList.length === 0) {
		return <p>Нет товаров для сравнения</p>
	}

	return (
		<section className='comparison'>
			<h2>Сравнение товаров</h2>
			<table>
				<thead>
					<tr>
						<th>Изображение</th>
						<th>Название</th>
						<th>Бренд</th>
						<th>Цена</th>
						<th>Материал</th>
						<th>Цвет</th>
						<th>Сезон</th>
						<th>Действие</th>
					</tr>
				</thead>
				<tbody>
					{tovar.comparisonList.map((item) => (
						<tr key={item.id}>
							<td>
								<img src={item.image} alt={item.name} />
							</td>
							<td>{item.name}</td>
							<td>{item.brend}</td>
							<td>{item.price}</td>
							<td>{item.material}</td>
							<td>{item.color}</td>
							<td>{item.season}</td>
							<td>
								<button onClick={() => tovar.removeFromComparison(item.id)}>
									Удалить
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<button onClick={() => tovar.clearComparison()}>
				Очистить сравнение
			</button>
		</section>
	)
})

export default Comparison
