const INITIAL_DATA = {
  isFetching: false,
  error: null,
  items: [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496',
        },
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    },
  ],
};

export default function users(state = INITIAL_DATA, action) {
  switch (action.types) {
    case 'REQUEST_USERS':
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case 'REQUEST_USERS_FAILURE':
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case 'REQUEST_USERS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        error: null,
        items: action.users,
      };
    default:
      return state;
  }
}
