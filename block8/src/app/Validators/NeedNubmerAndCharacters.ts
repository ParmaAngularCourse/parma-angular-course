import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function NeedNubmerAndCharacters(filedName:string): ValidatorFn {  
    return (control: AbstractControl): ValidationErrors | null =>{ 
        var val = control.value;
        if(val){
            var regexp  = new RegExp('^(?=.*[0-9])(?=.*[a-zA-Zа-яА-я])([a-zA-Zа-яА-я0-9]{6,16})$');
            if(regexp.test(val)){
                return null
            }
            else{
                return { message: `Поле "${filedName}" должно содержать хотя бы одину цифру и одну букву. И не должно быть меньше 6 и больше 16 символов.`};
            }
        }
        else{
            return null;
        }
    }
}