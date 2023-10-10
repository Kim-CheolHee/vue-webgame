<template>
    <div>
        <div>당첨 숫자</div>
        <div id="결과창">
            <lotto-ball v-for="(b, index) in winBalls" :key="index" :number="b"></lotto-ball>
        </div>
        <div>보너스</div>
        <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
        <button v-if="redo" @click="onClickRedo">한 번 더!</button> 
    </div>
</template>

<script>
import LottoBall from './LottoBall';

function getWinNumbers () {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

const timeouts = []

export default {
    components: {
        // 컴포넌트가 파스칼 케이스면 자동으로 vue는 케밥 케이스로 변환해준다.
        // LottoBall: LottoBall,
        'lotto-ball': LottoBall
    },
    data () {
        return {
            winNumbers: getWinNumbers(), // 당첨 숫자들
            winBalls: [],
            bonus: null,
            redo: false,
        }
    },
    computed: {

    },
    methods: {  
        onClickRedo () {
            this.winNumbers = getWinNumbers();
            this.winBalls = [];
            this.bonus = null;
            this.redo = false;
            this.showBalls();
        },
        showBalls () {
            for (let i = 0; i < this.winNumbers.length - 1; i++) {
                timeouts[i] = setTimeout(() => {
                    this.winBalls.push(this.winNumbers[i])
                }, (i + 1) * 1000);
            }
            timeouts[6] = setTimeout(() => {
                this.bonus = this.winNumbers[6];
                this.redo = true;
            }, 7000);
        }
    },
    mounted() {
        this.showBalls();
    },
    beforeDestroy() {
        timeouts.forEach((v) => {
            clearTimeout(v);
        });
    },
    // watch는 데이터가 변할 때마다 실행되는 함수
    // watch 사용은 지양하자.
    // watch: {
    //     // winBalls (value, oldValue) {
    //     //     if (value.length === 0) {
    //     //         this.showBalls();
    //     //     }
    //     //     console.log(value, oldValue);
    //     // }
    //     // bonus (value, oldValue) {
    //     //     if (value === null) {
    //     //         this.showBalls();
    //     //     }
    //     //     console.log(value, oldValue);
    //     // }
    //     redo (value, oldValue) {
    //         if (value === false) {
    //             this.showBalls();
    //         }
    //         console.log(value, oldValue);
    //     }
    // }
}
</script>

<style scoped>
    #computer {
        width: 142px;
        height: 200px;
        background-position: 0 0;
    }
</style>