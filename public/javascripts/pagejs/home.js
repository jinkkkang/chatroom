var socket = io.connect('http://localhost:4000');  
    socket.on('chat',function(data){
      var html = '<h5 class="text-left">' + '<strong>' + data.per +'</strong>' + ' ' +  data.cont +  '</h5>';
          html += "<p class='pull-left'>" + data.time +  "</p><br>"
      $("#chatmessage").append(html)
    })


$("#sendinfo").click(function(){
    if( ! $("#information").val() ){
    $("#chatmessage").append('<h5 class="text-center">输入不能为空</h5>');
    }else{
      var time = new Date().Format("yyyy-MM-dd/hh:mm:ss");
      socket.emit("chat",{cont:$("#information").val(),per:$("#name").text(),time: time});
      var html = '<h5 class="text-right">' + $("#information").val() + ' ' + '<strong>' + $("#name").text() +'</strong>' +  '</h5>';
          html += "<p class='pull-right'>" + time +  "</p><br>"
      $("#chatmessage").append(html)
      $("#information").val('');
      $("#information").focus();
    }
})

//获取所有用户

var userl = self.setInterval("requser()",2000);
function requser(){
      $.get('userlist',{
     },function(data, status){
        if(data.status == "err"){
        $("#showuser").text("获取用户列表失败");
        }else{
          $("#onlinecount").text(data.status.length);
          $("#showuser").text("");
          data.status.map(function(user){
            var onck = "onclick='show(" + '"' + user + '"' + ")'"
            //alert(onck);
            var list = "";
                list += "<li> <span class='glyphicon glyphicon-user' aria-hidden='true'></span>" + " " + user ;
                list += "<span class='glyphicon glyphicon-move pull-right' aria-hidden='true'" + onck +"></span>"
                list += "</li>"
                $("#showuser").append(list)
          })
          
        }
      }

     ).error(function() {
       $("#showuser").text("获取用户列表失败");
     })

}


Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  

var time1 = new Date().Format("yyyy-MM-dd/hh:mm:ss");

//查看个人信息

function show(username){
    $.post('personinfo',{
    username: username
  },function(data,status){
       if(data.status == "notexist"){
          $("#infotitle").text("查看用户资料失败");
          $("#personinfo").modal('show');
       }else{
          $("#infotitle").text(username + "的个人资料");
          const birth = (data.status.birth) ? data.status.birth : "暂无介绍";
          const sex = (data.status.sex) ? data.status.sex : "暂无介绍";
          const intro = (data.status.intro) ? data.status.intro : "暂无介绍";
          const avator = (data.status.avator) ? data.status.avator : "noavator";
          $("#birth").text(birth);
          $("#sex").text(sex);
          $("#intro").text(intro);
          $("#personinfo").modal('show');
          $("#peravator").attr("src","/images/avator/" + avator + ".jpg");
       }
  }).error(function(){
          $("#infotitle").text("查看用户资料失败");
          $("#personinfo").modal('show');
 })
}

