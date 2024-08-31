import axios from "axios";
import axiosAdapterUniapp from "axios-adapter-uniapp";
//跨域的话必须设置
axios.defaults.withCredentials = true;
// // 引入进度条
// import nprogress from "nprogress";
// // 引入进度条样式
// import "nprogress/nprogress.css";

const myUrl = {
  a: "http://localhost:3000", //测试gitee上传gitee
  b: "http://8144281bj8.zicp.fun:22958/", //贝锐花生壳 内网穿透
  c: "https://my-fork-netease-cloud-music-api-vercel-yaojunhaoya.vercel.app/", //vercel的第一个接口（第一第二内容相同的）
  d: "https://my-fork-netease-cloud-music-api-vercel-git-master-yaojunhaoya.vercel.app/", //vercel的第二个接口（第一第二内容相同的）测试
  e: "http://wyapi.sa00.cn/", //网友api
  f: "https://api.csm.sayqz.com", //别人服务器可以用
  g: "http://192.168.5.15:3000/",
};

const requests = axios.create({
  baseURL: myUrl.g, // 设置根路径 http://localhost:3000
  adapter: axiosAdapterUniapp,
  timeout: 5000,
  //这告诉服务器请求正文将发送为JSON格式。
  headers: {
    "Content-Type": "application/json",
  },
  // 在跨域请求时，允许携带敏感信息，如cookie、HTTP认证信息等
  xhrFields: {
    withCredentials: true, //跨域的话必须设置
  },
  // 其他配置项...
});

// 添加请求拦截器
requests.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // console.log('发送了一次请求', config);
    // 进度条开始
    // nprogress.start();
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
requests.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    // console.log('响应拦截器一次');
    // 进度条结束
    // nprogress.done();
    return response;
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

//#region
//
//#endregion

export default requests;
