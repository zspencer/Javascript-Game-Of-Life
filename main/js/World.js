var World = (function(){
	var World = function() {}
    var prototype = {
        spawn: function(x, y){
            this.initializeRow(x);
            this.cells[x][y] = true;
        },
        isPopulatedAt: function(x, y){
            this.initializeRow(x);
            return this.cells[x][y] == undefined ? false : true;
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
            return true;
        },
		getNeighbors: function(x, y) {
			x = parseInt(x); y = parseInt(y);
			var neighbors = {};
			var currentX = x-1;
			while(currentX<=x+1) {
				var currentY = y-1;
				while(currentY<=y+1) {
					if(neighbors[currentX] == undefined) { neighbors[currentX] = {}; }
					neighbors[currentX][currentY] = this.isPopulatedAt(currentX, currentY);
					currentY++;
				}
				currentX++;
			}
			return neighbors;
		},
        countNeighbors: function(x, y){
			x = parseInt(x); y = parseInt(y);
            var count = 0;
            if (this.isPopulatedAt(x - 1, y)) {
                count++;
            }
            if (this.isPopulatedAt(x - 1, y + 1)) {
                count++;
            }
            if (this.isPopulatedAt(x - 1, y - 1)) {
                count++;
            }
            if (this.isPopulatedAt(x, y + 1)) {
                count++;
            }
            if (this.isPopulatedAt(x, y - 1)) {
                count++;
            }
            if (this.isPopulatedAt(x + 1, y - 1)) {
                count++;
            }
            if (this.isPopulatedAt(x + 1, y)) {
                count++;
            }
            if (this.isPopulatedAt(x + 1, y + 1)) {
                count++;
            }
            return count;
        },
		init: function() {
			this.cells = {};
		}
    };
	return {
		create: function() {
			World.prototype = prototype;
			var world = new World(); 
			world.init();
			return world;
		}
	}
})();
