// On déclare une variable dans le scope global pour stocker des valeurs 
// qui seront utiles au fonctionnement du tri et de la lightbox
// et éviter de faire des requêtes répétitives à l'API
let medias = [];


function getPhotographer(id) {

    // Récupération de la data
    return fetch('/data/photographers.json')
        .then(response => { 
            return response.json()
        })
        .then(json => {
            return json.photographers
        })
        .then(photographers => {
            // Filtrage par ID
            return photographers.filter(x => x.id == id)[0]
        })
        .catch(error => { 
            console.error( error )
        })

}

function getPhotographerMedias(id) {

    // Récupération de la data
    return fetch('/data/photographers.json')
        .then(response => { 
            return response.json()
        })
        .then(json => {
            return json.media
        })
        .then(media => {
            // Filtrage par Photographer ID
            return media.filter(x => x.photographerId == id)
        })
        .then(filter => {
            // Default: Tri par popularité (nombre de likes)
            return filter.sort( (a, b) => b.likes - a.likes )
        })
        .catch(error => { 
            console.error( error )
        })

}

function displayPhotographerData(photographer, medias) {

    const $photographHeader = document.querySelector(".photograph-header");
    const $modalTitle       = document.querySelector("#modal_title");

    const photographerFactory = new PhotographerFactory();

    let userHeader  = photographerFactory.createPhotographer(photographer, "userHeader");
    let $userHeader = userHeader.render();

    // On affiche les informations sur le photographe
    $photographHeader.innerHTML += $userHeader;

    // On affiche le nom du photographe dans le titre de la modale
    $modalTitle.innerHTML += photographer.name;

    // On affiche les medias
    displayMedias(medias);

    let likes = 0

    medias.forEach(media => {

        // On incrémente le nombre de like du media au nombre de like total
        likes += media.likes;

    });

    // On ajoute un nouvel élément "likes" à l'objet "photographer"
    photographer['likes'] = likes;

    let userInfoBox  = photographerFactory.createPhotographer(photographer, "userInfoBox");
    let $userInfoBox = userInfoBox.render();

    // On affiche l'encart avec le nombre total de like et le prix journalier
    $photographHeader.innerHTML += $userInfoBox;

};

function displayMedias(medias) {

    const $photographMedias = document.querySelector(".photograph-medias");
    const mediaFactory      = new MediaFactory();

    // On retire tous les medias déjà présents
    $photographMedias.innerHTML = '';

    medias.forEach(media => {

        // On récupère le type du média (photo || vidéo)
        let type = media.video ? 'video' : 'image';

        let mediaListItem  = mediaFactory.createMedia(media, type);
        let $mediaListItem = mediaListItem.render();

        // On ajoute le média
        $photographMedias.innerHTML += $mediaListItem;
    });

};

function listenLikes() {

    // Tous les boutons de likes
    const $likesBtns = document.querySelectorAll( '.likes' );

    $likesBtns.forEach( btn => {
        btn.addEventListener('click', () => {

            // Compteur total
            const likesTotal = document.querySelector( '.info-box .likes-number' );

            if (!btn.classList.contains('liked')) {
                btn.classList.add('liked');
                btn.childNodes[0].nodeValue = +btn.childNodes[0].nodeValue + 1;
                likesTotal.innerHTML = +likesTotal.innerHTML + 1;
            }
            else {
                btn.classList.remove('liked');
                btn.childNodes[0].nodeValue = +btn.childNodes[0].nodeValue - 1;
                likesTotal.innerHTML = +likesTotal.innerHTML - 1;
            }

        });
    });
    
}

async function init() {

    // Récupèration de l'ID présent dans l'URL
    let id = new URLSearchParams(window.location.search).get('id');

    // Récupère les datas du photographe
    const photographer = await getPhotographer(id);

    // On récupère et stock les datas des medias dans une variable globale
    medias = await getPhotographerMedias(id);

    // On affiche le contenu
    displayPhotographerData(photographer, medias);

    listenLikes();

};

init();