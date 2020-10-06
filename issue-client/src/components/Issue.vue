<template>
    <div class="issue">
        <div class="issue-details-wrapper">
            <div class="status-col">
                <div class="status-col-id">#0042</div>
                <div class="status-select">
                    <button type="button" class="status-btn">solved</button>
                    <ul class="status-options">
                        <li>
                            <button type="button" class="status-option-btn">
                                pending
                            </button>
                        </li>
                        <li>
                            <button type="button" class="status-option-btn">
                                in progress
                            </button>
                        </li>
                        <li>
                            <button type="button" class="status-option-btn">
                                stuck
                            </button>
                            </li>
                        <li>
                            <button type="button" class="status-option-btn">
                                unsolved
                            </button>
                            
                        </li>
                        <li>
                            <button type="button" class="status-option-btn">
                                closed
                            </button>
                            
                        </li>
                    </ul>
                </div>
            </div>
            <div class="issue-body-col">
                <div class="subject-row">
                    <div class="subject">The issue subject</div>
                    <div class="issue-link">
                        <span style="color: #178550; text-decoration: underline;">The issue link</span>
                        <img src="@/assets/icons/open-black.svg" alt="" style="margin-left: 1rem; margin-bottom: -2px;">
                    </div>
                </div>
                <div class="issue-body">
                    The issue body
                </div>
            </div>
            <div class="info-col">
                <div style="margin-bottom: 0.5rem; color: #707070;">2020-01-13 13:42:25</div>
                <div style="display: flex">
                    <div class="info-label">OS</div> 
                        <div class="info">MacosX</div>
                    </div>
                <div style="display: flex">
                    <div class="info-label">
                        Browser
                    </div> 
                    <div class="info">Chrome</div>
                </div>
                <div style="display: flex">
                    <div class="info-label">
                        Device
                    </div> 
                    <div class="info">Macbook Pro</div>
                </div>
                <div>
                    <span class="link" style="color: #178550; text-decoration: underline;">
                        Screenshot
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
                            <span class="footer-section-value">Takashi Ryushin</span>
                        </div>
                    </div>
                </div>
                <div class="footer-section">
                    <h6 class="footer-section-label">Category</h6>
                    <span class="footer-section-value">Uncategorised</span>
                </div>
                <div class="footer-section">
                    <h6 class="footer-section-label">Assigned to</h6>
                    <span class="footer-section-value">John Doe</span>
                </div>
                <div class="footer-section">
                    <h6 class="footer-section-label">Priority</h6>
                    <span class="footer-section-value">LOW</span>
                </div>
            </div>
            <button type="button" class="share-btn">
                <img src="@/assets/icons/share-black.svg" alt="share link to issue">
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class Issue extends Vue {

}

</script>

<style lang="scss">

.status-select {
  position: relative;
}
.status-options {
  position: absolute;
  text-align: left;
  list-style-type: none;
  margin: 0;
  padding: 0;
  right: 0;
  background-color: #ffffff;
  width: calc(100% + 1rem);
  border-radius: 0 0 5px 0;
  border: 1px solid #e9e9e9;
}
.status-options li {
    text-transform: uppercase;
    font-size: 0.82rem;
}
.status-option-btn {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    padding: 0.3rem 6px;
  &:focus{
      border-left: 6px solid blue;
      padding-left: 0;
     
  }
}
.color {
  height: auto;
  width: 16px;
}
.yellow {
  background-color: yellow;
}
.orange {
  background-color: orange;
}
.red {
    background-color: red;
}
.black {
    background-color: black;
}
.blue {
    background-color: blue;
}
</style>