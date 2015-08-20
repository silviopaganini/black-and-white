import Stats     from "stats-js";
import dat       from "dat-gui";
import GUIParams from "./utils/GUIParams";
import Main      from "./Main";
import ajax      from './utils/core';

var params = new GUIParams();
var gui = null;

// var data = {
//     cdn_url : '//static.fluuu.id/photos/',
//     photos : [
//         {url : "_DSC0193.jpg", votes: {bw: 0, colour: 0}},
//         {url : "_DSC0349.jpg", votes: {bw: 0, colour: 0}},
//         {url : "_DSC0495.jpg", votes: {bw: 0, colour: 0}},
//         {url : "DSC_0161.jpg", votes: {bw: 0, colour: 0}},
//         {url : "DSC_0169.jpg", votes: {bw: 0, colour: 0}},
//         {url : "DSC_0174.jpg", votes: {bw: 0, colour: 0}},
//         {url : "DSC_0207.jpg", votes: {bw: 0, colour: 0}},
//         {url : "DSC_0245.jpg", votes: {bw: 0, colour: 0}},
//         {url : "DSC_0252.jpg", votes: {bw: 0, colour: 0}},
//         {url : "DSC_0307.jpg", votes: {bw: 0, colour: 0}},
//         {url : "DSC_0327.jpg", votes: {bw: 0, colour: 0}},
//         {url : "DSC_0416.jpg", votes: {bw: 0, colour: 0}},
//         {url : "DSC_0458-5.jpg", votes: {bw: 0, colour: 0}},
//         {url : "IMG_0039.jpg", votes: {bw: 0, colour: 0}},
//         {url : "IMG_0156.jpg", votes: {bw: 0, colour: 0}},
//         {url : "IMG_0191.jpg", votes: {bw: 0, colour: 0}},
//         {url : "IMG_0294.jpg", votes: {bw: 0, colour: 0}},
//         {url : "IMG_0314.jpg", votes: {bw: 0, colour: 0}},
//         {url : "IMG_0324.jpg", votes: {bw: 0, colour: 0}},
//         {url : "IMG_0327.jpg", votes: {bw: 0, colour: 0}},
//         {url : "IMG_0334.jpg", votes: {bw: 0, colour: 0}},
//         {url : "IMG_0433.jpg", votes: {bw: 0, colour: 0}},
//         {url : "IMG_0478.jpg", votes: {bw: 0, colour: 0}},
//         {url : "IMG_0616.jpg", votes: {bw: 0, colour: 0}},
//         {url : "IMG_0774.jpg", votes: {bw: 0, colour: 0}},
//         {url : "IMG_1018.jpg", votes: {bw: 0, colour: 0}},
//         {url : "IMG_1484.jpg", votes: {bw: 0, colour: 0}},
//         {url : "IMG_1679.jpg", votes: {bw: 0, colour: 0}},
//         {url : "IMG_1848.jpg", votes: {bw: 0, colour: 0}},
//         {url : "IMG_2041.jpg", votes: {bw: 0, colour: 0}},
//         {url : "IMG_2460.jpg", votes: {bw: 0, colour: 0}}
//     ]
// }

var stats = new Stats(); 
stats.domElement.style.position = 'absolute';
document.body.appendChild(stats.domElement);

const main = new Main(params, function(){
    onResize();
    // startGUI()
    update();
});

function update()
{
    stats.begin();
    main.render(params);
    stats.end()
    requestAnimationFrame(update);
}

function startGUI()
{
    gui = new dat.GUI()
    gui.add(params, 'selectedShape', ['rect', 'circle','circlePolar', 'pattern', 'triangles']).onChange(main.stage.generateShapes.bind(main.stage));
    // gui.add(params, 'speed', 0, .2).step(.01).onChange(generateShapes.bind(main.stage));
    // gui.add(params, 'interval', 0, 1).step(.1).onChange(generateShapes.bind(main.stage));
    gui.add(params, 'masks', 0, 450).step(1).onChange(main.stage.generateShapes.bind(main.stage));
    gui.add(params, 'elementsPerLine', 1, 50).step(1).onChange(main.stage.generateShapes.bind(main.stage));
    gui.add(params, 'spacing', 1, 250).onChange(main.stage.generateShapes.bind(main.stage));

    gui.add(params, 'maxSizeMask', 0, 200).onChange(main.stage.generateShapes.bind(main.stage));
    gui.add(params, 'debug').onChange(main.stage.toggleMask.bind(main.stage));
    gui.add(params, 'random').onChange(main.stage.generateShapes.bind(main.stage));
}

window.onresize = onResize;

function onResize(){
    params.W = window.innerWidth;
    params.H = window.innerHeight;

    main.stage.renderer.resize(params.W, params.H);

    main.resize();
    // main.stage.generateShapes();
}