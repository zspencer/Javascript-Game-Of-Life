 jQuery().ready(function() {
	module('canvas');
	test('exists', function() {
		ok(GameView.canvas.size() == 1);
	});
	module('canvas render');
	test('draws a single pixel at 3,5 when a game is started with a cell at 3,5', function() {
		var game = Game.create();
		game.spawn(3,5);
		GameView.render(game.world);
		ok(GameView.cellIsAt(3,5));
	});
	test('does not draw a pixel at 1,6 when a game doesn\'t have a cell at 1,6', function() {
		var game = Game.create();
		GameView.render(game.world);
		ok(!GameView.cellIsAt(1,6));
	});
	
	
	
});
