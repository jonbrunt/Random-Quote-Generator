let body = document.querySelector('body');
let quote = '', author = '';

init(); 
//function that initializes program on page load
function init() {
	fadeIn(body, 2500); //fades in body with 2500 ms timing
	receive(); //calls receive function to fetch data from API
	randomize(); //calls randomize function to make html and css changes to page
	//on click, generates a new random quote and assigns a new page color
	let quoteButton = document.querySelector('#quoteButton').addEventListener('click', function() {
		receive();
		randomize();
	});
	//adds click event listener to twitter button
	let twitterButton = document.querySelector('#twitterButton').addEventListener('click', function() {
		//concatenates specific URL for current quote based on quote and author
		this.setAttribute('href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + quote + '" -' + author));
	});
}
//function passing arguments of targeted element and time in milliseconds for fade in
function fadeIn(element, time) {
	let milli = new Date().getTime();
	//function that brings opacity from 0 - 1 based on time argument
	let animate = function() {
		element.style.opacity = +element.style.opacity + (new Date() - milli) / time;
		milli = new Date().getTime();
		if (+element.style.opacity < 1) {
		  (window.requestAnimationFrame && requestAnimationFrame(animate)) || setTimeout(animate, 10);
		}
	};
	//calls function for fade in animation
	animate();
}
//function that accepts new quotw and author as arguments and changes page HTML to reflect this information
function replace(quote, author) {
	document.querySelector('#quote').innerText = '"' + quote + '"';
	document.querySelector('#author').innerText = ' -' + author;
}
//function that fetches information from ralaikis random quote API
function receive() {
	const url = 'https://talaikis.com/api/quotes/random/';
	fetch(url)
	.then(res => res.json()) 
	.then(function(data) {
		//assigns values based on return from API
		quote = data.quote;
		author = data.author;
		replace(quote, author); //calls function to update quote and author information on page
	})
	.catch(function(error) {
		alert('An error ocurred while trying to load a quote. Please try again.');
	})
}

function randomize() {
	//hexadecimal color codes for random page color assignment
	const colors = ['#8c0808', '#ed800b', '#2c700a', '#0a7058', '#0a1970', '#690a70', '#700a3d', '#2d2c2d', '#f46242', '#ea7286'];
	//generates random number from 0 to highest index of color array
	let random = Math.floor(Math.random() * colors.length);
	// changes body background, heading, and button background color
	let h1 = document.querySelector('h1').style.color = colors[random];
	let h3 = document.querySelector('h3').style.color = colors[random];
	let button = document.querySelectorAll('.button');
	body.style.backgroundColor = colors[random];
	button[0].style.backgroundColor = colors[random];
	button[1].style.backgroundColor = colors[random];
}