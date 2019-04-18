

module.exports = (req, res, next) => {
  console.log('ADMIN MIDDLEWARE:', req.user.dataValues.admin)
  if(req.user && (req.user.dataValues.admin === true)) {
     next()
  } else {
    res.redirect('http://google.com')//updated to send whatever message you want
  }
}


