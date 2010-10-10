require.def(['views/Standard','World'], function(GameView, World){
	var Game = function() {}
    var prototype = {
		settings: {
			height: 72,
			width: 96,
		},
		init: function(canvasLocator) {
			this.world = World.create();
			
			this.world.randomize(this.settings.height, this.settings.width);
			
			this.view = GameView.create(canvasLocator,
										this.settings.height,
										this.settings.width);
		},
		tick: function() {
			this.world.evolve();
			this.view.render(this.world.cells);
		}  
    }
	Game.prototype = prototype;
    return {
        create: function(canvasLocator){
			if(canvasLocator == null) { throw 'We need to know which canvas to use!'; }
			var game = new Game(); 
			game.init(canvasLocator);
            return game;
        }
    };
});

