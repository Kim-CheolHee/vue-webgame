<template>
    <div>
        <div>
            <router-link to="/game/index">게임 매쳐</router-link>
            <router-link to="/game/number-baseball?data=1&name=kim&age=32">숫자야구</router-link>
            <router-link to="/game/response-check">반응속도체크</router-link>
            <router-link to="/game/rock-scissors-paper">가위바위보</router-link>
            <router-link to="/game/lotto-generator">로또번호 생성기</router-link>
            <router-link to="/game/mine-sweeper">지뢰찾기</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import router from './routes'
import store from './store'

export default {
    router,
    store,
}
</script>

<style>

</style>