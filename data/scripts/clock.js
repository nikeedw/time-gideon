/*==================== CLOCK ====================*/
const hour = document.getElementById('clock-hour'),
	minutes = document.getElementById('clock-minutes'),
	seconds = document.getElementById('clock-seconds')

const clock = () => {
	let date = new Date()

	let hh = date.getHours() * 30,
		mm = date.getMinutes() * 6,
		ss = date.getSeconds() * 6

	hour.style.transform = `rotateZ(${hh + mm / 12}deg)`
	minutes.style.transform = `rotateZ(${mm}deg)`
	seconds.style.transform = `rotateZ(${ss}deg)`
}
setInterval(clock, 1000) // 1000 = 1s

/*==================== CLOCK & DATE TEXT ====================*/
const textHour = document.getElementById('text-hour'),
	textMinutes = document.getElementById('text-minutes'),
	textSeconds = document.getElementById('text-seconds'),

	dateDay = document.getElementById('date-day'),
	dateMonth = document.getElementById('date-month'),
	dateYear = document.getElementById('date-year');

const clockText = () => {
	let date = new Date();

	let hh = date.getHours(),
		mm = date.getMinutes(),
		ss = date.getSeconds(),
		day = date.getDate(),
		month = date.getMonth(),
		year = date.getFullYear();

	if (hh < 10) {
		hh = `0${hh}`;
	}
	if (mm < 10) {
		mm = `0${mm}`;
	}
	if (ss < 10) {
		ss = `0${ss}`;
	}

	let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	textHour.innerHTML = `${hh}:`;
	textMinutes.innerHTML = `${mm}:`;
	textSeconds.innerHTML = ss;

	dateDay.innerHTML = day;
	dateMonth.innerHTML = `${months[month]},`;
	dateYear.innerHTML = year;
};
setInterval(clockText, 1000); // 1000 = 1s		

/*==================== DARK/LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bxs-sun'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bxs-moon' : 'bxs-sun'

if (selectedTheme) {
	document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
	themeButton.classList[selectedIcon === 'bxs-moon' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
	document.body.classList.toggle(darkTheme)
	themeButton.classList.toggle(iconTheme)
	localStorage.setItem('selected-theme', getCurrentTheme())
	localStorage.setItem('selected-icon', getCurrentIcon())
})
