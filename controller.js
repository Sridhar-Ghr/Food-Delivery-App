// This page contains the code to retrieve customer selected order and post the order status on another page

const http=require('http');
const fs=require('fs');
const querystring=require('querystring');
const orderHistoryFilePath='D:\\Sridhar\\JNTUH-RS\\Fullstack_Development\\Projects\\Food-Delivery-App\\orderHistory.txt';

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
         const {orderSummary}=ordersummary;
         const fileContent=orderSummary;

         res.writeHead(200,{'Content-Type':'text/html'});
         res.end(`<html><body>The order summary is: <br><p style="display:flex; align="center"">${orderSummary}</p></body></html>`);
         
         //Open the Order history file and write the current order to file

         fs.open(orderHistoryFilePath,'w',(err,fd)=>{
            if(err)
               console.log('There is some issue while accessing the file',err);
            
            //Write to the file
            fs.writeFile(fd,fileContent,(err,written,string)=>{
               if(err)
                  console.log('Unable to write to the file',err);
               else{
                  console.log('Order history File has been updated');
                  console.log(written,string);
               }
            //Close the file after writing
             fs.close(fd,(err)=>{
               if(err)
                  console.log('Unable to close the file');
               else
                  console.log('File has been closed successfully');
             });
            });

         });
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