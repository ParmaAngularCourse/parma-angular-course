import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function NotEmptyStringValidator(filedName:string): ValidatorFn {  
    return (control: AbstractControl): ValidationErrors | null =>{ 
        var val = control.value;
        if(val){
            if((typeof val === 'string' || val instanceof String)
               && val.replace(/( |\r\n|\n|\r)/gm, '').length === 0){
                return { message: `Поле "${filedName}" не может быть пустым`}
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