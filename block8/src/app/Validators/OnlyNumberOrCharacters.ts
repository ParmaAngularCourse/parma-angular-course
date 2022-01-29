import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function OnlyNumberOrCharacters(filedName:string): ValidatorFn {  
    return (control: AbstractControl): ValidationErrors | null =>{ 
        var val = control.value;
        if(val){
            var regexp  = new RegExp('[^A-Za-zА-Яа-я0-9]+');
            if(regexp.test(val)){
                return { message: `Поле "${filedName}" должно содержать только цифры и буквы.`};
            }
            else{
                return null;
            }
        }
        else{
            return null;
        }
    }
}