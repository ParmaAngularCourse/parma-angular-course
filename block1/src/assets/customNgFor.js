var CustomNGFor = function(parent, array, createBlockFunction){
    var value = '';
    for(var i=0; i<array.length; i++){
        var currentValue = array[i];
        value += createBlockFunction(currentValue);      
     }
     parent.innerHTML += value;
}