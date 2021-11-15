var CustomNGIf = function(element, key, value) {
    if(element){
        this.element = element;
        this.parent = element.parentNode;
    }
    
    if (!value) {
        this.element = this[key];
        this[key] = null;
        this.parent.appendChild(this.element);
    } else {
        this[key] = this.element.cloneNode(true);
        this.element.remove();
    } 
  }