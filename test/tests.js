jQuery().ready(function() {
	module('isPopulatedAt');
	test('returns true when a cell is populated', function() {
		var game = Game.create();
		game.spawn(3,5);
		ok(game.isPopulatedAt(3,5));
	});
	test('returns false when a cell is not populated', function() {
		var game = Game.create();
		ok(!game.isPopulatedAt(1,2));
	})
	
	test('test cells with 2 neighbors stays alive', function() {
		var game = Game.create();
		game.spawn(2,2);
		game.spawn(2,3);
		game.spawn(2,4);
		game.evolve();
		ok(game.isPopulatedAt(2,3));
	});
	
	test('test cells with 3 neighbors stays alive', function() {
		var game = Game.create();
		game.spawn(1,3);
		game.spawn(2,2);
		game.spawn(2,3);
		game.spawn(2,4);
		game.evolve();
		ok(game.isPopulatedAt(2,3));
	});
	
	test('test cells with less than 2 neighbors dies', function() {
		var game = Game.create();
		game.spawn(1,3);
		game.spawn(2,3);
		game.evolve();
		ok(!game.isPopulatedAt(2,3));
	});
	test('test cells with > than 3 neighbors dies', function() {
		var game = Game.create();
		game.spawn(1,3);
		game.spawn(2,3);
		game.spawn(3,3);
		game.spawn(2,2);
		game.spawn(2,4);
		game.evolve();
		ok(!game.isPopulatedAt(2,3));
	});
	test('test cells with 3 neighbors should come alive', function() {
		var game = Game.create();
		game.spawn(1,3);
		game.spawn(2,2);
		game.spawn(2,4);
		game.evolve();
		ok(game.isPopulatedAt(2,3));
	})
	
});
