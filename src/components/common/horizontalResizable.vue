<template>
    <div class="resize-ele" :class="expanded ? '' : 'collapsed'" ref="ele">
        <slot />
        <div class="resize-col" ref="colEle">
            <span class="expand-toggle-btn" @click="toggleExpand" role="button">
                <i
                    :class="
                        expanded
                            ? 'el-icon-d-arrow-left'
                            : 'el-icon-d-arrow-right'
                    "
                ></i>
            </span>
        </div>
    </div>
</template>
<script>
    //统一转成数字类型，处理%的情况
    function toPixel(baseWidth, val) {
        if (typeof val === "number") return val;
        if (val.slice(-1) === "%") return (baseWidth * val.slice(0, -1)) / 100;
    }
    export default {
        name: "HorizontalResizable",
        props: {
            min: [Number, String],
            max: [Number, String],
            width: [Number, String],
        },
        data() {
            return {
                expanded: true,
            };
        },
        mounted() {
            let resizeEle = this.$refs.colEle;
            let wrapperEle = resizeEle.parentElement;
            const baseWidth = wrapperEle.parentElement.offsetWidth;
            const min = toPixel(baseWidth, this.min || 0);
            const max = toPixel(baseWidth, this.max || "100%");
            this.$refs.ele.style = `width:${this.width}px;min-width:${min}px;max-width: ${max}px`;
            if (min > max) {
                throw new Error("min width can not be bigger than max");
            }
            let originWidth, originPageX;
            function mousedown(ev) {
                originWidth = wrapperEle.offsetWidth;
                originPageX = ev.pageX;
                //很重要的一行代码 hack处理，防止disabled选中影响mouse事件，另外就是cursor保持一致
                wrapperEle.parentElement.style =
                    "cursor:col-resize;user-select: none";
                document.addEventListener("mousemove", mousemove);
                document.addEventListener("mouseup", mouseup);
                function mousemove(ev) {
                    let offsetX = ev.pageX - originPageX;
                    let width = originWidth + offsetX;
                    if (width < min) {
                        width = min;
                    } else if (width > max) {
                        width = max;
                    }
                    wrapperEle.style.width = `${width}px`;
                }

                function mouseup() {
                    wrapperEle.parentElement.style = "";
                    document.removeEventListener("mousemove", mousemove);
                    document.removeEventListener("mouseup", mouseup);
                }
            }
            resizeEle.addEventListener("mousedown", mousedown);
        },
        methods: {
            toggleExpand(flag) {
                if (typeof flag === "boolean") {
                    this.expanded = flag;
                    this.$refs.ele.children[0].style.display = "";
                } else {
                    this.expanded = !this.expanded;
                    this.$refs.ele.children[0].style.display = this.expanded
                        ? ""
                        : "none";
                }
            },
        },
    };
</script>
<style lang="less" scoped>
    @col-width: 6px;
    .resize-ele {
        height: 100%;
        position: relative;
        .resize-col {
            position: absolute;
            width: @col-width;
            height: 100%;
            cursor: col-resize;
            top: 0;
            right: calc(-@col-width / 2);
            user-select: none;
            z-index: 99;
            background: #fafafa;
            border-left: 1px solid #c7c7c7;
            border-right: 1px solid #c7c7c7;
            &:hover {
                border-radius: calc(@col-width / 2);
                background: #406be2;
            }
        }
        .expand-toggle-btn {
            position: absolute;
            z-index: 3000;
            top: 45%;
            left: 50%;
            transform: translate(-50%) !important;
            width: 22px;
            height: 44px;
            background: #fff;
            box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.06);
            border: 1px solid #eceef1;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border-radius: 8px;
        }
    }
    .collapsed {
        width: 0 !important;
        min-width: 0 !important;
        .resize-col {
            border: none;
            background: transparent;
            &:hover {
                background: transparent;
            }
        }
    }
</style>
