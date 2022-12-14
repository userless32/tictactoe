function initGame() {
	let player = document.querySelector("#Player > .Score");
	let computer = document.querySelector("#Computer > .Score");
	let pScore = 0;
	let cScore = 0;
	
	let currentPlayer = "P";
	let gamesquares = document.querySelectorAll("#gameboard > div");
	gamesquares.forEach(div => div.addEventListener("click", boxClicked));

	const board = [
		Array.from(gamesquares).slice(0, 3),
		Array.from(gamesquares).slice(3, 6),
		Array.from(gamesquares).slice(6, 9)
	];
	
	function boxClicked(inp) {
		if (currentPlayer == "P" && ! inp.target.classList.contains("circle")) {
			currentPlayer = "C";
			inp.target.classList.add("checked");
		} else if (currentPlayer = "C" && ! inp.target.classList.contains("checked")) {
			currentPlayer = "P";
			inp.target.classList.add("circle");
		}
		
		for (let i = 0; i < 3; i++) {
			if (board[i][0].className == board[i][1].className && board[i][1].className == board[i][2].className && board[i][0].className !== "") {
				(board[i][0].className == "checked") ? pWin() : cWin();
			}
				if (board[0][i].className == board[1][i].className && board[1][i].className == board[2][i].className && board[0][i].className !== "") {
					 (board[0][i].className == "checked") ? pWin() : cWin();
				}
				if (board[0][0].className == board[1][1].className && board[1][1].className == board[2][2].className && board[0][0].className !== "") {
					(board[0][0].className == "checked") ? pWin() : cWin();
				} else if (board[0][2].className == board[1][1].className && board[1][1].className == board[2][0].className && board[0][2].className !== "") {
					(board[0][2].className == "checked") ? pWin() : cWin();
				}
		}
		if (Array.from(gamesquares).every((element) => element.classList.length > 0)) 
			gamesquares.forEach(square => square.classList = "");
		
		function pWin() {
			pScore++;
			player.innerHTML = `${pScore}`;
			gamesquares.forEach(square => square.classList = "");
		}
		function cWin() {
			cScore++;
			computer.innerHTML = `${cScore}`;
			gamesquares.forEach(square => square.classList = "");
		}
		function newGame() {
			pScore = 0;
			cScore = 0;
			player.innerHTML = "0";
			computer.innerHTML = "0";
			gamesquares.forEach(square => square.classList = "");
		}
		let newInp = document.querySelector(".buttonNext")
		newInp.addEventListener("click", newGame);
	}
}

window.addEventListener("load", initGame);
