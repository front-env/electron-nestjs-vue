<script setup lang="ts">
const onOpenWindow1 = async () => {
  await window.electronAPI?.ipcRenderer.invoke("OpenWindow", {
    url: "https://www.douyin.com",
    preload: window.electronAPI?.getPreload("window1"),
  });
  // const { id } = win;
  // console.log(id);
  // setTimeout(() => {
  //   window.electronAPI?.ipcRenderer.send("request-worker-channel");
  // }, 1000);
};
const onOpenWindow2 = async () => {
  const win = await window.electronAPI?.ipcRenderer.invoke("OpenWindow", {
    url: "https://www.baidu.com",
    preload: window.electronAPI?.getPreload("window2"),
  });
  const { id } = win;
  console.log(id);
};

const onOpenDialog = async () => {
  const files = await window.electronAPI?.ipcRenderer.invoke("OpenDialog");
  // console.log(files);
  console.log("files: ", files);
};
if (window.electronAPI) {
  const { ipcRenderer } = window.electronAPI;

  // ipcRenderer.invoke("OpenWindow", {
  //   url: "https://www.douyin.com",
  //   preload: window.electronAPI?.getPreload("window1"),
  // });

  ipcRenderer.on("update-counter", (evt: any, value: any) => {
    alert(value);
  });
}
</script>

<template>
  <div>
    <div class="p-8">
      <el-button type="success" size="default" @click="onOpenWindow1"
        >open window1</el-button
      >
      <el-button type="success" size="default" @click="onOpenWindow2"
        >open window2</el-button
      >
      <el-button type="default" size="default" @click="onOpenDialog"
        >open dialog</el-button
      >
    </div>
  </div>
</template>
