import {
  SEARCH_FOR_TWEETS_REQUESTED,
  SEARCH_FOR_TWEETS_SUCCESS,
  SEARCH_FOR_TWEETS_ERROR,
  SET_ACTIVE_SEARCH,
} from '../actions';

import {log} from '../utilities.js';

export function activeSearch(state = '', action) {
  switch (action.type) {
    case SEARCH_FOR_TWEETS_REQUESTED:
      return action.searchText;
    case SET_ACTIVE_SEARCH:
      return action.searchText;
    default:
      return state;
  }
}

// let initialTweets = {};
let initialTweets = {
  '#android': [
    {
      id: '001',
      text:
        '@Android : #Android is made for everyone. Follow along for the latest updates and stories behind our tech. Questions? Get assistance by using #AndroidHelp.',
    },
    {
      id: '002',
      text:
        '@GamesPayOnline: The OnePlus Nord will be 5G-enabled and cost less than $500 #Android',
    },
    {
      id: '003',
      text:
        '@hlty48u: #Android #homescreen #kwgt Template by  @GalerVodgals Widgets~  @ErickMe60981264',
    },
  ],
  '#thala': [
    {
      id: '001',
      text: '@cinemapayyan: Leading us by an example Collision symbol #Thala',
    },
    {
      id: '002',
      text: '@SSMuiscTweet: The Stylish #Thala !!',
    },
    {
      id: '003',
      text:
        '@SSMuiscTweet: The Stylish #Thala !! A #Verithanam click of #Thala !!',
    },
  ],
};

export function tweets(state = initialTweets, action) {
  switch (action.type) {
    case SEARCH_FOR_TWEETS_SUCCESS:
      return {
        ...state,
        [action.searchText]: action.tweets,
      };
    default:
      return state;
  }
}

// let initialSearches = {};

let initialSearches = {
  '#android': {
    isSearching: false,
    error: null,
  },
  '#thala': {
    isSearching: false,
    error: null,
  },
};

export function searches(state = initialSearches, action) {
  switch (action.type) {
    case SEARCH_FOR_TWEETS_REQUESTED:
      log('searching tweets 2 - ' + action.searchText);
      return {
        ...state,
        [action.searchText]: {
          isSearching: true,
          error: '',
        },
      };
    case SEARCH_FOR_TWEETS_SUCCESS:
      return {
        ...state,
        [action.searchText]: {
          isSearching: false,
          error: null,
        },
      };
    case SEARCH_FOR_TWEETS_ERROR:
      return {
        ...state,
        [action.searchText]: {
          isSearching: false,
          error: action.error,
        },
      };
    default:
      return state;
  }
}
