var Shape = require('./Shape');
var Circle = function(graph, params, index) {
    Shape.call( this, graph, params, index );
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.draw = function() 
{
    this.graph.beginFill(0xFFFFFF);
    this.graph.moveTo(this.xx, this.yy);
    // this.graph.drawCircle(this.xx, this.yy, this.size);
    this.graph.arc(this.xx, this.yy, this.size, 0, 360 * Math.PI / 180)
    this.graph.endFill();
};

module.exports = Circle;