// This page contains the code to retrieve customer selected order and post the order status on another page

const http=require('http');
const fs=require('fs');
const querystring=require('querystring');

const server=http.createServer((req,res)=>{
   if(req.url==='/'){
    fs.readFile('D:\\Sridhar\\JNTUH-RS\\Fullstack_Development\\Projects\\Food-Delivery-App\\html\\home.html',(err,data)=>{
       if(err){
        res.writeHead(500,{'Content-Type':'text/html'});
        res.end(err);
       }
       else{
        res.writeHead('200',{'Content-Type':'text/html'});
        res.end(data);
       }
    });
   }
   else if(req.url==='/orderconfirmation'){
      let body='';
      req.on('data',chunk=>{
         body+=chunk.toString();
      });

      req.on('end',()=>{
         const postReqData=querystring.parse(body);
         const ordersummary=postReqData;

         res.writeHead(200,{'Content-Type':'text/html'});
         res.end(`<html><body>The order summary is: <br><p>${JSON.stringify(ordersummary)}</p></body></html>`);
      });
   }

   else{
      res.writeHead(500,{'Content-Type':'text/html'});
      res.end('Please verify your server, it seems there is an error');
   }

});

server.listen(3001,()=>{
console.log('http://localhost:3001/');
});