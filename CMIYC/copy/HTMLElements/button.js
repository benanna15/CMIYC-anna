export class MyButton extends HTMLButtonElement {
    constructor(_id, _class, _text, _callback) {
      super();
      if (_id) this.id = _id;
      if (_class) this.className = _class;
      if (_text) {
        var span=document.createElement("span")
        span.innerText = _text;
        span.className+=" text-btn "
      
      }
      this.addEventListener("click", _callback);
    }
  }
  customElements.define("my-button", MyButton, { extends: "button" });

  