var Shape = require('./Shape');
var Utils = require('utils-perf');

var TrianglePattern = function(graph, params, index, total, line) {
    Shape.call( this, graph, params, index, total, line );
    this.params.interval = 0;
    this.random = this.params.random && Utils.coin();
    this.sideSize = this.params.random ? Utils.random(this.params.maxSizeMask / 2, this.params.maxSizeMask * 1.5) : this.params.maxSizeMask;
}

TrianglePattern.prototype = Object.create(Shape.prototype);
TrianglePattern.prototype.constructor = TrianglePattern;

TrianglePattern.prototype.draw = function() 
{
    // this.size /= 2;
    this.size = this.params.maxSizeMask;
    var columnMax = Math.round(this.params.W / this.params.maxSizeMask);
    var lineMax = this.params.W / this.params.maxSizeMask;

    // console.log(this.line, line, this.index);

    var coin = this.index % 2 == 0 ? 1 : -1;
    var xx = (this.index%columnMax) * this.params.maxSizeMask ;
    xx = coin == 1 ? xx : xx + this.params.maxSizeMask;
    var yy = this.line * this.params.maxSizeMask;

    if(this.random) return

    this.graph.beginFill(0xFFFFFF);
    this.graph.moveTo(xx, yy);
    this.graph.lineTo(xx , yy + this.sideSize );
    this.graph.lineTo(xx + this.sideSize * coin , yy + this.sideSize / 2 );
    this.graph.lineTo(xx , yy );
    this.graph.endFill();
};

module.exports = TrianglePattern;