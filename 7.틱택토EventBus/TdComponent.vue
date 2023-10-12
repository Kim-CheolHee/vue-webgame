<template>
    <td @click="onCLickTd">{{ cellData }}</td>
</template>

<script>
import EventBus from './EventBus';
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

            EventBus.$emit('clickTd', this.rowIndex, this.cellIndex)
        }
    },
}
</script>

<style>

</style>