<template>
  <div>
    <BaseHeader></BaseHeader>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseHeader from "@/views/BaseHeader";
export default {
  components: { BaseHeader },
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
