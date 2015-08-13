import Rect            from './view/Rect';
import Circle          from "./view/Circle";
import CirclePattern   from './view/CirclePattern';
import TrianglePattern from './view/TrianglePattern';
import CirclePolar     from './view/CirclePolar';

import PIXI            from "pixi.js";
import fit             from "./libs/fit";
import Utils           from "utils-perf";
import {ajax as ajax}  from "./utils/core";

PIXI.utils._saidHello = true;

class Main 
{
  constructor(params, callback) 
  {
    this.params         = params;
    this.photos         = null;
    this.currentPhoto   = null;
    this.photo1         = null;
    this.photo2         = null;
    this.loadingCounter = 0;
    this.onLoadComplete = callback;
    this.shapes         = [];
    this.loadDB()
  }

  loadDB()
  {
    ajax({
        url: "https://blinding-torch-6748.firebaseio.com/rest/photos.json",
        done: function(e){
            this.photos = JSON.parse(e);
            this.init();
        }.bind(this)
    });
  }

  init()
  {
    this.createRenderer();
    this.loadPictures();
    this.toggleMask();
    this.generateShapes();
  }

  render(params)
  {
    this.params = params;
    this.renderer.render(this.stage);
  }

  toggleMask()
  {
    this.photo2.mask = this.params.debug ? null : this.mask;
  }

  createRenderer()
  {
    this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer(this.params.W, this.params.H);
    document.body.appendChild(this.renderer.view);

    this.mask = new PIXI.Graphics();
    this.stage.addChild(this.mask);
  }

  getRandomPhoto()
  {
    var randPhoto = this.photos[Utils.round(Utils.random(0, this.photos.length))];
    // if(window.location.href.indexOf('localhost') > -1) randPhoto = "IMG_0334.jpg";
    return randPhoto;
  }

  getPhotoURL(colour, photo)
  {
    return window.config.CDN + window.config.PATH + colour + "/" + photo;
  }

  loadPictures()
  {
    this.currentPhoto = this.getRandomPhoto();

    this.photo1 = PIXI.Sprite.fromImage(this.getPhotoURL('bw', this.currentPhoto.url));
    this.photo1.texture.baseTexture.on('loaded', this.loadedImage.bind(this));
    this.stage.addChildAt(this.photo1, 0);

    this.photo2 = PIXI.Sprite.fromImage(this.getPhotoURL('colour', this.currentPhoto.url));
    this.photo2.texture.baseTexture.on('loaded', this.loadedImage.bind(this));
    this.stage.addChildAt(this.photo2, 1);
  }

  loadedImage()
  {
      this.loadingCounter++;
      if(this.loadingCounter == 2)
      {
          this.onLoadComplete();
      }
  }

  resize()
  {
    this.resizeImage(this.photo1);
    this.resizeImage(this.photo2);
  }

  resizeImage(image)
  {
      var stage = {x : 0, y: 0, width: this.params.W, height: this.params.H};
      var imageS = {x : 0, y: 0, width: image.texture.baseTexture.realWidth, height: image.texture.baseTexture.realHeight};
      var r = fit(imageS, stage, {cover: true});
      image.width = r.width;
      image.height = r.height;
      image.x = r.tx;
      image.y = r.ty;
  }

  clearMask()
  {
      this.mask.clear();
      this.mask.lineStyle(1);
      this.mask.beginFill(0xFFFFFF, 1);
      this.mask.drawCircle(0, 0, .1);
  }

  generateShapes()
  {
      let i = 0;

      for (i = 0; i < this.shapes.length; i++) this.shapes[i].kill();

      this.clearMask();

      this.shapes = [];
      
      let SelectedShape = Rect;

      switch(this.params.selectedShape)
      {
          case "rect"        : SelectedShape = Rect;   break;
          case "circle"      : SelectedShape = Circle; break;
          case "pattern"     : SelectedShape = CirclePattern; break;
          case "triangles"   : SelectedShape = TrianglePattern; break;
          case "circlePolar" : SelectedShape = CirclePolar; break;
          
      }

      let line = 0;
      this.params.totalShapesEven = (Math.round(this.params.W / this.params.maxSizeMask)+1) * (Math.round(this.params.H / this.params.maxSizeMask) + 1);
      let maxCol = Math.round(this.params.W / this.params.maxSizeMask) + 1;

      let sizeLoop = null
      switch(this.params.selectedShape)
      {
          case "triangles": 
              sizeLoop = this.params.totalShapesEven;
              break;
          default : 
              sizeLoop = this.params.masks; 
              break;
      }

      for (i = 0; i < sizeLoop; i++) 
      {
          let shape = new SelectedShape(this.mask, this.params, i, this.params.masks, line);
          this.shapes.push(shape);
          shape.animateIn();

          if(this.params.selectedShape == "triangles")
          {
              if((i + 1) % maxCol == 0) line++;

          } else {

              if(i % (this.params.elementsPerLine) == 0) line++;
              
          }
      }
  }

}

module.exports = Main;