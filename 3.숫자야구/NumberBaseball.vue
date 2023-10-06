<template>
    <div>
        <h1>{{ result }}</h1>
        <form @submit.prevent="onSubmitForm">
            <input ref="answer" minlength="4" maxlength="4" v-model="value">
            <button type="submit">입력</button>
        </form>
        <div>시도: {{ tries.length }}</div>
        <ul>
            <li v-for="(t, index) in tries" :key="index">
                <div>{{ t.try }}</div>
                <div>{{ t.result }}</div>
            </li>
        </ul>
    </div>
</template>

<script>
const getNumbers = () => {
    const candidate = [1,2,3,4,5,6,7,8,9]
    const array = []
    for (let i = 0; i < 4; i += 1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0]
        array.push(chosen)
    }
    return array
}
export default {
    data() {
        return {
            answer: getNumbers(), // ex: [1,3,5,7]
            tries: [], // 시도 수
            value: '', // 입력 값
            result: '' // 결과
        }
    },
    methods: {
        onSubmitForm(e) {
            // 정답을 맞췄을 때
            if (this.value === this.answer.join('')) { // join('') -> 배열을 문자열로 변환, ''에 구분자를 넣거나 생략 가능
                this.tries.push({
                    try: this.value,
                    result: '홈런',
                })
                this.result = '홈런'
                alert('게임을 다시 시작합니다.')
                this.value = ''
                this.answer = getNumbers()
                this.tries = []
                this.$refs.answer.focus()
            // 정답을 맞추지 못했을 때
            } else {
                if (this.tries.length >= 9) {
                    this.result = `10번 넘게 틀려서 실패! 답은 ${this.answer.join(',')}였습니다.`
                    alert('게임을 다시 시작합니다.')
                    this.value = ''
                    this.answer = getNumbers()
                    this.tries = []
                    this.$refs.answer.focus()
                }
                let strike = 0
                let ball = 0
                // 숫자 배열로 변환
                const answerArray = this.value.split('').map((v) => parseInt(v))
                for (let i = 0; i < 4; i += 1) {
                    // 숫자가 같은지 확인
                    if (answerArray[i] === this.answer[i]) {
                        strike += 1
                    // 숫자가 다른지 확인
                    } else if (this.answer.includes(answerArray[i])) {
                        ball += 1
                    }
                }
                this.tries.push({
                    try: this.value,
                    result: `${strike} 스트라이크, ${ball} 볼입니다.`,
                })
                this.value = ''
                this.$refs.answer.focus()
            }
        } 
    }
}
</script>

<style>

</style>