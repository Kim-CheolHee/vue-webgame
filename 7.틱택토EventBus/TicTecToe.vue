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
import EventBus from './EventBus'

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
        },
        onClickTd (rowIndex, cellIndex) {
            this.$set(this.tableData[rowIndex], [cellIndex], this.turn);

            let win = false;
            // 가로줄 검사
            if (this.tableData[rowIndex][0] === this.turn &&
                this.tableData[rowIndex][1] === this.turn &&
                this.tableData[rowIndex][2] === this.turn) {
                win = true;
            }
            // 세로줄 검사
            if (this.tableData[0][cellIndex] === this.turn &&
                this.tableData[1][cellIndex] === this.turn &&
                this.tableData[2][cellIndex] === this.turn) {
                win = true;
            }
            // 대각선 검사
            if (this.tableData[0][0] === this.turn &&
                this.tableData[1][1] === this.turn &&
                this.tableData[2][2] === this.turn) {
                win = true;
            }
            if (this.tableData[0][2] === this.turn &&
                this.tableData[1][1] === this.turn &&
                this.tableData[2][0] === this.turn) {
                win = true;
            }

            // 승리시 (턴 초기화, 테이블 초기화)
            if (win) {
                this.winner = this.turn;
                this.turn = 'O';
                this.tableData = [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', ''],
                ];
            } else {
                // 졌을 때 (턴 변경)
                let all = true; // all이 true면 무승부라는 뜻
                this.tableData.forEach((row) => {
                    row.forEach((cell) => {
                        if (!cell) {
                            all = false;
                        }
                    });
                });
                // 무승부시
                if (all) {
                    this.winner = '';
                    this.turn = 'O';
                    this.tableData = [
                        ['', '', ''],
                        ['', '', ''],
                        ['', '', ''],
                    ];
                } else {
                    // 게임이 안 끝났을 때
                    this.turn = this.turn === 'O' ? 'X' : 'O';
                }
            }
        }
    },
    created() {
        EventBus.$on('clickTd', this.onClickTd)
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