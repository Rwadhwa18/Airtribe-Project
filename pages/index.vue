<template>
    <div class="card_wrapper">
        <h2>Play with Cards</h2>
       ` <div class="card_list">
            <!-- Not Started Cards -->
            <div class="notStarted card_list_container" @drop="handleDrop('notStarted')" @dragover.prevent>
                <div style="display: inline-flex; justify-content: space-between; color: darkred;"
                    class="status rounded-md bg-red-300">
                    <span>Not Started</span>
                    <span>{{ notStartedCards.length }}</span>
                </div>
                <draggable v-model="notStartedCards" group="cards" itemKey="id">
                    <template #item="{ element, index }">
                        <div class="list-group-item  ">
                            <CardLayout :cardId="element.id" />
                        </div>
                    </template>
                </draggable>
                <NewCard status="Not Started" @newCardAdded="addNewCard('Not Started')" />
            </div>
`
            <!-- In Process Cards-->
            <div class="inProcess card_list_container" @drop="handleDrop('inProcess')" @dragover.prevent>
                <div style="color: darkgoldenrod;" class="rounded-md bg-amber-300 status">
                    <h3>In Process</h3>
                    <h3>{{ inProcessCards.length }}</h3>
                </div>
                <draggable v-model="inProcessCards" group="cards"  itemKey="id">
                    <template #item="{ element, index }">
                        <div class="list-group-item">
                            <CardLayout :cardId="element.id" />
                        </div>
                    </template>
                </draggable>
                <NewCard status="In Process" @newCardAdded="addNewCard('In Process')" />
            </div>

            <!-- Completed Cards -->
            <div class="completed card_list_container" @drop="handleDrop('completed')" @dragover.prevent>
                <div style="color: darkgreen;" class="rounded-md bg-lime-300 status">
                    <span>Completed</span>
                    <span>{{ completedCards.length }}</span>
                </div>

                <draggable v-model="completedCards" group="cards"  itemKey="id">
                    <template #item="{ element, index }">
                        <div class="list-group-item">
                            <CardLayout :cardId="element.id" />
                        </div>
                    </template>
                </draggable>
                <NewCard status="Completed" @newCardAdded="addNewCard('Completed')" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import draggable from 'vuedraggable';

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

const handleDrop = (toStatus) => (event) => {
    console.log('Dropped:', event);
    event.preventDefault();
    const cardId = event.dataTransfer.getData('cardId');
    const cardStatus = event.dataTransfer.getData('cardStatus');
    if (cardStatus !== toStatus) {
        const cardIndex = findCardIndexById(cardId, cardStatus);
        if (cardIndex !== -1) {
            const card = getStatusArray(cardStatus)[cardIndex];
            if (card) {
                moveCard(card, cardStatus, toStatus);
            }
        }
    }
}

const findCardIndexById = (id, status) => {
    const cardArray = getStatusArray(status);
    return cardArray.findIndex(card => card.id === parseInt(id));
}

const moveCard = (card, fromStatus, toStatus) => {
    const fromArray = getStatusArray(fromStatus);
    const toArray = getStatusArray(toStatus);
    if (fromArray && toArray) {
        const index = fromArray.findIndex(c => c.id === card.id);
        console.log('Index:', index);
        if (index !== -1) {
            fromArray.splice(index, 1);
            card.status = toStatus;
            toArray.push(card);
            console.log('Card moved successfully!');
        }
    }
}

const getStatusArray = (status) => {
    if (status === 'Not Started') {
        return notStartedCards.value;
    } else if (status === 'In Process') { return inProcessCards.value; }
    else if (status === 'Completed') {
        return completedCards.value;
    }
}

</script>

<style>
.card_list_container {
    min-height: 100px;
}
</style>