const input = document.querySelector("input");
const output = document.querySelector("#output");

input.addEventListener("keypress", function(e) {
	const xhr = new XMLHttpRequest();
	if (e.charCode === 13) {
		const inputTxt = input.value;
		output.innerHTML = "";
		const url = `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=links&list=search&srlimit=5&srsearch=${inputTxt}`;

		xhr.open("GET", url, true);

		xhr.onload = function() {
			if (this.status === 200) {
				if (inputTxt === "" || inputTxt === " ") return;
				const data = JSON.parse(this.responseText);

				for (let obj in data.query.search) {
					output.innerHTML += `<div class="links"><a target="_blank" class="text-danger" href= "https://en.wikipedia.org/wiki/${data.query.search[
						obj
					].title.replace(" ", "%20")}">
                    <h3>${data.query.search[obj].title}</h3></a>
                    <p class="url-snippet">${
						data.query.search[obj].snippet
					}...</p></div>`;
				}
			}
		};
		xhr.onerror = function() {
			console.log("ERROR");
		};

		xhr.send();
		input.value = "";
	}
});
