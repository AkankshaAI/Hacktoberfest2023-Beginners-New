// declaration part
let btn = document.querySelector(".dictionary_container .search button");
let word_container = document.querySelector(".word_text");
let pronoun_container = document.querySelector(".pronoun");
let history_container = document.querySelector(".history");
let result = document.querySelector(".result");
let details = document.querySelector(".details");
let SoundBtn = document.querySelector(".word i");

let options = {
	method: "GET",
};
let input = document.querySelector(".text");

// the main function part :

function return_word(word) {
	fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, options)
		.then((data) => data.json())
		.then((accepted) => {
			// regexp to check if the input content is a verb or not
			let regExpr = /\bto\s\w+/gi;

			// check if the word exist or not
			if (accepted.title) {
				// return an error message
				result.innerHTML = `
				<div class="word">
					<div class="word_text"> Word Not Found</div>				
				</div>`;
			} else {
				// table that contain the indexes of not verb words
				let indexes = [];
				let j = 0;
				while (j < accepted[0].meanings.length) {
					// push the index
					indexes.push(j);
					j++;
				}
				// choose the right table (of word index or not)
				table = indexes;
				// the main loop variable
				let i = 0;
				let lastContent;

				while (i < table.length) {
					if (i === 0) {
						// get the sound
						let sounds = accepted[0].phonetics;
						let audioLink = sounds.map((ele) => {
							return ele.audio;
						});

						// the word and the pronounciation
						let firstResultContext = `<div class="word">
					<div class="word_text">${accepted[0].word}</div>
					<i class="uil uil-volume"></i>
					<audio src="${audioLink[0]}" class="sound" ></audio>
					
					
				</div>
				`;
						// the explanation
						lastContent = `
					<div class="small">
						<div class="type">${accepted[0].meanings[table[i]].partOfSpeech}</div>
						<div class="pronoun">${accepted[0].phonetic}</div>
					</div>
					<div class="history">${accepted[0].meanings[table[i]].definitions[i].definition}</div>
				`;
						result.innerHTML = firstResultContext;
					} else {
						lastContent += `<div class="small">
						<div class="type">${accepted[0].meanings[table[i]].partOfSpeech}</div>
						<div class="pronoun">${accepted[0].phonetic}</div>
					</div>
					<div class="history">${accepted[0].meanings[table[i]].definitions[0].definition}</div>
				`;
					}
					i++;
				}
				result.innerHTML += `<div class="details">
					${lastContent}
				</div>`;
				// get the sound back
			}
		});
	// get the sound
	sound = document.querySelector("audio");
}

btn.addEventListener("click", () => {
	return_word(input.value);
});

result.addEventListener("click", function (event) {
	if (event.target.classList.contains("uil-volume")) {
		let sound = document.querySelector("audio");
		sound.play();
	}
});
