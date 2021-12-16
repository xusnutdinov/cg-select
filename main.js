let selectCurrent = document.querySelector('.select__current');
const selectBody = document.querySelector('.select__body');
const selectItems = document.querySelectorAll('.select__input');

selectCurrent.addEventListener('click', (event) => {
	selectBody.classList.toggle('active');
});

selectItems.forEach((item) => {
	item.addEventListener('click', (event) => {
		event.currentTarget.parentElement.classList.toggle('active');
		let text = event.currentTarget.innerText;
		selectCurrent.innerText = text;
	});
})