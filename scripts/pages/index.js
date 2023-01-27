function getPhotographers() {

	// Récupération de la data
	return fetch('/data/photographers.json')
		.then(response => { 
			return response.json(); 
		})
		.catch(error => { 
			console.error(error); 
		});

}

function displayData(photographers) {

	const $photographersSection = document.querySelector('.photographer_section');

	photographers.forEach((photographer) => {

		const Factory = new PhotographerFactory();

		const userCard = Factory.createPhotographer(photographer, 'userCard');
		const $userCard = userCard.render();

		$photographersSection.innerHTML += $userCard;

	});
}

async function init() {

	// Récupère les datas des photographes
	const { photographers } = await getPhotographers();
	displayData(photographers);

}
    
init();
    