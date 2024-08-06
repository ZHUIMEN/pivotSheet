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
const sheet = ref(null);

onMounted(()=>{
    fetch("http://localhost:5173/test1.json")
          .then((res) => res.json())
          .then((res) => {
           baseData.value = res
            console.log('res',res);
            // sheet.value.DataSet.getDimensionValues()
            console.log('====================================');
            console.log(sheet.value.DataSet);
            console.log('====================================');
          })

})
</script>