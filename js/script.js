/**
 * Portfolio
 * Aidan Khan
 */

"use strict";

const opened = new Map();
let audio;

const initializers = {
	'games-popup': () => {
		document.getElementById('hg3r-btn').addEventListener('click', () => {
			makePopup('hg3r-popup');

		});
		document.getElementById('TOOSLOW-btn').addEventListener('click', () => {
			makePopup('TOOSLOW-popup');

		});
		document.getElementById('GAMBLE-btn').addEventListener('click', () => {
			makePopup('GAMBLE-popup');

		});
	}
}

const modelInitializers = {
	'3d-popup': () => {
		document.getElementById('Fafnir-btn').addEventListener('click', () => {
			makePopup('Fafnir-popup');
		});
	}
}

function makePopup(contentId) {
	if (opened.has(contentId)) {
		opened.get(contentId).remove();
		opened.delete(contentId);
		return;
	}

	const popup = document.createElement('div');
	popup.className = 'popup';
	popup.innerHTML = document.getElementById('popup-base').innerHTML;

	const template = document.getElementById(contentId)
	popup.style.background = template.dataset.background
	popup.querySelector('.content-cnt').innerHTML = template.innerHTML;

	document.body.append(popup);
	opened.set(contentId, popup);
	initializers[contentId]?.()
	modelInitializers[contentId]?.()

	popup.style.top = Math.floor(Math.random() * 400) + 100 + 'px';
	popup.style.left = Math.floor(Math.random() * 900) + 300 + 'px';

	registerResizer(popup, '.top-bar', e => {
		const offsets = popup.getBoundingClientRect();
		const barOffsets = popup.querySelector('.top-bar').getBoundingClientRect();
		if (e.movementX > 0 || offsets.left > 0) {
			popup.style.left = popup.style.left = (offsets.left + e.movementX) + 'px';
		}
		if ((e.movementY > 0 || offsets.top > 0) && barOffsets.y + barOffsets.height + e.movementY <= window.innerHeight) {
			popup.style.top = (offsets.top + e.movementY) + 'px';
		}
	});

	// Change to add listener to button
	popup.querySelector('.closeButton').addEventListener('click', () => {
		if (contentId == 'music-popup') {
			if (audio) audio.pause();
			audio = undefined;
		}
		opened.delete(contentId);
		popup.remove();
	});

	registerResizer(popup, '.nw-corner', e => {
		const movementY = e.movementY;
		const movementX = e.movementX;
		if (popup.clientHeight - e.movementY < 350) {
			movementY = popup.clientHeight - 350;
		}
		if (popup.clientWidth - e.movementX < 350) {
			movementX = popup.clientWidth - 350;
		}
		const offsets = popup.getBoundingClientRect();

		popup.style.left = (offsets.left + movementX) + 'px';
		popup.style.width = (popup.clientWidth - movementX) + 'px';

		popup.style.top = (offsets.top + movementY) + 'px';
		popup.style.height = (popup.clientHeight - movementY) + 'px';
	});

	registerResizer(popup, '.north-border', e => {
		const movementY = e.movementY;
		if (popup.clientHeight - e.movementY < 350) {
			movementY = popup.clientHeight - 350;
		}
		const offsets = popup.getBoundingClientRect();

		popup.style.top = (offsets.top + movementY) + 'px';
		popup.style.height = (popup.clientHeight - movementY) + 'px';
	});

	registerResizer(popup, '.ne-corner', e => {
		const movementY = e.movementY;
		const movementX = e.movementX;
		if (popup.clientHeight - e.movementY < 350) {
			movementY = popup.clientHeight - 350;
		}
		if (popup.clientWidth + e.movementX < 350) {
			movementX = popup.clientWidth + 350;
		}
		const offsets = popup.getBoundingClientRect();

		popup.style.width = (popup.clientWidth + movementX) + 'px';

		popup.style.top = (offsets.top + movementY) + 'px';
		popup.style.height = (popup.clientHeight - movementY) + 'px';
	});

	registerResizer(popup, '.west-border', e => {
		const movementX = e.movementX;
		if (popup.clientWidth - e.movementX < 350) {
			movementX = popup.clientWidth - 350;
		}
		const offsets = popup.getBoundingClientRect();

		popup.style.left = (offsets.left + movementX) + 'px';
		popup.style.width = (popup.clientWidth - movementX) + 'px';
	});

	registerResizer(popup, '.east-border', e => {
		const movementX = e.movementX;
		if (popup.clientWidth + e.movementX < 350) {
			movementX = popup.clientWidth + 350;
		}
		popup.style.width = (popup.clientWidth + e.movementX) + 'px';
	});

	registerResizer(popup, '.sw-corner', e => {
		const movementY = e.movementY;
		const movementX = e.movementX;
		if (popup.clientHeight + e.movementY < 350) {
			movementY = popup.clientHeight + 350;
		}
		if (popup.clientWidth - e.movementX < 350) {
			movementX = popup.clientWidth - 350;
		}
		const offsets = popup.getBoundingClientRect();

		popup.style.left = (offsets.left + movementX) + 'px';
		popup.style.width = (popup.clientWidth - movementX) + 'px';

		popup.style.height = (popup.clientHeight + movementY) + 'px';
	});

	registerResizer(popup, '.south-border', e => {
		const movementY = e.movementY;
		if (popup.clientHeight + e.movementY < 350) {
			movementY = popup.clientHeight + 350;
		}
		popup.style.height = (popup.clientHeight + movementY) + 'px';
	});

	registerResizer(popup, '.se-corner', e => {
		const movementY = e.movementY;
		const movementX = e.movementX;
		if (popup.clientHeight + e.movementY < 350) {
			movementY = popup.clientHeight + 350;
		}
		if (popup.clientWidth + e.movementX < 350) {
			movementX = popup.clientWidth + 350;
		}
		popup.style.width = (popup.clientWidth + movementX) + 'px';

		popup.style.height = (popup.clientHeight + movementY) + 'px';
	});
	if (contentId == '2d-popup') {
		const correctnessBtn = document.getElementById('correctness');
		const hylicsBtn = document.getElementById('hylics');
		const infestBtn = document.getElementById('infestation');
		const bdcBtn = document.getElementById('bdc');
		const illustDiv = document.getElementById('illustration-panel');

		function correctnessChange() {
			illustDiv.innerHTML = '<div style="display:flex; flex-direction: row; margin: 5px;align-items: center;"> <button id="back" class="back-btn"></button> <div class="illust-subtitle">CORRECTNESS</div> </div> <div style="display:flex; flex-direction: row; margin: 5px; max-width: 750px;"> <div class="illust-desc"><strong>Program: Clip Studio Paint<br> Created: October 2023</strong><br><br> This piece is inspired by a game named "The 25th Ward: The Silver Case", a game which includes themes of individuality and urban society. The idea behind "CORRECTNESS" is to create a type of stylized film poster to represent one of the three storylines in the game. <br><br>To create a dramatic and stylized look, I primarily used 3 colours. Black and white were used in tandem to create shapes and shadows with empty space, while the red was used to add more detail and energy.</div> <img class="img-rounder" src="assets/images/Correctness.jpg" height="500px" width="500px" alt="correctness"> </div>';
			const backBtn = document.getElementById('back');
			backBtn.addEventListener('click', illustBack);
		}
		function hylicsChange() {
			illustDiv.innerHTML = '<div style="display:flex; flex-direction: row; margin: 5px;align-items: center;"> <button id="back" class="back-btn"></button> <div class="illust-subtitle">Hylics</div> </div> <div style="display:flex; flex-direction: row; margin: 5px; max-width: 750px;"> <div class="illust-desc"><strong>Program: Clip Studio Paint <br> Created January 2023</strong><br><br>This piece is inspired by Hylics, a game made out of 3d scanned clay. I also looked towards gnostic philosophy when describing the themes of the game.<br><br>I wanted to capture the idea of the Demiurge, a craftsman/artisan who is the creator of the material world and creates it through music. In the background, you can see clouds of stardust begin to take shape, as the slow bass riff manipulates physical matter. </div> <img class="img-rounder" src="assets/images/Hylics.png" height="500px" width="500px" alt="Hylics"> </div>';
			const backBtn = document.getElementById('back');
			backBtn.addEventListener('click', illustBack);
		}
		function infestChange() {
			illustDiv.innerHTML = '<div style="display:flex; flex-direction: row; margin: 5px;align-items: center;"> <button id="back" class="back-btn"></button> <div class="illust-subtitle">Infestation</div> </div> <div style="display:flex; flex-direction: row; margin: 5px; max-width: 750px;"> <div class="illust-desc"><strong>Program: Clip Studio Paint<br> Created May 2023</strong><br><br> This piece, inspired by Lovecraft, was a sketch that quickly spiraled out of control. It depicts a mutated draconic creature"s head, with tendrils from some sort of cephalopod spilling out.<br><br> There"s a real horror to being eaten alive from the inside by another creature that I was trying to explore here, a process that has parallels in real-life ecosystems. It"s these real-life parallels that make bio-horror so intriguing to me.</div> <img class="img-rounder" src="assets/images/Infest.png" height="500px" width="500px" alt="Infestation"> </div>';
			const backBtn = document.getElementById('back');
			backBtn.addEventListener('click', illustBack);

		}
		function bdcChange() {
			illustDiv.innerHTML = '<div style="display:flex; flex-direction: row; margin: 5px;align-items: center;"> <button id="back" class="back-btn"></button> <div class="illust-subtitle">Boys Don"t Cry</div> </div> <div style="display:flex; flex-direction: row; margin: 5px; max-width: 750px;"> <div class="illust-desc"><strong>Program: Clip Studio Paint <br> Created March 2023</strong><br><br>This piece is a scene also from "The 25th Ward", from a chapter named "Boys Don"t Cry". In the game, this scene is when one of the main characters finally snaps.<br><br> I used extreme values of black and white to create a ghastly, silhouette-like image to emphasize the character"s humanity draining. The blood on jacket creates an incredibly strong contrast to highlight the weight of violence, and frames the character"s silhouette. </div> <img class="img-rounder" src="assets/images/BoysDontCry.jpg" height="500px" width="550px" alt="Hylics"> </div>';
			const backBtn = document.getElementById('back');
			backBtn.addEventListener('click', illustBack);
		}

		function illustBack() {
			illustDiv.innerHTML = '<div id="illustration-panel"> <div> <div class="illust-title">Illustrations </div> <div></div> </div> <div class="img-grid" style="padding: 5px;"> <div> <div class="frame-one"> <button id="correctness" class="drawing-one"> </button> </div> <div class="illust-text">Correctness</div> </div> <div> <div class="frame-two"> <button id="hylics" class="drawing-two"> </button> </div> <div class="illust-text">Hylics</div> </div> <div> <div class="frame-three"> <button id="infestation" class="drawing-three"> </button> </div> <div class="illust-text">Infestation</div> </div> <div> <div class="frame-four"> <button id="bdc" class="drawing-four"> </button> </div> <div class="illust-text">Boys Dont Cry </div> </div> <div> <div class="frame-tbd"> <button id="tbd" class="drawing-tbd"> ?</button> </div> <div class="illust-text">Coming Soon</div> </div> <div> <div class="frame-tbd"> <button id="tbd" class="drawing-tbd"> ?</button> </div> <div class="illust-text">Coming Soon</div> </div> </div> </div>'
			const correctnessBtn2 = document.getElementById('correctness');
			const hylicsBtn2 = document.getElementById('hylics');
			const infestBtn2 = document.getElementById('infestation');
			const bdcBtn2 = document.getElementById('bdc');
			correctnessBtn2.addEventListener('click', correctnessChange);
			hylicsBtn2.addEventListener('click', hylicsChange);
			infestBtn2.addEventListener('click', infestChange);
			bdcBtn2.addEventListener('click', bdcChange);
		}

		correctnessBtn.addEventListener('click', correctnessChange);
		hylicsBtn.addEventListener('click', hylicsChange);
		infestBtn.addEventListener('click', infestChange);
		bdcBtn.addEventListener('click', bdcChange);
	}

	if (contentId == 'hg3r-popup') {
		const hgButton = document.getElementById('hg-desc');
		const hgDiv = document.getElementById('hg');
		function changeContent() {
			hgDiv.innerHTML = ' <iframe height=624 width=816 class="showcase" src = https://pub-82f17d419ef34043973f014068861a94.r2.dev/index.html></iframe>';
		}
		hgButton.addEventListener('click', changeContent);
	}

	if (contentId == 'TOOSLOW-popup') {
		const tooslowButton = document.getElementById('tooslow-desc');
		const tooslowDiv = document.getElementById('tooslow');
		function changeContent() {
			tooslowDiv.innerHTML = ' <iframe height=700 width=1024 style="float:middle" src = https://aidankhan51.github.io/CreativeComputation/Art-jam/Art-Jam-project></iframe>';
		}
		tooslowButton.addEventListener('click', changeContent);
	}

	if (contentId == 'GAMBLE-popup') {
		const gambleButton = document.getElementById('gamble-desc');
		const gambleDiv = document.getElementById('gamble');
		function changeContent() {
			gambleDiv.innerHTML = '  <iframe height=800 width=640 style="float:middle" src = https://aidankhan51.github.io/CreativeComputation/GambleGambleGamble></iframe>';
		}
		gambleButton.addEventListener('click', changeContent);
	}

	const timeline = document.querySelector('.timeline');
	if (contentId == 'music-popup') {
		const changeText = document.querySelector("#change-text");

		const coverToggle = document.querySelector('.icon-container'),
			flagDay = `<img id="disc" src="assets/images/FDdisc.png" class="audio-icon">`,
			catwalk = `<img id="disc" src="assets/images/POTRdisc.png" class="audio-icon">`,
			crusade = `<img id="disc" src="assets/images/HGDisc.png" class="audio-icon">`;

		document.getElementById('flagday-btn').addEventListener('click', () => {
			coverToggle.innerHTML = flagDay;
			if (audio) audio.pause();
			audio = new Audio('assets/sounds/Flag Day.mp3');
			toggleAudio();
			audio.onended = audioEnded;
			audio.ontimeupdate = changeTimelinePosition;
			changeText.textContent = "Flag Day is a song originally written in 1986 by British indie pop band The Housemartins. This song is a particular favourite of mine from my childhood. It remains a niche single, making resources to create this cover with extremely scarce. Besides a four-note chord progression, everything I transposed had to be done completely by ear. Special thanks to Bridgit O'Leary for performing the vocal melody. This project wouldn't be the same without it."
		});

		document.getElementById('catwalk-btn').addEventListener('click', () => {
			coverToggle.innerHTML = catwalk;
			if (audio) audio.pause();
			audio = new Audio('assets/sounds/Catwalk.mp3');
			toggleAudio();
			audio.onended = audioEnded;
			audio.ontimeupdate = changeTimelinePosition;
			changeText.textContent = "This is a song I created for a mobile game named 'Plushies on the run'. It's a short jingle played at the gacha machine where you exchange in-game currency for new characters. I created it with that theme in mind, using instruments that emulate a Casino feeling.";
		});

		document.getElementById('hg-btn').addEventListener('click', () => {
			coverToggle.innerHTML = crusade;
			if (audio) audio.pause();
			audio = new Audio('assets/sounds/Crusade.mp3');
			toggleAudio();
			audio.onended = audioEnded;
			audio.ontimeupdate = changeTimelinePosition;
			changeText.textContent = "'Crusade' is a track I created in early 2022 for a game I was working on. Despite my lack of experience in music at the time, I still think it had some excellent ideas. For context, the song worked as a battle theme for the earlier section of my game, which is a winter forest.";
		});



		const playerButton = document.querySelector('.player-button'),
			playIcon = `<img style="height: 25px; width: 25px;" src="assets/images/jerma.png">`,
			pauseIcon = `<img style="height: 25px; width: 25px;" src="assets/images/Hylics.png">`;

		function toggleAudio() {
			if (audio.paused) {
				audio.play();
				rotateDisc();

				playerButton.innerHTML = pauseIcon;
			} else {
				audio.pause();
				stopDisc();
				playerButton.innerHTML = playIcon;
			}
		}

		playerButton.addEventListener('click', toggleAudio);

		function audioEnded() {
			playerButton.innerHTML = playIcon;
		}


		function rotateDisc() {
			document.getElementById("disc").classList.add("icon-rotate")
		};

		function stopDisc() {
			document.getElementById("disc").classList.remove("icon-rotate")
		};

		function changeTimelinePosition() {
			const percentagePosition = (100 * audio.currentTime) / audio.duration;
			timeline.style.backgroundSize = `${percentagePosition}% 100%`;
			timeline.value = percentagePosition;
		}
	}

	function changeSeek() {
		const time = (timeline.value * audio.duration) / 100;
		audio.currentTime = time;
	}

	timeline.addEventListener('change', changeSeek);

	const soundButton = document.querySelector('.sound-button'),
		soundIcon = `
						<img style="height: 25px; width: 25px;" src="assets/images/jerma.png">`,
		muteIcon = `
							<img style="height: 25px; width: 25px;" src="assets/images/Hylics.png">`;

	function toggleSound() {
		audio.muted = !audio.muted;
		soundButton.innerHTML = audio.muted ? muteIcon : soundIcon;
	}

	soundButton.addEventListener('click', toggleSound);
}

// Popup commands from homepage
document.addEventListener('DOMContentLoaded', () => {

	document.getElementById('user-btn').addEventListener('click', () => {
		makePopup('user-popup');
	});

	document.getElementById('twodee-btn').addEventListener('click', () => {
		makePopup('2d-popup');
	});

	document.getElementById('threedee-btn').addEventListener('click', () => {
		makePopup('3d-popup');
	});

	document.getElementById('music-btn').addEventListener('click', () => {
		makePopup('music-popup');
	});

	document.getElementById('games-btn').addEventListener('click', () => {
		makePopup('games-popup');
	});

	document.getElementById('bestOf-btn').addEventListener('click', () => {
		makePopup('bestOf-popup');
	});

});

function registerResizer(parent, selector, func) {
	const el = parent.querySelector(selector);

	el.addEventListener('mousedown', e => {
		const mouseUp = () => {
			window.removeEventListener('mousemove', func);
			window.removeEventListener('mouseup', mouseUp);
			document.body.style.userSelect = '';
		};

		window.addEventListener('mousemove', func);
		window.addEventListener('mouseup', mouseUp);
		document.body.style.userSelect = 'none';
	});
}

