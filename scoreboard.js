"use strict"
var keymap = {
	"t": 116,
	"u": 117,
	"b": 98,
	"m": 109,
	"enter": 13
}

$(function() {
	var model = {
		"team1": 0,
		"team2": 0,
		updateScore: function updateScore(amount, team) {
			if (this[team] + amount >= 0) {
				this[team]+= amount;
				render(this);
			}
		}
	};

	var editing = false;

	$("html").on("keypress", function(e) {
		if (!editing) {
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
		}
	});

	$("div").on("dblclick", "div.uneditable", function(e) {
		editing = true;
		var t = $(e.currentTarget)
		t.html('<input type="text" value="'+t.html()+'">');
		t.removeClass("uneditable").addClass("editable");
	});

	$("div").on("keypress", "div.editable", function(e) {
		if (e.keyCode == keymap.enter) {
			editing = false;
			var t = $(e.currentTarget);
			t.html($(e.target).val());
			t.removeClass("editable").addClass("uneditable");
		}
	});

});

function render(model) {
	$("#team-1-score").html(model["team1"]);
	$("#team-2-score").html(model["team2"]);
};