<template>
    <Card class="card">
        <p slot="title">使用邮箱地址注册</p>
        <Form ref="formRegist" :model="formRegist" :rules="ruleValidate" label-position="top">
            <FormItem label="电子邮箱" prop="email">
                <Input prefix="ios-mail-outline" v-model="formRegist.email"></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
                <Input prefix="ios-lock-outline" type="password" v-model="formRegist.password" password></Input>
            </FormItem>
            <FormItem label="用户名（昵称）" prop="nickname">
                <Input prefix="ios-contact-outline" v-model="formRegist.nickname"></Input>
            </FormItem>
            <FormItem>
                <Button long type="success" @click="register">注册</Button>
            </FormItem>
        </Form>

    </Card>
</template>

<script>
  import api from "../api/commonApi";

  export default {
    name: "Register",
    data(){
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
        formRegist: {
          email:'',
          password: '',
          nickname: ''
        },
        ruleValidate: {
          email: [
            {required:true,validator:validateEmail, trigger: 'blur' }
          ],
          password: [
            {required:true,message: '密码不能少于6位!',min:6, trigger: 'blur' }
          ],
          nickname:[
            {required:true,message: '用户名不能为空!',trigger: 'blur'}
          ]

        }
      }
    },
    methods:{
      async register() {
        this.handleSpinCustom()
        let res = await api.register(this.formRegist);
        if (res.code==0)
        {
          this.$Message.success('注册成功！');
        }
        this.$Spin.hide();
        console.log(res);
      },
      handleSpinCustom () {
        this.$Spin.show({
          render: (h) => {
            return h('div', [
              h('Icon', {
                'class': 'demo-spin-icon-load',
                props: {
                  type: 'ios-loading',
                  size: 18
                }
              }),
              h('div', 'Loading')
            ])
          }
        });
      }
    }
  };
</script>

<style scoped>
.card{
    width: 400px;
    padding: 0px 16px;
    margin: 50px auto;
}
</style>