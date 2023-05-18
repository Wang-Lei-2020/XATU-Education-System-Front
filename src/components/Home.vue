<template>
    <div>
      <Chat />
    </div>
</template>

<script>
import Chat from '@/components/chat';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components:{
    Chat
  },
  computed: {},
  created() {
    if (this.$route.params.isReload === 'true') {
        this.$router.go(0);
    }
  },
}
</script>

<style scoped>
</style>
