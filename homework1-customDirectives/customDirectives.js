document.addEventListener('DOMContentLoaded', function(){ 
    
    document.querySelectorAll('[ngFor]').forEach(el => { 
        let ngForValue = el.getAttribute('ngFor');
        let ngForItem = ngForValue.split(' ')[1];
        el.removeAttribute('ngFor');
        let content = el.outerHTML;
        eval("for(" + ngForValue + ") " +
                "{ el.insertAdjacentHTML('beforebegin', replaceVariable('" + content + "','" + ngForItem + "'," + ngForItem + ")); }");
        el.remove();
     });

     document.querySelectorAll('[ngIf]').forEach(el => { 
        if(!eval(el.getAttribute('ngIf'))) {
            el.remove();
        }
    });
});

let replaceVariable = function(str, variableName, value) {
    return str.replace('{{' + variableName + '}}', value);
}