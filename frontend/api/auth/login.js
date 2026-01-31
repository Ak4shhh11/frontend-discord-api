// Simple serverless login for demo only.
// Hosted on Vercel under /api/auth/login. Accepts POST { email, password }
// and returns a demo token when credentials match the known test user.

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { email, password } = req.body || {}

  // Demo credentials (tell your dosen these):
  // email: daffa@mail.com
  // password: 111111
  if (email === 'daffa@mail.com' && password === '111111') {
    // return a simple token (not a signed JWT) — frontend only checks presence
    const token = 'demo-token-' + Buffer.from(email).toString('base64')
    return res.status(200).json({ message: 'Login sukses', token })
  }

  return res.status(401).json({ message: 'Invalid credentials' })
}
