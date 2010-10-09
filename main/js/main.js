require({
	baseUrl: "js/",
	waitSeconds : 0
	}, 
	['GameOfLife'],
	function(Game) {
		require.ready(function() {
			game = Game.create();
			game.run();
		});
	});