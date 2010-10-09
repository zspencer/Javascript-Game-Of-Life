require({
	baseUrl: "../main/js/",
	waitSeconds : 0,
	paths: {
			"tests": '../../test',
		}
	}, 
	['tests/gameTests',
	 'tests/viewTests',
	 'tests/worldTests']
);