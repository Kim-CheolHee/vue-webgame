<template>
    <div>
        <div>당첨 숫자</div>
        <div id="결과창">
            <lotto-ball v-for="(b, index) in winBalls" :key="index"></lotto-ball>
        </div>
        <div>보너스</div>
        <lotto-ball v-if="bonus"></lotto-ball>
        <button v-if="redo">한 번 더!</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            winBalls: [],
            bonus: null,
            redo: false,
        }
    },
    computed: {

    },
    methods: {  

    },
    mounted() {
        console.log('LottoBall mounted');
    },
    beforeDestroy() {
        console.log('LottoBall beforeDestroy');
    },
    watch() {

    }
}
</script>

<style scoped>
    #computer {
        width: 142px;
        height: 200px;
        background-position: 0 0;
    }
</style>