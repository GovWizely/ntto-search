import { values, capitalize, compact, has, map, snakeCase } from '../utils/lodash';
import { buildPortsValues } from './build_ports_values.js';
import { I92 } from './../apis/I92';

export function buildReports(agg_results, params){
  for (let key in agg_results) {
    const entry = agg_results[key];
    const arrivals_keys = ["total_arrivals", "business_visa_arrivals", "pleasure_visa_arrivals", "student_visa_arrivals", "ports_arrivals"];

    populateAdditionalFields(arrivals_keys, entry);
    
    if( has(entry, 'ports_arrivals')) // Add ports fields
      agg_results[key] = Object.assign(entry, buildPortsValues(entry.ports_arrivals));

    entry.i92_arrivals = I92.sortEntries(entry.i92_arrivals);
    entry.i92_departures = I92.sortEntries(entry.i92_departures);
  }
  agg_results = sortObjectByKeys(agg_results);
  return agg_results;
}

function populateAdditionalFields(arrivals_keys, entry){
  for (let i in arrivals_keys) {
    const arrivals_type = arrivals_keys[i];
    if (arrivals_type == "ports_arrivals") continue; // Ports fields need custom treatment
    const ordered = {};
    // Sort amounts:
    if (has(entry, arrivals_type)){
      Object.keys(entry[arrivals_type]).sort().forEach(function(k) {
        ordered[k] = entry[arrivals_type][k];
      });
      entry[arrivals_type] = ordered;
    }
  }
}

function sortObjectByKeys(object){
  const sorted_array = [];
  Object.keys(object).sort().forEach(function(key){
    let new_object = {};
    new_object[key] = object[key];
    sorted_array.push(new_object);
  });
  return sorted_array;
}
