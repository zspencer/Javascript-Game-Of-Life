require.def(['GameOfLifeView','World'], function(GameView, World){
	var Game = function() {}
    var prototype = {
		settings: {
			height: 400,
			width: 400,
		},
		init: function(canvasLocator) {
			this.world = World.create();
			this.world.spawn(2,3);
			this.world.spawn(3,4);
			this.world.spawn(4,2);
			this.world.spawn(4,3);
			this.world.spawn(4,4);
			
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

