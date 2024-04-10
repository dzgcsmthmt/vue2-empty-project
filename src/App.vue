<template>
    <div id="app">
        <Header />
        <div class="app-content-wrapper flex">
            <SideBar v-if="getTokenDone" />
            <div class="content-wrapper" v-if="getTokenDone">
                <router-view />
            </div>
        </div>
        <Footer />
    </div>
</template>
<script>
    import { getToken } from "@/util/token";
    import { removeParam } from "@/util/index";
    import { getUserInfo, checkusermenuright } from "@/api/user";
    import Header from "@/components/layout/header.vue";
    import Footer from "@/components/layout/footer.vue";
    import SideBar from "@/components/layout/sidebar.vue";
    export default {
        name: "App",
        components: {
            Header,
            Footer,
            SideBar,
        },
        data() {
            return {
                getTokenDone: false,
            };
        },
        mounted() {
            let code = new URLSearchParams(location.search).get("code");
            //处理参数传入code的情况
            if (code) {
                removeParam("code");
            }
            getToken(code)
                .then((data) => {
                    this.$store.dispatch(
                        "user/setAccessToken",
                        `Bearer ${data.access_token}`
                    );
                    this.getTokenDone = true;
                    getUserInfo().then((user) => {
                        console.log(user);
                        window.__bl &&
                            window.__bl.setConfig &&
                            window.__bl.setConfig({
                                uid: user.userInfo && user.userInfo.userid,
                            });
                        this.$store.dispatch("user/setUserInfo", user);
                        this.$store.dispatch("user/getEquityCount");
                    });
                    checkusermenuright().then((res) => {
                        this.$store.dispatch("user/setFreeTrial", res);
                    });
                })
                .catch((err) => {
                    this.getTokenDone = true;
                });
        },
    };
</script>

<style lang="less" scoped>
    #app {
        height: 100vh;
        display: flex;
        flex-direction: column;
    }
    .app-content-wrapper {
        height: calc(100vh - 100px);
    }
    .content-wrapper {
        flex: 1;
        height: 100%;
        overflow: auto;
    }
</style>
