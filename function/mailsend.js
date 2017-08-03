const nodemailer = require("nodemailer");
const config = require("../config").mail;

console.log(config);

let transporter =  nodemailer.createTransport({
   host: config.mailhost,
   port: 465,
   auth:{
      user: config.name,
      pass: config.password
   }
});

exports.verifi = function(tomail,verificode,callback){
let html =  "<h2>WELCOME TO CHAT ROOM</h2>";
    html += "<h2>THIS IS YOUR Verification Code</h2>";
    html += "<h1>" + verificode +  "</h1>";
let option = {
  from: config.name,
  to: tomail,
  subject: "VerifiCode of CHAT ROOM",
  html: html
}

transporter.sendMail(option,(error,info) => {
   if(error){
    console.log("邮件发送失败" + error);
    callback(error);
   }else{
    callback(null);
   }

})
}

exports.sendnewpd = function(tomail,username,newpd,callback){
let html =  "<h2>WELCOME TO CHAT ROOM</h2>";
    html += "<h2>Hello  " + username + "</h2>",
    html += "<h2>THIS IS YOUR NEW PassWord </h2>";
    html += "<h1>" + newpd +  "</h1>";
let option = {
  from: config.name,
  to: tomail,
  subject: "THE NEW PassWord of CHAT ROOM",
  html: html
}

transporter.sendMail(option,(error,info) => {
   if(error){
    console.log("邮件发送失败" + error);
    callback(error);
   }else{
    callback(null);
   }

})
}

exports.welcmsign = function(tomail,username,callback){
let html =  "<h2>WELCOME TO CHAT ROOM</h2>";
    html +=  "<h2>您已经成功注册CHAT ROOM</h2>";
    html += "<h2>Hello  " + username + "</h2>";
    html += "以后没事就多来这里和大家聊天吧";
    html += "<h2>WELCOME TO CHAT ROOM </h2>";
    html += "<h1>" + "O(∩_∩)O哈哈~" +  "</h1>";
let option = {
  from: config.name,
  to: tomail,
  subject: "注册成功",
  html: html
}

transporter.sendMail(option,(error,info) => {
   if(error){
    console.log("邮件发送失败" + error);
    callback(error);
   }else{
    callback(null);
   }

})
}

