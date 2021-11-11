let elemsFor = document.querySelectorAll('[myFor]');

elemsFor.forEach(p => {
    p.myAttr = p.attributes["myFor"].value;
    p.innerTemplate = p.innerHTML;
    p.removeAttribute("myFor");
});

document.onclick = function (event){
    updateFor();
};

let updateFor = function (){
    elemsFor.forEach(p => {
        while (p.firstChild) {
            p.removeChild(p.lastChild);
        }
        eval(
            "for(" + p.myAttr + "){\n" +
            "    let div = document.createElement(\"div\");\n" +
            "    div.innerHTML = `" + p.innerTemplate + "`;\n" +
            "    p.insertBefore(div.firstElementChild, null);\n" +
            "}");
    });
}

updateFor();