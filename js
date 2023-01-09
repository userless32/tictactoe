let origBoard = Array.from(Array(9).keys());
const huPlayer = "X";
const aiPlayer = "O";
let pScore = 0;
let cScore = 0;
let stateIndication;
let squares;
let p;
let c;

function initGame() {	
	squares.forEach(div => div.addEventListener("click", (inp) => {
	boxClicked(inp);
}));
	
let newInp = document.querySelector(".buttonNext")
	newInp.addEventListener("click", () => {
	  newGame();
  });
}

function boxClicked(inp) {
	let draw = true;
	if (inp.target.classList == "") {
		inp.target.classList.add("checked");
			Array.from(squares).forEach((el, index) => {
				if (el.classList == "checked") origBoard[index] = huPlayer;
				if (el.classList == "circle") origBoard[index] = aiPlayer;
				if (el.classList.length == 0) origBoard[index] = index;
			})
			if (getAvailSpots(origBoard).length === 0) {
				finalStateIndicator("Draw");
				return newGame(draw);
			}
		
			const bestPlay = minimax(aiPlayer, origBoard);
			squares[bestPlay.index].classList.add("circle");
			checkWin(squares);
	}
}
function finalStateIndicator(state) {
	if (state == "Draw") {
		stateIndication.innerHTML = "DRAW!";
		stateIndication.style.color = "#f0ece2";
	}
	if (state == "Computer Win") {
		stateIndication.innerHTML = "COMPUTER WIN!";
		stateIndication.style.color = "#42b883"
	}
	squares.forEach(el => el.classList.add("yield"));
	stateIndication.style.visibility = "visible";
				
	setTimeout(function() {
		squares.forEach(el => el.classList.remove("yield"))
		stateIndication.style.visibility = "hidden";
	}, 1000)
	
}

function getAvailSpots(currentState) {
	return currentState.filter(s => s !== huPlayer && s !== aiPlayer);
}
function checkWin(currentState, player) {	
	if (player === undefined && //checking if player undefined so we dont intercept recursion.
			currentState[0].className == currentState[1].className && currentState[1].className == 				  currentState[2].className && currentState[0].className !== "" ||
			player === undefined &&
			currentState[3].className == currentState[4].className && currentState[4].className ==
			currentState[5].className && currentState[3].className !== "" ||
			player === undefined &&
			currentState[6].className == currentState[7].className && currentState[7].className ==
			currentState[8].className && currentState[6].className !== "" ||
			player === undefined &&
			currentState[0].className == currentState[3].className && currentState[3].className ==
			currentState[6].className && currentState[0].className !== "" ||
			player === undefined &&
			currentState[1].className == currentState[4].className && currentState[4].className ==
			currentState[7].className && currentState[1].className !== "" ||
			player === undefined &&
			currentState[2].className == currentState[5].className && currentState[5].className == 
			currentState[8].className && currentState[2].className !== "" ||
			player === undefined &&
			currentState[0].className == currentState[4].className && currentState[4].className ==
			currentState[8].className && currentState[0].className !== "" ||
			player === undefined &&
			currentState[2].className == currentState[4].className && currentState[4].className ==
			currentState[6].className && currentState[2].className !== ""
		 ) {
			finalStateIndicator("Computer Win")
			return cWin();
		} 
	
	if (currentState[0] == player && currentState[1] == player && currentState[2] == player ||
			currentState[3] == player && currentState[4] == player && currentState[5] == player ||
			currentState[6] == player && currentState[7] == player && currentState[8] == player ||
			currentState[0] == player && currentState[3] == player && currentState[6] == player ||
			currentState[1] == player && currentState[4] == player && currentState[7] == player ||
			currentState[2] == player && currentState[5] == player && currentState[8] == player ||
			currentState[0] == player && currentState[4] == player && currentState[8] == player ||
			currentState[2] == player && currentState[4] == player && currentState[6] == player
		) {
		return true;
	} else {
		return false;
	}
}
function minimax(player, currentState) {
	const availSpots = getAvailSpots(currentState)
	
	if (availSpots.length === 0) {
		return {score: 0};
	} else if (checkWin(currentState, aiPlayer)) {
		return {score: 1};
	} else if (checkWin(currentState, huPlayer)) {
		return {score: -1};
	}
	
	const allTestOutcomes = [];

	for (let i = 0; i < availSpots.length; i++) {
		const testOutcome = {
			index: null,
			score: null
		};
		testOutcome.index = currentState[availSpots[i]]
		currentState[availSpots[i]] = player;
		
		if (player === aiPlayer) {
			const result = minimax(huPlayer, currentState);
			testOutcome.score = result.score;
		} else {
			const result = minimax(aiPlayer, currentState);
			testOutcome.score = result.score;
		}
		currentState[availSpots[i]] = testOutcome.index;
		allTestOutcomes.push(testOutcome);
	}
	let bestOutcome;
	
	if (player === aiPlayer) {
		let bestScore = -Infinity;
		for (let i = 0; i < allTestOutcomes.length; i++) {
			if (allTestOutcomes[i].score > bestScore) {
				bestScore = allTestOutcomes[i].score;
				bestOutcome = i;
			}
		}
	} else {
		let bestScore = Infinity;
			for (let i = 0; i < allTestOutcomes.length; i++) {
				if (allTestOutcomes[i].score < bestScore) {
					bestScore = allTestOutcomes[i].score;
					bestOutcome = i;
				}
			}
		}
		return allTestOutcomes[bestOutcome];
	}

function newGame(wasDraw) {
	if (wasDraw !== true) {
		pScore = 0;
		cScore = 0;
		p.innerHTML = "0";
		c.innerHTML = "0";
	}
	squares.forEach(square => {
		square.classList.remove("checked");
		square.classList.remove("circle");
	})
	squares = document.querySelectorAll("#gameboard > div");
}
function cWin() {
	cScore++;
	c.innerHTML = `${cScore}`;
	squares.forEach(square => {
		square.classList.remove("checked");
		square.classList.remove("circle");
	});
}

window.addEventListener("load", function() {
	stateIndication = document.querySelector("#final-state-indicator")
	p = document.querySelector("#Player > .Score");
	c = document.querySelector("#Computer > .Score");
	squares = document.querySelectorAll("#gameboard > div");
	initGame();
});
