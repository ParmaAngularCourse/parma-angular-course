import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function NewsDateValidator(filedName:string): ValidatorFn {  
    return (control: AbstractControl): ValidationErrors | null =>{ 
        var val = control.value;
        if(val){
            if(!(val instanceof Date)){
                val = new Date(val);
            }

            if(val > new Date()){
                return { message: `Поле "${filedName}" не должно быть больше текущей даты`}
            }
            else{
                return null;
            }
        }
        else{
            return { message: `Поле "${filedName}" не может быть пустым`}
        }
    }
}