import '@angular/common/locales/global/ru';

export class StatusMsg{
    public status:boolean = true;
    public message:string = '';

    constructor(status:boolean, message: string)
    {
        this.status = status;
        this.message = message;
    }
  }