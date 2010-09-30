var Game = (function(){
	var Game = function() {}
    var prototype = {
        spawn: function(x, y){
            this.world.spawn(x, y);
        },
        isPopulatedAt: function(x, y){
            return this.world.isPopulatedAt(x, y);
        },
        kill: function(x, y){
            this.world.kill(x, y);
        },
        evolve: function(){
            var world = this.world;
            var newWorld = World.create();
			
            jQuery.each(world.cells, function(x, row){
                jQuery.each(row, function(y, lives){
                    var neighbors = world.getNeighbors(x, y);
					jQuery.extend(true, world, neighbors);
                });
                
            });
            jQuery.each(world.cells, function(x, row){
                jQuery.each(row, function(y, lives){
                    if (world.cellShouldLive(x, y)) {
						newWorld.spawn(x, y);
					}
                });
                
            });
            this.world = newWorld;
        },
		init: function() {
			this.world = World.create();
		}        
    }
    return {
        create: function(){
			Game.prototype = prototype;
			var game = new Game(); 
			game.init()
            return game;
        }
    };
})();

