class Wrapper  {
  constructor(args) 
  {
    this.domElement = document.getElementById('wrapper');
  }

  add(child)
  {
    this.domElement.appendChild(child);
  }
}

export default Wrapper;