const apiKey = '53f11466'; // Replace with your OMDb API key

// Function to handle search input and fetch movie data
function searchMovies() {
  const query = document.getElementById('search-input').value;

  if (query.length > 2) {
    fetch(`http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        displaySearchResults(data.Search);
      }).catch(err=>{
            // console.log(err)
      })
  }
}
window.onload = function() {
        document.getElementById('app').classList.add('show');

};

// Function to display the search results
function displaySearchResults(movies) {
  const searchResults = document.getElementById('search-results');
  searchResults.innerHTML = ''; // Clear previous results
//   console.log(movies)
  if (movies) {
    movies.forEach(movie => {
      const movieDiv = document.createElement('div');
      movieDiv.classList.add('movie');
      movieDiv.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title}" />
        <h3>${movie.Title}</h3>
        <button>Add to Favorites</button>
      `;
      const button = movieDiv.querySelector('button');
      const favoriteMovies = JSON.parse(localStorage.getItem('favorites')) || [];
      let idsOfFavMovie = favoriteMovies.map(item=> item.id)
      let presenceCheck = idsOfFavMovie.includes(movie.imdbID);
        //   console.log(presenceCheck,"presence")
          if(presenceCheck){
            button.setAttribute("disabled", "true");  // Disable the button using setAttribute
        button.innerText = "Added to Favorites"; 
          }
        //   console.log(idsOfFavMovie)
      button.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent the event from bubbling up to the parent div
         console.log(favoriteMovies);
        addToFavorites(movie.imdbID, movie.Title,movie.Poster)
        button.setAttribute("disabled", "true");
        button.innerText = "Added to Favorites"; 
      });
      movieDiv.onclick = function() {
        // Replace with the desired action when a movie is clicked
        window.location.href = `movie.html?id=${movie.imdbID}&favFlag=${presenceCheck}`; // Example: Redirect to a detailed movie page
      };
    
      searchResults.appendChild(movieDiv);
    });
  }else{
    const movieDiv = document.createElement('div');
    movieDiv.innerHTML = `<h3> Nothing to show </h3>`
    searchResults.appendChild(movieDiv);
  }
}

// Function to add movie to favorites
function addToFavorites(id, title, poster) {
  const favoriteMovies = JSON.parse(localStorage.getItem('favorites')) || [];
  favoriteMovies.push({ id, title, poster });
  localStorage.setItem('favorites', JSON.stringify(favoriteMovies));
//   displayFavorites();
}

document.addEventListener('DOMContentLoaded', function () {
    displayFavorites();  // Call your function here
  });
// Function to display the list of favorite movies
function displayFavorites() {
    // Get favorite movies from localStorage
    const favoriteMovies = JSON.parse(localStorage.getItem('favorites')) || [];
    // Get the carousel container
    const carouselItems = document.getElementById('carouselItems');
    // console.log(favoriteMovies)
    // Clear previous items (if needed)
    carouselItems.innerHTML = '';
    if(favoriteMovies){
    // Loop through each movie in favorites
    favoriteMovies.forEach((movie, index) => {
      // Create a new div for each carousel item
      const carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item');
      
      // If it's the first movie, add 'active' class to make it the visible one
      if (index === 0) {
        carouselItem.classList.add('active');
      }
  
      // Add content (image, title, plot, etc.)
      carouselItem.innerHTML = `
        <img class="d-block w-100" src="${movie.poster}" alt="${movie.title}">
        <div class="carousel-caption d-none d-md-block">
          <h5>${movie.title}</h5>
          <button class="btn btn-danger" onclick="removeFromFavorites('${movie.id}')">Remove from Favorites</button>
        </div>
      `;
      
      // Append the carousel item to the carousel container
      carouselItems.appendChild(carouselItem);
      
    });
}else{

}
  }
  


// Function to remove movie from favorites
function removeFromFavorites(id) {
  let favoriteMovies = JSON.parse(localStorage.getItem('favorites')) || [];
  favoriteMovies = favoriteMovies.filter(movie => movie.id !== id);
  localStorage.setItem('favorites', JSON.stringify(favoriteMovies));
  displayFavorites();
}

// Initialize the favorites list on page load
// displayFavorites();
