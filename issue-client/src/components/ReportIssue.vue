<template>
    <div>
        <div id="nav">
            <router-link to="/">reporter</router-link> |
            <router-link to="/admin">admin</router-link>
        </div>
        <div class="modal-frame" v-if="showStatusModal">
            <div class="modal-window">
                <h3>The issue was submitted</h3>
                <p> {{modalText.message}} <span class="highlight">{{modalText.id}}</span></p>
                <button type="button" class="btn" @click="hideModal">OK</button>
            </div>
        </div>
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
            <textarea name="issueDescription" id="issueDescription" cols="30" rows="10" class="mb-3" ref="issueDescription" required></textarea>
            <div class="upload">
                <label for="image" class="lbl">Attach a screenshot of the issue:</label>
                <input type="file" id="image" name="image" class="mb-3" ref="image">
            </div>
            <label for="issueLocation" class="lbl">Issue location or link</label>
            <input type="text" class="mb-3 input-field" name="issueLocation" id="issueLocation" ref="issueLocation" required>
            <label for="operatingSystem" class="lbl">Operating System</label>
            <input type="text" class="mb-3 input-field" name="operatingSystem" id="operatingSystem" ref="operatingSystem" required>
            <label for="browser" class="lbl">Browser</label>
            <input type="text" class="mb-3 input-field" name="browser" id="browser" ref="browser" required>
            <label for="device" class="lbl">Device</label>
            <input type="text" class="mb-3 input-field" name="device" id="device" ref="device" required>
            <label for="reporterName" class="lbl">Your name</label>
            <input type="text" class="mb-3 input-field" name="name" id="name" ref="name" required>
            <label for="reporterEmail" class="lbl">Your email</label>
            <input type="email" class="mb-3 input-field" name="email" id="email" ref="email" required>

            <span v-if="requiredFieldsMessage" class="mb-3 required-fields">{{ requiredFieldsMessage }}</span>
            <div class="btns">
                <button type="button">Reset</button>
                <button type="submit" class="ml-3">Report Issue</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ReportIssue extends Vue {
    public requiredFieldsMessage = '';
    public baseUrl = process.env.NODE_ENV === "development" ? 'http://localhost:3000' : '';
    public showStatusModal = false;
    public modalText: {message: string; id: number | string} | null = null;

    private async reportIssue(e: Event) {
        e.preventDefault();
        const theForm = this.$refs.theForm as HTMLFormElement;
        const formData = new FormData(theForm);
        const response = await fetch(`${this.baseUrl}/issue-tracker/report-issue`, {
            method: 'POST',
            // mode: 'cors',
            cache: 'no-cache',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: formData
        });
        if(response.status === 200) {
            (this.$refs.theForm as HTMLFormElement).reset();
            const result = await response.json();
            this.modalText = {message: result.message, id: result.id};
            this.showModal();
            return;
        }
        if(response.status === 400) {
            const result = await response.json();
            if(result && result.message !== undefined) {
                this.requiredFieldsMessage = result.message;
            }
            return;
        }

    }

    private showModal() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0;
        document.body.style.overflowY = 'hidden';
        this.showStatusModal = true;
    }

     private hideModal() {
        document.body.removeAttribute('style');
        this.showStatusModal = false;
        this.modalText = null;
    }

}
</script>

<style lang="scss">
@import '@/styles/report-issue.scss';
</style>

