import React from 'react'
import '../../css/Main.css'
import { NavLink } from 'react-router-dom'


const MyComponent = () => {

	{/*// Обработчик события для ссылок в футере
	function handleFooterLinkClick(event) {
		event.preventDefault(); // Отменяем стандартное поведение ссылки

		const targetId = event.target.getAttribute('href'); // Получаем id целевого блока

		const targetElement = document.querySelector(targetId); // Находим целевой элемент по id

		if (targetElement) {
			targetElement.scrollIntoView({ behavior: 'smooth' }); // Плавно прокручиваем до целевого блока
		}
	}

	// Добавляем обработчик события для каждой ссылки в футере
	const footerLinks = document.querySelectorAll('.footer-link');
	footerLinks.forEach((link) => {
		link.addEventListener('click', handleFooterLinkClick);
	});*/}

	return (
		<section>
			<footer className="footer">
				<div className="footer-conteiner">
					<div className="footer-block">
						<ul className="footer-info info">
							<li className="title-info">Покупателям</li>
							<li className="info-links">
								<NavLink to='/ONas' className="footer-link" >Доставка и возврат</NavLink>
							</li>
							<li className="info-links"><NavLink to='/Oplata' className="footer-link" >Оплата</NavLink></li>
							<li className="info-links">
								<NavLink to='/YxodZaOb' className="footer-link" >Уход за обувью</NavLink>
							</li>
							<li className="info-links">
								<NavLink to='/Sertif' className="footer-link" >Сертификат</NavLink>
							</li>
						</ul>
					</div>
					<div className="footer-block">
						<ul className="footer-info info">
							<li className="title-info">Каталог</li>
							<li className="info-links"><a href="#sectionNew" className="footer-link">Новинки</a></li>
							<li className="info-links"><a href="#sectionCategory" className="footer-link">Женщинам</a></li>
							<li className="info-links"><a href="#sectionCategory" className="footer-link">Мужчинам</a></li>
							<li className="info-links"><a href="#sectionCategory" className="footer-link">Спорт</a></li>
							<li className="info-links"><a href="#sectionActyality" className="footer-link">Аксессуары</a></li>
							<li className="info-links"><a href="#sectionActyality" className="footer-link">Уход за обувью</a></li>
						</ul>
					</div>

					<div className="footer-block">
						<ul className="footer-info info">
							<li className="info-title">
								<span className="title-info">Для связи</span><br />
								<br />
								<a href="https://www.google.com/maps/search/?api=1&query=Г. Боровичи ул. 1 Мая д. 40" target="_blank" className="footer-link">Г. Боровичи <br />
									ул. 1 Мая д. 40 <br /></a>
								<br />
								<a href="tel:89633341730" className="footer-link">89633341730</a>
							</li>
						</ul>
					</div>
					<div className="footer-block">
						<ul className="footer-info info">
							<div className="social-media-block">
								<ul className="social-media-list">
									<li className="social-media-item">
										<p className="title-info" style={{ marginBottom: "14px" }}> Соцсети</p>
										<a href="https://vk.com/id591179875" target="_blank" className="social-media-link">Вконтакте</a>
									</li>
								</ul>
							</div>
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
