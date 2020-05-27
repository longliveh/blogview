<template>
  <div class="cardbg">
    <Card class="logincard">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="email">
          <Input
            tpye="text"
            class="size"
            prefix="ios-contact"
            v-model="formInline.email"
            placeholder="Enter name"
          />
        </FormItem>
        <FormItem prop="password">
          <Input
            type="password"
            prefix="ios-lock"
            class="size"
            v-model="formInline.password"
            placeholder="Password"
          >
          </Input>
        </FormItem>
        <FormItem>
          <Button class="size" type="success" @click="userLogin" @keyup.enter.native="userLogin">登录</Button>
        </FormItem>
      </Form>
      <div class="regist">
        <span>还没有微博？</span>
        <router-link to="/regist">立即注册！</router-link>
        <a style="margin-left: 85px;">忘记密码</a>
      </div>
    </Card>
  </div>
</template>

<script>
import userApi from "@/api/userApi";

export default {
  name: "Login",
  data() {
    const validateEmail = (rule, value, callback) => {
      var reg = new RegExp(
        "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
      );
      if (value === "") {
        callback(new Error("邮箱不能为空！"));
        return false;
      } else if (!reg.test(value)) {
        callback(new Error("请输入有效合法的邮箱地址！"));
      } else {
        callback();
      }
    };
    return {
      formInline: {
        email: "",
        password: ""
      },
      ruleInline: {
        email: [
          {
            validator: validateEmail,
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入您的密码",
            trigger: "blur"
          },
          {
            type: "string",
            // min: 6,
            message: "密码不能少于6为",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    async userLogin() {
      let res = await userApi.login(this.formInline);
      if(res.code==0)
      {
        this.$store.dispatch("setlogin", true);
        this.$store.dispatch("getUserInfo").then(()=>{
          this.$router.push("/general").then(function() {
            window.location.reload()
          })
        })
      }else if(res.code==20002)
      {
        this.formInline.password=""
        this.$Message.error("用户名或密码错误！")
      }

    }
  }
};
</script>

<style scoped>
.logincard {
  width: 300px;
  height: 246px;
  text-align: center;
}
.size {
  width: 266px;
  height: 34px;
}
.cardbg {
  width: 340px;
  height: 286px;
  background-color: hsl(240, 13%, 95%);
  padding: 20px;
}
  .regist{
    border-width: 0px 0px 1px;
    color: hsl(0, 0%, 20%);
    font-size: 12px;
    gap: normal;
    /*margin: 12px 0px 0px;*/
    padding: 0px 0px 10px;
    text-align: left;
  }
</style>
