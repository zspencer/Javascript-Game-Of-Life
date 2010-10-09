require({
	baseUrl: "js/",
	waitSeconds : 0
	}, 
	['GameOfLife'],
	function(Game) {
		require.ready(function() {
			game = Game.create('#gameBoard');
			setInterval("game.tick()", 100);
		});
	});