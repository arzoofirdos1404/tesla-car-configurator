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
export class Step2CompletedGuard {
  constructor(private storageService: StorageService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const step2Completed = this.storageService.isStep2Completed();
    if (step2Completed) {
      return true;
    } else {
      return this.router.createUrlTree(['/step2']);
    }
  }
}
