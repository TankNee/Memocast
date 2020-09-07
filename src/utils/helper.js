import _ from 'lodash'

function isNullOrEmpty (obj) {
  obj = _.toString(obj)
  return _.isNull(obj) || _.isEmpty(obj)
}

export default {
  isNullOrEmpty
}
