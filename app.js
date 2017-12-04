const express = require('express');
const app = express();
const session =require('express-session');
const bodyParser = require('body-parser');

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('mydb.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

app.set('view engine', 'pug')

app.use(express.static('public'))
app.use (session({secret: 'root', saveUninitialized: true, resave:true}));
app.use(express.static('public'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
			extended: true
}))

app.get('/', (req, res) => {
	let arr = [];

	let sql = `SELECT name FROM subject1`;
	 
	db.all(sql, [], (err, rows) => {
	  if (err) {
	    throw err;
	  }
	  rows.forEach((row) => {
	    console.log(row.name);
	    arr.push(row.name);
	  });

	  res.render('index', {options: arr});
	});
	
})

app.get('/login', (req, res) => {
	res.render('login');
});
/* */
app.post('/login',(req,res)=>{

exports.login = function(req,res){
  var user_name= req.body.user_name;
  var password = req.body.password;
  connection.query('SELECT * FROM User1 WHERE user_name = ?',[user_name], function (err, results, fields) {
  if (err) {
    // console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    // console.log('The solution is: ', results);
    if(results.length >0){
      if([0].password == password){
        res.send({
          "code":200,
          "success":"login sucessfull"
            });
      }
      else{
        res.send({
          "code":204,
          "success":"user_name and password does not match"
            });
      }
    }
    else{
      res.send({
        "code":204,
        "success":"user_name does not exits"
          });
    }
  }
  });
}
})

/* */

app.get('/Enquire',(req,res) =>{
	res.render('Enquire');
});

//insert one row into the Enquire table
/*db.run(insert into Enquire(name) values(?),['c'],function(err) {
		if(err) {
			return console.log(err.message);
		}
//get the last insert_id
console.log(A row has been inserted with rowid $(this.lastID));	
});*/

app.post('/updateEnquire',(req,res) =>{
	let id = req.body.id;
	let counselor_id = req.body.counselor_id;
	let message = req.body.message;

	//let sql = 'UPDATE FROM TABLE Enquire1 SET counselor_id='+Counselor_id+', message="'+message+'" WHERE counselor_id='+id;
	db.run('UPDATE Enquire1 SET user_id=?,message=? WHERE enquire_id=?',[counselor_id,message,id],(err)=>{
		if(err) throw err;
		else console.log('success')
	});

	//db.run(sql);

	res.redirect('/Enquire');
})

app.post('/insertEnquire',(req,res) =>{
	let id = req.body.id;
	let counselor_id = req.body.counselor_id;
	let message = req.body.message;
	console.log(id);
	console.log(counselor_id);
	console.log(message);

	//let sql = 'INSERT INTO Enquire1 VALUES ('+Counselor_id+', "'+message+'")';
	db.run('INSERT INTO Enquire1 (enquire_id,user_id,message) VALUES(?,?,?)',[id,counselor_id,message],(err)=>{
		if(err) throw err;
		else console.log('success')
	});

	//db.run(sql);

	res.redirect('/Enquire');
})

app.post('/updateCounselor',(req,res) =>{
	let counselor_id = req.body.counselor_id;
	let first_name = req.body.first_name;
	let nick_name = req.body.nick_name;
	let last_name = req.body.last_name;
	let telephone = req.body.telephone;
	let email = req.body.email;
	let member_since = req.body.member_since;

	//let sql = 'UPDATE FROM TABLE counselor1 SET counselor_id='+Counselor_id+', first_name="'+message+'", last_name="'+last_name+'", nick_name="'+nick_name+'", telephone="'+telephone+'", email="'+email+'", member_since="'+member_since+'" WHERE id='+id;
	db.run('UPDATE counselor1 SET first_name=?,nick_name=?,last_name=?,telephone=?,email=?member_since=? WHERE counselor_id=?', [first_name,nick_name,last_name,telephone,email,member_since,counselor_id,],(err)=>{
		if(err) throw err;
		else console.log('success');
	});


	//db.run(sql);

	res.redirect('/Counselor');
})

app.post('/insertCounselor',(req,res) =>{
	let counselor_id = req.body.counselor_id;
	let first_name = req.body.first_name;
	let nick_name = req.body.nick_name;
	let last_name = req.body.last_name;
	let telephone = req.body.telephone;
	let email = req.body.email;
	let member_since = req.body.member_since;
	console.log(counselor_id);
	console.log(first_name);
	console.log(nick_name);
	console.log(last_name);
	console.log(telephone);
	console.log(email);
	console.log(member_since);

	//let sql = 'INSERT INTO counselor1 VALUES ('+Counselor_id+', "'+first_name+'", "'+last_name+'", "'+nick_name+'", "'+telephone+'", "'+email+'", "'+member_since+'")';
	db.run('INSERT INTO counselor1 (counselor_id,first_name,nick_name,last_name,telephone,email,member_since) VALUES(?,?,?,?,?,?,?)',[counselor_id,first_name,nick_name,last_name,telephone,email,member_since],(err)=>{
		if(err) throw err;
		else console.log('success');
	});


	//db.run(sql);

	res.redirect('Counselor');
})

app.get('/Counselor',(req,res) =>{
	res.render('Counselor');

});

app.get('/Reply',(req,res) =>{
	res.render('Reply');
});

app.post('/updateReply',(req,res) =>{
	let id = req.body.id;
	let Counselor_id = req.body.Counselor_id;
	let Reply = req.body.reply;

	//let sql = 'UPDATE FROM TABLE reply SET counselor_id='+Counselor_id+', reply="'+message+'" WHERE id='+id;
	db.run('UPDATE  Replies SET Counselor_id=?,Reply=? WHERE id=?', [Counselor_id,Reply,id],(err)=>{
		if(err) throw err;
		else console.log('success');
	});

	//b.run(sql);

	res.redirect('/Reply');
})

app.post('/insertReply',(req,res) =>{
	let id = req.body.id;
	let counselor_id = req.body.Counselor_id;
	let reply = req.body.reply;
	console.log(id);
	console.log(counselor_id);
	console.log(reply);

	//let sql = 'INSERT INTO reply VALUES ('+Counselor_id+', "'+message+'")';
	db.run('INSERT INTO Replies (id,counselor_id,reply) VALUES(?,?,?)',[id,counselor_id,reply],(err)=>{
		if(err) throw err;
		else console.log('success');
	});

	//db.run(sql);
	res.redirect('/Reply');
})

app.get('/Subject',(req,res) =>{
	res.render('Subject');
});

app.post('/updateSubject',(req,res) =>{
	let subject_id = req.body.id;
	let name = req.body.name;
	let description = req.body.description;
	let counselor_id = req.body.Counselor_id;

	//let sql = 'UPDATE FROM TABLE subject1 SET name='+name+', description="'+description+'", description="'+counselor_id+'" WHERE subject_id='+id;
	db.run('UPDATE subject1 SET name=?,description=?,counselor_idfk=? WHERE subject_id = ?',[name,description,counselor_id,subject_id],(err)=>{
		if(err) throw err;
		else console.log('success');

	});

	//db.run(sql);

	res.redirect('/Subject');
})

app.post('/insertSubject',(req,res) =>{
	let subject_id = req.body.id;
	let name = req.body.name;
	let description = req.body.description;
	let counselor_id = req.body.Counselor_id;
	console.log(subject_id);
	console.log(name);
	console.log(description);
	console.log(counselor_id);
	//let sql = 'INSERT INTO subject1 (name, description, counselor_idfk) VALUES ('+name+', '+description+', '+counselor_id+')';
	//console.log(sql);
	db.run('INSERT INTO subject1 (subject_id,name, description, counselor_idfk) VALUES(?,?,?,?)',[subject_id,name,description,counselor_id],(err)=>{
		if(err) throw err;
		else console.log('success');

	});
	//db.run(sql)
	res.redirect('/Subject');
})

app.get('User',(req,res) =>{
	res.render('User');
});

app.get('/response', (req, res) => {
	let name = req.query.subject;
	let desc;
	let counselor_id, counselor_name, since, email, phone;

	let sql = 'SELECT * FROM subject1 WHERE name="'+name+'"';
	 
	db.all(sql, [], (err, rows) => {
	  if (err) {
	    throw err;
	  }
	  rows.forEach((row) => {
	    desc = row.description;
	    counselor_id = row.counselor_idfk;

	    let sql = `SELECT * FROM counselor1
		           WHERE counselor_id=`+counselor_id;
		 
		db.all(sql, [], (err, rows) => {
		  if (err) {
		    throw err;
		  }
		  rows.forEach((row) => {
		  	counselor_name = row.first_name + row.last_name;
		    since = row.member_since;
		    email = row.email;
		    phone = row.telephone;
		  });
		  res.render('response', {subject:name, desc: desc, counselor: counselor_name, since: since, email: email, phone: phone});
		   
		});
		
	  });
	});
	
})

app.listen(8080, () => {
	console.log('Server running at 8080');
});
