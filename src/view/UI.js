import ee from 'event-emitter';
import ScoreLine from './ScoreLine';

class UI {
  constructor(args) {
    
    this.nav         = document.getElementsByTagName('nav')[0];
    this.startButton = document.getElementsByTagName('button')[0];
    this.logos       = document.querySelector('.logos');
    this.h1          = document.getElementsByTagName('h1')[0];
    this.aboutPage   = document.getElementById('about');
    
    this.heartLeft   = document.getElementsByClassName('heart')[0];
    this.heartRight  = document.getElementsByClassName('heart')[1];

    this.hearts = document.getElementsByClassName('hearts')[0];

    this.score = new ScoreLine();

    this.ee = ee({});

    this.heartLeft.addEventListener('click', this.onHeartClick.bind(this), false);
    this.heartRight.addEventListener('click', this.onHeartClick.bind(this), false);

    this.nav.addEventListener('click', this.onNavClick.bind(this), false);
    this.startButton.addEventListener('click', this.onStartClick.bind(this), false);
  }

  hideHearts()
  {
    this.hearts.classList.add('hide');
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

    document.getElementById('wrapper').classList.toggle('opened');
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