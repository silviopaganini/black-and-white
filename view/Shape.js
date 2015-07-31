var TweenMax = require('gsap');
var PIXI     = require('pixi.js');

var Shape = function(graph, params, index)
{
    this.index      = index;
    this.params     = params;
    this.size       = Math.random() * this.params.maxSizeMask;
    this.graph      = graph;
    
    this.xx = (Math.random() * this.params.W);
    this.yy = (Math.random() * this.params.H);

    this.animateIn();
}

Shape.prototype.draw = function(){};

Shape.prototype.animateIn = function() {

    TweenMax.from(this, this.params.speed / 50, {
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