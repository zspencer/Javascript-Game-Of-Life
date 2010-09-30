jQuery().ready(function(){
    var CELL_SIZE = 1;
    GameView = {
    	context: null,
        canvas: $("canvas#gameBoard"),
        render: function(world){
			if(world.cells == undefined) { return; }
            this.context = this.canvas[0].getContext('2d');
            
            jQuery.each(world.cells, function(x, row){
                jQuery.each(row, function(y, lives){
					GameView.drawCell(x,y);
                });
            });
            
        },
        cellIsAt: function(x, y){
            var context = this.canvas[0].getContext('2d');
            var cell = context.getImageData(x, y, CELL_SIZE, CELL_SIZE).data;
            return cell[1] == 255;
        },
		drawCell: function(x,y) {
			this.context.fillStyle = "#0F0";
			this.context.fillRect(x, y, CELL_SIZE, CELL_SIZE)
		}
        
    }
});
