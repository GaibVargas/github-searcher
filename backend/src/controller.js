const api = require('./api');

module.exports = {
  async getUser(req, res) {
    const { username } = req.params;
    const response = await api.get(`/users/${username}`);
  
    return res.json({ user: response.data });
  },
}