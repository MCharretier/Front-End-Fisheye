const $body      = document.querySelector('body');
const $header    = document.querySelector('body > header');
const $main      = document.querySelector('main');
const $modal     = document.querySelector('#contact_modal');
const $modalForm = $modal.querySelector('form');

let $triggerButton = null;


function displayModal($this) {

	const $tabbableElements = document.querySelectorAll('body > header a, body > header button, main a, main button');

	// On retient le bouton qui a ouvert la modale
	$triggerButton = $this;

	// On empêche la navigation au clavier en arrière-plan
	$tabbableElements.forEach(element => {
		element.setAttribute('tabindex', '-1');
	});

	$body.style.overflow = 'hidden';

	$header.setAttribute('aria-hidden', 'true');
	$main.setAttribute('aria-hidden', 'true');

	$modal.style.display = 'flex';
	$modal.setAttribute('aria-hidden', 'false');

	// On place le focus sur le premier élément focusable de la modale
	const $modalTabbables = $modal.querySelectorAll('button');
    
	if ($modalTabbables.length > 0) {
		$modalTabbables[0].focus();
	}
}

function closeModal() {

	const $tabbableElements = document.querySelectorAll('body > header a, body > header button, main a, main button');

	// On rend la possibité de naviguer au clavier
	$tabbableElements.forEach(element => {
		element.setAttribute('tabindex', '0');
	});

	$body.style.overflow = 'auto';

	$header.setAttribute('aria-hidden', 'false');
	$main.setAttribute('aria-hidden', 'false');

	$modal.style.display = 'none';
	$modal.setAttribute('aria-hidden', 'true');

	// On replace le focus sur l'élément qui avait ouvert la modale
	if ($triggerButton) {
		$triggerButton.focus();
	}
}

document.addEventListener('keydown', (event) => {

	if ($modal.style.display === 'flex') {

		if (event.key === 'Escape') {
			closeModal();
		}
	}
});

$modalForm.addEventListener('submit', (event) => {
    
	event.preventDefault();
  
	const formData = new FormData($modalForm);
	const datas    = Object.fromEntries(formData);

	console.log(datas);
});