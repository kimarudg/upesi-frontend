import { TestBed } from '@angular/core/testing';

import gql from 'graphql-tag';
import {
  ApolloTestingModule,
  ApolloTestingController,
} from 'apollo-angular/testing';
import { GraphqlService } from './graphql.service';

describe('GraphqlService', () => {
  let controller: ApolloTestingController;
  let graphqlService;
  const GET_DOG_QUERY = gql`
    query getDog($name: String) {
      dog(name: $name) {
        id
        name
        breed
      }
    }
  `;

  const POST_DOG_MUATION = gql`
    mutation postDog($dog: Dog) {
      dog(dog: $dog) {
        id
        name
        breed
      }
    }
  `;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [GraphqlService],
    });

    graphqlService = TestBed.inject(GraphqlService);
    controller = TestBed.inject(ApolloTestingController);
  });

  it('should be created', () => {
    expect(graphqlService).toBeTruthy();
  });

  it('should call fetchQuery method and return query result', () => {
    //Call the relevant method
    graphqlService
      .fetchQuery({
        query: GET_DOG_QUERY,
        variables: {
          name: 'Mr Apollo',
        },
      })
      .valueChanges.subscribe((dog) => {
        //Make some assertion about the result;
        expect(dog.data.dog.id).toEqual(0);
        expect(dog.data.dog.name).toEqual('Mr Apollo');
      });

    // The following `expectOne()` will match the operation's document.
    // If no requests or multiple requests matched that document
    // `expectOne()` would throw.
    const op = controller.expectOne(GET_DOG_QUERY);

    // Assert that one of variables is Mr Apollo.
    expect(op.operation.variables.name).toEqual('Mr Apollo');

    // Respond with mock data, causing Observable to resolve.
    op.flush({
      data: {
        dog: {
          id: 0,
          name: 'Mr Apollo',
          breed: 'foo',
        },
      },
    });
  });

  it('should call postMutation method and return muatation result', () => {
    //Call the relevant method
    graphqlService
      .postMutation({
        mutation: POST_DOG_MUATION,
        variables: {
          dog: {
            name: 'Pluto',
            breed: 'bar',
          },
        },
      })
      .subscribe((dog) => {
        //Make some assertion about the result;
        expect(dog.data.dog.id).toEqual(1);
        expect(dog.data.dog.name).toEqual('Pluto');
      });

    const op = controller.expectOne(POST_DOG_MUATION);

    // Assert that one of variables is Pluto.
    expect(op.operation.variables.dog.name).toEqual('Pluto');

    // Respond with mock data, causing Observable to resolve.
    op.flush({
      data: {
        dog: {
          id: 1,
          name: 'Pluto',
          breed: 'bar',
        },
      },
    });
  });

  afterEach(() => {
    // Finally, assert that there are no outstanding operations.
    controller.verify();
  });
});
