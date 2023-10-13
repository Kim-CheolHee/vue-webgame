<template>
    <div>
        <mine-form></mine-form>
        <div>{{ timer }}</div>
        <table-component></table-component>
        <div>{{ result }}</div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { INCREMENT_TIMER } from './store';
import TableComponent from './TableComponent'
import MineForm from './MineForm'

let interval

export default {
    // store,
    components: {
        TableComponent,
        MineForm,
    },
    computed: {
        ...mapState([ 'timer', 'result', 'halted' ])
    },
    methods: {

    },
    watch: {
        halted (value, oldValue) {
            // false일 때 타이머를 시작한다. (게임시작)
            if (value === false) {
                interval = setInterval(() => {
                    this.$store.commit(INCREMENT_TIMER)
                }, 1000)
            } else {
            // true일 때 타이머를 멈춘다. (게임종료)
                clearInterval(interval)
            }
        }
    }
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