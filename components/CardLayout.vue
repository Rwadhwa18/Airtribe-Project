<template>
    <div class="cardlayout shadow-sm p-4 flex rounded-md border-2">
        <div>
            <span>Card-{{ cardId }}</span>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    cardId: {
        type: Number,
        required: true
    }
});
</script>
