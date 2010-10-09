require.def(['GameOfLife'],function(Game) {
	module('game create');
	test('requires a canvasLocator argument', function() {
		try {
			var game = Game.create();
			ok(1==2,'Expected an exception to be thrown');
		} catch(e) {
			equals(e,'We need to know which canvas to use!');
		}
	});
	test('view has the canvas to the locator that is passed into it', function() {
		var game= Game.create('#asdf');
		equals(game.view.canvas.selector,'#asdf');
	});
	test('sets the world', function() {
		var game = Game.create('#gameBoard');
		ok(game.world);
	});
	test('sets the view', function() {
		var game = Game.create('#gameBoard');
		ok(game.view);
	});
	module('game tick')
	test('evolves the world', function() {
		var game = Game.create('#gameBoard');
		expect(1);
		game.world.evolve = function() { ok(true) }
		game.tick();
	});
	test('renders the world', function() {
		var game = Game.create('#gameBoard');
		expect(1);
		game.view.render = function(world) { equals(game.world.cells, world);}
		game.tick();
	});
});
