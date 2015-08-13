import Shape from "./Shape";
import Utils from 'utils-perf';

class CirclePattern extends Shape {
  
  constructor(graph, params, index, total, line) {
    super(graph, params, index, total, line);
    this.size = params.maxSizeMask;
  }

  draw()
  {
    var lineTotal = this.params.elementsPerLine;
    var line = this.total / lineTotal;

    var angle = 360 / lineTotal * (this.index % lineTotal);
    var radians = Utils.rad(angle);
    var center = {x : this.params.W / 2, y: this.params.H / 2};

    var xx = center.x + this.line * this.params.spacing * Math.cos(radians);
    var yy = center.y + this.line * this.params.spacing * Math.sin(radians);

    this.graph.beginFill(0xFFFFFF);
    this.graph.moveTo(xx, yy);
    this.graph.arc(xx, yy, this.size, 0, 360 * Math.PI / 180);
    this.graph.endFill();
  }
}

module.exports = CirclePattern;