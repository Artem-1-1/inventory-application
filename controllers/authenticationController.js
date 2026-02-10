export function checkPassword(req, res) {
  console.log(req.body);
  const { password } = req.body;

  if (password === process.env.PASSWORD_SECRET) {
    return res.status(200).json({ success: true, message: 'Access granted!' });
  }
  
  res.status(401).json({ success: false, message: 'Invalid Password' });
}