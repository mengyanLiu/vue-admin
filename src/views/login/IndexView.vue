<template>
   <div id="login">
     <div class="login-wrap">
        <ul class="menu-tab">
          <li :class="{'current':item.current}" v-for="item in menuTab" :key="item.id" @click="toggleMenu(item)">{{item.txt}}</li>
        </ul>
        <!--表单的开始-->
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="login-form" ssize="medium">
  <el-form-item  prop="username" class="itme-form">
    <label>邮箱</label>
    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
  </el-form-item>

  <el-form-item  prop="password" class="itme-form" maxlength="20" minlength="6">
    <label>密码</label>
    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
  </el-form-item>

  <el-form-item  prop="passwords" class="itme-form" v-show="model === 'register'">
    <label>重复密码</label>
    <el-input type="password" v-model="ruleForm.passwords" autocomplete="off"></el-input>
  </el-form-item>

  <el-form-item  prop="code" class="itme-form" maxlength="6" minlength="6">
    <label>验证码</label>
    <el-row :gutter="20">
      <el-col :span="15"><el-input v-model.number="ruleForm.code"></el-input></el-col>
      <el-col :span="9"><el-button  class="block" type="success" >获取验证码</el-button></el-col>
    </el-row>
    
  </el-form-item>
  <el-form-item>
    <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">提交</el-button>
  </el-form-item>
</el-form>
     </div>
   </div>
</template>

<script>
import { stripscript,validateEmail,validatePass,validateCo } from '@/utils/validate';
export default{
    name: 'login',
    data(){
      //验证用户名
      var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(!validateEmail(value)){
          callback(new Error('用户名格式有误'));
        } else{
          callback(); //true
        }
      };
      //验证密码
      var validatePassword = (rule, value, callback) => {
        //过滤后的数据
        this.ruleForm.password = stripscript(value)
        value=this.ruleForm.password
        if (value === '') {
          callback(new Error('密码不能为空'));
        } else if (!validatePass(value)) {
          callback(new Error('密码为6-20位的数字加字母!'));
        } else {
          callback();
        }
      };
        //验证重复密码
        var validatePasswords = (rule, value, callback) => {
          //如果模块值位login，直接通过
          if(this.model='login'){
            callback();
          }
        //过滤后的数据
        this.ruleForm.passwords = stripscript(value)
        value=this.ruleForm.passwords
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value!= this.ruleForm.password) {
          callback(new Error('想清楚再写！两次密码不一样干什么玩意儿'));
        } else {
          callback();
        }
      };

       //验证验证码
       var validateCode = (rule, value, callback) => {
        this.ruleForm.code = stripscript(value)
        value=this.ruleForm.code
        if (value === '') {
          callback(new Error('请输入验证码'));
          }else if (!validateCo(value)) {
          callback(new Error('验证码格式有误'));
        } else {
          callback();
        }
      
      };
      
      return{
        menuTab:[
          {txt:'登录',current:true,type:'login'},
          {txt:'注册',current:false,type:'register'},
        ],
        //模块的值
        model:'login',
        //表单的数据
        ruleForm: {
          username: '',
          password: '',
          passwords: '',
          code: ''
        },
        rules: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          passwords: [
            { validator: validatePasswords, trigger: 'blur' }
          ],
          code: [
            { validator: validateCode, trigger: 'blur' }
          ]
        }
      }
    },
    created(){},
    mounted(){},
    //写函数的地方
    methods:{
      toggleMenu(data){
        this.menuTab.forEach(elem =>{//与先把所选元素的指定属性（这里就是文本的current样式清除，然后点击哪个，传进来数据的current则为true即被渲染）
          elem.current=false
        });
        //高光
        data.current=true
        //修改模块值
        this.model=data.type
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

    }
}


</script>
<style lang="scss" scoped>
#login{
background-color: #344a5f;
height:100vh
}
.login-wrap{
  width:330px;
  margin:auto;
}
.menu-tab{
  text-align:center;
  li{
  display: inline-block;
  width:88px;
  line-height:36px;
  font-size: 14px;
  color: #fff;
  border-radius: 2px;
}
.current{
 background-color: black;
}
}
.login-form{
  margin-top: 29px;
  label{
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: white;
  }
  .item-form{
    display: block;
    margin-bottom: 13px;
  }
  .block{
   
    display: block;
    width: 100%;

  }
  .login-btn{
    margin-top:19px ;
  }

}

</style>