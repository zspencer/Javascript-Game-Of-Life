require.def(function(){
    var WorldObject = function(){
    }
    var prototype = {
        spawn: function(x, y){
            this.setCell(x, y, true);
        },
        kill: function(x, y){
            this.setCell(x, y, false);
        },
        isPopulatedAt: function(x, y){
            this.initializeRow(x);
            return (!this.cells[x][y]) ? false : true;
        },
        initializeRow: function(x){
            if (this.cells[x] == null) {
                this.cells[x] = {};
            }
        },
        cellShouldLive: function(x, y){
            var neighborCount = this.countNeighbors(x, y);
            if (neighborCount < 2 || neighborCount > 3) {
                return false;
            }
            if (neighborCount == 3) {
                return true;
            }
            return this.isPopulatedAt(x, y);
        },
        visitCells: function(callback){
            jQuery.each(this.cells, function(x, row){
                jQuery.each(row, function(y, status){
					callback(x,y);
                });
            });
        },
        evolve: function(){
            this.trace();
            var self = this;
			var newWorld = WorldObject.create();
            self.visitCells(function(x, y) {
            	if(self.cellShouldLive(x,y)) {
					newWorld.spawn(x,y);
				}
            });
			self.cells = newWorld.cells;
        },
        getNeighbors: function(x, y){
            var neighbors = WorldObject.create();
            var self = this;
            this.visitAdjacentCells(x, y, function(adjacentX, adjacentY){
                neighbors.setCell(adjacentX, adjacentY, self.isPopulatedAt(adjacentX, adjacentY));
            });
            return neighbors.cells;
        },
        setCell: function(x, y, life){
            this.initializeRow(x);
            this.cells[x][y] = life;
        },
        cellsAreAtTheSameLocation: function(x1, y1, x2, y2){
            return (x1 == x2 && y1 == y2);
        },
        shouldIncrementNeighborCount: function(x, y, currentX, currentY){
            return !this.cellsAreAtTheSameLocation(x, y, currentX, currentY) && this.isPopulatedAt(currentX, currentY)
        },
        visitAdjacentCells: function(x, y, callback){
            x = parseInt(x);
            y = parseInt(y);
            var currentX = x - 1;
            while (currentX <= x + 1) {
                var currentY = y - 1;
                while (currentY <= y + 1) {
                    callback(currentX, currentY);
                    currentY++;
                }
                currentX++;
            }
        },
        countNeighbors: function(x, y){
            var count = 0;
            var self = this;
            self.visitAdjacentCells(x, y, function(adjacentX, adjacentY){
                if (self.shouldIncrementNeighborCount(x, y, adjacentX, adjacentY)) {
                    count++;
                }
            });
            return count;
        },
        trace: function(){
            var world = this;
			this.visitCells(function(x,y) {
				var neighbors = world.getNeighbors(x, y);
                jQuery.extend(true, world.cells, neighbors);
			})
            this.cells = world.cells;
        },
        init: function(){
            this.cells = {};
        }
    };
    WorldObject.prototype = prototype;
    WorldObject.create = function(){
        var world = new WorldObject();
        world.init();
        return world;
    }
    return WorldObject
});
