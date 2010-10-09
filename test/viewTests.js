 require.def(['GameOfLifeView', 'World'],function(GameView, World) {
	module('canvas');
	test('exists', function() {
		var view = GameView.create();
		ok(view.canvas.size() == 1);
	});
	module('canvas render');
	test('draws a single pixel at 3,5 when a game is started with a cell at 3,5', function() {
		var view = GameView.create();
		var world = World.create();
		world.spawn(3,5);
		view.render(world);
		ok(view.cellIsAt(3,5));
	});
	test('does not draw a pixel at 1,6 when a game doesn\'t have a cell at 1,6', function() {
		var view = GameView.create();
		var world = World.create();
		view.render(world);
		ok(!view.cellIsAt(1,6));
	});
	test('clears the game board', function() {
		var view = GameView.create();
		var world = World.create();
		expect(1);
		view.clear = function() { ok(true)}
		view.render(world);
	})
	
	
});
