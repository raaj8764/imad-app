var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool =require('pg').Pool;
var config ={
    host:"db.imad.hasura-app.io",
    user:"revanthr47",
    database:"revanthr47",
    port:"5432",
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});



var Article={
'article-one':{
    title:'Article-One | Revanth Rajendran',
    heading:'Article-one',
    date: '10-Aug-17',
    content:`	<p>
        					This is the content for my first article. 
        		</p>
        	 <input type="text" id="name" placeholder="comment"></input>
          <input type="submit" value="submit" id="submit_btn"></input>
`},
'article-two':{
    title:'Article-Two | Revanth Rajendran',
    heading:'Article-Two',
    date: '10-Aug-17',
    content:`	<p>
        					This is the content for my second article. 
        		</p>
        			 <input type="text" id="name" placeholder="comment"></input>
          <input type="submit" value="submit" id="submit_btn"></input>
`},
'article-three':{
    title:'Article-Three | Revanth Rajendran',
    heading:'Article-Three',
    date: '20-Aug-17',
    content:`	<p>
        					This is the content for my third article. 
        		</p>
        			 <input type="text" id="name" placeholder="comment"></input>
          <input type="submit" value="submit" id="submit_btn"></input>
`},
};

function createTemplate (data){
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    
    var HtmlTemplate=`
                    <html>
                    <head>
                    	<title>
                    	    ${title}
                    	</title>
                    	<meta name="viewport" content="width=device-width, initial-scale=1"/>
                    	<link href="/ui/style.css" rel="stylesheet" />
                    </head>
                        
                    <body>
                        		<div class="container">
                            		<div>
                            			<a href="/">HOME</a>

                            		</div>
                            		   <hr/>
                            			    <h3> 
                            		    	${heading}
                            		    	</h3>
                                			<div>
                                			${date.toDateString()}
                                			</div>
                                			<div>
                            		    	${content}
                            		    	</div>
                        			</div>
                    </body>
                    </html>
                    `;
                    return HtmlTemplate;
}

var counter=0;
app.get('/counter',function (req, res) {
    counter = counter + 1;
    res.send(counter.toString());
});

var names=[];
app.get('/submitname',function(req,res){
    var name=req.query.name;
    
    names.push(name);
    
    res.send(JSON.stringify(names));
});

var pool = new Pool(config);
app.get("/test-db",function(req,res){
//make a select request 
//return a response with the results
pool.query('SELECT * FROM test', function (err,result){
    if(err){
        res.status(500).send(err.toString());    
    }else{
        res.send(JSON.stringify(result.rows[0]));
    }
});
});

app.get('/article/:articleName', function (req, res) {
    var articleName=req.params.articleName;
    pool.query("SELECT * FROM article WHERE title='" +req.params.articleName +"'", function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }if(result.rows.lenght===0){
           res.status(404).send('article not found');
       }else{
           var articleData=result.rows[0];
            res.send(createTemplate(articleData));
       }
       
        
    });
    
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
