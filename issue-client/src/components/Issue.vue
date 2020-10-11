<template>
    <div class="issue">
        <div class="issue-details-wrapper">
            <div class="status-col">
                <div class="status-col-id">#{{issue.id}}</div>
                <div style="margin-left: -1rem;">
                    <Dropdown 
                        :options="options.status" 
                        :toggleOptions="showStatusOptions"
                        :selectedOption="selectedStatusOption"
                        @selected="setIssueStatus"
                        @close="onToggleStatusOptions"
                    >
                        <button 
                            type="button" 
                            class="status-btn"
                            :style="statusColor(selectedStatusOption)"
                            @click="onToggleStatusOptions"
                        >
                            {{options.status[selectedStatusOption]}}
                        </button>
                    </Dropdown>
                </div>
            </div>
            <div class="issue-body-col">
                <div class="subject-row">
                    <div class="subject">{{issue.issueSubject}}</div>
                    <div class="issue-link">
                        <span>
                            <a :href="issue.issueLocation">Link to issue</a>
                        </span>
                        <img src="@/assets/icons/open-black.svg" alt="link to issue icon">
                    </div>
                </div>
                <div class="issue-body">
                    {{issue.issueDescription}}
                </div>
            </div>
            <div class="info-col">
                <div class="issue-date">{{issue.reportedDate | getDateAndTimeAsString}}</div>
                <div class="d-flex">
                    <div class="info-label">OS</div> 
                        <div class="info">{{issue.operatingSystem}}</div>
                    </div>
                <div class="d-flex">
                    <div class="info-label">
                        Browser
                    </div> 
                    <div class="info">{{issue.browser}}</div>
                </div>
                <div class="d-flex">
                    <div class="info-label">
                        Device
                    </div> 
                    <div class="info">{{issue.device}}</div>
                </div>
                <div class="link">
                    <span>
                        <a :href="issue.issueScreenshot">
                            Screenshot
                        </a>
                    </span>
                    <img 
                        src="@/assets/icons/link-black.svg" 
                        alt="screenshot link icon"
                    >
                </div>
            </div>
        </div>
        <div class="issue-footer">
            <div class="footer-sections">
                <div class="footer-section">
                    <div class="reporter">
                        <div 
                            class="avatar" 
                            :style="{backgroundColor: randomColor}"
                        >
                            <span 
                                class="avatar-text" 
                                :title="issue.reporter.name"
                            >
                                {{issue.reporter.name | toInitials}}
                            </span>
                        </div>
                        <div>
                            <h6 class="footer-section-label">
                                Reported by
                            </h6>
                            <div 
                                class="email-wrapper"
                                :title="issue.reporter.email"
                            >
                                {{ issue.reporter.email }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer-section">
                    <Dropdown 
                        :options="options.categories" 
                        :toggleOptions="showCategoryOptions" 
                        :selectedOption="selectedCategoryOption"
                        @selected="setCategory"
                        @close="onToggleCategoryOptions"
                    >
                        <button 
                            type="button" 
                            class="select-btn category-btn"
                             @click="onToggleCategoryOptions"
                        >
                            <h6 class="footer-section-label">Category</h6>
                            <span class="select-btn-text">
                                {{options.categories[selectedCategoryOption]}}
                            </span>
                        </button>
                    </Dropdown>
                </div>
                <div class="footer-section">
                    <Dropdown 
                        :options="options.priority" 
                        :toggleOptions="showPriorityOptions"
                        :selectedOption="selectedPriorityOption"
                        @selected="setPriority"
                        @close="onTogglePriorityOptions"
                    >
                        <div class="footer-btn-wrapper">
                            <div class="circle" :class="'color-' + selectedPriorityOption"></div>
                            <button 
                                type="button" 
                                class="select-btn priority-btn"
                                @click="onTogglePriorityOptions"
                                >
                                    <h6 class="footer-section-label">Priority</h6>
                                    <span class="select-btn-text">
                                        {{options.priority[selectedPriorityOption]}}
                                    </span>
                            </button>
                        </div>
                    </Dropdown>
                </div>
            </div>
            <div class="footer-sections">
                <div class="footer-section">
                <Dropdown 
                    :options="options.supportUsers" 
                    :toggleOptions="showAssignedToOptions"
                    :selectedOption="selectedAssignedToOption"
                    @selected="setAssignedTo"
                    @close="onToggleAssignedToOptions"
                >
                    <button 
                        type="button" 
                        class="select-btn assign-btn"
                        @click="onToggleAssignedToOptions"
                    >
                        <h6 class="footer-section-label">Assigned to</h6>
                        <span class="select-btn-text">
                            {{options.supportUsers[selectedAssignedToOption]}}
                        </span>
                    </button>
                </Dropdown>
            </div>
            <button type="button" class="share-btn">
                <img src="@/assets/icons/share-black.svg" alt="share link to issue">
            </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Dropdown from '@/components/Dropdown.vue';
import { IssueOptions, IssueType } from '../../src/types/types';
import { randomColor } from '../helpers/text';

@Component({
    components: {
        Dropdown
    }
})
export default class Issue extends Vue {
    @Prop() private issue!: IssueType;
    @Prop() private options!: IssueOptions;

    private showStatusOptions= false;
    private showCategoryOptions= false;
    private showAssignedToOptions= false;
    private showPriorityOptions= false;


    private selectedStatusOption = 0;
    private selectedCategoryOption = 0;
    private selectedAssignedToOption = 0;
    private selectedPriorityOption = 0;

    private mounted() {
        this.selectedStatusOption = this.options.status.indexOf(this.issue.status);
        this.selectedPriorityOption = this.options.priority.indexOf(this.issue.priority);
    }

    private onToggleStatusOptions() {
        this.showStatusOptions = !this.showStatusOptions;
    }

    private setIssueStatus(newIssueStatus: number) {
        this.selectedStatusOption = newIssueStatus;
        this.showStatusOptions = false;
    }

    private onToggleCategoryOptions() {
        this.showCategoryOptions = !this.showCategoryOptions;
    }

    private setCategory(category: number) {
        this.selectedCategoryOption = category;
        this.showCategoryOptions = false;
    }

    private onToggleAssignedToOptions() {
        this.showAssignedToOptions = !this.showAssignedToOptions;
    }

    private setAssignedTo(user: number) {
        this.selectedAssignedToOption = user;
        this.showAssignedToOptions = false;
    }

    private onTogglePriorityOptions() {
        this.showPriorityOptions = !this.showPriorityOptions;
    }

    private setPriority(priority: number) {
        this.selectedPriorityOption = priority;
        this.showPriorityOptions = false;
    }

    private statusColor(status: number) {
        const colors = ["#64686f", "#eba925", "#f78ae0", "#cb0a4c", "#20a874"];
        return {backgroundColor: colors[status]};
    }

    private get randomColor() {
        return randomColor();
    }

}

</script>
