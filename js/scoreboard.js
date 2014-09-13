"use strict"
var keymap = {
	"t": 116,
	"u": 117,
	"b": 98,
	"m": 109,
	"enter": 13
}

var editing;

var AppViewModel = function() {
	this.t1 = ko.observable(0);
	this.t2 = ko.observable(0);
	
	this.updateScore = function(change, team) {
		var t;
		switch (team) {
			case 1:
				t = this.t1;
				break;
			case 2:
				t = this.t2;
				break;
		}
		if (t() + change < 0) {
			return;
		}
		t(t() + change);
	}
	var that = this;
	document.addEventListener("keypress", function(e) {
		if (!editing) {
			switch(e.keyCode) {
				case keymap.t:
					that.updateScore(1, 1);
					break;
				case keymap.u:
					that.updateScore(1, 2);
					break;
				case keymap.b:
					that.updateScore(-1, 1);
					break;
				case keymap.m:
					that.updateScore(-1, 2);
					break;
			}
		}
	});
}
	
var dd = new domDelegate.Delegate();
dd.on("dblclick", "div.uneditable", function(e) {
	editing = true;
	e.currentTarget.innerHTML = '<input type="text" value="'+t.html()+'">';
	e.currentTarget.classList.remove("uneditable");
	e.currentTarget.classList.add("editable");
});

dd.on("keypress", "div.editable", function(e) {
	if (e.keyCode == keymap.enter) {
		editing = false;
		e.currentTarget.innerHTML = e.currentTarget.value;
		e.currentTarget.classList.remove("editable");
		e.currentTarget.classList.add("uneditable");
	}
});

ko.applyBindings(new AppViewModel());
