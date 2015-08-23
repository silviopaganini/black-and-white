import Shape    from "./Shape";
import TweenMax from 'gsap';

class Fifty extends Shape {

    draw()
    {
        this.currentSize = 0;
        this.counter = {val : this.params.W / 2};

        this.graph.beginFill(0xFFFFFF);
        this.graph.moveTo(this.params.W / 2, 0);
        this.graph.drawRect(this.params.W / 2, 0, this.params.W / 2, this.params.H);
    }

    animateSide(side, cb)
    {
        if(side == this.currentSize) return;

        this.currentSize = side;
        let MOVE_TO;
        let EASING = Quad.easeOut;

        switch(side)
        {
            case 1:
                MOVE_TO = this.params.W;
                break;

            case 2:
                MOVE_TO = 0;
                break;

            default: 
                MOVE_TO = this.params.W / 2;
                EASING = Quad.easeInOut;
                break;                    
        }

        TweenMax.to(this.counter, .3, {ease: EASING, val: MOVE_TO, onUpdate: function(){

            this.graph.clear();
            this.graph.beginFill(0xFFFFFF);
            this.graph.moveTo(this.counter.val, 0);
            this.graph.drawRect(this.counter.val, 0, this.params.W, this.params.H);

        }.bind(this), onComplete: cb});
    }
}

export default Fifty;