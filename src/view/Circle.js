import Shape from "./Shape";

class Circle extends Shape {

    draw()
    {
        this.graph.beginFill(0xFFFFFF);
        this.graph.moveTo(this.xx, this.yy);
        // this.graph.drawCircle(this.xx, this.yy, this.size);
        this.graph.arc(this.xx, this.yy, this.size, 0, 360 * Math.PI / 180)
        this.graph.endFill();
    }
}

module.exports = Circle;