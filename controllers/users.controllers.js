exports.findAllUsers = (req, res) => {
  res.json({
    message: 'Welcome user',
  })
}

exports.createUsers = (req, res) => {
  console.log(req.body)
  res.json({
    message: 'Hello user',
  })
}

exports.findOneUser = (req, res) => {
  res.json({
    message: 'Greetings user'
  })
}

exports.updateUsers = (req, res) => {
  console.log(req.body)
  res.json({
    message: 'This is patch',
  })
}

exports.deleteUsers = (req, res) => {
  res.json({
    message: 'This is delete',
  })
}

