class Shape {
    
    constructor(graph, params, index, total, line)
    {
        this.index  = index;
        this.total  = total;
        this.line   = line;
        this.params = params;
        this.size   = Math.random() * this.params.maxSizeMask;
        this.graph  = graph;
        
        this.xx = (Math.random() * this.params.W);
        this.yy = (Math.random() * this.params.H);
    }

    draw() {}

    animateIn(){
        this.draw();    
    }

    kill(){

    }
}

export default Shape