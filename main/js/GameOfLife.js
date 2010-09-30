var Game = (function(){
	var Game = function() {}

    var prototype = {
		init: function() {
			this.world = World.create();
			this.world.spawn(2,3);
			this.world.spawn(3,4);
			this.world.spawn(4,2);
			this.world.spawn(4,3);
			this.world.spawn(4,4);
			
			this.view = GameView.create(400, 400);
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

