<template>
    <div>
        <h1>Report an issue</h1>
        <form @submit.prevent="reportIssue" enctype="multipart/form-data" ref="theForm">
            <textarea name="issueDescription" id="issue" cols="30" rows="10" class="mb-3" v-model="issue.issueDescription"></textarea>
            <div class="upload">
                <label for="image">Attach a screenshot of the issue:</label>
                <input type="file" id="image" name="image" class="mb-3 input-field">
            </div>
            <input type="text" placeholder="issue found on page" class="mb-3 input-field" v-model="issue.issueLocation" name="issueLocation">
            <input type="text" placeholder="operating system" class="mb-3 input-field" v-model="issue.operatingSystem" name="operatingSystem">
            <input type="text" placeholder="browser" class="mb-3 input-field" v-model="issue.browser" name="browser">
            <input type="text" placeholder="device" class="mb-3 input-field" v-model="issue.device" name="device">
            
            <div class="mb-3 urgency-container">
                Urgency
                <div class="urgency">
                    <label>
                        <input type="radio" name="priority" value="LOW" v-model="issue.priority">
                        LOW
                    </label>
                    <label>
                        <input type="radio" name="priority" value="MEDIUM" v-model="issue.priority">
                        MEDIUM
                    </label>
                    <label>
                        <input type="radio" name="priority" value="LOW" v-model="issue.priority">
                        HIGH
                    </label>
                    <label>
                        <input type="radio" name="priority" value="MEDIUM" v-model="issue.priority">
                        CRITICAL
                    </label>
                    
                </div>
            </div>
            <input type="text" placeholder="your name" class="mb-3 input-field" v-model="issue.reporterName" name="reporterName">
            <div class="btns">
                <button type="button">Reset</button>
                <button type="submit" class="ml-3">Report Issue</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ReportIssue extends Vue {
    private issue = {
            issueDescription: '',
            issueLocation: '',
            reporterName: '',
            priority: '',
            operatingSystem: '',
            browser: '',
            device: ''
    }
    private async reportIssue(e: Event) {
        e.preventDefault();
        const theForm = this.$refs.theForm as HTMLFormElement;
        const formData = new FormData(theForm);
        console.log(formData.get('issueDescription'));
        const response = await fetch(`/issue-tracker/report-issue`, {
            method: 'POST',
            // mode: 'cors',
            cache: 'no-cache',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: formData
        });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    form {
        display: flex;
        flex-direction: column;
        max-width: 600px;
        margin: 0 auto;
    }
    .mb-3 {
        margin-bottom: 1rem;
    }
    .ml-3 {
        margin-left: 1rem;
    }
    .input-field {
        height: 30px;
    }
    .urgency-container {
        display: flex;
        align-items: center;
    }
    .urgency {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-left: 1rem;
        label {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 30px;
            width: 100px;
            background-color: transparent;
            outline: 0;
            border: 1px solid #333333;
            border-radius: 3px;
        }
    }
    .upload {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .btns {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
</style>
