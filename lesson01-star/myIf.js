let elemsIf = document.querySelectorAll('[myIf]');
let htIf = new Map();

elemsIf.forEach(p => {
    htIf.set(p, p.parentNode.insertBefore(document.createComment('anchor'), p));
    p.myAttr = p.attributes["myIf"].value;
    p.removeAttribute("myIf");
});

document.onchange = function (event){
    updateIf();
};

let updateIf = function () {
    elemsIf.forEach(p => {
        if(!eval(p.myAttr)) {
            if(!p.hidden) {
                p.remove();
                p.hidden = true;
            }
        } else {
            if(p.hidden) {
                let temp = htIf.get(p);
                temp.parentNode.insertBefore(p, temp);
                p.hidden = false;
            }
        }
    });
}

updateIf();
