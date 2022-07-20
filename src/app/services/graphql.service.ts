import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Mutation, Query } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private apollo: Apollo) {}

  fetchQuery(query: any) {
    return this.apollo.watchQuery<Query>(query);
  }

  postMutation(query: any) {
    return this.apollo.mutate<Mutation>(query);
  }
}
