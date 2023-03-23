const savedMovies = document.getElementById("saved-movies");
let moviesFromLocalStorage = JSON.parse(localStorage.getItem("savedMovies"));
let watchlistArray = [];
getLocalStorage()


function getLocalStorage() {
  watchlistArray = moviesFromLocalStorage
  
    if (watchlistArray.length === 0) {
        savedMovies.innerHTML = `
        <div class="on-load">
            <p>Your Watchlist is looking a little empty...</p>
            <button id="add-movies">
              <i class="fa-solid fa-circle-plus"><a href="./index.html">Let's add some movies!</a></i>
            </button>
        </div>`
            
    } else {
            renderLocalStorage(watchlistArray)
    }
}


function renderLocalStorage(watchlist) {
    let movieList = ""
    
    for (let i = 0; i < watchlist.length; i++) {
  
            movieList += `
            <div class="movie-box">
              <div class="cover-img">
                <img src="${watchlist[i].Poster}" class="poster"/>
              </div>
              <div class="movie-details">
                <div class="movie-header">
                  <h3 class="title">${watchlist[i].Title}</h3>
                  <p><i class="fa-sharp fa-solid fa-star"></i><span>${watchlist[i].Value.slice(0,-3)}</span</p>
              </div>
              <div class="short-details">
                <p>${watchlist[i].Runtime}</p>
                <p>${watchlist[i].Genre}</p>
                <button class="remove" id="${watchlist[i].imdbID}"><i class="fa-solid fa-circle-plus"></i>Remove</button>
              </div>
              <div class="plot">
                <p>${watchlist[i].Plot}</p>
              </div>
            </div>
          </div>
            `
        }
          savedMovies.innerHTML = movieList;
          savedMovies.style.overflow = "auto"
     }
     

  
    document.addEventListener("click", function(e) {
      
      const movieId = e.target.id
      console.log(movieId)
      const removedMovie = watchlistArray.filter(function (movie) {
        return movie.id === movieId;
      })[0];
      let index = watchlistArray.indexOf(removedMovie);
      watchlistArray.splice(index, 1);
      localStorage.setItem("savedMovies", JSON.stringify(watchlistArray));
      getLocalStorage(watchlistArray);
     
      
      
    }) 
      
    
  
    

    
   
  
