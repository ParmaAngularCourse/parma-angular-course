const ngIf = "ngIf";
const ngFor = "ngFor";
items = ["Masha", "Alice", "Bob"];

onChange();

document.addEventListener('change', function () {
  onChange();
});

function onChange() {
  console.log('start rebuilding');
  var testDiv = document.querySelector("#testDiv");
  var template = document.querySelector('#testTemplate');
  var clone = template.content.cloneNode(true);
  clone.querySelectorAll(`[${ngIf}]`).forEach(x => {
    if (!eval(x.getAttribute(ngIf))) x.parentNode.removeChild(x);
    x.removeAttribute(ngIf);
  });
  clone.querySelectorAll(`[${ngFor}]`).forEach(x => {
    eval(`for (${x.getAttribute(ngFor)}) { var n = x.cloneNode(true); x.parentNode.appendChild(n); n.removeAttribute(ngFor); n.innerHTML = eval(n.innerHTML); }`);
    x.parentNode.removeChild(x);
  });
  testDiv.innerHTML = '';
  testDiv.appendChild(clone);
}

function isTestCBChecked() {
  return document.getElementById('testCB').checked;
}
