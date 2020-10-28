<template>
    <div class="issue">
        <div class="picture-modal" v-if="showScreenshot">
            <div class="picture-modal-bg" @click="showScreenshot = false"></div>
            <div class="modal-body">
                <div class="modal-header">
                    <button type="button" class="close-btn">
                        <img src="@/assets/icons/close.svg" alt="close window" @click="showScreenshot = false">
                    </button>
                </div>
                <div class="modal-content">
                    <div class="loading">loading image...</div>
                    <img :src="issue.issueScreenshot" alt="issue screenshot">
                </div>
            </div>
        </div>
        <div class="row">
             <div class="position-relative">
                <div class="status-col-id" :style="!isExpanded && {display: 'none'}">#{{issue.id}}</div>
                <Dropdown 
                    :options="options.status" 
                    :toggleOptions="showStatusOptions"
                    :selectedOption="selectedStatusOption"
                    @selected="setIssueStatus"
                    @close="onToggleStatusOptions"
                    :style="isExpanded && {visibility: 'hidden'}"
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
            <div class="subject-row">
                <div class="subject" @click="isExpanded = !isExpanded">{{issue.issueSubject}}</div>
                <div class="issue-link">
                    <div style="flex-shrink: 0;">
                        <a :href="issue.issueLocation">Link to issue</a>
                    </div>
                    <img src="@/assets/icons/open-black.svg" alt="link to issue icon">
                </div>
            </div>
            <div class="issue-date" @click="isExpanded = !isExpanded">{{issue.reportedDate | getDateAndTimeAsString}}</div>
        </div>
        <div :style="isExpanded=== false && {display: 'none'}">
            <div class="issue-details-wrapper">
                <div class="status-col">
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
                    <div class="issue-body">
                        {{issue.issueDescription}}
                    </div>
                </div>
                <div class="info-col">
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
                        <span v-if="issue.issueScreenshot">
                            <span class="text-link" @click="showScreenshot = true">
                                    Screenshot
                            </span>
                            <img 
                                src="@/assets/icons/link-black.svg" 
                                alt="screenshot link icon"
                            >
                        </span>
                        <span class="inactive" v-else>
                            No screenshot
                        </span>
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
                            <div class="reported-by">
                                <span class="tooltip" v-if="showTooltip">Copied</span>
                                <button
                                    type="button"
                                    class="email-wrapper"
                                    :title="issue.reporter.email"
                                    @click="copyToClipboard(issue.reporter.email)"
                                >
                                    <h6 class="footer-section-label"> Reported by </h6>
                                    {{ issue.reporter.email }}
                                </button>
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
                    <!-- <button type="button" class="share-btn">
                        <img src="@/assets/icons/share-black.svg" alt="share link to issue">
                    </button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import Dropdown from '@/components/Dropdown.vue';
import { IssueOptions, IssueType } from '../../src/types/types';
import { copyToClipboard, randomColor } from '../helpers/text';

@Component({
    components: {
        Dropdown
    }
})
export default class Issue extends Vue {
    @Prop() private issue!: IssueType;
    @Prop() private options!: IssueOptions;
    @Prop({default: true}) private isExpandedByDefault!: boolean;

    private expanded = this.isExpandedByDefault;
    private showScreenshot = false;
    private set isExpanded(val: boolean) {
        this.expanded = val;
    }
    private get isExpanded() {
        return this.expanded;
    }

    @Watch('isExpandedByDefault', {immediate: true})
    private setIsExpanded(val: boolean) {
        this.isExpanded = val;
    }

    // private isExpanded = false;

    private showStatusOptions= false;
    private showCategoryOptions= false;
    private showAssignedToOptions= false;
    private showPriorityOptions= false;


    private selectedStatusOption = 0;
    private selectedCategoryOption = 0;
    private selectedAssignedToOption = 0;
    private selectedPriorityOption = 0;

    private showTooltip = false;

    private created() {
        this.isExpanded = this.isExpandedByDefault;
    }

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

    private copyToClipboard(text: string) {
        this.showTooltip = true;
        copyToClipboard(text);
        setTimeout(() => this.showTooltip = false, 1500)
    }

}

</script>
