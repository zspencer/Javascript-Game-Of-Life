require.def(['Cell'],function(Cell){
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
            if (!this.cells[x]) { return false; }
			return this.cells[x][y];
        },
		randomize: function(height, width) {
			var x = 10; var y =10;
			while(x < width-10) {
				while(y < height-10) {
					if(Math.floor(Math.random()*2)==1) {
						this.spawn(x,y);
					}				
					y++;
				}
				y=10;
				x++;
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
			for(var x in this.cells) {
				for(var y in this.cells[x]) {
					callback(x,y);	
				}
			}
        },
        getNeighbors: function(x, y){
            var neighbors = WorldObject.create();
            var self = this;
            this.visitNeighbors(x, y, function(adjacentX, adjacentY){
                neighbors.setCell(adjacentX, adjacentY, self.isPopulatedAt(adjacentX, adjacentY));
            });
            return neighbors.cells;
        },
        setCell: function(x, y, life){
			if(this.cells[x]==undefined) {this.cells[x]=[]}
            this.cells[x][y] = life;
        },
        cellsAreAtTheSameLocation: function(x1, y1, x2, y2){
            return (x1 == x2 && y1 == y2);
        },
        shouldIncrementNeighborCount: function(x, y, currentX, currentY){
            return !this.cellsAreAtTheSameLocation(x, y, currentX, currentY) && this.isPopulatedAt(currentX, currentY)
        },
        visitNeighbors: function(x, y, callback){
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
            self.visitNeighbors(x, y, function(adjacentX, adjacentY){
                if (self.shouldIncrementNeighborCount(x, y, adjacentX, adjacentY)) {
                    count++;
                }
            });
            return count;
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
