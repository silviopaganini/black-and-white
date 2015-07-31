var Shape = require('./Shape');
var Rect = function(graph, params, index) {
    Shape.call( this, graph, params, index );
}

Rect.prototype = Object.create(Shape.prototype);
Rect.prototype.constructor = Rect;

Rect.prototype.draw = function() 
{
    var tXX = this.xx - this.size / 2;
    var tYY = this.yy - this.size / 2;
    
    // this.graph.beginFill(0xFFFFFF, 1);
    this.graph.moveTo(tXX, tYY);
    this.graph.drawRect(tXX, tYY, this.size, this.size);
    // this.graph.endFill();
};

module.exports = Rect;