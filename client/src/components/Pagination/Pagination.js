import React, { useContext } from 'react';
import '../../css/Main.css';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';

const Pagination = observer(() => {
	const { tovar } = useContext(Context);
	const pageCount = Math.ceil(tovar.totalCount / tovar.limit);
	const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

	return (
		<ul className='pagination'>
			{pages.map((page) => (
				<li key={page} className='pagination-catalog__li'>
					<button
						className={`pagination__button ${page === tovar.page ? 'pagination__button-active' : ''
							}`}
						onClick={() => tovar.setPage(page)}
					>
						{page}
					</button>
				</li>
			))}
		</ul>
	);
});

export default Pagination;
