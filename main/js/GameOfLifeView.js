var GameView = (function(){
    var CELL_SIZE = 5;
	var GameViewObject = function(){};
    var prototype = {
    	context: null,
        
        render: function(world){
			if(world.cells == undefined) { return; }
            this.context = this.canvas[0].getContext('2d');
            view = this;
            jQuery.each(world.cells, function(x, row){
                jQuery.each(row, function(y, lives){
					view.drawCell(x,y);
                });
            });
            
        },
        cellIsAt: function(x, y){
            var context = this.canvas[0].getContext('2d');
            var cell = context.getImageData(x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE, CELL_SIZE).data;
            return cell[1] == 255;
        },
		drawCell: function(x,y) {
			this.context.fillStyle = "#0F0";
			this.context.fillRect(x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE, CELL_SIZE)
		}, 
		init: function() {
			this.canvas  = $("canvas#gameBoard");
		}
        
    }
	return {
		create: function() {
			GameViewObject.prototype = prototype;
		var object = new GameViewObject();
		object.init();
		return object;	
		}
		
	}
})();
