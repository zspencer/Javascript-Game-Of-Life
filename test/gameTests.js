require.def(['GameOfLife'],function(Game) {
	
	module('game create');
	test('when missing a canvasLocator argument throws a type error', function() {
		try {
			var game = Game.create();
			ok(1==2,'Expected an exception to be thrown');
		} catch(e) {
			equals(e.name,'TypeError');
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
	
	module('game evolve')
	test('keeps cells with 2 neighbors alive', function() {
		var game = Game.create('#asdf');
		
		game.world.spawn(2,2);
		game.world.spawn(2,3);
		game.world.spawn(2,4);
		game.evolve();
		ok(game.world.isPopulatedAt(2,3));
	});
	
	test('keeps cells with 3 neighbors alive', function() {
		var game = Game.create('#asdf')
		game.world.spawn(1,3);
		game.world.spawn(2,2);
		game.world.spawn(2,3);
		game.world.spawn(2,4);
		game.evolve();
		ok(game.world.isPopulatedAt(2,3));
	});
	
	test('kills cells with less than 2 neighbors', function() {
		var game = Game.create('#asdf')
		game.world.spawn(1,3);
		game.world.spawn(2,3);
		game.evolve();
		ok(!game.world.isPopulatedAt(2,3));
	});
	test('kills cells with > than 3 neighbors', function() {
		var game = Game.create('#asdf')
		game.world.spawn(1,3);
		game.world.spawn(2,3);
		game.world.spawn(3,3);
		game.world.spawn(2,2);
		game.world.spawn(2,4);
		game.evolve();
		ok(!game.world.isPopulatedAt(2,3));
	});
	test('brings cells with 3 neighbors to life', function() {
		var game = Game.create('#asdf')
		game.world.spawn(1,3);
		game.world.spawn(2,2);
		game.world.spawn(2,4);
		game.evolve();
		ok(game.world.isPopulatedAt(2,3));
	})
	module('game run');
	test('calls tick once', function() {
		var game = Game.create('#gameBoard');
		game.world.randomize = jQuery.noop;
		game.tick = function() {
			ok(true,'yay!');
		}
		expect(1);
		game.run();
		
	});
	test('calls randomize', function() {
		var game = Game.create('#gameBoard');
		game.world.randomize = function() { ok(true);}
		expect(1);
		game.run();
	});
	test('calls setInterval', function() {
		var game = Game.create('#gameBoard');
		game.world.randomize = jQuery.noop;
		setInterval = function() { ok(true); }
		expect(1);
		game.run();
	});
	module('game tick');
	
	test('evolves the world', function() {
		var game = Game.create('#gameBoard');
		expect(1);
		game.evolve = function() { ok(true) }
		game.tick();
	});
	test('renders the world', function() {
		var game = Game.create('#gameBoard');
		expect(1);
		game.view.render = function(world) { equals(game.world, world);}
		game.tick();
	});
	
	
	
});
