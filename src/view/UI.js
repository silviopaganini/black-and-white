import ee from 'event-emitter';
import ScoreLine from './ScoreLine';

class UI {
  constructor(args) {
    
    this.nav         = document.getElementsByTagName('nav')[0];
    this.startButton = document.getElementsByTagName('button')[0];
    this.logos       = document.querySelector('.logos');
    this.h1          = document.getElementsByTagName('h1')[0];
    this.aboutPage   = document.getElementById('about');
    this.wrapper     = document.getElementsByTagName('main')[0];
    this.loading     = document.getElementsByClassName('loading-container')[0];
    
    this.heartLeft   = document.getElementsByClassName('heart')[0];
    this.heartRight  = document.getElementsByClassName('heart')[1];

    this.hearts = document.getElementsByClassName('hearts')[0];

    this.animateEls = [];

    this.score = new ScoreLine();

    this.ee = ee({});

    this.heartLeft.addEventListener('click', this.onHeartClick.bind(this), false);
    this.heartRight.addEventListener('click', this.onHeartClick.bind(this), false);

    this.nav.addEventListener('click', this.onNavClick.bind(this), false);
    this.startButton.addEventListener('click', this.onStartClick.bind(this), false);

    for (var i = 0; i < this.wrapper.children.length; i++) {
      if(this.wrapper.children[i].classList[0] != 'scoreLine-container')
      {
        this.animateEls.push(this.wrapper.children[i]);
        this.wrapper.children[i].classList.add('animate-divs-main');
      }
    }
  }

  loadingAnimate(out = true)
  {
    this.loading.classList[out ? 'remove' : 'add']('animate-out');
  }

  animateInIntro()
  {
    this.score.close();
    this.loading.classList.add('animate-out');

    setTimeout( () => {

      this.wrapper.classList.add('animate-in-main');

      setTimeout( () => {

        this.loopIntroMain();
        this.nav.classList.add('animate-in-nav');

      }.bind(this), 300);

    }.bind(this), 1000);
    
  }

  loopIntroMain()
  {
    for (var i = 0; i < this.animateEls.length; i++) {
      this.animateObjectIn(this.animateEls[i], 100 * i);
    }
  }

  animateObjectIn(object, time)
  {
    setTimeout( () => {
      object.classList.add('animate-in-divs-main');  
    }.bind(this), time)
  }

  hideHearts(val = true)
  {
    this.heartLeft.classList.remove('animate-heart-vote');
    this.heartLeft.classList.remove('animate-in-heart');

    this.heartRight.classList.remove('animate-heart-vote');
    this.heartRight.classList.remove('animate-in-heart');

    this.hearts.classList[val ? "add" : "remove"]('hide');
  }

  onHeartClick(e)
  {
    this.ee.emit('vote', e.currentTarget.attributes['data-side'].value);
  }

  onStartClick(e)
  {
    this.animateOut();
    this.ee.emit('startVoting');
  }

  showHeart(which)
  {
    switch(which)
    {
      case 'bw':
        this.heartLeft.classList.add('animate-in-heart');
        this.heartRight.classList.remove('animate-in-heart');
        break;

      case 'colour':
        this.heartLeft.classList.remove('animate-in-heart');
        this.heartRight.classList.add('animate-in-heart');
        break;

      default: 
        this.heartLeft.classList.remove('animate-in-heart');
        this.heartRight.classList.remove('animate-in-heart');
        break;
    }
    
  }

  heartVoteAnim(which)
  {
    this.showHeart('');

    switch(which)
    {
      case 'bw':
        this.heartLeft.classList.add('animate-heart-vote');
        this.heartRight.classList.remove('animate-heart-vote');
        break;

      case 'colour':
        this.heartLeft.classList.remove('animate-heart-vote');
        this.heartRight.classList.add('animate-heart-vote');
        break;

      default: 
        this.heartLeft.classList.remove('animate-heart-vote');
        this.heartRight.classList.remove('animate-heart-vote');
        break;
    }
  }

  onNavClick(e)
  {
    this.aboutPage.classList.toggle('opened');
    this.nav.classList.toggle('opened');

    this.wrapper.classList.toggle('opened');
  }

  animateOut()
  {
    this.addAnimateOutClass(this.startButton);
    setTimeout(this.addAnimateOutClass.bind(this), 100, this.h1);
    setTimeout(this.addAnimateOutClass.bind(this), 200, this.logos);

    this.nav.classList.remove('opened');
    this.aboutPage.classList.remove('opened');
  }

  addAnimateOutClass(element)
  {
    element.classList.add('animate-out');
  }
}

export default UI;