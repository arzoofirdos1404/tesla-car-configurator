import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class Step1CompletedGuard {
  constructor(private storageService: StorageService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const step1Completed = this.storageService.isStep1Completed();
    if (step1Completed) {
      return true;
    } else {
      return this.router.createUrlTree(['/step1']);
    }
  }
}
