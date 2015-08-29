import Rect            from './shapes/Rect';
import Circle          from "./shapes/Circle";
import CirclePattern   from './shapes/CirclePattern';
import TrianglePattern from './shapes/TrianglePattern';
import CirclePolar     from './shapes/CirclePolar';
import Fifty           from './shapes/Fifty';

import PIXI            from "pixi.js";
import fit             from "./../libs/fit";
import Utils           from "utils-perf";
import ee              from 'event-emitter';

class Stage  {
  constructor(params) 
  {
    this.stage    = null;
    this.renderer = null;
    this.mask     = new PIXI.Graphics();
    this.params   = params;
    this.shapes   = [];

    this.prevPic1       = null;
    this.prevPic2       = null;
    
    this.currentPhoto   = null;
    this.photo1         = null;
    this.photo2         = null;
    this.loadingCounter = 0;
    this.ee             = ee({});

    this.stage      = new PIXI.Container();
    this.renderer   = PIXI.autoDetectRenderer(params.W, params.H);
    this.domElement = this.renderer.view;

    this.stage.addChild(this.mask);
  }

  getPhotoURL(colour, photo) { return photo.split("{x}").join(colour) + "?r=" + Utils.round(Utils.random(9999)); }

  toggleMask()
  {
    this.photo2.mask = this.params.debug ? null : this.mask;
  }

  loadPictures(photo)
  {
    this.currentPhoto = photo;

    // for (var i = this.stage.children.length - 1; i >= 0; i--) {
    //   this.stage.removeChild(this.stage.children[i]);
    // };

    if(this.photo1 && this.photo2)
    {
      this.prevPic1 = this.photo1;
      this.prevPic2 = this.photo2;
    }

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
          this.loadingCounter = 0;

          this.resizeImage(this.photo1);
          this.resizeImage(this.photo2);

          if(this.prevPic1 && this.prevPic2)
          {
            this.timeline = new TimelineMax({onComplete: this.onLoadComplete.bind(this)});

            this.timeline.add( TweenMax.to(this.prevPic1, .8, {ease: Power4.easeInOut, y: -this.prevPic1.height}) ,0);
            this.timeline.add( TweenMax.to(this.prevPic2, .8, {ease: Power4.easeInOut, y: -this.prevPic1.height}) ,0);

            this.timeline.add( TweenMax.from(this.photo1, .8, {ease: Power4.easeInOut, y: this.photo1.height}) ,0);
            this.timeline.add( TweenMax.from(this.photo2, .8, {ease: Power4.easeInOut, y: this.photo2.height}) ,0);

          } else {
            this.onLoadComplete();
          }

      }
  }

  onLoadComplete()
  {
    if(this.prevPic1 && this.prevPic2)
    {
      this.stage.removeChild(this.prevPic1);
      this.stage.removeChild(this.prevPic2);
    }

    this.clearMask();
    this.toggleMask();

    this.ee.emit('completeLoading');
  }

  resize()
  {
    this.resizeImage(this.photo1);
    this.resizeImage(this.photo2);

    if(this.params.state == 2)
    {
      this.generateShapes();
    } else {
      this.shapes[0].resize();
    }
  }

  render(params)
  {
    this.params = params;
    this.renderer.render(this.stage);
  }

  clearMask()
  {
      this.mask.clear();
      this.mask.lineStyle(1);
      this.mask.beginFill(0xFFFFFF, 1);
      this.mask.drawCircle(0, 0, .1);
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

  animateSide(whichSide, cb)
  {
    this.shapes[0].animateSide(whichSide, cb);
  }

  createIntro()
  {
    for (let i = 0; i < this.shapes.length; i++) this.shapes[i].kill();
    this.clearMask();

    this.shapes = [];

    let shape = new Fifty(this.mask, this.params, 0, this.params.masks, 0);
    this.shapes.push(shape);
    shape.animateIn();
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

export default Stage;