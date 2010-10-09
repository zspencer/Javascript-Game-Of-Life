require.def(function(){
    var CELL_SIZE = 5;
    var GameViewObject = function(){
    };
    var prototype = {
        context: null,
        backgroundColor: "#000",
		foregroundColor: "#0F0",
        render: function(cells){
            if (cells == undefined) {
                return;
            }
            this.clear();
            view = this;
            jQuery.each(cells, function(x, row){
                jQuery.each(row, function(y, lives){
                    view.drawCell(x, y);
                });
            });
            
        },
        cellIsAt: function(x, y){
            var cell = this.context.getImageData(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE).data;
            return cell[1] == 255;
        },
        drawCell: function(x, y){
            this.context.fillStyle = this.foregroundColor;
            this.context.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
        },
        clear: function(){
            this.context.fillStyle = this.backgroundColor;
            this.context.fillRect(0, 0, this.height, this.width);
        },
        init: function(locator, height, width){
            this.canvas = $(locator);
            this.height = height;
            this.width = width;
            this.canvas.attr('height', height);
            this.canvas.attr('width', width);
            this.context = this.canvas[0].getContext('2d');
        }
        
    }
    GameViewObject.prototype = prototype;
    return {
        create: function(canvasLocator, height, width){
            if (canvasLocator == null) {
                throw "Must give us a selector to get the canvas object";
            }
            
            height = height == null ? 200 : height;
            width = width == null ? 200 : width;
            
            var object = new GameViewObject();
            object.init(canvasLocator, height, width);
            return object;
        }
        
    }
});