import Vue from "vue";
import store from "./store";
import router from "./router";
// import "./auto-import-elementUI.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/css/common.less";
import "@/assets/css/vendor.less";
import App from "./App.vue";
import Log from "@/util/log.js";

Vue.use(ElementUI);

Vue.prototype.$addFunLogs = (functionName, functionCode, obj) => {
    Log.addFunLogs(functionName, functionCode, obj);
};
// 注册全局自定义指令-日志埋点
Vue.directive("logs", {
    bind: function (el, binding, vnode) {
        el.addEventListener("click", function (e) {
            Vue.prototype.$addFunLogs(
                binding.value[0],
                binding.value[1],
                binding.value[2] ? binding.value[2] : {}
            );
        });
    },
});

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
