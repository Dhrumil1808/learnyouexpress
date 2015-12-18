var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
var _ = require('lodash');

var employeeFileLocation = __dirname.split('/');
employeeFileLocation.pop();
employeeFileLocation.push('data', 'employees.json');
employeeFile = employeeFileLocation.join('/')

/* GET Employee */
router.get('/employee/:id', function(req, res, next) {
  console.log('get employee')

  var id = req.params.id;
  var employee = {};
  jsonfile.readFile(employeeFile, function(err, data) {
    if (err) console.error(err);

    employee = _.find(data, function(itr) {
      return itr._id == id;
    });

    if(!employee) {
      // No employee Found
      console.error('employee not found')
      return;
    }

    console.log('employee found')
    res.json({
      'employee': employee
    });
  });

  return;
});

/* GET Employee listing. */
router.get('/employees', function(req, res, next) {
  console.log('get employees')

  jsonfile.readFile(employeeFile, function(err, data) {
    if (err) console.error(err);
    console.log('sending employee data');
    console.log(file)
    console.log(data);
    res.json({
      employees: data
    })
  })
  return;
});

router.put('/employees', function(req, res, next) {
  console.log('put employees')
  var employee = req.body;

  jsonfile.readFile(employeeFile, function(err, data) {
    if (err) console.error(err);

    // Find index of employee
    idx = _.findIndex(data, function(itr) {
      return itr._id == employee._id;
    });

    // Not found
    if(!data[idx]) {
      // No employee Found
      console.error('employee not found, no substitution occured')
      return;
    }

    // Set updated employee
    console.log('employee found')
    data[idx] = employee;
    jsonfile.writeFile(employeeFile, data, function(err) {

      if(err) {
        console.error(err);
        res.status(500).send('Something died!');
      }

      res.json({
        'success': 'Success'
      });

    })
  });

  return;
});

router.post('/employees', function(req, res, next) {
  console.log('post employees')
  var employee = req.body;

  jsonfile.readFile(employeeFile, function(err, data) {
    if (err) console.error(err);

    // Add employee to array
    var id = 1000000;
    var match = true;
    while(match) {
      match = _.find(data, function(itr) {
        return itr._id == id;
      });
      id++
      console.log(match);
    }
    // Set employee _id
    employee._id = id;
    data.push(employee);

    // Write new data to file
    jsonfile.writeFile(employeeFile, data, function(err) {

      if(err) {
        console.error(err);
        res.status(500).send('Something died!');
      }

      console.log('Employee Added')
      res.json({
        'success': 'Success'
      });

    })
  });

  return;
});

router.delete('/employees/:id', function(req, res, next) {
  console.log('delete employee')
  console.dir(req.params);
  var id = req.params.id;

  jsonfile.readFile(employeeFile, function(err, data) {
    if (err) console.error(err);
    console.log(id);
    // Find index of employee
    idx = _.findIndex(data, function(itr) {
      return itr._id == id;
    });

    // Not found
    if(!data[idx]) {
      // No employee Found
      console.error('employee not found, no deletion occured')
      return;
    }

    // Delete employee
    console.log('employee found')
    data.splice(idx, 1);
    jsonfile.writeFile(employeeFile, data, function(err) {

      if(err) {
        console.error(err);
        res.status(500).send('Something died!');
      }

      res.json({
        'success': 'Success'
      });

    })
  });

  return;
});

module.exports = router;
