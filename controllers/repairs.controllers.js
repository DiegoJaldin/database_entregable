exports.findAllRepairs = (req, res) => {
  res.json({
    message: 'This is a repair'
  })
}

exports.createRepairs = (req, res) => {
  console.log(req.body)
  res.json({
    message: 'Update your repair',
  })
}

exports.findOneRepair = (req, res) => {
  res.json({
    message: 'This is your repair'
  })
}

exports.updateRepair = (req, res) => {
  console.log(req.body)
  res.json({
    message: 'Update your repair id'
  })
}

exports.deleteRepair = (req, res) => {
  res.json({
    message: 'You deleted your repair'
  })
}