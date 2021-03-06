var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
var _ = require('lodash');

var fileLocation = __dirname.split('/');
fileLocation.pop();
fileLocation.push('data', 'blog.json');
file = fileLocation.join('/')

// /* GET Employee */
// router.get('/blog/posts/:id', function(req, res, next) {
//   console.log('get employee')
//
//   var id = req.params.id;
//   var post = {};
//   jsonfile.readFile(file, function(err, data) {
//     if (err) console.error(err);
//
//     post = _.find(data.posts, function(itr) {
//       return itr._id == id;
//     });
//
//     if(!post) {
//       // No employee Found
//       console.error('post not found')
//       return;
//     }
//
//     console.log('post found')
//     res.json({
//       'post': post
//     });
//   });
//
//   return;
// });

/* GET Blog snippets. */
router.get('/', function(req, res, next) {
  console.log('get blog')

  jsonfile.readFile(file, function(err, data) {
    if (err) console.error(err);

    var blogData = {
      title: 'Express Blog',
      description: 'This ia a blog.',
      snippets: data.snippets
    }

    res.render('blog/blog', blogData);
  })
  return;
});

router.get('/post/:id', function(req, res, next) {
  console.log('get post')
  var id = req.params.id;
    var post = {};
    jsonfile.readFile(file, function(err, data) {
      if (err) console.error(err);

      post = _.find(data.posts, function(itr) {
        return itr._id == id;
      });

      if(!post) {
        // No employee Found
        console.error('post not found')
        return;
      }

      var postData = {
        title: post.title,
        description: post.desc,
        post: post
      }

      console.log('post found')
      res.render('blog/post', postData);
    });
  return;
});

// router.put('/blog/post', function(req, res, next) {
//   console.log('put employees')
//   var employee = req.body;
//
//   jsonfile.readFile(file, function(err, data) {
//     if (err) console.error(err);
//
//     // Find index of employee
//     idx = _.findIndex(data, function(itr) {
//       return itr._id == employee._id;
//     });
//
//     // Not found
//     if(!data[idx]) {
//       // No employee Found
//       console.error('employee not found, no substitution occured')
//       return;
//     }
//
//     // Set updated employee
//     console.log('employee found')
//     data[idx] = employee;
//     jsonfile.writeFile(file, data, function(err) {
//
//       if(err) {
//         console.error(err);
//         res.status(500).send('Something died!');
//       }
//
//       res.json({
//         'success': 'Success'
//       });
//
//     })
//   });
//
//   return;
// });
//
// router.post('/employees', function(req, res, next) {
//   console.log('post employees')
//   var employee = req.body;
//
//   jsonfile.readFile(file, function(err, data) {
//     if (err) console.error(err);
//
//     // Add employee to array
//     var id = 1000000;
//     var match = true;
//     while(match) {
//       match = _.find(data, function(itr) {
//         return itr._id == id;
//       });
//       id++
//       console.log(match);
//     }
//     // Set employee _id
//     employee._id = id;
//     data.push(employee);
//
//     // Write new data to file
//     jsonfile.writeFile(file, data, function(err) {
//
//       if(err) {
//         console.error(err);
//         res.status(500).send('Something died!');
//       }
//
//       console.log('Employee Added')
//       res.json({
//         'success': 'Success'
//       });
//
//     })
//   });
//
//   return;
// });
//
// router.delete('/employees/:id', function(req, res, next) {
//   console.log('delete employee')
//   console.dir(req.params);
//   var id = req.params.id;
//
//   jsonfile.readFile(file, function(err, data) {
//     if (err) console.error(err);
//     console.log(id);
//     // Find index of employee
//     idx = _.findIndex(data, function(itr) {
//       return itr._id == id;
//     });
//
//     // Not found
//     if(!data[idx]) {
//       // No employee Found
//       console.error('employee not found, no deletion occured')
//       return;
//     }
//
//     // Delete employee
//     console.log('employee found')
//     data.splice(idx, 1);
//     jsonfile.writeFile(file, data, function(err) {
//
//       if(err) {
//         console.error(err);
//         res.status(500).send('Something died!');
//       }
//
//       res.json({
//         'success': 'Success'
//       });
//
//     })
//   });
//
//   return;
// });

module.exports = router;
