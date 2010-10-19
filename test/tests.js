require({
	baseUrl: "../main/js/",
	waitSeconds : 0,
	paths: {
			"tests": '../../test',
		}
	}, 
	['tests/gameTests',
	 'tests/viewTests',
	 'tests/worldTests',
	 'tests/controlPanelTests'
	 ]
);
//Kill set Interval so our tests don't do crazy stuff.
setInterval = function() { }