<template>
    <div class="col-lg-3">
        <div class="position-relative h-100">
            <absolute-layout :scrollable="true">
                <draggable class="dragArea list-group" tag="ul" :list="project_data[0]" :group="{ name: 'g1' }">
                    <template v-for="folder in project_data">
                        {{ folder }}
                    </template>
                </draggable>
            </absolute-layout>
        </div>
    </div>
</template>

<script>
import draggable from "vuedraggable";
import AbsoluteLayout from "@/components/Layout/AbsoluteLayout.vue";

export default {
    data() {
        return {
        };
    },
    components: {
        AbsoluteLayout,
        draggable
    },
    props: {
        project_data: {
                required: true
        }
    },
    created() {
        // Call the function to generate the folder structure from the API response
        // this.folderStructure = this.generateFolderStructure(apiResponse.data);
    },
    methods: {
        // generateFolderStructure(folders) {
        //     // Recursive function to build the folder structure
        //     return folders.map(folder => ({
        //         id: folder.id,
        //         name: folder.name,
        //         subfolders: this.generateFolderStructure(folder.subfolders),
        //         documents: folder.documents
        //     }));
        // }
    },
};
</script>

<style>
/* Add your CSS styles here if needed */
</style>