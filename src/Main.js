import Firebase from './utils/Firebase';
import Stage    from './view/Stage';
import Utils    from "utils-perf";
import UI       from "./view/UI";
import ee       from 'event-emitter';

PIXI.utils._saidHello = true;

class Main 
{
  constructor(params, callback) 
  {
    this.UID          = "blinding-torch-6748";
    this.params       = params;
    this.CDN          = null;
    this.photos       = null;
    this.currentPhoto = null;
    this.callback     = callback;
    this.params.state = 0;
    this.first = true;
    this.nextPhoto = 0;

    this.ui = new UI();
    this.ui.ee.once('startVoting', this.startVoting.bind(this));
    this.ui.ee.on('vote', this.vote.bind(this));

    this.loadDB();

  }

  init()
  {
    this.stage = new Stage(this.params);
    this.stage.ee.on('completeLoading', this.onCompleteLoading.bind(this));

    this.photos = Utils.randomArray(this.photos);

    this.currentPhoto = this.getNextPhoto();

    this.ui.wrapper.insertBefore(this.stage.domElement, this.ui.wrapper.firstChild);
    this.stage.loadPictures( this.currentPhoto.photo );
  }

  loadDB()
  {
    this.db = new Firebase(this.UID);
    this.db.get('cdnURL/', function(e)
    {
      this.CDN = window.location.href.indexOf('localhost') > -1 || window.location.href.indexOf('bw.fluuu.id') > -1 ? 'static/photos/' : e;

      this.db.get('photos/', function(e)
      {
        this.photos = e;
        this.photos.forEach(function(e, i){ e.index = i; e.url = this.CDN + "{x}/" + e.url; }.bind(this));
        this.init();

      }.bind(this));

    }.bind(this));

  }

  /*
  methods
  */

  restart()
  {
    this.ui.loadingAnimate(true);
    this.ui.score.close();
    this.currentPhoto = this.getNextPhoto();
    this.stage.loadPictures( this.currentPhoto.photo );
  }

  vote(e)
  {
    this.ui.heartVoteAnim(e);
    this.db.votePhotoID(this.currentPhoto.index, e, function(e){
      this.params.state = 0;
      this.ui.hideHearts();
      this.db.get('photos/' + this.currentPhoto.index + "/votes/", this.votingComplete.bind(this));

    }.bind(this));
  }

  votingComplete(e)
  {
    this.ui.score.update(e);
    this.stage.animateSide(1, this.stage.generateShapes.bind(this.stage));
    setTimeout(this.restart.bind(this), 2000);
  }

  startVoting()
  {
    this.params.state = 1;
  }

  onCompleteLoading()
  {
    this.stage.createIntro();

    if(this.first)
    {
      this.ui.animateInIntro();
      this.first = false;
      this.callback();
    } else {
      this.ui.loadingAnimate(false);
      this.startVoting();
      this.ui.hideHearts(false);
    }
  }

  render(params)
  {
    this.params = params;
    this.stage.render(this.params);
  }

  onMouseMove(e)
  {
    if(!this.stage) return;
    if(this.params.state != 1) return;

    let areas = this.params.W / 5;

    switch(true)
    {
      case e.clientX <= areas * 2:
        this.stage.animateSide(1);
        this.ui.showHeart('bw');
        break;

      case e.clientX >= areas * 3:
        this.stage.animateSide(2);
        this.ui.showHeart('colour');
        break;

      default: 
        this.stage.animateSide(0);
        this.ui.showHeart(' ');
        break;
    }

  }

  getNextPhoto()
  {
    var randPhoto = this.photos[this.nextPhoto];
    this.nextPhoto++;
    this.nextPhoto %= this.photos.length-1; 
    return {index: randPhoto.index, photo: randPhoto};
  }

  resize(w, h)
  {
    this.stage.renderer.resize(w, h);
    this.stage.resize();
  }

}

export default Main;