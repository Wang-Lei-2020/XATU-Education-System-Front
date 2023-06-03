<template>
    <div class="page">
        <el-row>
          <span class="title"><i class="el-icon-d-arrow-right"></i>课程作业</span>
            <div class="titlebox board-blue"/>
        </el-row>
        <el-row>
            <Table
                :isFormShow="false"
                :columns="Columns"
                :data="rTableData"
                :pagination="pagination"
                @getData="getHomeWorkList"
                :loading="loading"
                @changeCurrent="changeCurrent"
                @rowClick="rowClick"
                :isPaginationShow="true"

                :formData="formData"
                :formButtons="formButtons"
            >
                <template v-slot:tag="scope">
                    <el-tag v-if="scope.rows.status == 0"  >
                        未提交
                    </el-tag>
                    <el-tag v-if="scope.rows.status == 1" type="success" >
                        已提交
                    </el-tag>
                </template>
                <template v-slot:action="scope">
                    <el-button
                        size="small"
                        @click="homeworkSubmit(scope)"
                        class="qgreen"
                        :disabled="(scope.rows.isRepeat == 1 && scope.rows.status == 1)||scope.rows.homeworkStatus == 1 ? true:false"
                    >提交
                    </el-button>
                </template>

            </Table>
        </el-row>

    </div>
</template>

<script>
import Table from "@/components/common/CustomTable/CustomTable.vue";

export default {
    name: "HomeworkList",
    components: {Table},
    data() {
        return {
            loading: false,
            pagination: {
                current: 1, //当前页
                size: 10, //页面大小、规定页数为5、10、20、30
                total: 0, //数据总个数
            },
            Columns: [
                {prop: "title", label: "作业标题", sortable: true,align: "center"},
                {prop: "teacher", label: "发布人",align: "center"},
                {prop: "deadline", label: "提交截止时间",align: "center"},
                {slot:"action",  label: "提交作业",align: "center"},
                {slot:"tag", prop: "status", label: "状态",align: "center"},
                {prop: "score", label: "我的得分",align: "center"},
            ],
            rTableData: [],
            formData: [
                {prop: "number", label: "课程号", type: 'Input', width: '240px'},
                {prop: "name", label: "课程名称", type: 'Input', width: '240px'},
            ],
            formButtons: [
                {
                    label: '提交', type: 'primary', action: 'submit',
                    call: (data) => {
                        //返回表单数据
                        console.log(data)
                        //提交表单api
                    }
                },
                {
                    label: '重置', type: 'primary', action: 'reset',
                    call: () => {
                        console.log('reset')
                    }
                },],
        };
    },
    created() {
        this.getHomeWorkList()
    },
    methods: {
        getHomeWorkList() {
            const _this = this
            _this.$axios.get('/homework/stu/list', {
                params: {
                    studentNumber:JSON.parse(sessionStorage.getItem('user')).number,
                    current: _this.pagination.current,
                    pageSize: _this.pagination.size
                }
            }).then((res) => {
                // console.log("作业列表", res.data.data)
                _this.rTableData = res.data.data
                _this.rTableData.forEach(function(element) {
                    element.deadline = _this.timeChange(element.deadline)
                    if(element.score == null) element.score="--"
                });
            })

        },
        changeCurrent(val) {
            console.log(val);
        },
        rowClick(val) {
            console.log(val);
        },
        homeworkSubmit(val){
            // console.log(val);
            // this.$router.push({name: 'HomeworkPage'});
            this.$router.push({name:'HomeworkPage',params:{studentHomework:val.rows}});
        },
        timeChange(time) {
            var date = new Date(time);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = date.getDate() + ' ';
            var h = date.getHours() + ':';
            var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
            var s = date.getSeconds();
            return Y + M + D + h + m + s;
        }
    },
    computed: {},
};
</script>

<style>
.page {
    padding: 10px;
}

.back {
    margin-top: 20px !important;
    margin-left: 40% !important;
}

.title {
    font-weight: bold;
    margin: 10px;
}

.titlebox {
    padding: 10px;
    margin: 10px;
}

.board-blue {
    border-top: 2px solid rgb(47, 150, 204);
}
</style>