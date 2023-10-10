<template>
    <div class="ball" :style="background">{{ number }}</div>
</template>

<script>
export default {
    name: 'LottoBall',
    // props는 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달할 때 사용하는 속성
    // props는 부모 컴포넌트에서 전달한 데이터를 자식 컴포넌트에서 변경할 수 없다. read-only 느낌
    props: {
        number: Number,
    },
    // 기존 data를 통해 새로운 데이터를 만들어내는 computed
    computed: {
        background () {
            let background
            if (this.number <= 10) {
                background = 'red'
            } else if (this.number <= 20) {
                background = 'orange'
            } else if (this.number <= 30) {
                background = 'yellow'
            } else if (this.number <= 40) {
                background = 'blue'
            } else {
                background = 'green'
            }
            return {
                background,
            }
        }
    },
    methods: {  

    },
}
</script>

<style scoped>
    .ball {
        display: inline-block;
        border: 1px solid black;
        border-radius: 20px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        margin-right: 10px;
        font-size: 20px;
    }
</style>