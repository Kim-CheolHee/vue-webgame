<template>
    <td @click="onCLickTd">{{ cellData }}</td>
</template>

<script>
export default {
    props: {
        cellData: String,
        cellIndex: Number,
        rowIndex: Number,
    },
    methods: {
        onCLickTd () {
            // 이미 클릭한 칸은 클릭하지 않도록
            if (this.cellData) return;

            const rootData = this.$root.$data;
            this.$set(rootData.tableData[this.rowIndex], [this.cellIndex], rootData.turn);

            let win = false;
            // 가로줄 검사
            if (rootData.tableData[this.rowIndex][0] === rootData.turn &&
                rootData.tableData[this.rowIndex][1] === rootData.turn &&
                rootData.tableData[this.rowIndex][2] === rootData.turn) {
                win = true;
            }
            // 세로줄 검사
            if (rootData.tableData[0][this.cellIndex] === rootData.turn &&
                rootData.tableData[1][this.cellIndex] === rootData.turn &&
                rootData.tableData[2][this.cellIndex] === rootData.turn) {
                win = true;
            }
            // 대각선 검사
            if (rootData.tableData[0][0] === rootData.turn &&
                rootData.tableData[1][1] === rootData.turn &&
                rootData.tableData[2][2] === rootData.turn) {
                win = true;
            }
            if (rootData.tableData[0][2] === rootData.turn &&
                rootData.tableData[1][1] === rootData.turn &&
                rootData.tableData[2][0] === rootData.turn) {
                win = true;
            }

            // 승리시 (턴 초기화, 테이블 초기화)
            if (win) {
                rootData.winner = rootData.turn;
                rootData.turn = 'O';
                rootData.tableData = [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', ''],
                ];
            } else {
                // 졌을 때 (턴 변경)
                let all = true; // all이 true면 무승부라는 뜻
                rootData.tableData.forEach((row) => {
                    row.forEach((cell) => {
                        if (!cell) {
                            all = false;
                        }
                    });
                });
                // 무승부시
                if (all) {
                    rootData.winner = '';
                    rootData.turn = 'O';
                    rootData.tableData = [
                        ['', '', ''],
                        ['', '', ''],
                        ['', '', ''],
                    ];
                } else {
                    // 게임이 안 끝났을 때
                    rootData.turn = rootData.turn === 'O' ? 'X' : 'O';
                }
            }
        }
    },
}
</script>

<style>

</style>