<template>
    <span v-if="error" class="text-danger font-size-13">
        {{ error }}
    </span>

</template>

<script>
export default {
    name: 'ErrorSpan',
    props: ['error']

};
</script>