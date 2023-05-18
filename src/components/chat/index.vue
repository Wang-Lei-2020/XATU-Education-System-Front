<template>
  <div class="chatHome">
    <div class="chatLeft">
      <div class="title">
        <h1>ChatGPT客户端</h1>
      </div>
      <div class="online-person">
        <span class="onlin-text">聊天列表</span>
        <div class="person-cards-wrapper">
          <div class="personList" v-for="personInfo in personList" :key="personInfo.id" @click="clickPerson(personInfo)">
            <PersonCard :personInfo="personInfo" :pcCurrent="pcCurrent"></PersonCard>
          </div>
        </div>
      </div>
    </div>
    <div class="chatRight">
      <ChatWindow v-if="showChatWindow" :frinedInfo="chatWindowInfo" @personCardSort="personCardSort"></ChatWindow>
    </div>
  </div>
</template>
  
<script>
import PersonCard from "./PersonCard.vue";
import ChatWindow from "./ChatWindow.vue";

export default {
  name: "App",
  components: {
    PersonCard,
    ChatWindow,
  },
  data() {
    return {
      pcCurrent: "",
      personList: [
        {
          id: 0,
          name: 'ChatGPT',
          detail: '免费代理版，不要频繁调用，详见 https://github.com/chatanywhere/GPT_API_free',
          headImg: require('@/assets/head_portrait1.png')
        }
      ],
      showChatWindow: false,
      chatWindowInfo: {},
    };
  },
  mounted() {
  },
  methods: {
    clickPerson(info) {
      this.showChatWindow = true;
      this.chatWindowInfo = info;
      this.personInfo = info;
      this.pcCurrent = info.id;
    },
    personCardSort(id) {
      if (id !== this.personList[0].id) {
        console.log(id);
        let nowPersonInfo;
        for (let i = 0; i < this.personList.length; i++) {
          if (this.personList[i].id == id) {
            nowPersonInfo = this.personList[i];
            this.personList.splice(i, 1);
            break;
          }
        }
        this.personList.unshift(nowPersonInfo);
      }
    },
  },
};
</script>
  
<style scoped>
.chatHome {
  display: flex;
  width: 100%;
  height: 670px;
  /* background-color: rgb(39, 42, 55); */
  background-color: #e8e6ff;
}

.chatRight {
  flex: 1;
  padding-right: 30px;
  background-color: #eeeeee;
}

.chatLeft .title {
  /* color: #fff; */
  padding-left: 10px;
}

.chatLeft {
  width: 280px;
}

.chatLeft .online-person {
  margin-top: 60px;
}

.chatLeft .onlin-text {
  padding-left: 10px;
  color: rgb(176, 178, 189);
}

.chatLeft .person-cards-wrapper {
  padding-left: 10px;
  height: 65vh;
  margin-top: 20px;
  overflow: hidden;
  overflow-y: scroll;
  box-sizing: border-box;

}
.chatLeft .person-cards-wrapper::-webkit-scrollbar {
  width: 0;
  /* Safari,Chrome 隐藏滚动条 */
  height: 0;
  /* Safari,Chrome 隐藏滚动条 */
  display: none;
  /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
}
</style>
  