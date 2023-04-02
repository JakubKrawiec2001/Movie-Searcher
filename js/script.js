const input = document.querySelector(".movie-title");
const movieBox = document.querySelector(".movie-box");
const searchBtn = document.querySelector(".search-btn");

let key = "a8667125";

const getMovie = () => {
	let movieName = input.value;
	let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

	if (movieName === "") {
		movieBox.innerHTML = `<p class="warning-msg">Please enter a movie name</p>`;
	} else {
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				if (data.Response == "True") {
					movieBox.innerHTML = `
                    <div class="movie-header">
					<img src=${data.Poster} alt="Movie poster" class="movie-poster">
					<div class="movie-header-text">
					<h2 class="movie-name">${data.Title}</h2>
					<p class="movie-rate"><img src="star.png" class="star">${
						data.Ratings[0].Value
					}</p>
					<div class="movie-details">
					<span>${data.Rated}</span> 
					<span>${data.Runtime}</span> 
					<span>${data.Year}</span> 
					</div>
					<p class="director"><span>Director:</span> ${data.Director}</p>
					<p class="box-office"><span>Box Office:</span> ${data.BoxOffice}</p>
					</div>
					</div>
					<span class="movie-type"><span>${data.Genre.split(",").join(
						"</span><span>"
					)}</span></span>
					<div class="movie-plot">
					<h3>Plot:</h3>
					<p>${data.Plot}</p>
					</div>
					<div class="movie-cast">
					<h3>Actors:</h3>
					<p>${data.Actors}</p>
					</div>`;
				} else {
					movieBox.innerHTML = `<p class="warning-msg">The movie doesn't exist</p>`;
				}
			})
			.catch((err) => console.error(err));
	}
};

searchBtn.addEventListener("click", getMovie);
input.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		getMovie();
	}
});
