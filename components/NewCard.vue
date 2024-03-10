<template>
    <div>
        <div class="addcardBtn shadow-md p-4 rounded-md border-1">
            <button @click="addNewCard">+ New ({{ status }})</button>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    status: String
});

const emit = defineEmits(['newCardAdded']);

const addNewCard = () => {
    emit('newCardAdded', props.status);
}
</script>
