/*
  The I-94, I-92, Spending, and SIAT APIs must be available locally via webservices and endpointme in order for this test to run!
*/
import config from '../../config';
import fetch from 'isomorphic-fetch';

const { i94_url, i92_url, spending_data_url, siat_url, apiKey } = config.api;

describe('fetching results from I-94 api', () => {
  const expected_result_fields = 
    ['id', 'i94_country_or_region', 'date', 'country', 'world_region', 'ntto_group', 'total_arrivals', 'business_visa_arrivals', 'pleasure_visa_arrivals', 'student_visa_arrivals', 'ports_arrivals'];
  const expected_aggregations = ['countries', 'world_regions', 'ntto_groups'];

  it('expects the correct schema from the api', () => {
    return fetch(`${i94_url}?api_key=${apiKey}&size=1`)
    .then(response => response.json())
    .then((json) => {
      const result_fields = Object.keys(json.results[0]);
      expect(result_fields).toEqual(expected_result_fields);

      const aggregations = Object.keys(json.aggregations);
      expect(aggregations).toEqual(expected_aggregations);
    })
  })
})

describe('fetching results from I-92 api', () => {
  const expected_result_fields = 
    ['id', 'date', 'event_type', 'us_port', 'region', 'country_name', 'foreign_port', 'citizens_total', 'citizens_pct', 
      'aliens_total', 'aliens_pct', 'us_flag_total', 'us_flag_pct', 'foreign_flag_total', 'foreign_flag_pct', 
      'scheduled_flights_total', 'scheduled_flights_pct', 'chartered_flights_total', 'chartered_flights_pct', 
      'passenger_total', 'country', 'world_region'];
  const expected_aggregations = ['countries', 'world_regions'];

  it('expects the correct schema from the api', () => {
    return fetch(`${i92_url}?api_key=${apiKey}&size=1`)
    .then(response => response.json())
    .then((json) => {
      const result_fields = Object.keys(json.results[0]);
      expect(result_fields).toEqual(expected_result_fields);

      const aggregations = Object.keys(json.aggregations);
      expect(aggregations).toEqual(expected_aggregations);
    })
  })
})

describe('fetching results from Spending Data api', () => {
  const expected_result_fields = 
    ['id', 'date', 'country_or_region', 'country', 'world_region', 'total_exports', 'goods_exports', 'services_exports',
     'travel_and_tourism_exports', 'travel_exports', 'education_travel_exports', 'business_personal_travel_exports', 
     'passenger_air_transportation_exports', 'percent_change_travel_and_tourism_exports', 'percent_change_travel_exports',
     'percent_change_passenger_air_transportation_exports', 'percent_of_total_us_exports_to', 'percent_of_total_us_services_exports_to',
     'total_imports', 'goods_imports', 'services_imports',
     'travel_and_tourism_imports', 'travel_imports', 'education_travel_imports', 'business_personal_travel_imports', 
     'passenger_air_transportation_imports', 'percent_change_travel_and_tourism_imports', 'percent_change_travel_imports',
     'percent_change_passenger_air_transportation_imports', 'percent_of_total_us_imports_from', 
     'percent_of_total_us_services_imports_from', 'balance_of_trade', 'percent_change_balance_of_trade' ];
  const expected_aggregations = ['countries', 'world_regions'];

  it('expects the correct schema from the api', () => {
    return fetch(`${spending_data_url}?api_key=${apiKey}&size=1`)
    .then(response => response.json())
    .then((json) => {
      const result_fields = Object.keys(json.results[0]);
      expect(result_fields).toEqual(expected_result_fields);

      const aggregations = Object.keys(json.aggregations);
      expect(aggregations).toEqual(expected_aggregations);
    })
  })
})

describe('fetching results from SIAT api', () => {
  const expected_result_fields = 
    ['id', 'type', 'date', 'question', 'group', 'answer', 'number_of_respondents', 'percentage_or_value', 
     'country', 'world_region'];
  const expected_aggregations = ['countries', 'world_regions'];

  it('expects the correct schema from the api', () => {
    return fetch(`${siat_url}?api_key=${apiKey}&size=1`)
    .then(response => response.json())
    .then((json) => {
      const result_fields = Object.keys(json.results[0]);
      expect(result_fields).toEqual(expected_result_fields);

      const aggregations = Object.keys(json.aggregations);
      expect(aggregations).toEqual(expected_aggregations);
    })
  })
})