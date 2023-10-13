<template>
    <div>
        <div v-if="currentGame === 'index'">
            <h1>플레이 하고 싶은 게임을 클릭하세요!</h1>
        </div>
        <div v-else-if="currentGame === 'number-baseball'">
            <number-baseball></number-baseball>
        </div>
        <div v-else-if="currentGame === 'response-check'">
            <response-check></response-check>
        </div>
        <div v-else-if="currentGame === 'lotto-generator'">
            <lotto-generator></lotto-generator>
        </div>
        <div v-else-if="currentGame === 'rock-scissors-paper'">
            <rock-scissors-paper></rock-scissors-paper>
        </div>
        <div v-else-if="currentGame === 'mine-sweeper'">
            <mine-sweeper></mine-sweeper>
        </div>
        <div v-else>일치하는 게임이 없습니다.</div>
    </div>
</template>

<script>
import NumberBaseball from '../3.숫자야구/NumberBaseball'
import ResponseCheck from '../4.반응속도체크/ResponseCheck'
import RockScissorsPaper from '../5.가위바위보/RockScissorsPaper'
import LottoGenerator from '../6.로또/LottoGenerator'
import MineSweeper from '../8.지뢰찾기/MineSweeper'

export default {
    components: {
        NumberBaseball,
        ResponseCheck,
        RockScissorsPaper,
        LottoGenerator,
        MineSweeper
    },
    mounted () {
        console.log(this.$router);
        console.log(this.$route);
    },
    watch: {
        '$route': 'routeChanged'
    },
    methods: {
        routeChanged () {
            console.log("Route changed:", this.$router, this.$route);
        }
    },
    computed: {
        currentGame () {
            return this.$route.params.name;
        }
    }
}
</script>

<style>

</style>