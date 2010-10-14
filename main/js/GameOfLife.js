require.def(['views/Standard','World'], function(GameView, World){
	var Game = function() {}
    var prototype = {
		settings: {
			height: 225,
			width: 360,
		},
		init: function(canvasLocator) {
			this.world = World.create();
			this.view = GameView.create(canvasLocator,
										this.settings.height,
										this.settings.width);
		},
	
		evolve: function(){
			var self = this;
			var newWorld = World.create();
            self.world.visitCells(function(x, y) {
            	if(self.world.cellShouldLive(x,y)) {
					newWorld.spawn(x,y);
				}
				self.world.visitNeighbors(x,y,function(neighborX, neighborY) {
					if(self.world.cellShouldLive(neighborX,neighborY)) {
						newWorld.spawn(neighborX,neighborY);
					}
				});
            });
			self.world = newWorld;
        },
		run: function() {
			self = this;
			this.world.randomize(this.settings.height, this.settings.width);
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

