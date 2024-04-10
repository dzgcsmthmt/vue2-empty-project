<template>
    <div class="splide-wrapper flex-v-center" ref="ele">
        <el-button
            icon="el-icon-arrow-left"
            size="mini"
            circle
            v-if="showBtn"
            :disabled="currentPage === 1"
            @click="slide(-1)"
        ></el-button>
        <div class="content-wrapper flex-1" ref="listEle">
            <slot></slot>
        </div>
        <el-button
            icon="el-icon-arrow-right"
            size="mini"
            circle
            v-if="showBtn"
            :disabled="currentPage === totalPage"
            @click="slide(1)"
        ></el-button>
    </div>
</template>
<script>
    import { getActualWidth } from "@/util";
    export default {
        name: "Splide",
        data() {
            return {
                showBtn: false,
                currentPage: 1,
                totalPage: 0,
            };
        },
        mounted() {
            let width = this.$refs.listEle.offsetWidth;
            //获取列表的真实宽度
            const listEle = this.$refs.listEle.children[0];
            this.listEle = listEle;
            const listWidth = getActualWidth(listEle);
            if (listWidth > width) {
                this.showBtn = true;
                this.$nextTick(() => {
                    this.width = width = this.$refs.listEle.offsetWidth;
                    const page = Math.ceil(listWidth / width);
                    this.totalPage = page;
                });
            }
        },
        methods: {
            slide(delta) {
                this.currentPage += delta;
                this.listEle.style.transform = `translateX(-${
                    (this.currentPage - 1) * this.width
                }px)`;
            },
        },
    };
</script>
<style scoped lang="less">
    .content-wrapper {
        overflow: hidden;
    }
    :deep .el-button:first-of-type {
        margin-right: 12px;
    }
    :deep .el-button:last-of-type {
        margin-left: 12px;
    }
</style>
