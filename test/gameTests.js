require.def(['GameOfLife'],function(Game) {
	module('game create');
	test('has a world', function() {
		var game = Game.create();
		ok(game.world);
	});
	test('has a view', function() {
		var game = Game.create();
		ok(game.view);
	});
	module('game tick')
	test('evolves the world', function() {
		var game = Game.create();
		expect(1);
		game.world.evolve = function() { ok(true) }
		game.tick();
	});
	test('renders the world', function() {
		var game = Game.create();
		expect(1);
		game.view.render = function(world) { equals(game.world.cells, world);}
		game.tick();
	});
});
