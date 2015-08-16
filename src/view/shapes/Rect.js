import Shape from "./Shape";

class Rect extends Shape {

    draw()
    {
        var tXX = this.xx - this.size / 2;
        var tYY = this.yy - this.size / 2;

        this.graph.beginFill(0xFFFFFF);
        this.graph.moveTo(tXX, tYY);
        this.graph.drawRect(tXX, tYY, this.size, this.size);
    }
}

export default Rect;