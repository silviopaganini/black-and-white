var Shape = require('./Shape');
var Utils = require('utils-perf');

var CirclePolar = function(graph, params, index, total, line) {
    Shape.call( this, graph, params, index, total, line );
}

CirclePolar.prototype = Object.create(Shape.prototype);
CirclePolar.prototype.constructor = CirclePolar;

CirclePolar.prototype.draw = function() 
{
    // this.size /= 2;

    var lineTotal = this.params.elementsPerLine;
    var line = this.total / lineTotal;

    var angle = 360 / lineTotal * (this.index % lineTotal);
    var radians = Utils.rad(angle);
    var center = {x : this.params.W / 2, y: this.params.H / 2};

    var xx = center.x + this.line * (this.params.spacing + this.line * Math.PI) * Math.cos(radians);
    var yy = center.y + this.line * (this.params.spacing + this.line * Math.PI) * Math.sin(radians);

    this.hyp = Math.sqrt( Math.pow(xx - center.x,2) + Math.pow(yy - center.y,2) ) ;
    this.size = this.hyp / 10;
    //params.maxSizeMask;

    this.graph.beginFill(0xFFFFFF);
    this.graph.moveTo(xx, yy);
    this.graph.arc(xx, yy, this.size, 0, 360 * Math.PI / 180);
    this.graph.endFill();
};

module.exports = CirclePolar;

