
import { testIssues, supportUsers } from './fakeData';


class Real {
    async getAllIssues() {
        const allIssuesResponse = await fetch('/issue-tracker/support/issues', {method: 'GET'});
        const allIssues = await allIssuesResponse.json();
        return allIssues;
    }

    async getAllSupportUsers() {
        const allSupportUsersResponse = await fetch('/issue-tracker/support/get-all-support-users', {method: 'GET'});
        const allSupportUsers = await allSupportUsersResponse.json();
        return allSupportUsers;
    }

}

class Fake {
    async getAllIssues() {
        return new Promise((resolve) => {
            resolve(testIssues);
        });
    }

    async getAllSupportUsers() {
        return new Promise((resolve) => {
            resolve(supportUsers);
        });
    }
}

export class Endpoints {
    loadEndpoints() {
        if(process.env.NODE_ENV === 'production') {
            return new Real();
        }
        return new Fake();
    }
}
