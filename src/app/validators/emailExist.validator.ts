import { FormControl } from "@angular/forms";

// it works, BUT we rise this validator every time after write a simbol to INPUT control
export function checkEmailExist(emailControl: FormControl){
    let email = emailControl.value;
    if(email && email.indexOf('@') != -1){
        return {'duplicateEmail': true}
    }
    return null;
}