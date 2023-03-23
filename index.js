const mainSection = document.getElementById("main-section");
let moviesArray = [];
let watchlistArray =[];


document.getElementById("search-btn").addEventListener("click", () => {
  getMovies();
  mainSection.innerHTML = "";
  document.getElementById("search-movie").value = "";
  moviesArray = [];
});


document.addEventListener("click", (e) => {
  for (let i = 0; i < moviesArray.length; i++) {
    
    if (e.target.dataset.id === moviesArray[i].imdbID) {
        if (!watchlistArray.includes(moviesArray[i].imdbID)) {
            watchlistArray.push(moviesArray[i])
            localStorage.setItem("savedMovies", JSON.stringify(watchlistArray));
            document.getElementById(e.target.id).textContent = `Added to Watchlist`
        }
        
      }  
  }    
})


async function getMovies() {
    const movieTitle = document.getElementById("search-movie").value;
    const resourse = await fetch(`http://www.omdbapi.com/?s=${movieTitle}&?t=${movieTitle}&apikey=76fc9efe&`);
    const data = await resourse.json();
    const movies = data.Search;
    let html = "";
  
    if (movies) {
        movies.forEach(async (movie) => {
          const newResourse = await fetch(`http://www.omdbapi.com/?apikey=76fc9efe&i=${movie.imdbID}`);
          const movieData = await newResourse.json();
          const movieInfo = movieData;
        
          moviesArray.push({
                imdbID: movieInfo.imdbID,
                Poster: movieInfo.Poster,
                Title: movieInfo.Title,
                Value: movieInfo.Ratings[0].Value,
                Runtime: movieInfo.Runtime,
                Genre: movieInfo.Genre,
                Plot: movieInfo.Plot
          })
     
          html = `
            <div class="movie-box">
                <div class="cover-img">
                  <img src="${movieData.Poster}" class="poster"/>
                </div>
              <div class="movie-details">
                <div class="movie-header">
                  <h3 class="title">${movieData.Title}</h3>
                  <p><i class="fa-sharp fa-solid fa-star"></i><span>${movieData.Ratings[0].Value.slice(0,-3)}</span</p>
                </div>
               <div class="short-details">
                  <p>${movieData.Runtime}</p>
                  <p>${movieData.Genre}</p>
                  <button class="save-movie" data-id=${movieData.imdbID} id="${movieData.imdbID}"><i class="fa-solid fa-circle-plus"></i>Watchlist</button>
                </div>
                <div>
                  <p>${movieData.Plot}</p>
                </div>
              </div>
            </div>
        `
        mainSection.innerHTML += html;
        mainSection.style.overflow = "auto"
      });
    } else {
            mainSection.innerHTML = `<h3>Unable to find what you're looking for. Please try another search</h3>`
            mainSection.classList.add("not-found");
    }
  }


  







