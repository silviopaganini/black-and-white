class GUIParams 
{
    constructor()
    {
        this.speed = 0;
        this.interval = 0;
        this.masks = 150;
        this.maxSizeMask = 75;
        this.W = window.innerWidth;
        this.H = window.innerHeight;
        this.selectedShape = "circlePolar";
        this.elementsPerLine = 10;
        this.spacing = 10;
        this.debug = false;
        this.random = false;
    }
}

export default GUIParams;