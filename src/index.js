import Stats     from "stats-js";
import dat       from "dat-gui";
import GUIParams from "./utils/GUIParams";
import Main      from "./Main";
import ajax      from './utils/core';

var params = new GUIParams();
var gui = null;

var stats = new Stats(); 
stats.domElement.style.position = 'absolute';
document.body.appendChild(stats.domElement);

const main = new Main(params, function(){
    onResize();
    startGUI()
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
    main.stage.generateShapes();
}