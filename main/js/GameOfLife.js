require.def(['views/Standard','World'], function(GameView, World){
	var Game = function() {}
    var prototype = {
		settings: {
			height: 144,
			width: 192,
		},
		init: function(canvasLocator) {
			this.world = World.create();
			
			this.world.randomize(this.settings.height, this.settings.width);
			
			this.view = GameView.create(canvasLocator,
										this.settings.height,
										this.settings.width);
		},
		evolve: function(){
			var self = this;
            self.world.addLiveCellsNeighborsToTheWorld();
			var newWorld = World.create();
            self.world.visitCells(function(x, y) {
            	if(self.world.cellShouldLive(x,y)) {
					newWorld.spawn(x,y);
				}
            });
			self.world = newWorld;
        },
		run: function() {
			self = this;
			this.tick();
			setInterval(function(){ 
				self.tick();
			}, 100);
		},
		tick: function() {
			this.evolve();
			this.view.render(this.world);
		}  
    }
	Game.prototype = prototype;
    return {
        create: function(canvasLocator){
			if(canvasLocator == null) { throw TypeError('We need to know which canvas to use!'); }
			var game = new Game(); 
			game.init(canvasLocator);
            return game;
        }
    };
});

