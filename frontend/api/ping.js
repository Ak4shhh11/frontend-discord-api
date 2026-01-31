// Simple health endpoint so hosted site can show API RUNNING
module.exports = (req, res) => {
  res.status(200).json({ message: 'API RUNNING 🚀' })
}
