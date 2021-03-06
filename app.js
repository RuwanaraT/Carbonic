var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); 
var favicon=require('serve-favicon');
var dotenv=require('dotenv');

var hbs = require('express-handlebars');

dotenv.config({path: './.env'})
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');

var buyerRouter=require('./routes/buyerh');


var adminkRouter = require('./routes/admin'); //j

var forumRouter = require('./routes/forum');





var app = express();
const publicDirectory=path.join(__dirname,'./public/stylesheets');
app.use(express.static(publicDirectory));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));
app.use('/pmviewproduct',require('./routes/product'));
//
app.use('/editbuyer',require('./routes/auth'));
//
app.use('/addproduct',require('./routes/product'));
app.use('/fhand', require('./routes/fhand'));


//app.use('/forumHome',require('./routes/forumHome')); //h
app.use('/cancel',require('./routes/cancel'));
app.use('/addDetails',require('./routes/pickup'));//ir
app.use('/pickup',require('./routes/pickup'));//ir
app.use('/deletepck',require('./routes/pickup'));//ir
app.use('/checkRow',require('./routes/checkRow'));



app.use('/forumHome', forumRouter);


app.use('/cart', require('./routes/cart'));




app.use('/buyerh',buyerRouter);


app.use('/delfeedback', adminkRouter);  //j

app.use('/adminprofile/:aid', adminkRouter); //j

app.use('/admin', adminkRouter); //j








app.get("/shoppingcart",(req,res)=>{
  res.render("shoppingcart")
});

app.get("/home",(req,res)=>{
  res.render("home")
});
//bovini*
app.use('/',require('./routes/invoicelist'));
//app.use('/invoicetemplate',require('./routes/invoicetemplte'));

app.use('/pay', require('./routes/pay'));

app.get("/invoicelist",(req,res)=>{
  res.render("invoicelist")
});

app.get("/invoicetemplate",(req,res)=>{
  res.render("invoicetemplate")
});

app.get("/pay",(req,res)=>{
  res.render("pay")
});
//*bovini


app.get("/pdf",(req,res)=>{
  res.render("pdf")
});


app.listen(8081,()=>{
  console.log("Servet started on port 8081")
})
 

// view engine setup
app.engine('hbs', hbs({extname:'hbs', defaultLayout:'layout', layoutsDir:__dirname+'/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/',productRouter);
app.use('/',adminkRouter); //j

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  //res.status(err.status || 500);
  //res.render('error');
});

module.exports = app;
