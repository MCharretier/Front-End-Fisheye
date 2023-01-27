const PhotographerFactory = function () {

	this.createPhotographer = function (data, element) {

		let photographer;

		if (element === 'userCard') {
			photographer = new userCard(data);
		}
		else if (element === 'userHeader') {
			photographer = new userHeader(data);
		}
		else if (element === 'userInfoBox') {
			photographer = new userInfoBox(data);
		}

		return photographer;
	};

};

const userCard = function (data) {

	const { name, portrait, id, city, country, price, tagline } = data;

	this.render = function () {

		const picture = `assets/images/photographers/${portrait}`;
		const url = `photographer.html?id=${id}`;

		return (
			`<article>
                <a href="${url}" aria-label="${name}">
                    <img src="${picture}" alt="">
                    <h2>${name}</h2>
                </a>
                <p class="place">${city}, ${country}</p>
                <p class="tagline">${tagline}</p>
                <p class="price">${price}€/jour</p>
            </article>`
		);

	};
};

const userHeader = function (data) {

	const { name, portrait, id, city, country, tagline } = data;

	this.render = function () {

		const picture = `/assets/images/photographers/${portrait}`;
		const url = `photographer.html?id=${id}`;

		return (
			`<div class="photograph-infos">
                <h1 class="profile-title">${name}</h1>
                <p class="localisation">${city}, ${country}</p>
                <p>${tagline}</p>
            </div>
            <button class="contact_button" aria-label="Contact Me" aria-labelledby="contact_modal" onClick="displayModal(this)">Contactez-moi</button>
            <img src="${picture}" alt="${name}" class="profile-picture">`
		);

	};
};

const userInfoBox = function (data) {

	const { likes, price } = data;

	this.render = function () {

		return (
			`<div class="info-box">
                <div class="likes-container">
                    <p class="likes-number">${likes}</p>
                    <img src="./assets/icons/black-like.svg" alt="likes">
                </div>
                <p class="daily-price">${price}€ / jour</p>
            </div>`
		);

	};
};