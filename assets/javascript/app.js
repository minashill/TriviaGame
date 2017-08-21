$(document).ready(function() {
	window.onload = function() {
		audioElement.play();
	};
	var audioElement = document.createElement("audio");
	audioElement.setAttribute("src", "assets/audio/cream.mp3");
	audioElement.loop = true;
	$("#startButton").click(function() {
		var audio = new Audio('assets/audio/methodman_tical.mp3');
		audio.play();
		$("#buttonRow").hide();
		$("#splash").remove();
		$("#logo").remove();
		$("#timer").append("<span id='timerMinutes'>00</span>:<span id='timerSeconds'>00</span>");
		$("#questionSpace").show();

		startGame();
	})
});

$("#splashSec").fadeIn(1000 * 5, function() { 
});

$("#questionSpace").hide()
var rightCounter = 0,
wrongCounter = 0,
unansweredCounter = 0,
currentQuestionIndex = 0;



function countDown() {
	$('.chooseAnswer').click(function() {
		$(this).data('clicked', true);
	});
	var i = 30;
	var myInterval = setInterval(function() {

		if (i < 10) {
			$('#timerSeconds').html("0" + i);
			$(".chooseAnswer").on("click", function() {
				clearInterval(myInterval);
			})
		} else {
			$('#timerSeconds').html(i);
			$(".chooseAnswer").on("click", function() {
				clearInterval(myInterval);
			})
		}

		if (i === 0) {
			unansweredCounter++;
			clearInterval(myInterval);
			currentQuestionIndex++;
			$('#timer').effect("pulsate","times: 25", 1000 * 5);
			i = 30;
			renderQues(currentQuestionIndex);
		} else {
			i--;
		}
	}, 1000);
}

var questions = [
{
	"q": "The original members of Wu-Tang are RZA, GZA, Method Man, Raekwon, Ghostface Killah, Inspectah Deck, U-God, Masta Killa, Ol’ Dirty Bastard and ____",
	"c": ["Busta Rhymes", "Rakim", "Cappadonna"],
	"answer": 2
},
{
	"q": "The Wu-Tang Clan first became known in 1993 following the release of the independent single ____",
	"c": ["Protect Ya Neck", "Cream", "Triumph"],
	"answer": 0
},
{
	"q": "Ghostface Killah released his first solo album, Ironman in late October of ____",
	"c": ["1993", "1996", "1998"],
	"answer": 1
},
{
	"q": "Though incarcerated, ____ managed to make it onto the track “Conditioner” which featured Snoop Dog",
	"c": ["RZA", "GZA", "ODB"],
	"answer": 2
},
{
	"q": "While originally featured on the cover of Iron Flag, ____ was airbrushed out of the artwork and absent from the album entirely",
	"c": ["Cappadonna", "Ghostface", "U-God"],
	"answer": 0
},
{
	"q": "ODB's last show was in ____.",
	"c": ["Des Moines, IA", "Fort Collins, CO", "Tulsa, Oklahoma"],
	"answer": 1
},
{
	"q": "In what year did Method Man meet RZA?",
	"c": ["1989", "1990", "1991"],
	"answer": 1
},
{
	"q": "What is Method Man's real name?",
	"c": ["Robert Diggs", "Gary Grice", "Clifford Smith"],
	"answer": 2
},
{
	"q": "The only member not already an experienced rapper at the time of the group's formation, and was extensively mentored by GZA",
	"c": ["Masta Killa", "U-God", "ODB"],
	"answer": 0
},
{
	"q": "He is the youngest member of the Wu-Tang Clan",
	"c": ["Raekwon", "Method Man", "Ghostface Killah"],
	"answer": 1
}
];


function renderQues(n) {

	if (currentQuestionIndex < questions.length) {
		$('#question').remove();
		$('.chooseAnswer').remove();
		countDown();
		$('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");
		for (var i = 0; i < questions[n].c.length; i++) {
			var newDiv = $("<div>");
			newDiv.addClass("chooseAnswer").attr("indexNum", i).text(questions[n].c[i]);
			$('#choices').append(newDiv);
		}


	} else {
            resetGame(); 
        }

        $(".chooseAnswer").on("click", function() {
        	var audio = new Audio('assets/audio/methodman_tical.mp3');
        	audio.play();
            var guess = $(this).attr('indexNum'); // stored as a string not a number
            guess = parseInt(guess);

            if (guess === questions[currentQuestionIndex].answer) {
            	rightCounter++;
            	currentQuestionIndex++;


            } else {
            	wrongCounter++;
            	currentQuestionIndex++;

            }
            renderQues(currentQuestionIndex);
        })
    }

    function startGame() {
    	$('#messageSection').hide();
    	$('#gameMessage').empty()
    	$('#questionContainer').show();
    	$('#choices').show();
    	$("#timer").show();
    	rightCounter = 0;
    	wrongCounter = 0;
    	unansweredCounter = 0;
    	currentQuestionIndex = 0;

    	renderQues(currentQuestionIndex);

    }

    function resetGame() {
    	$('#messageSection').show();
    	$('#questionContainer').hide();
    	$('#choices').hide();
    	$('#timer').hide()
    	var audio = new Audio('assets/audio/clap.mp3');
    	audio.play();


    	$('#gameMessage').append("<h2>Wu-Tang Forever!</h2>");
    	$('#gameMessage').append("<h4>Total Correct: " + rightCounter + "</h4>");
    	$('#gameMessage').append("<h4>Total Incorrect: " + wrongCounter + "</h4>");
    	$('#gameMessage').append("<h4>Total Unanswered: " + unansweredCounter + "</h4>");
    	$('#gameMessage').append("<br><a onclick='location.reload()'class='waves-effect waves-light btn-large btn-flat tooltipped'>Play Again");
        //setTimeout(startGame, 1000 * 10);

    }






