/* eslint-disable no-unused-vars */
exports.Sys = class Sys {
  constructor (options) {
    this.options = options || {};
  }

  //async find (params) {
  //return [];
  //}

  async get (id, _params) {
    if(id === 'timestamp'){
      return { timestamp: (new Date().getTime()) };
    }
    return {};
  }

  //async create (data, params) {
  //if (Array.isArray(data)) {
  //return Promise.all(data.map(current => this.create(current, params)));
  //}

  //return data;
  //}

  //async update (id, data, params) {
  //return data;
  //}

  //async patch (_id, data, params) {
  //return data;
  //}

  //async remove (_id, _params) {
  //return {};
  //}
};
