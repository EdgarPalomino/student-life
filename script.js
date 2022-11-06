// Loading all of the audios for the soundpiece to avoid delays while playing them

var bedroomAudio = new Audio("Bedroom Audio.mp3");
var bathroomAudio = new Audio("Bathroom Audio.mp3");
var classroomAudio = new Audio("Classroom Audio.mp3");
var diningHallAudio = new Audio("Dining Hall Audio.mp3");
var libraryCafeAudio = new Audio("Library Cafe Audio.mp3");
var footballFieldAudio = new Audio("Football Field Audio.mp3");
var snackRoomAudio = new Audio("Snack Room Audio.mp3");
var bedtimeAudio = new Audio("Bedtime Audio.mp3");

// -------------------------------------------------- \\

// Adding event listeners to all of the audios to make all of the drawings show their clickable part after the audios are over
// Also adding event listeners to the clickable part of all of the drawings to make the page fade-out after clicking them

var soundpiece = document.getElementById("soundpiece");

var numberOfAudios = 8;
var data = [["bedroom", bedroomAudio, "Click your alarm clock to get ready!"],
			["bathroom", bathroomAudio, "Click your phone to go to class!"],
			["classroom", classroomAudio, "Click the professor to go for lunch!"],
			["dining-hall", diningHallAudio, "Click your food to go to library cafe!"],
			["library-cafe", libraryCafeAudio, "Click your laptop to go play football!"],
			["football-field", footballFieldAudio, "Click the football to go grab a snack!"],
			["snack-room", snackRoomAudio, "Click the TV to go back to your room!"],
			["bedtime", bedtimeAudio, "Click your alarm clock to sleep"]];

var playingAudio = bedroomAudio;
var messageText = document.getElementById("message");

for (let i=0; i<numberOfAudios-1; i++) {

	let currentDrawing = document.getElementById(data[i][0] + "-drawing");
	let newDrawing = document.getElementById(data[i+1][0] + "-drawing");
	let currentUncolored = document.getElementById(data[i][0] + "-uncolored");
	let currentClick = document.getElementById(data[i][0] + "-click");

	let currentEmoji = document.getElementById(data[i][0] + "-emoji");
	let newEmoji = document.getElementById(data[i+1][0] + "-emoji");
	let currentAudio = data[i][1];
	let newMessage = data[i][2];

	currentAudio.addEventListener("ended", function () {
		currentUncolored.setAttribute("class", "drawing-fade-out");
		fadeOutMessage();
		setTimeout(function () { messageText.innerHTML = newMessage; fadeInMessage(); }, 1.4*1000);
	});

	currentClick.addEventListener("click", function () {
		fadeOutSoundpiece();
		setTimeout(function () { 
			hideDrawingAndEmoji(currentDrawing, currentEmoji); 
			showDrawingAndEmoji(newDrawing, newEmoji);
			messageText.innerHTML = (i < numberOfAudios - 2) ? "Press play to continue your day!" : "Press play to finish your day"; 
			playingAudio = data[i+1][1];
			fadeInSoundpiece();
		}, 2.8*1000);
	});

}

function hideDrawingAndEmoji(currentDrawing, currentEmoji) { currentDrawing.style.visibility = "hidden"; currentEmoji.style.visibility = "hidden"; }
function showDrawingAndEmoji(newDrawing, newEmoji) { newDrawing.style.visibility = "visible"; newEmoji.style.visibility = "visible"; }
function fadeOutMessage() { messageText.className = messageText.className.replace("message-fade-in", "message-fade-out"); }
function fadeInMessage(newMessage) { messageText.className = messageText.className.replace("message-fade-out", "message-fade-in"); }
function fadeOutSoundpiece() { soundpiece.className = soundpiece.className.replace("page-fade-in", "page-fade-out"); }
function fadeInSoundpiece() { soundpiece.className = soundpiece.className.replace("page-fade-out", "page-fade-in"); }

// Note: These functions makes the emojis make the emojis hidden and visible and make the messages and page fade in and fade out

// -------------------------------------------------- \\

// Adding an event listeners to the last audio to make the last drawing show its clickable part after the audio is over
// Also adding an event listener to the clickable part of the last drawing to make the page fade-out after clicking it

var lastUncolored = document.getElementById("bedtime-uncolored");
var lastClick = document.getElementById("bedtime-click");

var lastAudio = data[7][1];

lastAudio.addEventListener("ended", function () {
	lastUncolored.setAttribute("class", "drawing-fade-out");
	fadeOutMessage();
	setTimeout(function () { messageText.innerHTML = messages[7]; fadeInMessage(); }, 1.4*1000);
});

lastClick.addEventListener("click", function () {
	fadeOutSoundpiece();
	setTimeout(function () { window.location.reload(); }, 2.8*1000);
});

// Note: The web page is reloaded after its last clickable part is clicked

// -------------------------------------------------- \\

// Functions that play, pause and replay the current playing audio

function playAudio() { playingAudio.play(); }
function pauseAudio() { playingAudio.pause(); }
function replayAudio() { playingAudio.currentTime = 0; }