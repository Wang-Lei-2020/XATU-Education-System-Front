<template>
  <div class="chat-window">
    <div class="top">
      <div class="head-pic">
        <HeadPortrait :imgUrl="frinedInfo.headImg"></HeadPortrait>
      </div>
      <div class="info-detail">
        <div class="name">{{ frinedInfo.name }}</div>
        <div class="detail">{{ frinedInfo.detail }}</div>
      </div>
      <div class="other-fun">
        <label for="docFile">
          <span class="iconfont icon-wenjian"></span>
        </label>
        <label for="imgFile">
          <span class="iconfont icon-tupian"></span>
        </label>
      </div>
    </div>
    <div class="botoom">
      <div class="chat-content" ref="chatContent">
        <div
          class="chat-wrapper"
          v-for="(item, index) in chatList"
          :key="item.id"
        >
          <div class="chat-friend" v-if="item.uid !== '1001'">
            <div class="info-time">
              <img :src="item.headImg" alt="" />
              <span>{{ item.name }}</span>
              <span>{{ item.time }}</span>
            </div>
            <div class="chat-text" v-if="item.chatType == 0">
              <template v-if="isSend && index == chatList.length - 1">
                <span class="flash_cursor"></span>
              </template>
              <template v-else>
                <pre>{{ item.msg }}</pre>
              </template>
            </div>
          </div>
          <div class="chat-me" v-else>
            <div class="info-time">
              <span>{{ item.name }}</span>
              <span>{{ item.time }}</span>
              <img :src="item.headImg" alt="" />
            </div>
            <div class="chat-text" v-if="item.chatType == 0">
              {{ item.msg }}
            </div>
          </div>
        </div>
      </div>
      <div class="chatInputs">
        <input class="inputs" v-model="inputMsg" @keyup.enter="sendText" />
        <el-button class="send boxinput" :disabled="isSend" @click="sendText">
          <img src="@/assets/rocket.png" alt="" />
        </el-button>
      </div>
    </div>
  </div>
</template>
  
<script>
import { animation, createSSE } from "@/util/util";

import HeadPortrait from "./HeadPortrait";
export default {
  components: {
    HeadPortrait,
  },
  props: {
    frinedInfo: Object,
    default() {
      return {};
    },
  },
  data() {
    return {
      chatList: [],
      inputMsg: "",
      showEmoji: false,
      friendInfo: {},
      srcImgList: [],
      isSend: false,
    };
  },
  mounted() {
    this.appendMessage(this.getUserMessageObj("GPT-3模型为您服务", true));
  },
  methods: {
    /** 消息显示到聊天框 */
    appendMessage(msg) {
      this.chatList.push(msg);
      this.scrollBottom();
    },
    /** 获取窗口高度并滚动至最底层 */
    scrollBottom() {
      this.$nextTick(() => {
        const scrollDom = this.$refs.chatContent;
        animation(scrollDom, scrollDom.scrollHeight - scrollDom.offsetHeight);
      });
    },
    /** 获取会话双方消息结构 */
    getUserMessageObj(msg, gpt = false) {
      if (!gpt) {
        return {
          headImg: sessionStorage.getItem("photoUrl"),
          name: "我",
          time: new Date().toLocaleTimeString(),
          msg: msg,
          chatType: 0, // 信息类型，0文字
          uid: "1001", // uid
        };
      } else {
        return {
          headImg: require("@/assets/head_portrait1.png"),
          name: "ChatGPT",
          time: new Date().toLocaleTimeString(),
          msg: msg,
          chatType: 0, // 信息类型，0文字
          uid: "1002", // uid
        };
      }
    },
    /** 用户发送消息 */
    sendText() {
      if (this.inputMsg) {
        let chatMsg = this.getUserMessageObj(this.inputMsg);
        this.appendMessage(chatMsg);
        this.$emit("personCardSort", this.frinedInfo.id);
        this.inputMsg = "";
        this.loading = true;
        this.isSend = true;
        let chatGPT = this.getUserMessageObj("", true);
        this.appendMessage(chatGPT);

        const sse = createSSE(
          "http://localhost:8909/chat/sse?prompt=" + chatMsg.msg,
          undefined,
          (ev) => {
            if (this.isSend) {
              this.isSend = false;
            }
            this.chatList[this.chatList.length - 1].msg += ev.data;
          },
          (ev) => console.log(ev.readyState)
        );
        console.log(sse.readyState);
      } else {
        this.$message({
          message: "消息不能为空哦~",
          type: "warning",
        });
      }
    },
  },
};
</script>
  
<style scoped>
.flash_cursor {
  width: 20px;
  height: 30px;
  display: inline-block;
  background: #d6e3f5;
  opacity: 1;
  animation: glow 800ms ease-out infinite alternate;
}

@keyframes glow {
  0% {
    opacity: 1;
  }

  25% {
    opacity: 0.5;
  }

  50% {
    opacity: 0;
  }

  75% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}

.chat-window {
  width: 100%;
  height: 100%;
  margin-left: 20px;
  position: relative;
}

.chat-window .head-pic {
  float: left;
}

.chat-window .top {
  margin-bottom: 50px;
}

.chat-window .top::after {
  content: "";
  display: block;
  clear: both;
}

.chat-window .info-detail {
  float: left;
  margin: 5px 20px 0;
}

.info-detail .name {
  font-size: 20px;
  font-weight: 600;
}

.info-detail .detail {
  color: #9e9e9e;
  font-size: 12px;
  margin-top: 2px;
}

.chat-window .other-fun {
  float: right;
  margin-top: 20px;
}

.other-fun span {
  margin-left: 30px;
  cursor: pointer;
}

.other-fun input {
  display: none;
}

.chat-window .botoom {
  width: 100%;
  height: 70vh;
  background-color: rgb(225, 230, 248);
  border-radius: 20px;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
}

.chat-window .botoom .chat-content {
  width: 100%;
  height: 85%;
  overflow-y: scroll;
  padding: 20px;
  box-sizing: border-box;
}

.chat-window .botoom .chat-content::-webkit-scrollbar {
  width: 0;
  /* Safari,Chrome 隐藏滚动条 */
  height: 0;
  /* Safari,Chrome 隐藏滚动条 */
  display: none;
  /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
}

.chat-content .chat-wrapper {
  position: relative;
  word-break: break-all;
}

.chat-wrapper .chat-friend {
  width: 100%;
  float: left;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.chat-friend .chat-img img {
  width: 100px;
  height: 100px;
}

.chat-friend .info-time {
  margin: 10px 0;
  font-size: 14px;
}

.chat-friend .info-time img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 10px;
}

.chat-friend .info-time span:last-child {
  color: rgb(101, 104, 115);
  margin-left: 10px;
  vertical-align: middle;
}

.chat-friend .chat-text {
  max-width: 90%;
  padding: 20px;
  border-radius: 20px 20px 20px 5px;
  background-color: rgb(85, 110, 205);
  color: #fff;
}

.chat-friend .chat-text:hover {
  background-color: rgb(129, 145, 211);
}

.chat-friend .chat-text pre {
  white-space: break-spaces;
}

.chat-wrapper .chat-me {
  width: 100%;
  float: right;
  margin-bottom: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
}

.chat-wrapper .chat-me .info-time {
  margin: 10px 0;
  font-size: 14px;
  display: flex;
  justify-content: flex-end;
}

.chat-wrapper .chat-me .info-time span {
  line-height: 30px;
}

.chat-wrapper .chat-me .info-time span:first-child {
  color: rgb(101, 104, 115);
  margin-right: 10px;
  vertical-align: middle;
}

.chat-wrapper .chat-me .info-time img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  vertical-align: middle;
  margin-left: 10px;
}

.chat-wrapper .chat-me .chat-img img {
  max-width: 300px;
  max-height: 200px;
  border-radius: 10px;
}

.chat-wrapper .chat-me .chat-text {
  float: right;
  max-width: 90%;
  padding: 20px;
  border-radius: 20px 20px 5px 20px;
  background-color: rgb(29, 144, 245);
  color: #fff;
}

.chat-wrapper .chat-me .chat-text:hover {
  background-color: rgb(26, 129, 219);
}

.chat-window .botoom .chatInputs {
  width: 90%;
  position: absolute;
  bottom: 0;
  margin: 3%;
  display: flex;
}

.chat-window .botoom .boxinput {
  width: 50px;
  height: 50px;
  background-color: rgb(66, 70, 86);
  border-radius: 15px;
  border: 1px solid rgb(80, 85, 103);
  position: relative;
  cursor: pointer;
}

.chat-window .botoom .boxinput img {
  width: 30px;
  height: 30px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.chat-window .botoom .inputs {
  width: 90%;
  height: 50px;
  background-color: rgb(228, 230, 241);
  border-radius: 15px;
  border: 2px solid rgb(34, 135, 225);
  padding: 10px;
  box-sizing: border-box;
  transition: 0.2s;
  font-size: 20px;
  /* color: #fff; */
  font-weight: 100;
  margin: 0 20px;
}

.chat-window .botoom .inputs:focus {
  outline: none;
}

.chat-window .botoom .send {
  background-color: rgb(29, 144, 245);
  border: 0;
  transition: 0.3s;
  box-shadow: 0px 0px 5px 0px rgba(0, 136, 255);
}

.chat-window .botoom .send:hover {
  box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
}
</style>