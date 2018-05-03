import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import config from '../../config';
import * as actions from '../../actions/form_options';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialize_store = {
  countries: [],
  worldRegions: []
};

const mock_i94_response = {
  aggregations: {
    countries: [{key: "Canada"}, {key: "Mexico"}],
    world_regions: [{key: "North America"}]
  }
};

const mock_i92_response = {
  aggregations: {
    countries: [{key: "Canada"}, {key: "Mexico"}, {key: "United States"}],
    world_regions: [{key: "North America"}]
  }
};

const mock_spending_response = {
  aggregations: {
    countries: [{key: "Japan"}, ],
    world_regions: [{key: "Asia"}]
  }
};

const mock_siat_response = {
  aggregations: {
    countries: [{key: "China"}, {key: "Mexico"}],
    world_regions: [{key: "North America"}, {key: "Asia"}]
  }
};


const { i94_url, i92_url, spending_data_url, siat_url, apiKey } = config.api;

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('sets form options after querying API', () => {

    nock(i94_url)
      .get(`?api_key=${apiKey}&size=1`)
      .reply(200, mock_i94_response)

    nock(i92_url)
      .get(`?api_key=${apiKey}&size=1`)
      .reply(200, mock_i92_response)

    nock(spending_data_url)
      .get(`?api_key=${apiKey}&size=1`)
      .reply(200, mock_spending_data_url_response)

    nock(siat_url)
      .get(`?api_key=${apiKey}&size=1`)
      .reply(200, mock_siat_response)

    const store = mockStore(initialize_store);
    const expected_actions = [{
      type: 'explorer/SET_FORM_OPTIONS',
      countries: [{label: 'Canada', value: 'Canada'}, {label: 'Mexico', value: 'Mexico'}, {label: 'United States', value: 'United States'}, {label: 'Japan', value: 'Japan'}, {label: 'China', value: 'China'}],
      world_regions: [{label: 'North America', value: 'North America'}, {label: 'Asia', value: 'Asia'}]
    }]

    return store.dispatch(actions.requestFormOptions()).then(() => {
      expect(store.getActions()).toEqual(expected_actions);
    });
  });
});