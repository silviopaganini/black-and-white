class UI {
  constructor(args) {
    
    this.nav         = document.getElementsByTagName('nav')[0];
    this.startButton = document.getElementsByTagName('button')[0];
    this.logos       = document.querySelector('.logos');
    this.h1          = document.getElementsByTagName('h1')[0];
    this.aboutPage   = document.getElementById('about');

    this.nav.addEventListener('click', this.onNavClick.bind(this), false);
    this.startButton.addEventListener('click', this.onStartClick.bind(this), false);
  }

  onStartClick(e)
  {
    this.animateOut();
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