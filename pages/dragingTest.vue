<template>
    <div class="row">
      <div class="col-3">
        <h3>Not Started</h3>
        <draggable
          class="list-group"
          :list="notStartedCards"
          group="cards"
          @change="log"
          itemKey="id"
        >
          <template #item="{ element, index }">
            <div class="list-group-item">
              <CardLayout :cardId="element.id" />
            </div>
          </template>
        </draggable>
      </div>
  
      <div class="col-3">
        <h3>In Process</h3>
        <draggable
          class="list-group"
          :list="inProcessCards"
          group="cards"
          @change="log"
          itemKey="id"
        >
          <template #item="{ element, index }">
            <div class="list-group-item">
              <CardLayout :cardId="element.id" />
            </div>
          </template>
        </draggable>
      </div>
  
      <div class="col-3">
        <h3>Completed</h3>
        <draggable
          class="list-group"
          :list="completedCards"
          group="cards"
          @change="log"
          itemKey="id"
        >
          <template #item="{ element, index }">
            <div class="list-group-item">
              <CardLayout :cardId="element.id" />
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </template>
  
  <script>
  import draggable from "vuedraggable";
  
  export default {
    name: "card-lists",
    components: {
      draggable
    },
    data() {
      return {
        notStartedCards: [
          { status: "Not Started", id: 1 },
          { status: "Not Started", id: 2 },
          { status: "Not Started", id: 3 }
        ],
        inProcessCards: [
          { status: "In Process", id: 4 },
          { status: "In Process", id: 5 }
        ],
        completedCards: [
          { status: "Completed", id: 6 }
        ]
      };
    },
    methods: {
      log(evt) {
        console.log(evt);
      }
    }
  };
  </script>
  