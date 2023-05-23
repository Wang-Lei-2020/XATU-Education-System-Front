<template>
    <div>
        <div>
            <Form
                    v-if="isFormShow && formData.length"
                    :formWidth="formWidth"
                    :formData="formData"
                    :buttons="formButtons"
                    :inline=true
                    class="form"
            >
                <template v-slot:upload>
                    <el-upload
                        class="upload-demo"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/"
                        multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                </template>
            </Form>
        </div>
        <el-table
                :data="data"
                style="width: 100%"
                @selection-change="handleTableCurrentChange"
                @row-click="handleTableRowClick"
                :cell-style="cellStyle"
                :highlight-current-row="highlightCurrent"
                v-loading="loading"
                element-loading-text="数据加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(6, 91, 91,0.9)"
        >
            <template v-for="(item, index) in columns">
                <!-- 多选框-->
                <el-table-column
                        v-if="item.selection"
                        type="selection"
                        :key="`selection_${index}`"
                ></el-table-column>
                <!-- 序号 -->
                <el-table-column
                    v-else-if="item.index"
                    type="index"
                    label="序号"
                    :key="`index_${index}`"
                >
                    <template v-slot="scope">
                        <span>{{(current - 1) * size + scope.$index + 1}}</span>
                    </template>
                </el-table-column>
                <!-- 多级表头 -->
                <el-table-column
                        v-else-if="item.multi"
                        align="center"
                        :label="item.label"
                        :key="`multi_${index}`"
                >
                    <el-table-column
                            v-for="(child, childIndex) in item.children"
                            :key="`child_${index}_${childIndex}`"
                            v-bind="child"
                    >
                    </el-table-column>
                </el-table-column>
                <!-- 自定义内容 -->
                <el-table-column
                        v-else-if="item.slot"
                        :label="item.label"
                        :key="`index_${index}`"
                >
                    <template v-slot="scope">
                        <slot
                                :name="item.slot"
                                :fixed="item.fixed"
                                :height="item.height"
                                :rows="scope.row"
                        ></slot>
                    </template>
                </el-table-column>
                <!--常规内容-->
                <el-table-column
                        v-else
                        v-bind="item"
                        :key="`normal_${index}`"
                >

                </el-table-column>
            </template>

        </el-table>
        <div class="pagination">
            <el-pagination
                    v-if="isPaginationShow && pagination.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pagination.current"
                    :page-size="pagination.size"
                    :page-sizes="[5, 10, 20, 30]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagination.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import Form from "@/components/common/CustomForm/CustomForm.vue";

export default {
    name: 'customTable',
    components: {Form},
    props: {
        columns: {
            type: Array,
            default: () => [],
        },
        data: {
            type: Array,
            default: () => [],
        },
        pagination: {
            type: Object,
            default: () => ({
                current: 1,
                size: 10,
                total: 0,
            }),
        },
        isPaginationShow: {
            type: Boolean,
            default: true,
        },
        // wrapperHeight: {
        //     type: [Number, String],
        //     default: '100%', // 一般情况下，更多地是配置父元素的高度，table的高度根据父元素高度计算
        // },
        // height: {
        //     type: [Number, String],
        //     default: 'calc(100% - 48px)', // table的默认高度是 父元素高度 减去 pagination高度，一般情况下，这个默认配置就够用了，有特殊场景可以另配置
        // },
        // maxHeight: {
        //     type: [Number, String],
        //     default: 'auto',
        // },
        // tableSize: {
        //     type: String,
        //     default: 'small',
        // },
        // stripe: {
        //     type: Boolean,
        //     default: true,
        // },
        // otherConfig: {
        //     type: Object,
        //     default: () => {
        //     },
        // },
        loading: {
            type: Boolean,
            default: false,
        },
        highlightCurrent: {
            type: Boolean,
            default: false,
        },
        //搜索
        isFormShow:{
            type:Boolean,
            default:true,
        },
        formWidth: {
            type: String,
            default: "100px",
        },
        formData: {
            type: Array,
            default: () => []
        },
        formButtons:{
            type:Array,
            default: () => []
        }
    },
    data() {
        return {
            current:this.pagination.current,
            size:this.pagination.size,
        }
    },
    methods: {
        cellStyle: function (e) {  //{row,column,rowIndex,columnIndex}
            let obj = {};
            this.$emit("cellStyle", e, (color = {}) => {     //将事件返回到调用组件的页面去判断 应该现实的颜色
                obj = color;
            });
            return obj;
        },
        // 切换页码
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.current = val
            let pagequery={
                current: val,
                size: this.pagination.size
            }
            this.$emit('getData',pagequery);
        },
        // 切换每页条数
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.size = val
            let pagequery={
                current: this.pagination.current,
                size: val
            }
            this.$emit('getData',pagequery);
            // current-page和 page-size都支持 .sync修饰符，用了.sync修饰符，就不需要手动给 this.pagination赋值了
            // this.pagination.size = value;
            // this.$emit('getData');
        },
        // 切换选择
        handleSelectionChange(val) {
            this.$emit('changeSelection', val);
        },
        // 单选
        handleTableCurrentChange(currentRow) {
            // console.log("changeCurrent", currentRow)
            this.$emit('changeCurrent', currentRow);
        },
        // 点击行
        handleTableRowClick(currentRow) {
            // console.log("rowClick", currentRow)
            this.$emit('rowClick', currentRow);
        },
    },
    watch: {
        data() {
            // 重新请求数据时 table滚动到顶部
        },
        pagination(newData) {
            console.log("newData", newData)

        }
    },
    mounted() {
        console.log("columns", this.columns)


    }
}
</script>

<style scoped>
.pagination{
    float: right;
    margin-top: 20px;
}
.form{
    padding: 10px;
    margin-bottom: 20px;
}

</style>

