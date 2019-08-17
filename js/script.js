var th = document.querySelectorAll("th");//To Select Tic Tac Grid
var p1x = document.querySelector("#p1x");//To Select Player 1 Choice
var p10 = document.querySelector("#p10");//To Select Player 2 Choice
var p1 = document.querySelector("#p1");//Player 1 Name
var p2 = document.querySelector("#p2");//Player 2 Name
var win = document.querySelector(".winner");//Display of Winner Block
var res = document.querySelector("#result");//Display of Winner
var reset = document.querySelector("#reset");//To select Reset Button
var newgame = document.querySelector("#newgame");//To select New game
var p1nd = document.querySelector("#pl1name");//display of player 1 name in score display
var p2nd = document.querySelector("#pl2name");//display of player 2 name in score display
var p1sd = document.querySelector("#p1sc");//display of player 1 score in score display
var p2sd = document.querySelector("#p2sc");//display of player 2 score in score display
var scr = document.querySelector(".scrdisp");//Display of score block
var t = [ "13","43","433","34","343","43","343","4343","443" ];
var x = 1;//to assign X or 0 to player 1
var p1scr = 0;
var p2scr = 0;
var p1name;//To Store Player 1 name
var p2name;//To Store Player 2 name
var check;

//Function to hide display block after player 1 enters his choice
function disableinput(){
	document.querySelector(".playerinfo").style.display = "none";
};

//To get player names from input
function playername(){
	p1name = p1.value;
	p2name = p2.value;
	if(p1name === ""){
		p1name = "PLAYER 1";
	}
	if(p2name === ""){
		p2name = "PLAYER 2";
	}
};

//To change variables after reset button is clicked
function resetcall(){
	t = [ "13","43","433","34","343","43","343","4343","443" ];
	if(check == 1){
		x = 1; 
	} else {
		x = 0;
	}
	for(var i = 0; i < 9; i++)
	{
		th[i].innerHTML = "";
	}
	win.style.display = "none";
};

//To update values of score display
function scoredisplay(){
	scr.style.display = "block";
	p1nd.innerHTML=p1name + " SCORE :";
	p2nd.innerHTML=p2name + " SCORE :";
	p1sd.innerHTML=p1scr;
	p2sd.innerHTML=p2scr;
}

//event listener for reset button button
reset.addEventListener("click", function(){
	resetcall();
	gamerun();
});

//event listener for new game button
newgame.addEventListener("click", function(){
	t = [ "13","43","433","34","343","43","343","4343","443" ];
	for(var i = 0; i < 9; i++)
	{
		th[i].innerHTML = "";
	}
	win.style.display = "none";
	document.querySelector(".playerinfo").style.display = "block";
	scr.style.display = "none";
	p1scr = 0;
	x = 1;
	p2scr = 0;
	p1name="";
	p2name="";
	p1.value = null;
	p2.value = null;
	defaultcall();
});

//always called at starting
defaultcall();

//To run game after user selection
function defaultcall(){
	p1x.addEventListener("click", function(){
		x = 1;
		check = 1;
		disableinput();
		playername();
		scoredisplay();
		gamerun();
	});

	p10.addEventListener("click", function(){
		x = 0;
		check = 0;
		disableinput();
		playername();
		scoredisplay();
		gamerun();
	});
};

//main function of game
function gamerun() {
	var c = 1;

	//adding event listener for grid
	for(var i = 0; i < 9; i++)
	{
		th[i].id = 'x'+i;
		th[i].addEventListener("click", handler);
	}

	// handler function
	function handler(e) {
		// remove this handler
		e.target.removeEventListener(e.type, arguments.callee);
		var itrack = this.id.replace('x','');

		//assigning x or 0 based on user selection
		if(x%2 == 0) {
			this.innerHTML = "0";
			x++;c++;
			t[itrack] = 0;
		} else {
			this.innerHTML = "x";
			x++;c++;
			t[itrack] = 1;
		}

		//condition for winning
		if((t[0]===t[1]&&t[1]===t[2])||(t[3]===t[4]&&t[4]===t[5])||(t[6]===t[7]&&t[7]===t[8])||(t[0]===t[3]&&t[3]===t[6])||(t[1]===t[4]&&t[4]===t[7])||(t[2]===t[5]&&t[5]===t[8])||(t[0]===t[4]&&t[4]===t[8])||(t[2]===t[4]&&t[4]===t[6])) {

			//removing all event listener after winning	
			for( var j = 0; j < 9;j++) {
				th[j].removeEventListener("click",handler);
			}

			if (c%2 === 0){
				p1scr++;
				scoredisplay();
				win.style.display = "block";
				res.innerHTML = p1name + " WINS!";
			} else {
				p2scr++;
				scoredisplay();
				win.style.display = "block";
				res.innerHTML = p2name + " WINS!";
			}
		c = 0;
		}
		if (c === 10) {
			win.style.display = "block";
			res.innerHTML ="TIE!";
		}
	};
};
