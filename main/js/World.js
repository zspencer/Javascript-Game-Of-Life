require.def(function(){
	var WorldObject = function() {}
    var prototype = {
        spawn: function(x, y){
            this.setCell(x,y,true);
        },
		kill: function(x,y) {
			this.setCell(x,y, false);
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
            if (neighborCount < 2 || neighborCount > 3) { return false; }
			if (neighborCount == 3) { return true;}
            return this.isPopulatedAt(x,y);
        },
		evolve: function() {
			var newWorld = WorldObject.create();
			this.trace();
			var world = this;
			jQuery.each(world.cells, function(x, row){
                jQuery.each(row, function(y, lives){
                    if (world.cellShouldLive(x, y)) {
						newWorld.spawn(x, y);
					}
                });
            });
			this.cells = newWorld.cells;
		},
		getNeighbors: function(x, y) {
			x = parseInt(x); y = parseInt(y);
			var neighbors = WorldObject.create();
			var currentX = x-1;
			while(currentX<=x+1) {
				var currentY = y-1;
				while(currentY<=y+1) {
					neighbors.setCell(currentX,currentY,this.isPopulatedAt(currentX, currentY));
					currentY++;
				}
				currentX++;
			}
			return neighbors.cells;
		},
		setCell: function(x,y,life) {
			this.initializeRow(x);
			this.cells[x][y]= life;
		},
		cellsAreAtTheSameLocation: function(x1,y1,x2,y2) {
			return (x1==x2 && y1 == y2);
		},
		shouldIncrementNeighborCount: function(x,y, currentX, currentY) {
			return !this.cellsAreAtTheSameLocation(x,y, currentX, currentY) && this.isPopulatedAt(currentX, currentY)
		},
        countNeighbors: function(x, y){
			x = parseInt(x); y = parseInt(y);
			var count = 0;
			var currentX = x - 1; 
			while (currentX <= x + 1) {
				var currentY = y -1;
				while (currentY <= y + 1) {
					if (this.shouldIncrementNeighborCount(x,y,currentX,currentY)) {
						count++;
					}
					currentY++;
				}
				currentX++;
			}            
            return count;
        },
		trace: function() {
			var world = this;
			jQuery.each(world.cells, function(x, row){
                jQuery.each(row, function(y, lives){
                    var neighbors = world.getNeighbors(x, y);
					jQuery.extend(true, world.cells, neighbors);
                });
            });
			this.cells = world.cells;
		},
		init: function() {
			this.cells = {};
		}
    };
	WorldObject.prototype = prototype;
	WorldObject.create = function() {
		var world = new WorldObject(); 
			world.init();
			return world;
	}
	return WorldObject
});
