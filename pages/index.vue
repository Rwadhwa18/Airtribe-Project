<template>
    <div class="card_wrapper">
        <h2>Play with Cards</h2>
        <div class="card_list">
            <div class="notStarted card_list_container" @drop="handleDrop('notStarted')" @dragover.prevent>
                <div style="display: inline-flex; justify-content: space-between; color: darkred;"
                    class="status rounded-md bg-red-300">
                    <span>Not Started</span>
                    <span>{{ notStartedCards.length }}</span>
                </div>
                <!-- Not Started Card List -->
                <draggable v-model="notStartedCards" @end="handleDragEnd('notStarted')">
                    <div v-for="(card, index) in notStartedCards" :key="index" :draggable="true"
                        @dragstart="handleDragStart(card, 'notStarted')">
                        <CardLayout :cardId="card.id" />
                    </div>
                </draggable>
                <NewCard status="Not Started" @newCardAdded="addNewCard('Not Started')" />
            </div>

            <div class="inProcess card_list_container" @drop="handleDrop('inProcess')" @dragover.prevent>
                <div style="color: darkgoldenrod;" class="rounded-md bg-amber-300 status">
                    <h3>In Process</h3>
                    <h3>{{ inProcessCards.length }}</h3>
                </div>
                <!-- In Process Card List -->
                <draggable v-model="inProcessCards" @end="handleDragEnd('inProcess')">
                    <div v-for="(card, index) in inProcessCards" :key="index" :draggable="true"
                        @dragstart="handleDragStart(card, 'inProcess')">
                        <CardLayout :cardId="card.id" />
                    </div>
                </draggable>
                <NewCard status="In Process" @newCardAdded="addNewCard('In Process')" />
            </div>

            <div class="completed card_list_container" @drop="handleDrop('completed')" @dragover.prevent>
                <div style="color: darkgreen;" class="rounded-md bg-lime-300 status">
                    <span>Completed</span>
                    <span>{{ completedCards.length }}</span>
                </div>

                <!-- Completed Card List -->
                <draggable v-model="completedCards" @end="handleDragEnd('completed')">
                    <div v-for="(card, index) in completedCards" :key="index" :draggable="true"
                        @dragstart="handleDragStart(card, 'completed')">
                        <CardLayout :cardId="card.id" />
                    </div>
                </draggable>
                <NewCard status="Completed" @newCardAdded="addNewCard('Completed')" />
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const notStartedCards = ref([
    { status: 'Not Started', id: 1 },
    { status: 'Not Started', id: 2 },
    { status: 'Not Started', id: 3 }
]);
const inProcessCards = ref([
    { status: 'In Process', id: 4 },
    { status: 'In Process', id: 5 }
]);
const completedCards = ref([
    { status: 'Completed', id: 6 }
]);

const addNewCard = (status) => {
    const newId = notStartedCards.value.length + inProcessCards.value.length + completedCards.value.length + 1;
    const newCard = { status, id: newId };
    if (status === 'Not Started') notStartedCards.value.push(newCard);
    else if (status === 'In Process') inProcessCards.value.push(newCard);
    else if (status === 'Completed') completedCards.value.push(newCard);
    else console.error('Invalid Status');
}


const handleDrop = (status) => (event) => {
    const cardId = event.dataTransfer.getData('cardId');
    const cardStatus = event.dataTransfer.getData('cardStatus');
    if (cardStatus !== status) {
        if (cardStatus === 'Not Started') {
            const index = notStartedCards.value.findIndex(card => card.id === parseInt(cardId));
            const [draggedCard] = notStartedCards.value.splice(index, 1);
            if (status === 'In Process')
                inProcessCards.value.push(draggedCard);
            else if (status === 'Completed')
                completedCards.value.push(draggedCard);
        } else if (cardStatus === 'In Process') {
            const index = inProcessCards.value.findIndex(card => card.id === parseInt(cardId));
            const [draggedCard] = inProcessCards.value.splice(index, 1);
            if (status === 'Not Started')
                notStartedCards.value.push(draggedCard);
            else if (status === 'Completed')
                completedCards.value.push(draggedCard);
        } else if (cardStatus === 'Completed') {
            const index = completedCards.value.findIndex(card => card.id === parseInt(cardId));
            const [draggedCard] = completedCards.value.splice(index, 1);
            if (status === 'Not Started')
                notStartedCards.value.push(draggedCard);
            else if (status === 'In Process')
                inProcessCards.value.push(draggedCard);
        }
    }
}

const handleDragStart = (card, status) => (event) => {
    event.dataTransfer.setData('cardId', card.id.toString());
    event.dataTransfer.setData('cardStatus', status);
}

const handleDragEnd = (status) => (event) => {
    event.preventDefault();
}
</script>

<style>
.card_list_container {
    min-height: 100px;
}
</style>