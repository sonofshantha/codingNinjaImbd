const apiKey = '53f11466'; // Replace with your OMDb API key
// Get the movie ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const favFlag = urlParams.get('favFlag');
console.log(favFlag);
// Fetch movie details from the API
fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    console.log(data)
      if(data.Year){
        console.log('entered')
        document.getElementById('movie-title').textContent = data.Title;
        document.getElementById('movie-poster').src = data.Poster;
        document.getElementById('movie-plot').textContent = data.Plot;
        document.getElementById('movie-year').textContent = `Year: ${data.Year}`;
        document.getElementById("movie-details").querySelector("button").disabled=favFlag==="true"?true:false;
         if(favFlag === "true"){
            document.getElementById("movie-details").querySelector("button").innerHTML = "Added to Favorites"
         }
      }else{
     document.getElementById("movie-details").innerHTML=`<h4>No Movies found <h4>`;
      }
    
  });

// Function to add the movie to favorites from the movie details page
function addToFavoritesFromDetails() {
  const title = document.getElementById('movie-title').textContent;
  const poster = document.getElementById('movie-poster').src;
  const favoriteMovies = JSON.parse(localStorage.getItem('favorites')) || [];
  favoriteMovies.push({ id: movieId, title, poster });
  localStorage.setItem('favorites', JSON.stringify(favoriteMovies));
 document.getElementById("movie-details").querySelector("button").disabled=true
 document.getElementById("movie-details").querySelector("button").innerHTML="Added to Favorites"
}
