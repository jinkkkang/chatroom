 $("#sgname").change(function(){
   $.post('login',{
     username: $("#sgname").val()
   },function(data,status){
         if(data.status != "nouser"){
          showmodel("提示",$("#sgname").val() + "用户名已经被注册过了");
         }
   })
 })

  //登录
  $("#login1").click(function(){
     if(!$("#loginname").val() || !$("#loginpd")){
       showmodel("填写错误","请将信息填写完整");
     }else{
       $.post('/login',{
      username: $("#loginname").val(),
      password: md5($("#loginpd").val().toString() + "mimajiamizifu")
     },function(data,status){
      if(data.status == "nouser"){
        showmodel("登录错误","用户名不存在");
      }
      if(data.status == "success"){
        window.location.href="./home";
      }
      if(data.status == "fail"){
        showmodel("登录错误","密码不正确");
      }
     })
     }
  });


   // 获取验证码
     $("#Verifi_Code").click(function(){
     if($("#signupemail").val().indexOf("@") == -1){

        showmodel("格式错误","注意检查邮箱的格式");

     }else{

      $.post('verificode',{
      email: $("#signupemail").val()

     },function(data, status){
      if(data.sent == "error"){

         showmodel("系统错误","发送验证码失败");

      }else{
      $('#Verifi_Code').text("验证码已发送,有效期为30分钟");
      $('#Verifi_Code').attr("disabled","true");
      showmodel("验证码已发送","验证码已发送,请在邮箱中查收");

      }

     }).error(function() {
      showmodel("系统错误","发送验证码失败");
     })

     }
  });

    //注册，验证码是否正确，已确认邮箱账号确实是属于注册人的。
    //注册时输入的用户名是否已经被注册。
    //先验证验证码是否正确
    //再验证两次输入的密码是否相同
    //以上两者都验证成功则直接以注册人的身份进行登录
    
  //   $("#signin1").click(function(){
  //    if( ! $('#sgname').val() || ! $("#sgpd1").val() || ! $("#sgpd2").val() || ! $("#signupemail").val() || ! $("#rececode").val() ){
  //     showmodel("信息错误","请将信息填写完整");
  //    }else if(md5($("#rececode").val()) != window.localStorage.getItem("verificode")){
  //     showmodel("验证码错误","填写的验证码错误");
  //    }else if($("#sgpd1").val() != $("#sgpd2").val()){
  //     showmodel("密码错误","两次填写的密码不一致");
  //    }else{
  //     $.post('signup',{
  //     username: $("#sgname").val(),
  //     password: md5($("#sgpd1").val()),
  //     email: $("#signupemail").val()


  //    },function(data, status){
  //     if(data.status == "signupok"){

  //       showmodel("系统通知","注册成功,请在登录界面登录");

  //     }else if(data.status == "namesigned"){
      
  //       showmodel("系统通知","该用户名已经被注册");

  //     }else {
  //       showmodel("系统错误","注册失败");
  //     }

  //    }).error(function() {
  //       showmodel("系统错误","系统错误");
  //    })
  //    }
  // });

//弹出忘记密码框
    $("#forgetpd").click(function(){
      $('#getpd').modal('show');
    })

//忘记密码
    $("#getpasswd").click(function(){
      var forgetname = $("#forgetname").val();
      var forgetmail = $("#forgetmail").val();
      $("#forgetname").val("");
      $("#forgetmail").val("");
      $('#getpd').modal('hide');
      if( !forgetname || !forgetmail || forgetmail.indexOf("@") == -1 ){
        showmodel("错误","将信息填写完整,邮箱格式填写正确");
      }else{
        $.post('forgetpd',{
          forgetname: forgetname,
          forgetmail: forgetmail
        },function(data,status){
          if(data.status == "noname"){
            showmodel("信息错误","用户名不存在");
          }
          if(data.status == "getno"){
            showmodel("信息错误","用户名和邮箱账号不一致");
          }
          if(data.status == "getyes"){
            showmodel("找回密码","我们已经将你的新密码发送至邮箱,请登录进行修改");
          }
          if(data.status == "getfail"){
            showmodel("找回密码","找回密码失败");
          }
        }).error(function() {
        showmodel("系统错误","系统错误");
     })
      }
    })


function showmodel(title,info){
      $('#title').text(title);
      $('#info').text(info);
      $('#remind').modal('show');
}

//注册表单验证

// $("#signup").validate({
//  rules:{
//   sgname: "required",
//   sgbirth: "required",
//   sgintro: "required",
//   sex: "required",
//   sgavator:{ 
//   required: true,
//   accept:"zip"
//   },
//   sgpd1: "required",
//   sgpd2: {
//    required: true,
//    equalTo: "#sgpd1"
//   },
//   signupemail: "required",
//   vericode: "required"
//  },
//  messages:{
//   sgname: "请输入你的用户名",
//   sgbirth: "请输入你的生日",
//   sgintro: "请输入个人简介",
//   sex: "请选择性别",
//   sgavator: {
//     required: "请上传头像头像",
//     accept: "请上传图片格式"
//   },
//   sgpd1: " 请输入密码",
//   sgpd2:{
//     required: "请确认密码",
//     equalTo: "两次输入的密码不一致"
//   },
//   signupemail: "请输入邮箱账号",
//   vericode: "请出入验证码"
//  }

// })
// 
$("#signup").validate({
 rules:{

  sgpd1: "required",
  sgpd2: {
   required: true,
   equalTo: "#sgpd1"
  }
 },
 messages:{
  sgpd1: " 请输入密码",
  sgpd2:{
    required: "请确认密码",
    equalTo: "两次输入的密码不一致"
  }
 }

})


var elme = document.getElementById("sgavator");
     img = document.getElementById("showsgavator");
elme.onchange = function(){
var files = elme.files,
    reader = new FileReader();
if(files && files[0]){
  reader.onload = function (ev){
    img.src = ev.target.result;
  }
  reader.readAsDataURL(files[0]);
}

}