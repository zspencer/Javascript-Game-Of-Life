var Game = (function(){
	var Game = function() {}

    var prototype = {
		init: function() {
			this.world = World.create();
			world.spawn(3,3);
			world.spawn(3,4);
			world.spawn(3,5);
			this.view = GameView.create();
		},
		run: function() {
			setInterval("this.tick()", 500);
		},
		tick: function() {
			this.world.evolve();
			this.view.render(this.world);
		}  
    }
    return {
        create: function(){
			Game.prototype = prototype;
			var game = new Game(); 
			game.init();
            return game;
        }
    };
})();

