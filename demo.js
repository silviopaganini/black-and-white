var dat    = require('dat-gui');
var Stats  = require('stats-js');
var PIXI   = require('pixi.js');
var fit    = require('./libs/fit');

PIXI.utils._saidHello = true;

var Rect            = require('./view/Rect');
var Circle          = require('./view/Circle');
var CirclePattern   = require('./view/CirclePattern');
var TrianglePattern = require('./view/TrianglePattern');

var GUIParams = function(){
    this.speed = 0.1;
    this.interval = .5;
    this.masks = 150;
    this.maxSizeMask = 75;
    this.W = window.innerWidth;
    this.H = window.innerHeight;
    this.selectedShape = "triangles";
    this.elementsPerLine = 10;
    this.spacing = 10;
    this.debug = false;
}

var loadingCounter = 0;
var params = new GUIParams();
var stats = new Stats(); stats.domElement.style.position = 'absolute';document.body.appendChild(stats.domElement);

var stage = new PIXI.Container();

var renderer = PIXI.autoDetectRenderer(params.W, params.H);
// var renderer = new PIXI.CanvasRenderer(params.W, params.H);
document.body.appendChild(renderer.view);

var photo1 = PIXI.Sprite.fromImage('photos/bw/DSC_0161.jpg');
photo1.texture.baseTexture.on('loaded', loadedImage.bind(this));
stage.addChild(photo1);

var photo2 = PIXI.Sprite.fromImage('photos/colour/DSC_0161.jpg');
photo2.texture.baseTexture.on('loaded', loadedImage.bind(this));
stage.addChild(photo2);

var mask = new PIXI.Graphics();
// mask.isMask = true;
stage.addChild(mask);

photo2.mask = params.debug ? null : mask;

var shapes = [];

function loadedImage()
{
    loadingCounter++;
    if(loadingCounter == 2)
    {
        resizeImage(photo1);
        resizeImage(photo2);
        onResize();
        ticker.start();
    }
}

function resizeImage(image)
{
    var stage = {x : 0, y: 0, width: params.W, height: params.H};
    var imageS = {x : 0, y: 0, width: image.texture.baseTexture.realWidth, height: image.texture.baseTexture.realHeight};
    var r = fit(imageS, stage, {cover: true});
    image.width = r.width;
    image.height = r.height;
    image.x = r.tx;
    image.y = r.ty;
}

function generateShapes()
{
    var i = 0;

    for (i = 0; i < shapes.length; i++) {
        shapes[i].kill();
    };

    clearMask();

    shapes = [];
    
    var SelectedShape = Rect;
    switch(params.selectedShape)
    {
        case "rect"      : SelectedShape = Rect;   break;
        case "circle"    : SelectedShape = Circle; break;
        case "pattern"   : SelectedShape = CirclePattern; break;
        case "triangles" : SelectedShape = TrianglePattern; break;
        
    }

    var line = 0;
    params.totalShapesEven = Math.round(params.W / params.maxSizeMask) * (params.H / params.maxSizeMask);
    var maxCol = Math.round(params.W / params.maxSizeMask);

    for (i = 0; i < (params.selectedShape == "triangles" ? params.totalShapesEven : params.masks); i++) 
    {
        var shape = new SelectedShape(mask, params, i, params.masks, line);
        shapes.push(shape);
        shape.animateIn();

        if(params.selectedShape == "triangles")
        {
            if((i + 1) % maxCol == 0) line++;

        } else {

            if(i % (params.elementsPerLine) == 0) line++;
            
        }
    };
}

function clearMask()
{
    mask.clear();
    mask.lineStyle(1);
    mask.beginFill(0xFFFFFF, 1);
    mask.drawCircle(0, 0, .1);
}

var ticker = PIXI.ticker.shared;
ticker.autoStart = false;
ticker.stop();
ticker.add(update.bind(this));

function update()
{
    stats.begin();
    renderer.render(stage);
    stats.end()
}

var gui = new dat.GUI()
gui.add(params, 'selectedShape', ['rect', 'circle', 'pattern', 'triangles']).onChange(generateShapes.bind(this));
gui.add(params, 'speed', 0, .2).step(.01).onChange(generateShapes.bind(this));
gui.add(params, 'interval', 0, 1).step(.1).onChange(generateShapes.bind(this));
gui.add(params, 'masks', 0, 450).step(1).onChange(generateShapes.bind(this));
gui.add(params, 'elementsPerLine', 1, 50).step(1).onChange(generateShapes.bind(this));
gui.add(params, 'spacing', 1, 250).onChange(generateShapes.bind(this));

gui.add(params, 'maxSizeMask', 0, 200).onChange(generateShapes.bind(this));
gui.add(params, 'debug').onChange(toggleMask.bind(this));

function toggleMask()
{
    photo2.mask = params.debug ? null : mask;
}

window.onresize = onResize;
function onResize(){
    params.W = window.innerWidth;
    params.H = window.innerHeight;

    renderer.resize(params.W, params.H);

    resizeImage(photo1);
    resizeImage(photo2);

    generateShapes();
}