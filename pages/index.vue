<template>
    <div class="card_wrapper">
        <h2>Play with Cards</h2>
        <div class="card_list">
            <div class="notStarted card_list_container  ">
                <h3 style="  color: darkred;" class="rounded-md bg-red-300" >Not Started</h3>
                <!--Not Started Card List-->
                <div v-for="(item,index) in [1,2,3]" :key="index">
                    <CardLayout/>
                </div>
                <NewCard/>
            </div>

            <div class="inProcess card_list_container">
                <h3 style=" color: darkgoldenrod;" class="rounded-md bg-amber-300">In Process</h3>
                <!--In Process Card List-->
                <div v-for="(item,index) in [1,2,3]" :key="index">

                </div>
                <NewCard/>
            </div>

            <div class="completed card_list_container">
                <h3 style="color: darkgreen;" class="rounded-md bg-lime-300">Completed</h3>
                <!--Completed Card List-->
                <div v-for="(item,index) in [1,2,3]" :key="index">

                </div>
                <NewCard/>
            </div>

        </div>
    </div>
</template>

<script setup>

</script>

<style scoped></style>