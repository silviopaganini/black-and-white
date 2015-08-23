class ScoreLine {
  constructor() {
    this.el = document.querySelector('.scoreLine');
    this.bwScore = this.el.querySelector('[data-type="bw"]');
    this.colourScore = this.el.querySelector('[data-type="colour"]');
  }

  update(votes)
  {
    this.el.classList.add('score-animate-in');
    let totalVotes = votes.bw + votes.colour;
    let bwPerc     = Math.round((votes.bw / totalVotes) * 100);
    let colourPerc = Math.round((votes.colour / totalVotes) * 100);

    this.bwScore.innerText = bwPerc + "%";
    this.colourScore.innerText = colourPerc + "%";
  }

  close()
  {
    this.el.classList.remove('score-animate-in');
  }
}

export default ScoreLine;