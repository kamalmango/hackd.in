const server   = require('./server.js');
const Projects = require('./collections/projects');
const Project  = require('./models/project');
const Engineers = require('./collections/engineers');
const Engineer  = require('./models/engineer');
const path     = require('path');
const cloudinary = require('./api/cloudinary.js');
const passport = require('./api/github.js');

const knex = require('knex')({
  client: 'postgresql',
  connection: {
    database: 'hackdin'
  }
});

server.use(passport.initialize());
server.use(passport.session());

// cloudinary.uploader.destroy('public_id_of_image', {invalidate: true}, (err, result) => console.log(result));

module.exports = (server, express) => {

  passport.serializeUser((user, done) => {
    // placeholder for custom user serialization
    // null is for errors
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    // placeholder for custom user deserialization.
    // maybe you are going to get the user from mongo by id?
    // null is for errors
    done(null, user);
  });

  server.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      console.log('User is authenticated');
      console.log('github id:', req.user.id);
      console.log('github name:', req.user.displayName);
      console.log('github username:', req.user.username);
      console.log('github profile:', req.user.profileUrl);
      console.log('github image:', req.user.photos[0].value);
      // display 'my profile' instead of sign in/up
    } else {
      console.log('User is not authenticated');
      // hide 'my profile' and display sign in/up
    }
    res.sendFile(path.resolve('client/projects.html'));
  });

  server.get('/signin', passport.authenticate('github'));
  server.get('/signup', passport.authenticate('github'));

  // GitHub will call this URL
  server.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {

      const name = req.user.displayName;
      const gitHandle = req.user.username;
      const email = req.user.emails[0].value;
      const image = req.user.photos[0].value;

      console.log('github req:', req.user);

      new Engineer({ gitHandle: gitHandle }).fetch().then(found => {
        if (found) {
          //res.status(200).send(found.attributes);
          res.redirect('/profile');
        } else {
          Engineers.create({
            name: name,
            gitHandle: gitHandle,
            email: email,
            image: image
          })
          .then(newEngineer => {
            res.status(201).redirect('/projects');
          });
        }
      });
  });

  server.get('/projects',
    (req, res) => res.sendFile(path.resolve('client/projects.html')) );

  server.get('/newProject',
    (req, res) => res.sendFile(path.resolve('client/newProject.html')) );

  server.get('/engineers',
    (req, res) => res.sendFile(path.resolve('client/engineers.html')) );

  server.get('/newEngineer',
    (req, res) => res.sendFile(path.resolve('client/newEngineer.html')) );

  server.get('/signout', (req, res) => {
    console.log('Logging out');
    req.logout();
    res.redirect('/');
  });

  // server.get('/signup',
  //   (req, res) => res.render('signup') );

  // server.get('/login',
  //   (req, res) => res.render('index') );

  // server.get('/[* project name *]', 'go to specific project page');

  // server.get('/[* engineer name *]', 'go to individual engineer page');


  // server.post('/signup', 'submit new user signup');


  server.get('/projects/data', (req, res) => {
    //var results = [];

    knex.from('projects')
      .innerJoin('engineers', 'projects.id', 'engineers.project_id')
      .where('projects.id', '=', 1)
      .then( engineers => {
        //res.send(JSON.stringify(engineers));
        engineers.forEach(function(engineer) {
          //console.log(engineer.name);
        })
        //res.send(JSON.stringify(engineers));
      })

    knex.from('projects')
      .innerJoin('schools', 'schools.id', 'projects.school_id')
      .then( schools => {
        schools.forEach(function(school) {
          //console.log(school.name);
        })
        //res.send(JSON.stringify(school));
      })


    knex.from('projects')
      .then( projects => {
        var results = [];
        projects.forEach(function(project) {
          var something = [];
          knex.from('projects')
            .innerJoin('engineers', 'projects.id', 'engineers.project_id')
            .where('projects.id', '=', project.id)
            .then( engineers => {
              engineers.forEach(function(engineer) {
                something.push(engineer.name);
              });
            results.push(
              {
                title: project.title,
                description: project.description,
                engineers: something,
                school: 'test'
              }
            );
            if (results.length === projects.length) {
              console.log(results);
              res.send(JSON.stringify(results));
            }
          })
        })
      })
    // Project.fetchAll({columns: ['title', 'description', 'image']})
    // .then(projects => {
    //   //console.log(projects);
    //   res.send(JSON.stringify(projects));
    // });
  });

  server.get('/profile', (req,res) => {
    if (req.isAuthenticated()) {
      console.log('User is authenticated');
      console.log('github id:', req.user.id);
      console.log('github name:', req.user.displayName);
      console.log('github username:', req.user.username);
      console.log('github profile:', req.user.profileUrl);
      console.log('github image:', req.user.photos[0].value);
      // display 'my profile' instead of sign in/up
      res.sendFile(path.resolve('client/profile.html'));
    } else {
      console.log('User is not authenticated');
      // hide 'my profile' and display sign in/up
      res.sendFile(path.resolve('client/projects.html'));
    }
  });

  server.get('/engineer', (req, res) => {
    let gitHandle = req.query.gitHandle;
    console.log('inside routes:', req.query);
    new Engineer({ gitHandle: gitHandle }).fetch().then(found => {
      console.log('found:', found);
      if (found) {
        res.status(200).send(found.attributes);
      } else {
        res.sendStatus(404);
      }
    });
  });

  server.get('/engineers/data', (req, res) => {
    Engineer.fetchAll({columns: ['name', 'image', 'email', 'gitHandle']})
    .then(engineers => {
      res.send(JSON.stringify(engineers));
    });
  });

  server.post('/projects/data',
  (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let engineers = req.body.engineers;
    // let technologies = req.body.technologies;
    let imageUrl = req.body.image;

    cloudinary.uploader.upload(imageUrl,
      result => {
        // cloudinary.image( result.public_id, { width: 100, height: 150, crop: "fill" }) )
        new Project({ title: title }).fetch().then(found => {
          if (found) {
            res.status(200).send(found.attributes);
          } else {
            let url = result.secure_url.split('/');
            url[6] = 'c_fill,h_250,w_250';
            url = url.join('/');
            console.log(url);
            Projects.create({
              title: title,
              description: description,
              image: url,
              // technologies: technologies
              // engineers: engineers
            })
            .then(newProject => {
              res.status(201).send(newProject);
            });
          }
        });
      }
    );
  });

  // server.post('/login',
  // function(req, res) {
  //   var username = req.body.username;
  //   var password = req.body.password;

  //   new Engineer({ username: username }).fetch().then(engineer => {
  //     if (engineer) {
  //       bcrypt.compare(password, engineer.get('password'), (err, match) => {
  //         if (match) {
  //           console.log('Logging in...');
  //           req.session.username = username;
  //           res.status(200);
  //           res.redirect('/');
  //         } else {
  //           console.log('Invalid password');
  //           res.redirect('/login');
  //         }
  //       });
  //     } else {
  //       res.status(200);
  //       res.redirect('/login');
  //     }
  //   });
  // });


  // server.post('/signup',
  // function(req, res) {
  //   var username = req.body.username;
  //   var password = req.body.password;

  //   new Engineer({ username: username }).fetch().then(found => {
  //     if (found) {
  //       res.status(200);
  //       res.redirect('/signup');
  //     } else {
  //       bcrypt.hash(req.body.password, null, null, (err, hash) => {
  //         if (err) {
  //           console.log('BCRYPT HASH ERROR:', err);
  //           res.status(200);
  //           res.redirect('/signup');
  //         } else {
  //           Engineers.create({
  //             username: username,
  //             password: hash
  //           })
  //           .then(engineer => {
  //             req.session.username = username;
  //             res.status(200);
  //             res.redirect('/');
  //           });
  //         }
  //       });
  //     }
  //   });
  // });

  // server.get('/*', (req, res) => {
  //   new Link({ code: req.params[0] }).fetch().then(function(link) {
  //     if (!link) {
  //       res.redirect('/');
  //     } else {
  //       var click = new Click({
  //         linkId: link.get('id')
  //       });

  //       click.save().then(function() {
  //         link.set('visits', link.get('visits') + 1);
  //         link.save().then(function() {
  //           return res.redirect(link.get('url'));
  //         });
  //       });
  //     }
  //   });
  // });




};
