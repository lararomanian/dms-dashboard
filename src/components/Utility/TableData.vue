<template>
    <tbody>
        <template v-if="tableData.length <= 0">
            <td colspan="100" class="full-colspan">
                <p>No Data Found.</p>
            </td>
        </template>
        <template v-else>
            <slot />
        </template>
    </tbody>
</template>

<script>
export default {
    name: 'TableData',
    props: ['tableData']

};
</script>
