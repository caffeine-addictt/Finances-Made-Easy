
let schemes = require('./database/schemes.json')

export const Schema = {
  _fetch: async(force) => {
    if (force) {
      schemes = require('./database/schemes.json')
    }
    return schemes
  },

  getAll: async(force) => await this._fetch(force),
  getBy,
  find: async(x, force) => (await _fetch(force)).find(x)
}

async function getBy(params, force) {
  const data = await this._fetch(force)

  for (const i in data) {
    const user = data[i]

    for (const key in params) {
      if (user.hasOwnProperty(key.toString()) && (user[key.toString()] === params[key].toString())) {
        return user
      }
    }
  }
}