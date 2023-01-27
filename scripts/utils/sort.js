// Bouton de tri
const $dropdownToggle    = document.querySelector('#dropdown-toggle');
const $dropdownMenu      = document.querySelector('#dropdown-menu');
const $dropdownMenuItems = document.querySelectorAll('.dropdown-menu-item');

// Données de tri
const sort = {
	popularity: {
		title: 'Popularité',
	},
	date: {
		title: 'Date',
	},
	title: {
		title: 'Titre',
	}
};

$dropdownToggle.addEventListener('click', () => {
	if ($dropdownToggle.getAttribute('aria-expanded') === 'true') {

		// On retire le sous menu
		$dropdownToggle.setAttribute('aria-expanded', 'false');
		$dropdownMenu.style.display = 'none';

	}
	else {
		$dropdownToggle.setAttribute('aria-expanded', 'true');
		$dropdownMenu.style.display = 'block';

		// On retire l'élément actif
		const slug = $dropdownToggle.getAttribute('data-active');
		$dropdownMenuItems.forEach(($dropdownMenuItem) => {
			$dropdownMenuItem.style.display = 'block';
		});
		document.querySelector(`.dropdown-menu-item[data-sort=${slug}]`).style.display = 'none';
	}
});

$dropdownMenuItems.forEach($dropdownMenuItem => {
	$dropdownMenuItem.addEventListener('click', () => {

		// Récupération du slug
		const slug = $dropdownMenuItem.getAttribute('data-sort');

		// On remplace l'ancienne par la nouvelle valeur
		$dropdownToggle.setAttribute('data-active', slug);
		$dropdownToggle.innerHTML = `${sort[slug].title} <img src="./assets/icons/chevron.svg" alt="">`;

		// On retire le sous menu
		$dropdownToggle.setAttribute('aria-expanded', 'false');
		$dropdownMenu.style.display = 'none';

		// On place le focus sur le bouton
		$dropdownToggle.focus();

		if (slug === 'date') {

			medias = medias.sort((a, b) => new Date(b.date) - new Date(a.date));
			displayMedias(medias);
			listenLikes();

		}
		else if (slug === 'title') {
            
			medias = medias.sort((a, b) => a.title.localeCompare(b.title));
			displayMedias(medias);
			listenLikes();

		}
		else if (slug === 'popularity') {
			medias = medias.sort((a, b) => b.likes - a.likes);
			displayMedias(medias);
			listenLikes();

		}
	});
});