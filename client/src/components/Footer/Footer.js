import React from 'react'
import '../../css/Main.css'
import { NavLink } from 'react-router-dom'


const MyComponent = () => {
	return (
		<section>
			<footer className="footer">
				<div className="footer-conteiner">
					<div className="footer-block">
						<ul className="footer-info info">
							<li className="title-info">Покупателям</li>
							<li className="info-links">
								<NavLink to='/' className="footer-link" >Доставка и возврат</NavLink>
							</li>
							<li className="info-links"><NavLink to='/' className="footer-link" >Оплата</NavLink></li>
							<li className="info-links">
								<NavLink to='/' className="footer-link" >Уход за обувью</NavLink>
							</li>
							<li className="info-links">
								<NavLink to='/' className="footer-link" >Вопросы и ответы</NavLink>
							</li>
							<li className="info-links">
								<NavLink to='/' className="footer-link" >Сертификат</NavLink>
							</li>
						</ul>
					</div>
					<div className="footer-block">
						<ul className="footer-info info">
							<li className="title-info">Каталог</li>
							<li className="info-links"><NavLink to='/' k className="footer-link" >Новинки</NavLink></li>
							<li className="info-links"><NavLink to='/' className="footer-link" >Женщинам</NavLink></li>
							<li className="info-links"><NavLink to='/' className="footer-link" >Мужчинам</NavLink></li>
							<li className="info-links"><NavLink to='/' className="footer-link" >Спорт</NavLink></li>
							<li className="info-links">
								<NavLink to='/' className="footer-link" >Аксессуары</NavLink>
							</li>
							<li className="info-links">
								<NavLink to='/' className="footer-link" >Последняя пара</NavLink>
							</li>
							<li className="info-links">
								<NavLink to='/' className="footer-link" >Уход за обувью</NavLink>
							</li>
						</ul>
					</div>
					<div className="footer-block">
						<ul className="footer-info info">
							<li className="info-title">
								<span className="title-info">Для связи</span><br />
								<br />
								Г. Боровичи <br />
								ул. 1 Мая д. 40 <br />
								<br />
								89633341730
							</li>
						</ul>
					</div>
					<div className="footer-block">
						<ul className="footer-info info">
							<li className="info-title">
								<span className="title-info">Соцсети</span> <br /><br />
								ВКонтакте
							</li>
							<li className="info-links">
								<p className="footer-regim_rabot">
									<span className="title-info">Режим работы: </span> <br />
									ПН - ПТ: 10:00 - 19:00 <br />
									СБ: 10:00 - 18:00 <br />
									ВС: 10:00 - 17:00
								</p>
							</li>
						</ul>
					</div>
				</div>
			</footer>
		</section>
	)
}

export default MyComponent
