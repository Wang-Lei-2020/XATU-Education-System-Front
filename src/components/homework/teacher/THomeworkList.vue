<template>
    <div class="page">
        <el-row>
            <span class="title"><i class="el-icon-d-arrow-right"></i>课程作业</span>
            <div class="titlebox board-blue"/>
        </el-row>
        <el-row>
            <div>
                <el-button
                        size="small"
                        @click="UploadHomework"
                        class="qgreen"
                >发布作业
                </el-button>
            </div>

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
                    <el-tag v-if="scope.rows.status == 0" type="success" >
                        进行
                    </el-tag>
                    <el-tag v-if="scope.rows.status == 1" type="info" >
                        截止
                    </el-tag>
                </template>
                <template v-slot:action="scope">
                    <el-button
                            size="small"
                            @click="homeworkCommit(scope)"
                            class="qgreen"
                            :disabled="scope.rows.status == 0 ? true:false"
                    >批改
                    </el-button>
                    <el-button
                            size="small"
                            @click="homeworkEdit(scope)"
                            class="qgreen"
                    >编辑
                    </el-button>
                    <el-button
                            size="small"
                            @click="homeworkDelete(scope)"
                            class="qgreen"
                    >删除
                    </el-button>
                </template>

            </Table>
        </el-row>

    </div>
</template>

<script>
import Table from "@/components/common/CustomTable/CustomTable.vue";

export default {
    name: "THomeworkList",
    components: {Table},
    data() {
        return {
            loading: false,
            pagination: {
                current: 1, //当前页
                size: 20, //页面大小、规定页数为5、10、20、30
                total: 0, //数据总个数
            },
            Columns: [
                {selection: true},
                {index: true},
                {prop: "title", label: "作业标题", sortable: true, align: "center"},
                {prop: "teacher", label: "发布人", width: "100px",align: "center"},
                {prop: "deadline", label: "提交截止时间", align: "center"},
                {slot: "tag", prop: "status", label: "状态", width: "60px", align: "center"},
                {prop: "grade", label: "作业总分", sortable: true, align: "center"},
                {slot: "action", label: "操作", fixed: "right", width: "250px", align: "center"}
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
            _this.$axios.get('/homework/list', {
                params: {
                    courseNumber: sessionStorage.getItem("courseNum"),
                    courseIndex: sessionStorage.getItem("courseIndex"),
                    current: _this.pagination.current,
                    pageSize: _this.pagination.size
                }
            }).then((res) => {
                // console.log("作业列表", res.data.data)
                _this.rTableData = res.data.data
                _this.rTableData.forEach(function(element) {
                    element.deadline = _this.timeChange(element.deadline)
                });
                // this.course = res.data.data;
            })
        },
        changeCurrent(val) {
            console.log(val);
        },
        rowClick(val) {
            console.log(val);
        },
        homeworkCommit(val) {
            console.log(val);
            this.$router.push({name: 'StudentHomeworkList'});
            sessionStorage.setItem("homework",val.rows.homework)
        },
        homeworkEdit(val) {
            // console.log("编辑",val);
            this.$router.push({name:'AddHomework',params:{homework:val.rows}});
        },
        homeworkDelete(val) {
            console.log("删除",val);
            const _this = this
            _this.$axios.get('/homework/delete', {
                params: {
                    homeworkNum:val.rows.homework
                }
            }).then((res) => {
                // console.log(res.data)
                if(res.data.data == "删除成功"){
                    _this.getHomeWorkList()
                }
            })
        },
        UploadHomework() {
            this.$router.push({name: 'AddHomework'});
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