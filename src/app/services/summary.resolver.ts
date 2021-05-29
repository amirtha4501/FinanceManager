import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DesktopService } from "./desktop.service";

@Injectable()
export class SummaryResolver implements Resolve<any> {

  constructor(private desktopService: DesktopService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.desktopService.getMonthlyTransactions();
  }
} 