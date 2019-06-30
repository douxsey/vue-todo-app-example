import axios from 'axios'

export default {
  getTodos: function () {
    return axios.get('/todos?auth=1')
      .then(response => response.data)
  }
}
