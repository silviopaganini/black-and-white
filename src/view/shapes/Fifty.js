import Shape from "./Shape";

class Fifty extends Shape {

    draw()
    {
        this.graph.beginFill(0xFFFFFF);
        this.graph.moveTo(this.params.W / 2, 0);
        this.graph.drawRect(this.params.W / 2, 0, this.params.W / 2, this.params.H);
    }
}

export default Fifty;