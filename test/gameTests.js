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
	test('has a world', function() {
		var game = Game.create('#gameBoard');
		ok(game.world);
	});
	test('has a view', function() {
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
