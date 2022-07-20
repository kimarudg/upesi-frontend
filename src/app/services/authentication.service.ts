import { GraphqlService } from './graphql.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, take, mergeMap } from 'rxjs/operators';

import { StoreTypes } from '../constants/store-types';
import { GET_LOGIN } from '../constants/graphql/queries/auth.gql';
import { User } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private graphqlService: GraphqlService) {
    const saved = JSON.parse(sessionStorage.getItem('currentUser'));
    if (saved) {
      this.currentUserSubject = new BehaviorSubject<User>(saved);
      this.currentUser = this.currentUserSubject.asObservable();
    }
  }

  login(email: string, password: string): Observable<User> {
    return this.graphqlService
      .fetchQuery({
        query: GET_LOGIN,
        variables: { email, password },
        fetchPolicy: 'network-only',
      })
      .valueChanges.pipe(
        take(1),
        mergeMap((user) => {
          if (user.data) {
            sessionStorage.setItem(
              'currentUser',
              JSON.stringify(user.data.login)
            );
            return of(user && user.data && user.data.login);
          }

          if (user.errors) {
            throw user.errors;
          }
        })
      );
  }
}
