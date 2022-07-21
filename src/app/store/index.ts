import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';
import { State } from './../interfaces/state.interface';
import { Injectable } from '@angular/core';
import { User } from '../constants/models/user.model';

const appState: State = {
  user: {} as User,
};

@Injectable({
  providedIn: 'root',
})
export class Store {
  private subject = new BehaviorSubject<State>(appState);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get getState(): State {
    return this.subject.value;
  }

  // select<T>(name: string): Observable<T> {
  //   return this.store.pipe(pluck(name));
  // }

  set(name: string, state: any) {
    this.subject.next({
      ...this.getState,
      [name]: state,
    });
  }
}
