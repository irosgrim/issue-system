<template>
    <div class="admin-wrapper">
        <div class="admin">
            <div id="nav">
                <router-link to="/">reporter</router-link> |
                <router-link to="/admin">admin</router-link>
            </div>
            <div class="header">
                <div class="logo">
                    
                </div>
                <div class="search-wrapper">
                    <div class="search-icon">
                        <img src="@/assets/icons/search-black.svg" alt="search icon">
                    </div>
                    <input type="text" class="search">
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
            <div class="content">
                <h1 style="text-align: left; margin-left: 1rem;">
                    Issues
                </h1>
                <Issue style="margin-bottom: 1rem" v-for="issue in testIssues" :key="issue.id" :issue="issue"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import Issue from '@/components/Issue.vue';

@Component({
    components: {
        Issue
    }
})
export default class Admin extends Vue{

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
            priority: 'LOW',
            operatingSystem: 'MacOsX',
            browser: 'Chrome 42',
            device: 'Macbook Pro',
            status: 'PENDING',
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
    
}
</script>

<style lang="scss">
@import '@/styles/admin.scss';
</style>
