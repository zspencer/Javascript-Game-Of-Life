 require.def(['views/Standard', 'World'],function(GameView, World) {
	module('canvas');
	test('uses the selector passed in for its canvas', function() {
		var view = GameView.create("#gameBoard");
		equals(view.canvas.selector, "#gameBoard");
	});
	test('when a selector isnt passed it throws an error', function() {
		
		try {
			var view = GameView.create();
			fail('We were supposed to throw an exception!');
		} catch (e) {
			equals(e,"Must give us a selector to get the canvas object");	
		}
	})
	module('canvas render');
	test('draws a single pixel at 3,5 when a game is started with a cell at 3,5', function() {
		var view = GameView.create("#gameBoard");
		var world = World.create();
		world.spawn(3,5);
		view.render(world);
		ok(view.cellIsAt(3,5));
	});
	test('does not draw a pixel at 1,6 when a game doesn\'t have a cell at 1,6', function() {
		var view = GameView.create("#gameBoard");
		var world = World.create();
		view.render(world);
		ok(!view.cellIsAt(1,6));
	});
	test('clears the game board', function() {
		var view = GameView.create("#gameBoard");
		var world = World.create();
		expect(1);
		view.clear = function() { ok(true)}
		view.render(world);
	})
	
	
});
