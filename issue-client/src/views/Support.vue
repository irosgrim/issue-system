<template>
    <div class="admin-wrapper">
        <div v-if="contentIsLoading">Loading page...</div>
        <div class="admin" v-else>
            <div class="header">
               <div class="search-section">
                    <div class="logo">
                        
                    </div>
                    <div class="search-wrapper">
                        <div class="search-icon">
                            <img src="@/assets/icons/search-black.svg" alt="search icon">
                        </div>
                        <input type="text" class="search">
                        <div class="filter-by">
                            <div class="filter-by-label">Filter by</div>
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
                            <div class="filter-type-wrapper">
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
                         <div class="issue-list-menu">
                            <button v-if="!expandAll" type="button" @click="expandAll = true" class="issue-list-ctrl-btn">
                                expand
                                <img src="@/assets/icons/expand.svg" alt="expand all issues">
                            </button>
                            <button v-else type="button" @click="expandAll = false" class="issue-list-ctrl-btn">
                                collapse
                                <img src="@/assets/icons/shrink.svg" alt="minimize all issues">
                            </button>
                        </div>
                    </div>
               </div>
            </div>
            <div v-if="!allIssues.length" class="no-issues">No issues!</div>
            <div class="content" v-if="allIssues.length">
                <div 
                    class="issue-wrapper"  
                    v-for="issue in allIssues" 
                    :key="issue.id" 
                >
                    <Issue
                        :issue="issue"
                        :options="options"
                        :isExpandedByDefault="expandAll"
                    />
                </div>
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
export default class Support extends Vue{
    private expandAll = false;
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
    @import '@/styles/support.scss';
</style>
