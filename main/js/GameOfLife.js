require.def(['views/StandardCanvas', 'World'], function(GameView, World){
    var Game = function(){
    }
    var prototype = {
        settings: {
            height: 225,
            width: 360,
        },
        evolve: function(){
            var self = this;
            var newWorld = World.create();
            self.world.visitCells(function(x, y){
                newWorld = self.populateSurvivingCells(self.world, newWorld, x, y);
                newWorld = self.bringNeighboringCellsToLife(self.world, newWorld, x, y);
                
            });
            self.world = newWorld;
        },
        bringNeighboringCellsToLife: function(world, newWorld, x, y){
            world.visitNeighbors(x, y, function(neighborX, neighborY){
                if (world.cellShouldLive(neighborX, neighborY)) {
                    newWorld.spawn(neighborX, neighborY);
                }
            });
            return newWorld;   
        },
        populateSurvivingCells: function(oldWorld, newWorld, x, y){
            if (oldWorld.cellShouldLive(x, y)) {
                newWorld.spawn(x, y);
            }
            return newWorld;
        },
        pause: function(){
            this.isPaused = true;
            clearInterval(this.intervalId);
        },
        init: function(canvasLocator, height, width){
            this.setHeight(height);
            this.setWidth(width);
            this.world = World.create();
            this.view = GameView.create(canvasLocator, this.settings.height, this.settings.width);
        },
        randomize: function(){
            this.world.randomize(this.settings.height, this.settings.width);
        },
        run: function(){
            var self = this;
            this.tick();
            this.intervalId = setInterval(function(){
                self.tick();
            }, 1);
        },
        setHeight: function(height){
            this.settings.height = height || this.settings.height;
        },
        setWidth: function(width){
            this.settings.width = width || this.settings.width;
        },
        start: function(){
            this.randomize();
            this.run();
        },
        tick: function(){
            this.evolve();
            this.view.render(this.world);
        }
    }
    Game.prototype = prototype;
    return {
        create: function(canvasLocator, height, width){
            if (canvasLocator == null) {
                throw TypeError('We need to know which canvas to use!');
            }
            var game = new Game();
            game.init(canvasLocator, height, width);
            return game;
        }
    };
});

