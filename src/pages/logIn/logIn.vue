<template>
  <view class="logIn">
    <!-- 图标 -->
    <view class="icon">
      <image src="../../static/favicon.ico" mode="scaleToFill" />
      <text>网易云音乐</text>
    </view>

    <!-- 表单 -->
    <view class="form">
      <!-- 账号 -->
      <view class="form-box">
        <text>账号:</text>
        <input type="text" maxlength="20" confirm-type="next" />
      </view>
      <!-- 密码 -->
      <view class="form-box">
        <text>密码:</text>
        <input type="text" password maxlength="20" confirm-type="done" />
      </view>
      <!-- 登录按钮 -->
      <view class="form-box form-btn">
        <up-button
          class="form-btn-login"
          size="large"
          shape="circle"
          text="登录"
          color="#dd001b"
        ></up-button>
      </view>
    </view>
  </view>
</template>

<script setup></script>

<style lang="less" scoped>
.logIn {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .icon {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    image {
      width: 60px;
      height: 60px;
    }
    text {
      font-size: 30px;
    }
  }
  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .form-box {
      width: calc(100% - 100px);
      margin: 10px 50px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      text {
        font-size: 20px;
        width: 60px;
      }
      input {
        width: calc(100% - 70px);
        border: 1px solid #000000;
        border-radius: 3px;
        padding: 0 5px;
      }
    }
    .form-btn {
      width: 50%;
      .form-btn-login {
        width: 100%;
        height: 20px;
      }
    }
  }
}
</style>
