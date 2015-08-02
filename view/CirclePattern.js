var Shape = require('./Shape');
var CirclePattern = function(graph, params, index, total, line) {
    Shape.call( this, graph, params, index, total, line );
    this.size = params.maxSizeMask;
}

CirclePattern.prototype = Object.create(Shape.prototype);
CirclePattern.prototype.constructor = CirclePattern;

CirclePattern.prototype.draw = function() 
{
    // this.size /= 2;

    var lineTotal = this.params.elementsPerLine;
    var line = this.total / lineTotal;

    var angle = 360 / lineTotal * (this.index % lineTotal);
    var radians = angle * Math.PI / 180;
    var center = {x : this.params.W / 2, y: this.params.H / 2};

    var xx = center.x + this.line * this.params.spacing * Math.cos(radians);
    var yy = center.y + this.line * this.params.spacing * Math.sin(radians);

    this.graph.beginFill(0xFFFFFF);
    this.graph.moveTo(xx, yy);
    this.graph.arc(xx, yy, this.size, 0, 360 * Math.PI / 180);
    this.graph.endFill();
};

module.exports = CirclePattern;