<template>
    <div class="issue">
        <div class="issue-details-wrapper">
            <div class="status-col">
                <div class="status-col-id">#{{issue.id}}</div>
                <div style="margin-left: -1rem;">
                    <Dropdown 
                        :options="statusOptions" 
                        :toggleOptions="showStatusOptions"
                        :selectedOption="selectedStatusOption"
                        @option="setIssueStatus"
                        @close="onToggleStatusOptions"
                    >
                    <button 
                        type="button" 
                        class="status-btn"
                        :style="statusColor(selectedStatusOption)"
                        @click="onToggleStatusOptions"
                    >
                        {{statusOptions[selectedStatusOption]}}
                    </button>
                </Dropdown>
                </div>
            </div>
            <div class="issue-body-col">
                <div class="subject-row">
                    <div class="subject">{{issue.issueSubject}}</div>
                    <div class="issue-link">
                        <span style="color: #178550; text-decoration: underline;">
                            <a :href="issue.issueLocation">Link to issue</a>
                        </span>
                        <img src="@/assets/icons/open-black.svg" alt="" style="margin-left: 1rem; margin-bottom: -2px;">
                    </div>
                </div>
                <div class="issue-body">
                    {{issue.issueDescription}}
                </div>
            </div>
            <div class="info-col">
                <div style="margin-bottom: 0.5rem; color: #707070;">{{getDate(issue.reportedDate)}}</div>
                <div style="display: flex">
                    <div class="info-label">OS</div> 
                        <div class="info">{{issue.operatingSystem}}</div>
                    </div>
                <div style="display: flex">
                    <div class="info-label">
                        Browser
                    </div> 
                    <div class="info">{{issue.browser}}</div>
                </div>
                <div style="display: flex">
                    <div class="info-label">
                        Device
                    </div> 
                    <div class="info">{{issue.device}}</div>
                </div>
                <div>
                    <span class="link" style="color: #178550; text-decoration: underline;">
                        <a :href="issue.issueScreenshot">Screenshot</a>
                    </span>
                    <img src="@/assets/icons/link-black.svg" alt="" style="margin-left: 1rem; margin-bottom: -4px;">
                </div>
            </div>
        </div>
        <div class="issue-footer">
            <div class="footer-sections">
                <div class="footer-section">
                    <div class="reporter">
                        <div class="avatar">
                            <span class="avatar-text">TK</span>
                        </div>
                        <div>
                            <h6 class="footer-section-label">Reported by</h6>
                            <span class="footer-section-value">{{ issue.reporterEmail }}</span>
                        </div>
                    </div>
                </div>
                <div class="footer-section">
                    <h6 class="footer-section-label">Category</h6>
                    <!-- <span class="footer-section-value">Uncategorised</span> -->
                    <Dropdown 
                        :options="categoryOptions" 
                        :toggleOptions="showCategoryOptions" 
                        :selectedOption="selectedCategoryOption"
                        @option="setCategory"
                        @close="onToggleCategoryOptions"
                    >
                        <button 
                            type="button" 
                            class="footer-section-value"
                             @click="onToggleCategoryOptions"
                             style="min-width: 160px; text-align: left; border: none; background-color: transparent;"
                            >
                                <span style="margin-left: -6px">
                                    {{categoryOptions[selectedCategoryOption]}}
                                </span>
                            </button>
                    </Dropdown>
                </div>
                <div class="footer-section">
                    <h6 class="footer-section-label">Assigned to</h6>
                    <Dropdown 
                        :options="assignedToOptions" 
                        :toggleOptions="showAssignedToOptions"
                        :selectedOption="selectedAssignedToOption"
                        @option="setAssignedTo"
                        @close="onToggleAssignedToOptions"
                    >
                        <button 
                            type="button" 
                            class="footer-section-value"
                             @click="onToggleAssignedToOptions"
                             style="min-width: 120px; text-align: left; border: none; background-color: transparent;"
                            >
                                <span style="margin-left: -6px">
                                    {{assignedToOptions[selectedAssignedToOption]}}
                                </span>
                            </button>
                    </Dropdown>
                </div>
                <div class="footer-section">
                    <h6 class="footer-section-label">Priority</h6>
                    <Dropdown 
                        :options="priorityOptions" 
                        :toggleOptions="showPriorityOptions"
                        :selectedOption="selectedPriorityOption"
                        @option="setPriority"
                        @close="onTogglePriorityOptions"
                    >
                        <button 
                            type="button" 
                            class="footer-section-value"
                             @click="onTogglePriorityOptions"
                             style="min-width: 120px; text-align: left; border: none; background-color: transparent;"
                            >
                                <span style="margin-left: -6px">
                                    {{priorityOptions[selectedPriorityOption]}}
                                </span>
                            </button>
                    </Dropdown>
                </div>
            </div>
            <button type="button" class="share-btn">
                <img src="@/assets/icons/share-black.svg" alt="share link to issue">
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Dropdown from '@/components/Dropdown.vue';

@Component({
    components: {
        Dropdown
    }
})
export default class Issue extends Vue {
    @Prop() private issue!: any;
    private showStatusOptions= false;
    private showCategoryOptions= false;
    private showAssignedToOptions= false;
    private showPriorityOptions= false;


    private selectedStatusOption = 0;
    private selectedCategoryOption = 0;
    private selectedAssignedToOption = 0;
    private selectedPriorityOption = 0;
    private statusOptions = ["PENDING", "IN PROGRESS", "STUCK", "UNSOLVED", "CLOSED"];
    private categoryOptions = ["UNCATEGORISED", "SITE", "TICKETS"];
    private assignedToOptions = ["Ryu", "Kitsune", "Momo"];
    private priorityOptions = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

    private mounted() {
        this.selectedStatusOption = this.statusOptions.indexOf(this.issue.status);
        this.selectedPriorityOption = this.priorityOptions.indexOf(this.issue.priority);
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

    private statusColor(status) {
        const colors = ["#64686f", "#eba925", "#f78ae0", "#cb0a4c", "#20a874"];
        return {backgroundColor: colors[status]};
    }

    private getDate(date: Date): string {
    if(date) {
        const d = new Date(date);
        const correctMonth = d.getMonth() + 1;
        const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
        const month = correctMonth < 10 ? '0' + correctMonth : correctMonth;
        return d.getFullYear() + '-' + month + '-' + day;
    }
    return '';
}

}

</script>
