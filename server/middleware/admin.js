

module.exports = (req, res, next) => {
  if(req.user && (req.user.dataValues.admin === true)) {
     next()
  } else {
    res.status(401)//updated to send whatever message you want
  }
}


