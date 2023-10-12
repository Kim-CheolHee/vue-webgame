import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export const SET_WINNER = 'SET_WINNER'
export const CLICK_CELL = 'CLICK_CELL'
export const CHANGE_TURN = 'CHANGE_TURN'
export const RESET_GAME = 'RESET_GAME'
export const NO_WINNER = 'NO_WINNER'

export default new Vuex.Store({
    // vue data
    state: {
        tableData: [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ],
        turn: 'O',
        winner: ''
    },
    // vue computed
    getters: {
        turnMessage (state) {
            return state.turn + '님이 승리하셨습니다!!!'
        }
    },
    // state를 동기적으로 변경할 때 사용
    // 함수명은 대문자로 작성
    mutations: {
        [SET_WINNER] (state, winner) {
            state.winner = winner
        },
        [CLICK_CELL] (state, { row, cell }) {
            Vue.set(state.tableData[row], cell, state.turn)
        },
        [CHANGE_TURN] (state) {
            state.turn = state.turn === 'O' ? 'X' : 'O'
        },
        [RESET_GAME] (state) {
            state.turn = 'O'
            state.tableData = [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ]
        },
        [NO_WINNER] (state) {
            state.winner = ''
        }
    },
    // state를 비동기적으로 변경할 때 사용, 또는 여러 mutations을 연속적으로 실행할 때 사용
    actions: {

    }
})