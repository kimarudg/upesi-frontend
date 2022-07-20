import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../../../environments/environment';

export function graphqlFactory(httpLink: HttpLink) {
  return {
    cache: new InMemoryCache({
      addTypename: false,
    }),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
      },
    },
    link: httpLink.create({
      uri: environment.graphqlUrl,
    }),
  };
}
