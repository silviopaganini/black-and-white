import Firebase from './utils/Firebase';
import Wrapper  from './view/Wrapper';
import Stage    from './view/Stage';
import Utils    from "utils-perf";
import ee       from 'event-emitter';

PIXI.utils._saidHello = true;

class Main 
{
  constructor(params, callback) 
  {
    this.UID          = "blinding-torch-6748";
    this.params       = params;
    this.photos       = null;
    this.currentPhoto = null;
    this.callback     = callback;
    this.loadDB();

  }

  loadDB()
  {
    this.db = new Firebase(this.UID);
    this.db.get('photos/', function(e){
      this.photos = e;
      this.init();
    }.bind(this))
  }

  init()
  {
    this.wrapper = new Wrapper();
    this.stage = new Stage(this.params);
    this.stage.ee.once('completeLoading', this.callback);

    this.wrapper.add(this.stage.domElement);
    this.stage.loadPictures( this.getRandomPhoto() );
  }

  render(params)
  {
    this.params = params;
    this.stage.render();
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

  resize()
  {
    this.stage.resize()
  }

}

export default Main;