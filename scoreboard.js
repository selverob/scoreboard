"use strict"
var keymap = {
	"t": 116,
	"u": 117,
	"b": 98,
	"m": 109
}
$(function() {
	var model = {
		"team1": 0,
		"team2": 0,
		updateScore: function updateScore(amount, team) {
			this[team]+= amount;
			render(this)
		}
	};

	$("html").on("keypress", function(e) {
		switch(e.keyCode) {
			case keymap.t:
				model.updateScore(1, "team1");
				break;
			case keymap.u:
				model.updateScore(1, "team2");
				break;
			case keymap.b:
				model.updateScore(-1, "team1");
				break;
			case keymap.m:
				model.updateScore(-1, "team2");
				break;
		}
	});

});

function render(model) {
	$("#team-1-score").html(model["team1"]);
	$("#team-2-score").html(model["team2"]);
};