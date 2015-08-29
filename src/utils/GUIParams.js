class GUIParams 
{
    constructor()
    {
        this.speed = 0;
        this.interval = 0;
        this.masks = 244;
        this.maxSizeMask = 52;
        this.W = window.innerWidth;
        this.H = window.innerHeight;
        this.selectedShape = "circlePolar";
        this.elementsPerLine = 19;
        this.spacing = 47;
        this.debug = false;
        this.random = false;
    }
}

export default GUIParams;