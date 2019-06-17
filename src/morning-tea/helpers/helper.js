const mockData = [
  {
	category: "Science & Nature",
	type: "multiple",
	difficulty: "medium",
	question: "Which of these stars is the largest?",
	correct_answer: "UY Scuti",
	incorrect_answers: ["VY Canis Majoris", "Betelgeuse", "RW Cephei"]
  },
  {
	category: "Entertainment: Video Games",
	type: "multiple",
	difficulty: "medium",
	question: "In what engine was Titanfall made in?",
	correct_answer: "Source Engine",
	incorrect_answers: ["Frostbite 3", "Unreal Engine", "Cryengine"]
  },
  {
	category: "Science: Computers",
	type: "multiple",
	difficulty: "medium",
	question:
	  "Which of these is the name for the failed key escrow device introduced by the National Security Agency in 1993?",
	correct_answer: "Clipper Chip",
	incorrect_answers: ["Enigma Machine", "Skipjack", "Nautilus"]
  },
  {
	category: "Entertainment: Japanese Anime & Manga",
	type: "multiple",
	difficulty: "medium",
	question:
	  "In JoJo&#039;s Bizarre Adventure, winch character is able to accelerate time?",
	correct_answer: "Enrico Pucci",
	incorrect_answers: ["Jotaro Kujo", "Jolyne Cujoh", "Kujo Jotaro"]
  },
  {
	category: "Entertainment: Film",
	type: "multiple",
	difficulty: "medium",
	question: "Which one of these films are shot entirely in one-take?",
	correct_answer: "Russian Ark",
	incorrect_answers: ["Good Will Hunting", "Birdman", "Schindler&#039;s List"]
  },
  {
	category: "Entertainment: Video Games",
	type: "multiple",
	difficulty: "easy",
	question: "Who is the main protagonist of Dead Space?",
	correct_answer: "Isaac Clarke",
	incorrect_answers: ["Commander Shepard", "Gordon Freeman", "Master Chief"]
  },
  {
	category: "Geography",
	type: "multiple",
	difficulty: "easy",
	question: "What is the capital of the US State of New York?",
	correct_answer: "Albany",
	incorrect_answers: ["Buffalo", "New York", "Rochester"]
  },
  {
	category: "Entertainment: Music",
	type: "multiple",
	difficulty: "easy",
	question:
	  "&quot;The Singing Cowboy&quot; Gene Autry is credited with the first recording for all but which classic Christmas jingle?",
	correct_answer: "White Christmas",
	incorrect_answers: [
	  "Frosty the Snowman",
	  "Rudolph the Red-Nosed Reindeer",
	  "Here Comes Santa Claus"
	]
  },
  {
	category: "Entertainment: Video Games",
	type: "multiple",
	difficulty: "medium",
	question:
	  "What is not a playable race in &quot;Final Fantasy XIV: A Realm Reborn&quot;?",
	correct_answer: "Hume",
	incorrect_answers: ["Miqo&#039;te", "Lalafell", "Roegadyn"]
  },
  {
	category: "History",
	type: "multiple",
	difficulty: "hard",
	question:
	  "Before the American colonies switched to the Gregorian calendar in 1752, on what date did their new year start?",
	correct_answer: "March 25th",
	incorrect_answers: ["June 1st", "September 25th", "December 1st"]
  }
];

function decodeEntities(obj) {
	const entities = [
		["quot", '"'],
		["#039", "'"],
		["lt", "<"],
		["gt", ">"],
		["amp", "&"],
		["eacute", "é"]
	];

	for(let prop in obj) {
		for (let i = 0; i < entities.length; i++) {
			if(typeof(obj[prop]) != "object") {				
				obj[prop] = obj[prop].replace(
					new RegExp("&" + entities[i][0] + ";", "g"),
					entities[i][1]
				);
			} else {
				obj[prop] = obj[prop].map(string => 
					string.replace(
						new RegExp("&" + entities[i][0] + ";", "g"),
						entities[i][1]
					)
				);
			}
		}
	}
  return obj;
}

function cleanUpData(arr) {
	return arr.map(obj => 
		decodeEntities(obj)	
	)
}

function updateData(arr) {
	const newArr = [...arr];
	newArr.forEach(obj => {
		obj.options = [...obj.incorrect_answers];
		obj.options.push(obj.correct_answer);
	})
	return newArr;
}

function parseData(arr) {
	const cleanUp = cleanUpData(arr);
	const update = updateData(cleanUp);
	return update;
}

function random() {
    return Math.floor(Math.random() * 4)
}

export { decodeEntities, mockData, parseData, random };
