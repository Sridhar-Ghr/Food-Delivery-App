// This page contains the code to retrieve customer selected order and post the order status on another page

const http=require('http');
const fs=require('fs');

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

});

server.listen(3001,()=>{
console.log('http://localhost:3001/');
});