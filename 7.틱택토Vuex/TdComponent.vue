<template>
    <td @click="onCLickTd">{{ cellData }}</td>
</template>

<script>
import { mapState } from 'vuex'
import { CLICK_CELL, SET_WINNER, RESET_GAME, CHANGE_TURN, NO_WINNER } from './store'
export default {
    props: {
        // cellData: String,
        cellIndex: Number,
        rowIndex: Number,
    },
    computed: {
        ...mapState ({
            tableData: state => state.tableData,
            turn: state => state.turn,
            cellData (state) {
                return state.tableData[this.rowIndex][this.cellIndex]
            }
        })
        // cellData () {
        //     return this.$store.state.tableData[this.rowIndex][this.cellIndex]
        // },
        // tableData () {
        //     return this.$store.state.tableData
        // },
        // turn () {
        //     return this.$store.state.turn
        // }
    },
    methods: {
        onCLickTd () {
            // 이미 클릭한 칸은 클릭하지 않도록
            if (this.cellData) return;

            this.$store.commit(CLICK_CELL, { row: this.rowIndex, cell: this.cellIndex })

            let win = false;
            // 가로줄 검사
            if (this.tableData[this.rowIndex][0] === this.turn &&
                this.tableData[this.rowIndex][1] === this.turn &&
                this.tableData[this.rowIndex][2] === this.turn) {
                win = true;
            }
            // 세로줄 검사
            if (this.tableData[0][this.cellIndex] === this.turn &&
                this.tableData[1][this.cellIndex] === this.turn &&
                this.tableData[2][this.cellIndex] === this.turn) {
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
                this.$store.commit(SET_WINNER, this.turn)
                this.$store.commit(RESET_GAME)
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
                    this.$store.commit(NO_WINNER)
                    this.$store.commit(RESET_GAME)
                } else {
                    // 게임이 안 끝났을 때
                    this.$store.commit(CHANGE_TURN)
                }
            }
        }
    }
}
</script>

<style>

</style>