var mongoose =  require("mongoose");
var config   =  require("../config");
var md5      =  require("md5")

db = mongoose.connect(config.mongodb);

db.connection.on('error',function(err){
  console.log("数据库连接失败" + err)
});
db.connection.on('connected',function(){
  console.log("数据库连接成功 ... ...");
})

var UserSchema = mongoose.Schema({
   name:String,
   sex: String,
   birth: String,
   password:String,
   email:String,
   intro:String,
   avator:String
})

var ChatSchema = mongoose.Schema({
   date:Date,
   name:String,
   message: String
})

var  UserModel =  db.model('User',UserSchema);
var  ChatModel =  db.model('Chat',ChatSchema);

//用户注册
exports.signup = function(name,sex,birth,password,email,intro,avator,callback){ 
   new UserModel  ({
    name: name,
    sex: sex,
    birth: birth,
    password: password,
    email: email,
    intro: intro,
    avator: avator
   }).save(function(err,doc){ //这里第二个参数 doc就是存进去的对象
    if(err){
      callback(err)
    }else{
      callback(null);
    }
   });
};


//查看用户名是否存在
exports.lookuser = function(name,callback){
   UserModel.findOne({name:name},function(error,person){
    if(error){
      console.log("查询错误");
    }
    if(person){
      callback("signuped",person);
    }else{
      callback(null);
    }
   })
   
}


//验证登录用户用户名密码是否正确

exports.login = function(name,password,callback){
  UserModel.findOne({
    name: name,
    password: password
  },function(err,person){
    if(err){
      console.log("error",err);
    }
    if(person){
      callback("right",person);
    }else{
      callback(null,"error");
    }
  })
}

// 忘记密码时验证用户和邮箱账号是否一致
exports.getpd = function(name,email,callback){
  UserModel.findOne({
    name: name,
    email: email
  },function(err,person){
    if(err){
      console.log("error",err);
    }
    if(person){
      callback("right",person);
    }else{
      callback(null,"error");
    }
  })
}

//更改用户密码
exports.updatepd = function(name,password,callback){
    UserModel.update({name:name},{ $set: { password: password}},function(err,count){
    if(err){
      callback("err",err)
    }else{
      callback(null,count)
    }
  })
}

exports.editinfo = function(name,sex,birth,intro,avator,callback){
    UserModel.update({name:name},{ $set: { sex: sex,birth: birth,intro: intro,avator: avator}},function(err,count){
    if(err){
      callback("err",err);
    }else{
      console.log(count);
      callback(null,count);
    }
  })
}


//获取用户列表
exports.userlist = function(callback){
  UserModel.find({},['name'],function(err,person){
    if(err){
      callback("err",err);
    }else{
      callback(null,person);
    }
  })
}

//保存用户聊天记录

exports.savechat = function(date,name,message,callback){
    new ChatModel  ({
    date: date,
    name: name,
    message: message
   }).save(function(err){
    if(err){
      callback(err)
    }else{
      callback(null);
    }
   });
}


// 搜索聊天记录
//where(date).gt(date1).lt(date2).
exports.search = function(date1,date2,user,content,callback){ 
  var mrule = new RegExp(content,'i');
  if(user == 1){
  var condition = '{message: mrule,date:{"$gte":date1,"$lte":date2}},{skip:15}';
  }else{
  var condition = '{message: mrule,name:user,date:{"$gte":date1,"$lte":date2}},{skip:15}';
  }
  console.log("AAAAAAAAA")
  console.log(condition);
  ChatModel.find(condition).
  exec(function(err,per){
    if(err){
      console.log(err);
    }
    if(per){
      callback(per);
    }else{
      callback(null);
    }

  })
}


