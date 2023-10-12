<template>
    <div>
        <div>{{ turn }}님의 턴입니다.</div>
        <table-component :table-data="tableData" />
        <div v-if="winner">{{ winner }}님의 승리!</div>
    </div>
</template>

<script>
import Vue from 'vue'
import TableComponent from './TableComponent'

export default {
    components: {
        TableComponent
    },
    data () {
        return {
            tableData: [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ],
            turn: 'O',
            winner: ''
        }
    },
    computed: {

    },
    methods: {
        // vue는 배열의 변화를 감지하지 못한다.
        // 다만 push 같은 메소드는 감지할 수 있다.
        // 해결방법 1. Vue.set(배열, 인덱스, 값)
        // 해결방법 2. this.$set(배열, 인덱스, 값)
        onChangeData () {
            // 잘못된 예시
            // this.tableData[0][1] = 'O';

            // 올바른 예시
            Vue.set(this.tableData[1], 0, 'X');
            this.$set(this.tableData[1], 0, 'X'); // this.$set은 Vue.set의 별칭이다.
        }
    },
}
</script>

<style>
    table {
        border-collapse: collapse;
    }
    td {
        border: 1px solid black;
        width: 40px;
        height: 40px;
        text-align: center;
    }
</style>