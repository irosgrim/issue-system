<template>
    <div>
        <h1>Report an issue</h1>
        <form @submit.prevent="reportIssue" enctype="multipart/form-data" ref="theForm">
            <div class="mb-3 urgency-container">
                <label for="urgency" class="lbl">Urgency</label>
                <ul class="urgency" id="urgency">
                    <li>
                        <label for="low">
                            <input type="radio" id="low" name="priority" value="LOW" checked>
                            <span>LOW</span>
                            <div class="bg"></div>
                        </label>
                    </li>
                    <li>
                        <label for="medium">
                            <input type="radio" id="medium" name="priority" value="MEDIUM">
                             <span>MEDIUM</span>
                            <div class="bg"></div>
                        </label>
                    </li>
                    <li>
                        <label for="high">
                            <input type="radio" id="high" name="priority" value="LOW">
                            <span>HIGH</span>
                            <div class="bg"></div>
                        </label>
                    </li>
                    <li>
                        <label for="critical">
                            <input type="radio" id="critical" name="priority" value="MEDIUM">
                            <span>CRITICAL</span>
                            <div class="bg"></div>
                        </label>
                    </li>

                </ul>
            </div>
            <label for="issueDescription" class="lbl">Description of the isssue</label>
            <textarea name="issueDescription" id="issueDescription" cols="30" rows="10" class="mb-3"></textarea>
            <div class="upload">
                <label for="image" class="lbl">Attach a screenshot of the issue:</label>
                <input type="file" id="image" name="image" class="mb-3 input-field">
            </div>
            <label for="issueLocation" class="lbl">Issue location or link</label>
            <input type="text" class="mb-3 input-field" name="issueLocation" id="issueLocation">
            <label for="operatingSystem" class="lbl">Operating System</label>
            <input type="text" class="mb-3 input-field" name="operatingSystem" id="operatingSystem">
            <label for="browser" class="lbl">Browser</label>
            <input type="text" class="mb-3 input-field" name="browser" id="browser">
            <label for="device" class="lbl">Device</label>
            <input type="text" class="mb-3 input-field" name="device" id="device">
            <label for="reporterName" class="lbl">Your name</label>
            <input type="text" class="mb-3 input-field" name="reporterName" id="reporterName">
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
* {
    box-sizing: border-box;
}
    form {
        display: flex;
        flex-direction: column;
        max-width: 400px;
        margin: 0 auto;
        text-align: left;
        padding-bottom: 2rem;
        textarea {
            resize: vertical;
        }
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
    .urgency {
        display: flex;
        justify-content: flex-start;
        width: 100%;
        list-style-type: none;
        padding: 0;
        border: 1px solid #333333;
        border-radius: 3px;
        width: 100%;
        li {
            border-right: 1px solid #333333;
            flex-grow: 1;
           &:last-child {
                border-right: none;
            }
        }
        label {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 30px;
            background-color: transparent;
            outline: 0;
            border-radius: 3px;
            font-size: 0.9rem;
            cursor: pointer;
            input {
                position: absolute;
                right: 0;
                opacity: 0;
                // height: 0;
                // width: 0;
                &:checked ~ .bg {
                    opacity: 1;
                    transition: 0.2s;
                }
                &:checked ~ span{
                    font-weight: bold;
                    transition: 0.3s;
                }
            }
            .bg {
                position: absolute;
                background-color: #e0e0e0;
                top: 0;
                left: 0;
                height: 100%;
                width: calc(100% + 1px);
                z-index: -1;
                opacity: 0;
                transition: 0.2s;
            }
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
        button {
            height: 30px;
            border: 1px solid #333333;
            border-radius: 3px;
            background-color: transparent;
            padding: 0 1rem;
        }
    }

    .lbl {
        font-size: 1rem;
        font-weight: bold;
    }
    
</style>
