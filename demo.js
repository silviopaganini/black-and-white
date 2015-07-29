var dat   = require('dat-gui');
var Stats = require('stats-js');
var PIXI  = require('pixi.js');
var fit = require('./libs/fit');

var W = window.innerWidth;
var H = window.innerHeight;

var loadingCounter = 0;
var GUIParams = function(){
    this.speed = 1;
    this.masks = 150;
    this.maxSizeMask = 50;
}

var params = new GUIParams();

var stats = new Stats(); stats.domElement.style.position = 'absolute';
document.body.appendChild(stats.domElement);

var stage = new PIXI.Stage(0x000000, true);
var renderer = PIXI.autoDetectRenderer(W, H);
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
mask.lineStyle(0);
stage.addChild(mask);

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
    var stage = {x : 0, y: 0, width: W, height: H};
    var imageS = {x : 0, y: 0, width: image.texture.baseTexture.realWidth, height: image.texture.baseTexture.realHeight};
    var r = fit(imageS, stage, {cover: true});
    image.width = r.width;
    image.height = r.height;
    image.x = r.tx;
    image.y = r.ty;
}

function generateShapes()
{
    mask.clear();

    console.log(params.masks)

    for (var i = 0; i < params.masks; i++) 
    {
        setTimeout(function(){
            var size = Math.random() * params.maxSizeMask;
            mask.beginFill(0xFFFFFF, 1);
            xx = Math.random() * W;
            yy = Math.random() * H;
            mask.moveTo(xx, yy);
            mask.lineTo(xx + size, yy + 0);
            mask.lineTo(xx + size, yy + size);
            mask.lineTo(xx + 0, yy + size);
            mask.lineTo(xx + 0, yy + 0);
            mask.endFill();
        }, i * params.speed);
    };
}

generateShapes();

photo2.mask = mask;

function update()
{
    stats.begin();

    renderer.render(stage);
    stats.end()
    
    requestAnimationFrame(update);
}

var gui = new dat.GUI()
gui.add(params, 'speed', 0, 10).onChange(generateShapes.bind(this));
gui.add(params, 'masks', 0, 250).step(1).onChange(generateShapes.bind(this));
gui.add(params, 'maxSizeMask', 0, 200).onChange(generateShapes.bind(this));

onResize();
update();
window.onresize = onResize;
function onResize(){
    W = window.innerWidth;
    H = window.innerHeight;

    renderer.resize(W, H);

    resizeImage(photo1);
    resizeImage(photo2);
}