<template>
    <div class="d-flex mb-16">
        <div class="dropdown dropdown-01">
            <button class="btn btn-outline-primary btn-icon" id="dropdownMenuButton1" type="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                <i class="ic-sort mr-4"></i>Sort
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <p class="font-semibold mb-8 text-black">Sort By</p>
                <li v-for="(item, key) in sorts" :key="item.key" @click="sortBy(key)">
                    {{ item }}
                </li>
            </ul>
        </div>
        <div class="form-icon trail mx-16 flex-grow-1">
            <input class="form-control" placeholder="Search" v-model="params.search" /><i class="ic-search"></i>
        </div>
        <div class="dropdown dropdown-01 filter">
            <button class="btn btn-primary btn-icon" id="dropdownMenuButton1" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                <i class="ic-filter"></i>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <p class="font-semibold mb-8 text-black">Filter By</p>
                <form>
                    <div class="mb-12">
                        <label for="" class="small">Date From</label>
                        <input type="date" class="form-control form-control-sm" v-model="params.filters.from_date" />
                    </div>
                    <div class="mb-16">
                        <label for="" class="small">Date To</label>
                        <input type="date" class="form-control form-control-sm" v-model="params.filters.to_date" />
                    </div>
                </form>
                <div class="d-flex">
                    <button class="btn btn-sm btn-outline-red btn-block mr-16" @click="resetFilters()">
                        Cancel
                    </button>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
    name: 'TableQuery',
    props: {
        'resetFilters': { type: Function },
        'sortBy': { type: Function },
        'sorts': { type: Object },
        'params': { type: Object },
    },
}

</script>