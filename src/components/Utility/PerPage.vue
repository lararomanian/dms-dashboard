<template>
    <div class="align-center">

        <p>View</p>
        <select name="per_page" id="page" v-model="params.per_page" class="form-select-custom">
            <option :value="option" v-for="(option,index) in options" :key="index" :selected="option==params.per_page">
                {{ option }}
            </option>
        </select>
        <p>per page</p>
    </div>
</template>

<script>

export default {
    name: "PerPage",
    props: ['options','params']
};
</script>