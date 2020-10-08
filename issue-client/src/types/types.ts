export interface IssueType {
    id: number;
    issueSubject: string;
    issueDescription: string;
    issueLocation: string;
    issueScreenshot: string;
    reporterEmail: string;
    priority: string;
    operatingSystem: string;
    browser: string;
    device: string;
    status: string;
    assignedTo: string | null;
    reportedDate: Date;
    updatedDate: Date | null;
    note: string | null;
}

export interface SupportUser {
    name: string;
    email: string;
}

export interface IssueOptions {
    priority: string[];
    status: string[];
    categories: string[];
    supportUsers: string[];
}
