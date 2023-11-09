function goToMoviesPage() {
    window.location.href = 'movies.html'; 
}

function openMovieInfoPage(movie) {
    const viewDetailsButtons = document.querySelectorAll('.view-details-button');

    viewDetailsButtons.forEach(function (viewDetailsButton) {
        viewDetailsButton.addEventListener('click', function () {
            console.log('View Details button clicked');
            displayMovieInfoPage(movie);
            document.getElementById('backButton').style.display = 'block';
        });
    });
}


document.addEventListener('DOMContentLoaded', function () {
    if (window.movieDetails) {
        displayMovieInfoPage(window.movieDetails);
    } else {
     
        console.error('Movie details not found.');

        const searchParams = new URLSearchParams(window.location.search);
        const title = searchParams.get('title');
        const year = searchParams.get('year');
        const actors = searchParams.get('actors');

        if (title && year && actors) {
            const movieDetailsFromURL = {
                '#TITLE': decodeURIComponent(title),
                '#YEAR': decodeURIComponent(year),
        
            };

            displayMovieInfoPage(movieDetailsFromURL);
        }
    }
});

function createMovieContainer(movie) {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container', 'carousel-item');

    const posterImage = document.createElement('img');
    posterImage.src = movie['#IMG_POSTER'];

    const viewDetailsButton = document.createElement('button');
    viewDetailsButton.classList.add('view-details-button');
    viewDetailsButton.textContent = 'View Details';

    movieContainer.appendChild(posterImage);
    movieContainer.appendChild(viewDetailsButton);

    return movieContainer;
}


function displayMovieInfoPage(movie) {
    const movieInfoContainer = document.getElementById('movieInfo');
    const carouselContainer = document.querySelector('.carousel-container');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    carouselContainer.style.display = 'none';
   
    searchInput.style.display = 'none';
    searchButton.style.display = 'none';
  

    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');

    const posterImage = document.createElement('img');
    posterImage.src = movie['#IMG_POSTER'];
    posterImage.style.borderRadius = '10px'; 

    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('details-container'); 

    const titleElement = document.createElement('h2');
    titleElement.textContent = `Title: ${movie['#TITLE']}`;

    const yearElement = document.createElement('p');
    yearElement.textContent = `Year: ${movie['#YEAR']}`;

    const actorsElement = document.createElement('p');
    actorsElement.textContent = `Actors: ${movie['#ACTORS']}`;

    const akaElement = document.createElement('p');
    akaElement.textContent = `AKA: ${movie['#AKA']}`;

    const imdbLinkElement = document.createElement('a');
    imdbLinkElement.textContent = 'IMDb Link';
    imdbLinkElement.href = movie['#IMDB_URL'];
    imdbLinkElement.target = '_blank';

    const imdbIvElement = document.createElement('a');
    imdbIvElement.textContent = 'IMDb IV Link';
    imdbIvElement.href = movie['#IMDB_IV'];
    imdbIvElement.target = '_blank';

    detailsContainer.appendChild(titleElement);
    detailsContainer.appendChild(yearElement);
    detailsContainer.appendChild(actorsElement);
    detailsContainer.appendChild(akaElement);
    detailsContainer.appendChild(imdbLinkElement);

    movieContainer.appendChild(detailsContainer);
    movieContainer.appendChild(posterImage);


    movieInfoContainer.appendChild(movieContainer);

    movieInfoContainer.appendChild(document.createElement('hr'));

      viewDetailsButton.addEventListener('click', function () {
        console.log('View Details button clicked');
        openMovieInfoPage(movie);
        document.getElementById('backButton').style.display = 'block';
    });
}

let searchButton;

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    searchButton = document.getElementById('searchButton'); 
    const resultsContainer = document.getElementById('results');

    console.log('DOM content loaded');

    console.log('searchInput:', searchInput);
    console.log('searchButton:', searchButton);

    searchButton.addEventListener('click', function () {
        console.log('Search button clicked');
        const searchQuery = searchInput.value;
        if (searchQuery) {
            slideInCarousel();
            minimizeLogo();
            slideUpSearch();

            searchMovies(searchQuery);
        } else {
            resultsContainer.textContent = 'Please enter a search query.';
        }
    });
});

let currentIndex = 0;

function showSlide(index) {
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');

    if (carouselItems.length === 0) {

        console.error('No carousel items found.');
        return;
    }

    const slideWidth = carouselItems[0].offsetWidth;
    const newPosition = -index * slideWidth;
    carouselInner.style.transform = `translateX(${newPosition}px)`;
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + 3) % 3;
    showSlide(currentIndex);
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % 3;
    showSlide(currentIndex);
}

function displayMovieCarousel(data) {
    const carouselInner = document.getElementById('movieCarousel');
    carouselInner.innerHTML = '';

    if (data && data.description && data.description.length > 0) {
        data.description.forEach(movie => {
            const carouselItem = createMovieContainer(movie);
            carouselInner.appendChild(carouselItem);

            const viewDetailsButton = carouselItem.querySelector('.view-details-button');
            attachViewDetailsListener(viewDetailsButton, movie);
        });

        showSlide(currentIndex);
    }
}


function searchMovies(query) {
    const apiUrl = `https://search.imdbot.workers.dev/?q=${query}`;
    console.log('API URL:', apiUrl);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                displayMovieCarousel(data);
            } else {
                console.log("No results found.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function slideInCarousel() {
    const carousel = document.querySelector('.carousel-container');
    carousel.style.width = '80%';
}

function minimizeLogo() {
    const logo = document.querySelector('.logo');
    logo.style.maxWidth = '10%';
    logo.style.maxHeight = '10%';
    logo.style.margin = '0';
}

function slideUpSearch() {
    const content = document.querySelector('.content');
    content.style.marginTop = '0';
}
function goBack() {
  
    document.getElementById('backButton').style.display = 'none';
    const carouselContainer = document.querySelector('.carousel-container');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    carouselContainer.style.display = 'block';
    searchInput.style.display = 'block';
    searchButton.style.display = 'block';

    window.location.href = 'movies.html';
}
function attachViewDetailsListener(viewDetailsButton, movie) {
    if (viewDetailsButton) {
        viewDetailsButton.addEventListener('click', function () {
            console.log('View Details button clicked');
            openMovieInfoPage(movie);
        });
    }
}
