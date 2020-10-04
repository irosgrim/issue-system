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
                <div style="text-align: left; padding: 0 1rem;">
                    <h1>
                        Issues
                    </h1>
                    <div class="issue-filters-wrapper">

                    </div>
                </div>
                <ul class="issues">
                    <li class="issue-header">
                        <div class="issue-description">
                            Description
                        </div>
                       <div class="issue-info-wrapper">
                            
                            <div class="issue-screenshot" style="margin-left: 1rem; width: 16px">
                                
                            </div>
                            <div class="issue-priority" style="width: 95px; text-align: center;">
                               Priority
                            </div>
                            <div class="issue-status" style="margin-left: 1rem; width: 113px; text-align: center;">
                               Status
                            </div>
                            <div class="issue-date" style="margin-left: 1rem; width: 82px; text-align: center;">Date</div>
                            <div class="issue-assigned" style="margin-left: 1rem; width: 109px; text-align: center;">
                                Assigned to
                            </div>
                       </div>
                    </li>
                    <li class="issue">
                        <div class="issue-description">
                            The page is not working
                        </div>
                       <div class="issue-info-wrapper">
                            <div class="issue-screenshot">
                                <img src="@/assets/icons/image-black.svg" alt="link to screenshot of the issue">
                            </div>
                            <div class="issue-priority" style="margin-left: 1rem;">
                                <select name="issuePriority" id="issuePriority">
                                    <option value="LOW" selected>LOW</option>
                                    <option value="MODERATE">MODERATE</option>
                                    <option value="HIGH">HIGH</option>
                                    <option value="CRITICAL">CRITICAL</option>
                                </select>
                            </div>
                            <div class="issue-status" style="margin-left: 1rem;">
                                <select name="issueStatus" id="issueStatus">
                                    <option value="PENDING" selected>PENDING</option>
                                    <option value="IN PROGRESS">IN PROGRESS</option>
                                    <option value="STUCK">STUCK</option>
                                    <option value="UNSOLVED">UNSOLVED</option>
                                    <option value="SOLVED">SOLVED</option>
                                </select>
                            </div>
                            <div class="issue-date" style="margin-left: 1rem;">2020-10-04</div>
                            <div class="issue-assigned" style="margin-left: 1rem;">
                                <select name="assignTO" id="assignTo">
                                    <option value="UNASSIGNED" selected>UNASSIGNED</option>
                                    <option value="ME">ME</option>
                                    <option value="OTHER">OTHER</option>
                                </select>
                            </div>
                       </div>
                    </li>
                    <li class="issue">
                        <div class="issue-description">
                            The page is not working
                        </div>
                       <div class="issue-info-wrapper">
                            <div class="issue-screenshot">
                                <img src="@/assets/icons/image-black.svg" alt="link to screenshot of the issue">
                            </div>
                            <div class="issue-priority" style="margin-left: 1rem;">
                                <select name="issuePriority" id="issuePriority">
                                    <option value="LOW" selected>LOW</option>
                                    <option value="MODERATE">MODERATE</option>
                                    <option value="HIGH">HIGH</option>
                                    <option value="CRITICAL">CRITICAL</option>
                                </select>
                            </div>
                            <div class="issue-status" style="margin-left: 1rem;">
                                <select name="issueStatus" id="issueStatus">
                                    <option value="PENDING" selected>PENDING</option>
                                    <option value="IN PROGRESS">IN PROGRESS</option>
                                    <option value="STUCK">STUCK</option>
                                    <option value="UNSOLVED">UNSOLVED</option>
                                    <option value="SOLVED">SOLVED</option>
                                </select>
                            </div>
                            <div class="issue-date" style="margin-left: 1rem;">2020-10-04</div>
                            <div class="issue-assigned" style="margin-left: 1rem;">
                                <select name="assignTO" id="assignTo">
                                    <option value="UNASSIGNED" selected>UNASSIGNED</option>
                                    <option value="ME">ME</option>
                                    <option value="OTHER">OTHER</option>
                                </select>
                            </div>
                       </div>
                    </li>
                    <li class="issue">
                        <div class="issue-description">
                            The page is 
                        </div>
                       <div class="issue-info-wrapper">
                            <div class="issue-screenshot">
                                <img src="@/assets/icons/image-black.svg" alt="link to screenshot of the issue">
                            </div>
                            <div class="issue-priority" style="margin-left: 1rem;">
                                <select name="issuePriority" id="issuePriority">
                                    <option value="LOW" selected>LOW</option>
                                    <option value="MODERATE">MODERATE</option>
                                    <option value="HIGH">HIGH</option>
                                    <option value="CRITICAL">CRITICAL</option>
                                </select>
                            </div>
                            <div class="issue-status" style="margin-left: 1rem;">
                                <select name="issueStatus" id="issueStatus">
                                    <option value="PENDING" selected>PENDING</option>
                                    <option value="IN PROGRESS">IN PROGRESS</option>
                                    <option value="STUCK">STUCK</option>
                                    <option value="UNSOLVED">UNSOLVED</option>
                                    <option value="SOLVED">SOLVED</option>
                                </select>
                            </div>
                            <div class="issue-date" style="margin-left: 1rem;">2020-10-04</div>
                            <div class="issue-assigned" style="margin-left: 1rem;">
                                <select name="assignTO" id="assignTo">
                                    <option value="UNASSIGNED" selected>UNASSIGNED</option>
                                    <option value="ME">ME</option>
                                    <option value="OTHER">OTHER</option>
                                </select>
                            </div>
                       </div>
                    </li>
                    
                </ul>
                
            </div>
            <!-- <h1>Issue tracking admin</h1> -->

        </div>

    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component({})
export default class Admin extends Vue{
    
}
</script>

<style lang="scss">
    .admin-wrapper {
        background-color: #edeff7;
        min-height: 100vh;
        .admin {
            padding: 2rem;
            max-width: 1120px;
            margin: 0 auto;
        }
    }
    .header {
        background-color: #ffffff;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .logo {
        width: 20%;
    }
    .search-wrapper {
        position: relative;
        width: 100%;
    }
    .search-wrapper input {
        height: 40px;
        outline: none;
        border: none;
        padding-left: 30px;
        border-bottom: 1px solid #edeff7;
    }
    .search-wrapper input:focus {
        border-bottom: 1px solid #333333;
        outline: none;
    }
    .search-icon {
        position: absolute;
        top: 10px;
    }
    .search {
        width: 100%;
    }
    .header-menu-wrapper {
        width: 30%;
        text-align: right;
    }
    .header-button {
        height: 40px;
        background-color: transparent;
        padding: 0 1rem;
        border: none;
        outline: none;
    }
.content {
    margin-top: 1rem;
}

.issues {
  list-style-type: none;
  margin: 0;
  padding: 0;
  li {
    width: 100%
  }
}
.issue-header {
    padding: 1rem;
    font-weight: bold;
}

.issue-header, .issue {
  display: flex;
  width: 100%;
}


.issue {
  background-color: #ffffff;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
}
// .issue-description {
//   width: 50%;
// }
.issue-description {
    width: 100%; 
    text-align: left;
}
.issue-info-wrapper{
    display: flex; 
    justify-content: flex-end;
    width: 100%;
    text-align: right;

}
select {
    border: none;
    text-align: right;
}
// .issue-screenshot{
//     width: 23px;
//     text-align: right;

// }
// .issue-priority {
//     width: 80px;
//     text-align: right;

// }
// .issue-status {
//     width: 110px;
//     text-align: right;


// }
// .issue-assigned {
//     width: 120px;
//     text-align: right;

// }

</style>
