var GameView = (function(){
    var CELL_SIZE = 5;
	var GameViewObject = function(){};
    var prototype = {
    	context: null,
        
        render: function(world){
			if(world.cells == undefined) { return; }
			this.clear();
            view = this;
            jQuery.each(world.cells, function(x, row){
                jQuery.each(row, function(y, lives){
					view.drawCell(x,y);
                });
            });
            
        },
        cellIsAt: function(x, y){
            var cell = this.context.getImageData(x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE, CELL_SIZE).data;
            return cell[1] == 255;
        },
		drawCell: function(x,y) {
			this.context.fillStyle = "#0F0";
			this.context.fillRect(x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE, CELL_SIZE)
		},
		clear: function() {
			this.context.fillStyle="#000";
			this.context.fillRect(0,0,this.height,this.width);
		},
		init: function(height, width) {
			this.canvas  = $("canvas#gameBoard");
			this.height = height;
			this.width = width;
			this.canvas.attr('height', height);
			this.canvas.attr('width', width);
			this.context = this.canvas[0].getContext('2d');
		}
        
    }
	return {
		create: function(height, width) {
			GameViewObject.prototype = prototype;
		var object = new GameViewObject();
		object.init(200, 200);
		return object;	
		}
		
	}
})();
