<template>
  <div>
    <BaseHeader></BaseHeader>
    <Login></Login>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseHeader from "@/views/BaseHeader";
import Login from "../components/Login";
export default {
  components: { Login, BaseHeader },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    userLogout() {
      this.$store.dispatch("logOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    }
  }
};
</script>
