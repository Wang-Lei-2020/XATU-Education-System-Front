<template>
    <el-form :model="ruleForm" :inline="inline" ref="ruleForm" :label-width="formWidth">
        <div>
            <el-form-item :label="item.label" :prop="item.prop" :rules="item.rules" v-for="(item,k) in formData"
                          :key="k">
                <template v-if="item.type=='slot'">
                    <slot :name="item.slot_name"></slot>
                </template>
                <!-- 输入框 -->
                <el-input v-model="ruleForm[item.prop]" :placeholder="item.placeholder" v-if="item.type=='Input' "
                          :style="{width: item.width}" :readonly="item.readonly" :show-password="item.password"
                          :maxlength="item.maxlength"   show-word-limit
                ></el-input>
                <!-- 输入框  数字 -->
                <el-input v-model.number="ruleForm[item.prop]" :placeholder="item.placeholder" v-if="item.type=='Input_number' "
                          :style="{width: item.width}" :readonly="item.readonly" :show-password="item.password"
                ></el-input>
                <!-- 选择框 -->
                <el-select v-model="ruleForm[item.prop]" :placeholder="item.placeholder" v-if="item.type=='Select'">
                    <el-option :label="o.label" :value="o.value" v-for="(o,i) in item.options" :key="i"></el-option>
                </el-select>

                <!-- 切换-->
                <el-switch v-model="ruleForm[item.prop]" v-if="item.type=='Switch'"></el-switch>

                <!-- 多选 -->
                <el-checkbox-group v-model="ruleForm[item.prop]" v-if="item.type=='Checkbox'">
                    <el-checkbox :label="o.value" v-for="(o,k) in item.options" :key="k">{{ o.label }}</el-checkbox>
                </el-checkbox-group>

                <!-- 单选 -->
                <el-radio-group v-model="ruleForm[item.prop]" v-if="item.type=='Radio'">
                    <el-radio :label="o.value" v-for="(o,k) in item.options" :key="k">{{ o.label }}</el-radio>
                </el-radio-group>

                <!-- 文本框 -->
                <el-col :span="item.span || 10">
                    <el-input type="textarea" v-model="ruleForm[item.prop]" v-if="item.type=='Textarea'"
                              :placeholder="item.placeholder" :rules="item.rules"
                              :maxlength="item.maxlength"   show-word-limit></el-input>
                </el-col>

                <!-- 三种时间组件 -->
                <!-- 日期 -->
                <el-col :span="item.span || 5">
                    <el-date-picker type="date" :placeholder="item.placeholder" v-model="ruleForm[item.prop]"
                                    style="width: 100%;" v-if="item.type=='Date'"></el-date-picker>
                </el-col>
                <!-- 时间 -->
                <el-col :span="item.span || 5">
                    <el-time-picker :placeholder="item.placeholder" v-model="ruleForm[item.prop]" style="width: 100%;"
                                    v-if="item.type=='Time'"></el-time-picker>
                </el-col>
                <!-- 日期+时间 -->
                <el-col :span="item.span || 5">
                    <el-date-picker type="datetime" :placeholder="item.placeholder" v-model="ruleForm[item.prop]"
                                    style="width: 100%;" v-if="item.type=='Datetime'"></el-date-picker>
                </el-col>


            </el-form-item>
        </div>
        <!-- 按钮 -->
        <div class="buttonGroup">
            <el-form-item>
                <el-button :type="b.type" @click="callSelf('ruleForm',b.action,b.call)" v-for="(b,k) in buttons"
                           :key="k" :style="b.style" >{{ b.label }}
                </el-button>
            </el-form-item>
        </div>
    </el-form>
</template>

<script>
export default {
    name: "CustomForm",
    data() {
        return {
            ruleForm: {},
        };
    },
    props: {
        formWidth: {
            type: String,
            default: "100px",
        },
        formData: {
            type: Array,
            default: () => [],
        },
        buttons: {
            type: Array,
            default: () => [],
        },
        inline: {
            type: Boolean,
            default: false,
        }
    },
    methods: {
        callSelf(formName, action, callback) {
            if (action == 'submit') {
                this.submitForm(formName, callback)
            } else if (action == 'reset') {
                this.resetForm()
                callback && callback()
            } else {
                this.submitForm(formName, callback)
            }
        },
        submitForm(formName, callback) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('submit!');
                    callback && callback(this.ruleForm)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        setForm(row) {
            for (let key in row) {
                this.ruleForm[key] = row[key]
            }
        },
        resetForm() {
            this.$refs.ruleForm.resetFields();
        },
        init(formData) {
            let form = {}
            let box = []
            formData.forEach((item) => {
                switch (item.type) {
                    case 'Checkbox':
                        if (item.default) {
                            if (Array.isArray(item.default)) {
                                box = box.concat(item.default)
                            } else {
                                box.push(item.default)
                            }
                        }
                        form[item.prop] = box
                        break

                    case 'Date':
                    case 'Datetime':
                    case 'Time':
                        if (item.default) {
                            form[item.prop] = new Date(item.default)
                        }

                        break
                    default:
                        form[item.prop] = item.default
                        break
                }

            })

            this.ruleForm = form
        },
    },
    watch: {
        formData: {
            handler(newVal) {
                //console.log(newVal)
                this.init(newVal)
            },
            immediate: true,
            deep: true
        }
    },
    created() {
        // this.init()
    }
}
</script>

<style scoped>


</style>