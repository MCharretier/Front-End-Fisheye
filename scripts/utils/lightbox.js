const $lightbox      = document.querySelector('#lightbox');
const $lightboxImage = $lightbox.querySelector('#lightbox-image');
const $lightboxVideo = $lightbox.querySelector('#lightbox-video');
const $lightboxTitle = $lightbox.querySelector('#lightbox-title');

let lightboxIndex = 0;

let $triggerMedia = null;

function displayLightboxContent(index) {

	const type = medias[index]?.video ? 'video' : 'image';

	// On affiche soit une image soit une video en fonction du type de media
	if (type === 'image') {
		$lightboxImage.style.display = 'block';
		$lightboxImage.src = `./assets/images/medias/${medias[index].image}`;
		$lightboxImage.alt = medias[index].title;
	}
	else if (type === 'video') {
		$lightboxVideo.style.display = 'block';
		$lightboxVideo.innerHTML = `<source src="./assets/images/medias/${medias[index].video}" type="video/mp4"></source>`;
		$lightboxVideo.setAttribute('aria-label', medias[index].title);
	} 
	$lightboxTitle.innerHTML = medias[index].title;
}

function clearLightboxContent() {

	// On retire l'image et ses attributs
	$lightboxImage.src = '';
	$lightboxImage.alt = '';
	$lightboxImage.style.display = 'none';

	// On retire la vidéo et ses attributs
	$lightboxVideo.innerHTML = '';
	$lightboxVideo.removeAttribute('aria-label');
	$lightboxVideo.style.display = 'none';
    
	// On retire le titre
	$lightboxTitle.innerHTML = '';
}

function displayLightbox($this) {

	const $tabbableElements = document.querySelectorAll('body > header a, body > header button, main a, main button');

	// On retient le bouton qui a ouvert la lightbox
	$triggerMedia = $this;

	// On empêche la navigation au clavier en arrière-plan
	$tabbableElements.forEach(element => {
		element.setAttribute('tabindex', '-1');
	});

	clearLightboxContent();

	$body.style.overflow = 'hidden';

	$header.setAttribute('aria-hidden', 'true');
	$main.setAttribute('aria-hidden', 'true');

	$lightbox.style.display = 'flex';
	$lightbox.setAttribute('aria-hidden', 'false');

	// On récupère le media qui a déclenché la lightbox en fonction de l'ID et on récupère le type
	lightboxIndex = medias.findIndex(x => x.id === parseInt($this.parentNode.id));
	displayLightboxContent(lightboxIndex);

	// On place le focus sur le premier élément focusable de la lightbox
	const $lightboxTabbables = $lightbox.querySelectorAll('button');
    
	if ($lightboxTabbables.length > 0) {
		$lightboxTabbables[0].focus();
	}
}

function closeLightbox() {

	const $tabbableElements = document.querySelectorAll('body > header a, body > header button, main a, main button');

	// On rend la possibité de naviguer au clavier
	$tabbableElements.forEach(element => {
		element.setAttribute('tabindex', '0');
	});

	$body.style.overflow = 'auto';

	$header.setAttribute('aria-hidden', 'false');
	$main.setAttribute('aria-hidden', 'false');

	$lightbox.style.display = 'none';
	$lightbox.setAttribute('aria-hidden', 'true');

	// On replace le focus sur l'élément qui avait ouvert la lightbox
	if ($triggerMedia) {
		$triggerMedia.focus();
	}
}

function previousLightbox() {

	if ((lightboxIndex - 1) >= 0) {
		lightboxIndex--;
	}
	else {
		lightboxIndex = medias.length - 1;
	}

	clearLightboxContent();
	displayLightboxContent(lightboxIndex);
}

function nextLightbox() {
    
	if ((lightboxIndex + 1) <= (medias.length - 1)) {
		lightboxIndex++;
	}
	else {
		lightboxIndex = 0;
	}

	clearLightboxContent();
	displayLightboxContent(lightboxIndex);
}

document.addEventListener('keydown', (event) => {

	if ($lightbox.style.display === 'flex') {

		if (event.key === 'Escape') {
			closeLightbox();
		}
		else if (event.key === 'ArrowLeft') {
			previousLightbox();
		}
		else if (event.key === 'ArrowRight') {
			nextLightbox();
		}
	}
});