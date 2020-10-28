<template>
    <div class="admin-wrapper">
        <div v-if="contentIsLoading">Loading page...</div>
        <div class="admin" v-else>
            <div id="nav" style="margin-bottom: 1rem">
                <router-link to="/">reporter</router-link> |
                <router-link to="/admin">admin</router-link>
            </div>
            <div class="header">
               <div class="search-section">
                    <div class="logo">
                        
                    </div>
                    <div class="search-wrapper">
                        <div class="search-icon">
                            <img src="@/assets/icons/search-black.svg" alt="search icon">
                        </div>
                        <input type="text" class="search">
                        <div style="display:flex; justify-content: flex-start; align-items: flex-start; margin-top: 1rem;">
                            <div style="flex-shrink: 0; margin-right: 1.5rem;">Filter by</div>
                            <div>
                                <Dropdown
                                    :options="filterBy" 
                                    :toggleOptions="showFilterOptions"
                                    :selectedOption="selectedFilter"
                                    @selected="setFilter"
                                    @close="toggleFilterOptions"
                                >
                                    <div class="footer-btn-wrapper">
                                        <button 
                                            type="button" 
                                            class="select-btn filter-btn"
                                            @click="toggleFilterOptions"
                                            >
                                                <span class="select-btn-text">
                                                    {{filterBy[selectedFilter]}}
                                                </span>
                                        </button>
                                    </div>
                                </Dropdown>
                            </div>
                            <div class="filter-type-wrapper" style="max-width: 500px; overflow-x: scroll; height: 40px; font-size: 0.8rem">
                                <ul class="filter-type-list">
                                    <li 
                                        v-for="(filterType, filterTypeIndex) in filterByOptions[selectedFilter]" 
                                        :key="filterTypeIndex" 
                                        style="flex-shrink: 0;"
                                    >
                                        <button 
                                            type="button" 
                                            tabindex="0" 
                                            class="link-button"
                                            :class="{active: filterType === selectedFilterChild}"
                                            @click="selectedFilterChild = filterType"
                                        >
                                            {{filterType}}
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="header-menu-wrapper">
                        <!-- <button type="button" class="header-button">
                            <img src="@/assets/icons/notifications-black.svg" alt="notifications">
                        </button> -->
                        <button class="header-button">
                            <img src="@/assets/icons/settings-black.svg" alt="settings">
                        </button>
                    </div>
               </div>
            </div>
            <div v-if="!allIssues.length" class="no-issues">No issues!</div>
            <div class="content" v-else>
                <Issue 
                    style="margin-bottom: 1rem" 
                    v-for="issue in allIssues" 
                    :key="issue.id" 
                    :issue="issue"
                    :options="options"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import { SupportUser } from '../types/types';
import { Endpoints } from '../api/endpoints';
// import Issue from '@/components/Issue.vue';
// import Dropdown from '@/components/Dropdown.vue';

const endpoints = new Endpoints().loadEndpoints();

interface IssueObj {
    id: number;
    issueSubject: string;
    issueDescription: string;
    issueLocation: string;
    issueScreenshot: string;
    reporter: {
        name: string;
        email: string;
    };
    priority: string;
    operatingSystem: string;
    browser: string;
    device: string;
    status: string;
    assignedTo: string | null;
    reportedDate: Date;
    updatedDate: Date;
    note: string | null;
}

@Component({
    components: {
        Issue: () => import(/* webpackChunkName: "issue" */ '@/components/Issue.vue'),
        Dropdown: () => import(/* webpackChunkName: "dropDown" */ '@/components/Dropdown.vue'),
    }
})
export default class Admin extends Vue{
    private showFilterOptions = false;
    private selectedFilter = 3;
    private selectedFilterChild = '';

    private contentIsLoading = true;

    private allIssues: IssueObj[] = [];
    private allSupportUsers: SupportUser[] = [];

   
    private filterBy = [
        "STATUS",
        "PRIORITY",
        "CATEGORY",
        "DATE"
    ];

    private filterByDate = [
        "Most recent",
        "Oldest"
    ];

    private testPriorities = [
        "LOW",
        "MEDIUM",
        "HIGH",
        "CRITICAL"
    ];

    private testStatus = [
        "PENDING",
        "IN PROGRESS",
        "STUCK",
        "UNSOLVED",
        "CLOSED"
    ];

    private categories = [
        "UNCATEGORISED", 
        "SITE", 
        "TICKETS"
    ];

     private filterByOptions = {
        0: this.testStatus,
        1: this.testPriorities,
        2: this.categories,
        3: this.filterByDate
    }


    private get options(){
       return {
            priority: this.testPriorities,
            status: this.testStatus,
            categories: this.categories,
            supportUsers: ['UNASSIGNED', ...this.allSupportUsers.map(user => user.name)]
       }
    }

    private async created() {
        this.contentIsLoading = true;
        this.allIssues = await endpoints.getAllIssues();
        this.allSupportUsers = await endpoints.getAllSupportUsers();
        this.contentIsLoading = false;
    }


    private setFilter(value: number) {
        this.selectedFilter = value;
        this.showFilterOptions = false;
    }

    private toggleFilterOptions() {
        this.showFilterOptions = !this.showFilterOptions;
    }
}

</script>

<style lang="scss">
    @import '@/styles/admin.scss';
</style>
