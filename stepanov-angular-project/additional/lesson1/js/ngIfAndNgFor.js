var elementsIf = document.body.querySelectorAll("[ngIf]");
var lengthIf = elementsIf.length;
for (var i = 0; i < lengthIf; i++) {
	var elementWithIf = elementsIf[i];
	var condition = elementWithIf.getAttribute('ngIf');
	var conditionValue = eval(condition);
	if (!conditionValue) {
		elementWithIf.style.visibility = 'hidden';
	}
	else
	{
		elementWithIf.style.visibility = 'visible';
	}
}

var elementsFor = document.body.querySelectorAll("[ngFor]");
var lengthFor = elementsFor.length;
for(let i = 0; i < lengthFor; i++)
{
	let elementFor = elementsFor[i];
	let parentElementFor = elementFor.parentElement;
	parentElementFor.removeChild(elementFor);
	let forCondition = elementFor.getAttribute('ngFor');
	let scriptCreateFor = `for (${forCondition}) {let newElement = elementFor.cloneNode(true);parentElementFor.appendChild(newElement);}`;
	eval(scriptCreateFor);
}