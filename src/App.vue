<template>
    <div style="margin: 25px">
      <button @click="test">
        test
      </button>
    <Sheet :baseData="baseData" ref="sheet" :i18n="$i18n"></Sheet>
    </div>


</template>
<script setup>
import 'ant-design-vue/dist/antd.css';
import Sheet from '../package/components/sheet/Sheet.vue';
import {ref,onMounted} from 'vue';
// import i18n from './i18n';
const  baseData = ref({})
const sheet = ref(null);


function test () {
    fetch("http://localhost:5173/test2.json")
          .then((res) => res.json())
          .then((res) => {
           baseData.value = res
            console.log('res',res);
            // sheet.value.DataSet.getDimensionValues()
            console.log('====================================');
            console.log(sheet.value.DataSet);
            console.log('====================================');
          })
}

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