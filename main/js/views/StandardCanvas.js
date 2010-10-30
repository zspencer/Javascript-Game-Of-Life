require.def(function(){
    var CELL_SIZE = 6;
    var GameViewObject = function(){
    };
    var prototype = {
        context: null,
        backgroundColor: "#000",
        foregroundColor: "#0F0",
        render: function(world){
            this.clear();
            if (world.cells == undefined) {
                return;
            }
            
            var view = this;
            world.visitCells(function(x, y){
                
                view.drawCell(x, y);
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
            this.context.fillRect(0, 0, this.width, this.height);
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
            
            height = height == null ? 200 : height * CELL_SIZE;
            width = width == null ? 200 : width * CELL_SIZE;
            
            var object = new GameViewObject();
            object.init(canvasLocator, height, width);
            return object;
        }
        
    }
});
