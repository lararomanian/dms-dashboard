<template>
    <flex-layout>
        <!-- <ProjectModal/> -->
        <page-header heading="Project Folder " action="Add New" toggle="offcanvas" target="#offcanvasCreate"
            :guard="this.$route.meta.guard" @click="setCreateForm" />
        <!-- <ProjectTable  :tableHeading="tableHeading"/> -->
        <FileEditor :project_fetch_id="project_fetch_id"/>
    </flex-layout>
</template>
  
<script>
import FlexLayout from "@/components/Layout/FlexLayout.vue";
import PageHeader from "@/components/Utility/PageHeader.vue";
import FileEditor from "../Folder/index.vue";
import axios from "axios";

export default {
    name: "Project",
    components: {
        // AbsoluteLayout,
        PageHeader,
        FlexLayout,
        FileEditor
        // ProjectTable,
        // ProjectModal
    },
    data() {
        return {
            parents: {},
            project_data: {},
            tableHeading: [
                {
                    heading: "Title",
                },
                {
                    heading: "Status",
                },
            ],
        };
    },
    computed: {
        project_fetch_id() {
            const required_id = this.$route.params.id;
            return Number(required_id);
        },
    },
    methods: {
        setCreateForm() {
            this.$root.$emit('CREATE');
        },
        async fetchFolders(projectId) {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/folders/${projectId}`);
                this.project_data = response.data.data;
            } catch (error) {
                console.error(`Failed to fetch folders for project ID ${projectId}`, error);
                return [];
            }
        },
    },
    created() {
        console.log(this.$route.params.id);
    },
    watch: {
        '$route': function (val) {
            console.log(val);
            this.fetchFolders(val.params.id);
        }
    },
};
</script>
  