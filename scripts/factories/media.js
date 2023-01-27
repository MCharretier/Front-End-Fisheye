const MediaFactory = function () {

	this.createMedia = function (data, type) {

		let media;

		if (type === 'image') {
			media = new image(data);
		}
		else if (type === 'video') {
			media = new video(data);
		}

		return media;
	};

};

const image = function (data) {

	const { id, image, title, likes } = data;

	this.render = function () {

		const media = `assets/images/medias/${image}`;

		return (
			`<article id="${id}">
                <a href="#" onclick="displayLightbox(this)" aria-label="${title}, closeup view">
                    <img class="media" src="${media}" alt="${title}">    
                </a>
                <div class="info-banner">
                    <h2>${title}</h2>
                    <button class="likes" aria-label="likes" tabindex="0">${likes} <img src="assets/icons/red-like.svg" alt="likes"></button>
                </div>
            </article>`
		);

	};
};

const video = function (data) {

	const { id, video, title, likes } = data;

	this.render = function () {

		const media = `assets/images/medias/${video}`;

		return (
			`<article id="${id}">
                <a href="#" onclick="displayLightbox(this)" aria-label="${title}, closeup view">
                    <video class="media" preload="metadata" aria-label="${title}">
                        <source src="${media}" type="video/mp4"></source>
                    </video>
                </a>
                <div class="info-banner">
                    <h2>${title}</h2>
                    <button class="likes">${likes} <img src="assets/icons/red-like.svg" alt="likes"></button>
                </div>
            </article>`
		);

	};
};