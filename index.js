function goToMoviesPage() {
    window.location.href = 'movies.html'; 
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultsContainer = document.getElementById('results');
  
    function searchMovies(query) {
        const apiUrl = `https://search.imdbot.workers.dev/?q=${query}`;
      
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            if (data.ok) {
              displayMovieInfo(data);
            } else {
              console.log("No results found.");
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
      

      function displayMovieInfo(data) {
        const movieInfoContainer = document.getElementById('movieInfo');
        movieInfoContainer.innerHTML = ''; 
      
        if (data && data.description && data.description.length > 0) {
          data.description.forEach(movie => {
        
            const movieContainer = document.createElement('div');
            movieContainer.classList.add('movie-container');
      
            const posterImage = document.createElement('img');
            posterImage.src = movie['#IMG_POSTER'];
    
            const descriptionContainer = document.createElement('div');
      
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
      
            descriptionContainer.appendChild(titleElement);
            descriptionContainer.appendChild(yearElement);
            descriptionContainer.appendChild(actorsElement);
            descriptionContainer.appendChild(akaElement);
            descriptionContainer.appendChild(imdbLinkElement);
            descriptionContainer.appendChild(imdbIvElement);
      
            movieContainer.appendChild(posterImage);
            movieContainer.appendChild(descriptionContainer);
      
            movieInfoContainer.appendChild(movieContainer);
      
            movieInfoContainer.appendChild(document.createElement('hr'));
          });
        } else {
          movieInfoContainer.textContent = 'No results found.';
        }
      }
      
    
  
    searchButton.addEventListener('click', function() {
      const searchQuery = searchInput.value;
      if (searchQuery) {
        searchMovies(searchQuery);
      } else {
        resultsContainer.textContent = 'Please enter a search query.';
      }
    });
  
    
  });
  