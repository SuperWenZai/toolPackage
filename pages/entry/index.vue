<template>

  <div class="index">
    <div class="item mb20">
      <p class="tittle">最多输入多少个字</p>
      <div class="contain mt10">
        <el-input v-model="msg"
                  placeholder="请输入内容"
                  @blur="chexkMsg"></el-input>
      </div>
    </div>

    <div class="item mb20">
      <p class="tittle">最多输入多少个英文</p>
      <div class="contain mt10">
        <el-input v-model="msgEng"
                  placeholder="请输入内容"
                  @blur="chexkMsgEng"></el-input>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: "index",
  data () {
    return {
      msg: '',
      msgEng: ''
    }
  },
  created () {

  },
  methods: {
    chexkMsg () {
      this.validatorChat(4, '', this.msg, (errors, fields) => {
        if (errors) {
          this.$message.error(errors.message);
        }
      })
    },
    chexkMsgEng () {
      this.englishChat(4, this.msgEng, (errors, fields) => {
        if (errors) {
          this.$message.error(errors.message);
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.index {
  .item {
    .tittle {
      font-size: 24px;
    }
  }
}
</style>

