<template>
    <div style="margin: 25px">

    <Sheet :baseData="baseData" ref="sheet"></Sheet>
    </div>


</template>
<script setup>
import 'ant-design-vue/dist/antd.css';
import Sheet from '../package/components/sheet/Sheet.vue';
import {ref,onMounted} from 'vue';
const  baseData = ref({})
const sheet = ref(null)
onMounted(()=>{
    fetch("http://localhost:9000/test.json")
          .then((res) => res.json())
          .then((res) => {
            baseData.value = res

          })

})
</script>