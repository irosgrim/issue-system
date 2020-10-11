<template>
    <div class="admin-wrapper">
        <div class="admin">
            <div id="nav">
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
                                    <li v-for="(filterType, filterTypeIndex) in filterByOptions[selectedFilter]" :key="filterTypeIndex" style="flex-shrink: 0;">{{filterType}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="header-menu-wrapper">
                        <button type="button" class="header-button">
                            <img src="@/assets/icons/notifications-black.svg" alt="notifications">
                        </button>
                        <button class="header-button">
                            <img src="@/assets/icons/settings-black.svg" alt="settings">
                        </button>
                    </div>
               </div>
            </div>
            <div class="content">
                <Issue 
                    style="margin-bottom: 1rem" 
                    v-for="issue in testIssues" 
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
import Issue from '@/components/Issue.vue';
import Dropdown from '@/components/Dropdown.vue';

@Component({
    components: {
        Issue,
        Dropdown
    }
})
export default class Admin extends Vue{
    private showFilterOptions = false;
    private selectedFilter = 0;

   
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

    private supportUsers = [
        { name: "Takashi Ryushin", email: "ryu@sky.jp" },
        { name: "Johnny Bravo", email: "johnny@bravo.co.uk" },
        { name: "Alice Doe", email: "alice.doe@mail.com" },
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


    private options = {
        priority: this.testPriorities,
        status: this.testStatus,
        categories: this.categories,
        supportUsers: ['UNASSIGNED', ...this.supportUsers.map(user => user.name)]
    };

    private testIssues = [
        {
            id: 0,
            issueSubject: 'I have an issue',
            issueDescription: 'We might have an issue. Something is wrong on the website',
            issueLocation: 'http://www.the.url.to-issue.com',
            issueScreenshot: 'https://url-to-the-image.com/image.png',
            reporterEmail: 'kitsune@earth.jp',
            priority: 'HIGH',
            operatingSystem: 'Windows 98',
            browser: 'Internet Explorer 6',
            device: 'PC',
            status: 'PENDING',
            assignedTo: null,
            reportedDate: new Date('2020-04-14'),
            updatedDate: null,
            note: null
        },
        {
            id: 1,
            issueSubject: 'The website is down',
            issueDescription: 'We might have more than an issue',
            issueLocation: 'http://www.the.url.to-issue.com',
            issueScreenshot: 'https://url-to-the-image.com/image.png',
            reporterEmail: 'ryushin@sky.jp',
            priority: 'CRITICAL',
            operatingSystem: 'MacOsX',
            browser: 'Chrome 42',
            device: 'Macbook Pro',
            status: 'CLOSED',
            assignedTo: null,
            reportedDate: new Date('2020-09-24'),
            updatedDate: null,
            note: null
        },
        {
            id: 2,
            issueSubject: 'Something is not working, i need help',
            issueDescription: 'We might have an issue',
            issueLocation: 'http://www.the.url.to-issue.com',
            issueScreenshot: 'https://url-to-the-image.com/image.png',
            reporterEmail: 'ryushin@sky.jp',
            priority: 'LOW',
            operatingSystem: 'MacOsX',
            browser: 'Chrome 42',
            device: 'Macbook Pro',
            status: 'PENDING',
            assignedTo: null,
            reportedDate: new Date('2020-09-24'),
            updatedDate: null,
            note: null
        }
    ]

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
