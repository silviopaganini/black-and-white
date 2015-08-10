var TweenMax = require('gsap');
var PIXI     = require('pixi.js');

var Shape = function(graph, params, index, total, line)
{
    this.index  = index;
    this.total  = total;
    this.line   = line;
    this.params = params;
    this.size   = Math.random() * this.params.maxSizeMask;
    this.graph  = graph;
    
    this.xx = (Math.random() * this.params.W);
    this.yy = (Math.random() * this.params.H);

    // this.xx = this.size * index / 10;
    // this.yy = this.size * index / 10;
}

Shape.prototype.draw = function(){};

Shape.prototype.animateIn = function() {
    this.draw();
    
    return;

    TweenMax.from(this, this.params.speed, {
        size: 0, 
        delay: (this.params.interval / 100) * this.index,
        onUpdate: this.draw.bind(this),
        ease: Power4.easeOut
    });
};

Shape.prototype.kill = function() {
    TweenMax.killTweensOf(this);
    TweenMax.killDelayedCallsTo(this);
};

module.exports = Shape;