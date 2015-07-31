var dat    = require('dat-gui');
var Stats  = require('stats-js');
var PIXI   = require('pixi.js');
var fit    = require('./libs/fit');

PIXI.utils._saidHello = true;

var Rect   = require('./view/Rect');
var Circle = require('./view/Circle');

var GUIParams = function(){
    this.speed = 10;
    this.interval = 1;
    this.masks = 150;
    this.maxSizeMask = 75;
    this.W = window.innerWidth;
    this.H = window.innerHeight;
    this.selectedShape = "circle";
    this.debug = false;
}

var loadingCounter = 0;
var params = new GUIParams();
var stats = new Stats(); stats.domElement.style.position = 'absolute';document.body.appendChild(stats.domElement);

var stage = new PIXI.Stage(0x000000, true);
var renderer = PIXI.autoDetectRenderer(params.W, params.H);
document.body.appendChild(renderer.view);

var photo1 = PIXI.Sprite.fromImage('photos/photo-bw.jpg');
photo1.noFrame = true;
photo1.texture.baseTexture.on('loaded', loadedImage.bind(this));
stage.addChild(photo1);

var photo2 = PIXI.Sprite.fromImage('photos/photo-co.jpg');
photo2.noFrame = true;
photo2.texture.baseTexture.on('loaded', loadedImage.bind(this));
stage.addChild(photo2);

var mask = new PIXI.Graphics();
stage.addChild(mask);

var shapes = [];

function loadedImage()
{
    loadingCounter++;
    if(loadingCounter == 2)
    {
        resizeImage(photo1);
        resizeImage(photo2);
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
        case "rect"   : SelectedShape = Rect;   break;
        case "circle" : SelectedShape = Circle; break;
    }

    for (i = 0; i < params.masks; i++) 
    {
        var shape = new SelectedShape(mask, params, i);
        shapes.push(shape);
    };
}

function clearMask()
{
    mask.clear();
    mask.lineStyle(0);
    mask.beginFill(0xFFFFFF, 1);
    mask.drawCircle(0, 0, .1);
    photo2.mask = params.debug ? null : mask;
}


function update()
{
    stats.begin();

    renderer.render(stage);
    stats.end()
    
    requestAnimationFrame(update);
}

var gui = new dat.GUI()
gui.add(params, 'selectedShape', ['rect', 'circle']).onChange(generateShapes.bind(this));
gui.add(params, 'speed', 0, 100).onChange(generateShapes.bind(this));
gui.add(params, 'interval', 0, 10).onChange(generateShapes.bind(this));
gui.add(params, 'masks', 0, 450).step(1).onChange(generateShapes.bind(this));
gui.add(params, 'maxSizeMask', 0, 200).onChange(generateShapes.bind(this));
gui.add(params, 'debug').onChange(generateShapes.bind(this));


onResize();
generateShapes();
update();
window.onresize = onResize;
function onResize(){
    params.W = window.innerWidth;
    params.H = window.innerHeight;

    generateShapes()

    renderer.resize(params.W, params.H);

    resizeImage(photo1);
    resizeImage(photo2);
}