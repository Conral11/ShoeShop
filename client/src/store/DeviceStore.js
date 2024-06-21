import { makeAutoObservable } from 'mobx'

export default class TovarStore {
	constructor() {
		this._brend = []
		this._color = []
		this._material = []
		this._season = []
		this._pol = []
		this._size = []
		this._tovar = []
		this._name = ''
		this._comparisonList = [] // Список товаров для сравнения

		this._selectedColor = ''
		this._selectedBrend = ''
		this._selectedMaterial = ''
		this._selectedPol = ''
		this._selectedSize = ''
		this._selectedSeason = ''
		this._page = 1
		this._totalCount = 0
		this._limit = 6
		makeAutoObservable(this)
	}
	get name() {
		return this._name
	}
	setName(name) {
		this._name = name
	}
	// Методы для работы со списком сравнения
	get comparisonList() {
		return this._comparisonList
	}

	addToComparison(tovar) {
		if (!this._comparisonList.find((item) => item.id === tovar.id)) {
			this._comparisonList.push(tovar)
		}
	}

	removeFromComparison(id) {
		this._comparisonList = this._comparisonList.filter((item) => item.id !== id)
	}

	clearComparison() {
		this._comparisonList = []
	}
	// brend
	setBrend(brend) {
		this._brend = brend
	}
	get brend() {
		return this._brend
	}
	get selectedBrend() {
		return this._selectedBrend
	}
	setSelectedBrend(brend) {
		this.setPage(1)
		this._selectedBrend = brend
	}

	// color
	setColor(color) {
		this._color = color
	}
	get color() {
		return this._color
	}
	get selectedColor() {
		return this._selectedColor
	}
	setSelectedColor(color) {
		this.setPage(1)
		this._selectedColor = color
	}

	// pol
	setPol(pol) {
		this._pol = pol
	}
	get pol() {
		return this._pol
	}
	get selectedPol() {
		return this._selectedPol
	}
	setSelectedPol(pol) {
		this.setPage(1)
		this._selectedPol = pol
	}

	// size
	setSize(size) {
		this._size = size
	}
	setSelectedSize(size) {
		this.setPage(1)
		this._selectedSize = size
	}
	get size() {
		return this._size
	}
	get selectedSize() {
		return this._selectedSize
	}

	// material
	setMaterial(material) {
		this._material = material
	}
	setSelectedMaterial(material) {
		this.setPage(1)
		this._selectedMaterial = material
	}
	get material() {
		return this._material
	}
	get selectedMaterial() {
		return this._selectedMaterial
	}
	// season
	setSeason(season) {
		this._season = season
	}
	setSelectedSeason(season) {
		this.setPage(1)
		this._selectedSeason = season
	}
	get season() {
		return this._season
	}
	get selectedSeason() {
		return this._selectedSeason
	}
	// tovar
	setTovar(tovar) {
		this._tovar = tovar
	}
	get tovar() {
		return this._tovar
	}

	// Count
	setTotalCount(count) {
		this._totalCount = count
	}
	get totalCount() {
		return this._totalCount
	}

	// Page
	setPage(page) {
		this._page = page
	}
	get page() {
		return this._page
	}

	// limit
	get limit() {
		return this._limit
	}
}
