import { mapGetters } from 'vuex';
import TextLeftInput from '../../inputGroup/TxtLeft.vue';
import TxtBlock from '../../inputGroup/TxtBlock';
import DeleteModule from '../../Delete/Delete.vue';
import Align from '../../Align/Align';
import IndexChange from '../IndexChange/IndexChange.vue';
import SwitchTxtBlock from '../../SwitchGroup/TxtBlock';

export default {
    name: 'skuWin',
    mixins: [],
    props: {

	},
    data() {
        return {
            inputWidth: 55,
            width: '宽度:',
            height: '高度:',
            x: '横轴:',
            y: '纵轴:'
        }
    },
    computed: {
        ...mapGetters(['getModulesById', 'getCurrentFileId'])
    },
    methods: {
        _skuBlur(val) {
            let re = /^\d+$/;

            if(re.test(val)) {
                this.$store.dispatch('setModuleById', {
                    newVal: {
                        skuid: val
                    }
                });
                this.$store.dispatch('getPrice', {
                    skus: val,
                    moduleId: this.getModulesById.id,
                    fileId: this.getCurrentFileId
                });
            }else{
                this.$refs['skuInput'].setVal(this.getModulesById.skuid);
                this.$message({
                    showClose: true,
                    message: '输入正确的skuId',
                    type: 'error'
                });
            }
        },

        _alignEvent(type) {
            this.$store.dispatch('setModuleAlign', type);
            this.$store.dispatch('saveHistory');
        },

        _indexChange(status) {
            this.$store.dispatch('setModuleIndex', status);
            this.$store.dispatch('saveHistory');
        },

        _dirchange(on) {
            this.$store.dispatch('setModuleById', {
                newVal: {
                    dir: on? 'right': 'left'
                }
            });
        },

        _inputBlur(val, refName, attr) {
            let _this = this;
            let thisModule = _this.getModulesById;
            let naturalWidth = thisModule.naturalWidth;
            let naturalHeight = thisModule.naturalHeight;
            let re = /^(\-)?\d+(\.\d+)?$/;

            if(re.test(val)) {
                if(attr == 'width' || attr == 'height') {
                    // 宽高设置
                    if(parseInt(val, 10) <= 0) {
                        // 负数
                        if(attr == 'width') {
                            this.$store.dispatch('setModuleById', {
                                newVal: {
                                    width: _this.getModuleMinWidth,
                                    height: parseInt(_this.getModuleMinWidth * naturalHeight / naturalWidth, 10)
                                }
                            });
                            this.$store.dispatch('saveHistory');
                        }else{
                            this.$store.dispatch('setModuleById', {
                                newVal: {
                                    width: parseInt(_this.getModuleMinHeight * naturalWidth / naturalHeight, 10),
                                    height: _this.getModuleMinHeight
                                }
                            });
                            this.$store.dispatch('saveHistory');
                        }
                    }else{
                        // 正数
                        if(attr == 'width') {
                            this.$store.dispatch('setModuleById', {
                                newVal: {
                                    width: parseInt(val, 10),
                                    height: parseInt(parseInt(val, 10) * naturalHeight / naturalWidth, 10)
                                }
                            });
                            this.$store.dispatch('saveHistory');
                        }else{
                            this.$store.dispatch('setModuleById', {
                                newVal: {
                                    width: parseInt(parseInt(val, 10) * naturalWidth / naturalHeight, 10),
                                    height: parseInt(val, 10)
                                }
                            });
                            this.$store.dispatch('saveHistory');
                        }
                    }
                }else{
                    // x, y设置
                    this.$store.dispatch('setModuleById', {
                        newVal: {
                            [attr]: parseInt(val, 10)
                        }
                    });
                    this.$store.dispatch('saveHistory');
                    this.$refs[refName].setVal(parseInt(val, 10));
                }
            }else{
                this.$refs[refName].setVal(this.getModulesById[attr]);
                this.$message({
                    showClose: true,
                    message: '输入必须为数值',
                    type: 'error'
                });
            }
        }
    },
    components: {
        TextLeftInput,
        TxtBlock,
        DeleteModule,
        Align,
        IndexChange,
        SwitchTxtBlock
    },
    beforeCreate: function () {

    },
    created: function () {

    },
    beforeMount: function () {

    },
    mounted: function () {

    },
    beforeUpdate: function () {

    },
    updated: function () {

    },
    beforeDestroy: function () {

    },
    destroyed: function () {

    },
    watch: {

    }
}
