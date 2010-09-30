 jQuery().ready(function() {
	
	module('world countNeighbors');
	
	test('test return zero when no neighbors', function() {
		var world = World.create();
		world.spawn(3,5);
		equals(world.countNeighbors(3,5),0);
	});
	
	test('test return 1 when 1 neighbor', function() {
		var world = World.create();
		world.spawn(3,5);
		world.spawn(2,5);
		equals(world.countNeighbors("3","5"),1);
	});
	
	test('test return 2 with 2 neighbors', function() {
		var world = World.create();
		world.spawn(3,5);
		world.spawn(2,5);
		world.spawn(2,4);
		equals(world.countNeighbors(3,5),2);
	});
	
	test('test return 3 with 3 neighbors', function() {
		var world = World.create();
		world.spawn(3,5);
		world.spawn(2,5);
		world.spawn(2,4);
		world.spawn(2,6);
		equals(world.countNeighbors(3,5),3);
	});
	
	test('test return 4 with 4 neighbors', function() {
		var world = World.create();
		world.spawn(3,5);
		world.spawn(2,5);
		world.spawn(2,4);
		world.spawn(2,6);
		world.spawn(3,4);
		equals(world.countNeighbors(3,5),4);
	});
	
	test('test return 5 with 5 neighbors', function() {
		var world = World.create();
		world.spawn(3,5);
		world.spawn(2,5);
		world.spawn(2,4);
		world.spawn(2,6);
		world.spawn(3,4);
		world.spawn(3,6);
		equals(world.countNeighbors("3",5),5);
	});
	
	test('test return 6 with 6 neighbors', function() {
		var world = World.create();
		world.spawn(3,5);
		world.spawn(2,5);
		world.spawn(2,4);
		world.spawn(2,6);
		world.spawn(3,4);
		world.spawn(3,6);
		world.spawn(4,4);
		equals(world.countNeighbors(3,5),6);
	});
	
	test('test return 7 with 7 neighbors', function() {
		var world = World.create();
		world.spawn(3,5);
		world.spawn(2,5);
		world.spawn(2,4);
		world.spawn(2,6);
		world.spawn(3,4);
		world.spawn(3,6);
		world.spawn(4,4);
		world.spawn(4,5);
		equals(world.countNeighbors("3","5"),7);
	});
	
	test('test return 6 with 6 neighbors', function() {
		var world = World.create();
		world.spawn(3,5);
		world.spawn(2,5);
		world.spawn(2,4);
		world.spawn(2,6);
		world.spawn(3,4);
		world.spawn(3,6);
		world.spawn(4,4);
		world.spawn(4,5);
		world.spawn(4,6);
		equals(world.countNeighbors(3,5),8);
	});
	module('world isPopulatedAt');
	test('returns true when a cell is populated', function() {
		var world = World.create();
		world.spawn(3,5);
		ok(world.isPopulatedAt(3,5));
	});
	test('returns false when a cell is not populated', function() {
		var world = World.create();
		ok(!world.isPopulatedAt(1,2));
	})
	module('world evolve')
	test('keeps cells with 2 neighbors alive', function() {
		var world = World.create();
		world.spawn(2,2);
		world.spawn(2,3);
		world.spawn(2,4);
		world.evolve();
		ok(world.isPopulatedAt(2,3));
	});
	
	test('keeps cells with 3 neighbors alive', function() {
		var world = World.create();
		world.spawn(1,3);
		world.spawn(2,2);
		world.spawn(2,3);
		world.spawn(2,4);
		world.evolve();
		ok(world.isPopulatedAt(2,3));
	});
	
	test('kills cells with less than 2 neighbors', function() {
		var world = World.create();
		world.spawn(1,3);
		world.spawn(2,3);
		world.evolve();
		ok(!world.isPopulatedAt(2,3));
	});
	test('kills cells with > than 3 neighbors', function() {
		var world = World.create();
		world.spawn(1,3);
		world.spawn(2,3);
		world.spawn(3,3);
		world.spawn(2,2);
		world.spawn(2,4);
		world.evolve();
		ok(!world.isPopulatedAt(2,3));
	});
	test('brings cells with 3 neighbors to life', function() {
		var world = World.create();
		world.spawn(1,3);
		world.spawn(2,2);
		world.spawn(2,4);
		world.evolve();
		ok(world.isPopulatedAt(2,3));
	})
	
	module('spawn');
});
