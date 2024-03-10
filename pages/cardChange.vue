<template>
    <div>
      <h1>Task Details</h1>
      <div>Title: {{ card.title }}</div>
      <div>Status: {{ card.status }}</div>
      <button @click="editTitle">Edit Title</button>
      <button @click="editStatus">Edit Status</button>
      <button @click="deleteTask">Delete Task</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const props = defineProps({
    id: Number,
  });
  
  const card = ref({
    id: props.id,
    title: 'Sample Task',
    status: 'Not Started',
  });

  const editTitle = () => {
    const newTitle = prompt('Enter a new title:', card.value.title);
    if (newTitle !== null) {
      card.value.title = newTitle;
    }
  };
  
  const editStatus = () => {
    const newStatus = prompt('Enter a new status:', card.value.status);
    if (newStatus !== null) {
      card.value.status = newStatus;
    }
  };
  
  const deleteTask = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      
      router.push('/');
    }
  };
  </script>
  