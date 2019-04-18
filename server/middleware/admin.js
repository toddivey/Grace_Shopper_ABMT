module.exports = (req, res, next) => {
  console.log('HIT.USER!!!', req.session)
  // if(req.user && req.user.admin) {
     next()
  // } else {
  //   res.status(401).alert('Not Authorized!') //updated to send whatever message you want
  // }
}


