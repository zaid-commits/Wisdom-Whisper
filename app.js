let currentAdvice = "";
let currentAuthor = "";
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function getAdvice() {
	const randomno = Math.floor(Math.random() * 15);

	fetch("https://type.fit/api/quotes")
		.then((response) => response.json())
		.then((data) => {
			currentAdvice = data[randomno].text;

			currentAuthor = data[randomno].author.replace(", type.fit", "");

			document.getElementById("advice-text").textContent = currentAdvice;
			document.getElementById(
				"advice-author",
			).textContent = `- ${currentAuthor}`;
		})
		.catch((error) => console.error("Error:", error));
}

function favoriteAdvice() {
	if (currentAdvice && !favorites.includes(currentAdvice)) {
		favorites.push(currentAdvice);
		localStorage.setItem("favorites", JSON.stringify(favorites));
		alert("Advice added to favorites!");
	}
}

function copyAdvice() {
	if (currentAdvice) {
		navigator.clipboard
			.writeText(`${currentAdvice} - ${currentAuthor}`)
			.then(() => {
				alert("Advice copied to clipboard!");
			})
			.catch((error) => console.error("Error copying text:", error));
	}
}

function shareAdvice() {
	if (currentAdvice) {
		const shareText = `${currentAdvice} - ${currentAuthor}`;
		if (navigator.share) {
			navigator
				.share({
					title: "Wisdom Whisper",
					text: shareText,
					url: window.location.href,
				})
				.catch((error) => console.error("Error sharing:", error));
		} else {
			alert("Share API not supported in this browser.");
		}
	}
}

function filterAdvice(category) {
	fetch(`https://api.quotable.io/quotes?tags=${category}`)
		.then((response) => response.json())
		.then((data) => {
			const randomIndex = Math.floor(Math.random() * data.results.length);
			currentAdvice = data.results[randomIndex].content;
			currentAuthor = data.results[randomIndex].author;
			document.getElementById("advice-text").textContent = currentAdvice;
			document.getElementById(
				"advice-author",
			).textContent = `- ${currentAuthor}`;
		})
		.catch((error) => console.error("Error:", error));
}

document.addEventListener("DOMContentLoaded", () => {
	const mobileMenuButton = document.getElementById("mobile-menu-button");
	const menu = document.getElementById("menu");

	mobileMenuButton.addEventListener("click", () => {
		menu.classList.toggle("hidden");
	});

	const currentTheme = localStorage.getItem("theme");
	if (currentTheme === "dark") {
		document.documentElement.classList.add("dark");
	}
});
