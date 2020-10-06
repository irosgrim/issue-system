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
                <Issue style="margin-bottom: 1rem"/>
                <Issue style="margin-bottom: 1rem"/>
                <Issue style="margin-bottom: 1rem"/>
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
        border-radius: 5px;
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


.issue {
  background-color: #ffffff;
  border-radius: 5px;
}
.subject {
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: left;
}
.issue-details-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}
.issue-footer {
  border-top: 1px solid #e9e9e9;
  background-color: #f8f8f8;
  padding: 10px;
  text-align: left;
  border-radius: 0 0 5px 5px;
  min-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.share-btn {
    border: none;
    outline: none;
    background-color: transparent;
    padding: 0.5rem;
    opacity: 0.5;
    transition: 0.3s;
    cursor: pointer;
    &:hover{
        opacity: 1;
        transition: 0.3s;
    }
    &:focus {
        opacity: 1;
        transition: 0.3s;
    }
}
.status-col {
  padding-right: 1rem;
}
.status-col-id {
  height: 36px;
  margin-left: -1rem;
  font-weight: bold;
  color: #707070;
}
.status-btn {
  background-color: #3EB77D;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  width: 140px;
  padding: 0.5rem 6px;
  color: #ffffff;
  border-radius: 0 5px 5px 0;
  margin-left: -1rem;
  border: none;
  border-left: none;
  outline: none;
  font-size: 0.82rem;
  cursor: pointer;

  &:focus{
      border-left: 6px solid blue;
     padding-left: 0;
     
  }
}
.issue-body-col {
  width: 100%;
  border-right: 1px solid #e9e9e9;
  padding: 0 1rem;
}
.subject-row {
  display: flex;
  justify-content: space-between;

}
.issue-body {
  text-align: left;
}
.info-col {
  text-align: left;
  padding: 0 1rem;
  min-width: 220px;
}
.info-label {
    color: #707070;
    width: 80px;
}
.info {
    color: #000000;
}
.footer-sections {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.footer-section {
  border-right: 1px solid #e5e5e5;
  padding-right: 1.5rem;
}
.footer-section:not(:first-child) {
  padding-left: 1.5rem;
}
.reporter {
  display: flex;
  align-items: center;
}
.avatar {
  margin-right: 0.5rem;
  background-color: #ffc808;
  height: 31px;
  width: 31px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  font-weight: bold;
  color: #ffffff;
  .avatar-text {
    height: 16px;
    width: 16px;
    }
}
.footer-section-label {
  margin: 0;
  color: #707070;
}
.footer-section-value {
  color: #000000;
  font-weight: 0.9rem;
}

</style>
