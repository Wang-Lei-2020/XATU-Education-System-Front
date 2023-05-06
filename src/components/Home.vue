<template>
    <div>
    这里是主页
    </div>
</template>

<script>
import Vue from "vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components:{},
  computed: {
    isTeacher: function(){
      return Vue.$cookies.get('role') === "teacher";
    }
  },
  created() {
      if (this.$route.params.isReload === 'true') {
        this.$router.go(0);
      }
    },
}
</script>

<style scoped>
</style>
