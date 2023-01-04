<template>
  <div class="about">
    <h1>hogeee</h1>
  </div>
  <input type="button" id="open_folder" value="Click Me">
  <StaticLineChart/>
</template>

<script setup lang="ts">
import StaticLineChart from "@/components/StaticLineChart.vue"
// import { onMounted } from "vue";
// const pickerOpts = {
//   types: [
//     {
//       description: 'csvのみやで',
//       accept: {
//         'text/csv': ['.csv']
//       }
//     }
//   ],
//   excludeAcceptAllOption: true,
//   multiple: false,
// }

// onMounted(()=> {
// document.getElementById("open_folder")!.addEventListener("click", async (e) => {
//   //これ参考
//   //https://nulab.com/ja/blog/nulab/blog-relay-file-system-access-api/
//   const [fileHandle] = await window.showOpenFilePicker(pickerOpts);
//   const file = await fileHandle.getFile();
//   const text = await file.text();
//   const array = convertCSVtoArray(text)
// });
// });

// // 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
// function convertCSVtoArray(str:string){ // 読み込んだCSVデータが文字列として渡される
//     const result = []; // 最終的な二次元配列を入れるための配列
//     const tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成
 
//     // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
//     for(let i=0;i<tmp.length;++i){
//         result[i] = tmp[i].split(',');
//     }
//     return result
// }
</script>