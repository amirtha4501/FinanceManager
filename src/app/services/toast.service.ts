import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastrService: ToastrService
  ) { }

  warning(message: string, title: string = null) {
    this.toastrService.warning(message, title);
  }

  info(message: string, title: string = null) {
    this.toastrService.info(message, title);
  }
  
  success(message: string, title: string = null) {
    this.toastrService.success(message, title);
  }

  error(message: string, title: string = null) {
    this.toastrService.error(message, title);
  }
}
