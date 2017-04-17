const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
app = express();

//middleware lets oyu configure how your express applicaiton works 
//request stores headers, body information, method that was made, path etc. 
//response has a bunch of methods so we can respond to the HTTP request... set status, set body
hbs.registerPartials(__dirname + '/views/partials') 
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
}); //helper function.. first argument what we ant to call it, second argument function to assign
hbs.registerHelper('screamIt', (text)=> {
	return text.toUpperCase()
})



app
	
	.set('view engine', 'hbs')

	.use((req,res,next)=> { //use takes req, res, and next arguments 
		let now = new Date().toString();
		let log = `${now}: ${req.method} ${req.url}`;
		fs.appendFile('server.log', log +'\n', (err)=> {
			if (err) {
				console.log('Unable to append to server.log')
			}
		})
		next();
	})
	// .use((req,res,next)=> {
	// 	res.render('maintenance')
	// })
	.get('/', (req, res) => {
		res.render('home.hbs', {
			title: 'Welcome to the Home Page',
			welcomeMessage: "Come in and stay awhile",
		})
	})



	.get('/about', (req,res) => {
		res.render('about.hbs',  {  //second render arguments takes an object that can be passed to templating engine. 
			title: 'About Me Page',
		})
	})

	.get('/bad', (req,res) => {
		res.send({
			errorMessage: "Unable to fulfill this page!"
		});
	})
	.use(express.static(__dirname + '/public'))



	.listen(3000, () => {
		console.log('Server is up on port 3000')
	});