var Shape = require('./Shape');
var Circle = function(graph, params, index) {
    Shape.call( this, graph, params, index );
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.draw = function() 
{
    // this.graph.beginFill(0xFFFFFF, 1);
    this.graph.drawCircle(this.xx, this.yy, this.size);
    // this.graph.endFill();
};

module.exports = Circle;