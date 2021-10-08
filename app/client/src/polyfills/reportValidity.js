/* Copyright (c) 2016 Tobias Buschor https://goo.gl/gl0mbf | MIT License https://goo.gl/HgajeK */

if (!HTMLFormElement.prototype.reportValidity) {
  HTMLFormElement.prototype.reportValidity = function fn1() {
    if (this.checkValidity()) return true;
    const btn = document.createElement('button');
    this.appendChild(btn);
    btn.click();
    this.removeChild(btn);
    return false;
  };
}

if (!HTMLInputElement.prototype.reportValidity) {
  HTMLInputElement.prototype.reportValidity = function fn2() {
    if (this.checkValidity()) return true;
    let tmpForm;
    if (!this.form) {
      tmpForm = document.createElement('form');
      tmpForm.style.display = 'inline';
      this.before(tmpForm);
      tmpForm.append(this);
    }
    const siblings = Array.from(this.form.elements).filter(function fn3(input) {
      return input !== this && !!input.checkValidity && !input.disabled;
    }, this);
    siblings.forEach(function fn4(input) {
      input.disabled = true;
    });
    this.form.reportValidity();
    siblings.forEach(function fn5(input) {
      input.disabled = false;
    });
    if (tmpForm) {
      tmpForm.before(this);
      tmpForm.remove();
    }
    this.focus();
    this.selectionStart = 0;
    return false;
  };
}
