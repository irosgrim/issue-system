
export const testIssues = [
    {
        id: 0,
        issueSubject: 'I have an issue',
        issueDescription: 'We might have an issue. Something is wrong on the website',
        issueLocation: 'http://www.the.url.to-issue.com',
        issueScreenshot: 'https://url-to-the-image.com/image.png',
        reporter: {
            name: 'Akito Tekashi',
            email: 'kitsune@earth.jp'
        },
        priority: 'HIGH',
        operatingSystem: 'Windows 98',
        browser: 'Internet Explorer 6',
        device: 'PC',
        status: 'PENDING',
        assignedTo: null,
        reportedDate: new Date('2020-04-14 11:32:54'),
        updatedDate: null,
        note: null
    },
    {
        id: 1,
        issueSubject: 'The website is down',
        issueDescription: 'We might have more than an issue',
        issueLocation: 'http://www.the.url.to-issue.com',
        issueScreenshot: 'https://url-to-the-image.com/image.png',
        reporter: {
                name: 'Ryu Sato',
                email: 'ryushin@sky.jp'
        },
        priority: 'CRITICAL',
        operatingSystem: 'MacOsX',
        browser: 'Chrome 42',
        device: 'Macbook Pro',
        status: 'CLOSED',
        assignedTo: null,
        reportedDate: new Date('2020-10-04 16:13:42'),
        updatedDate: null,
        note: null
    },
    {
        id: 2,
        issueSubject: 'Something is not working, i need help',
        issueDescription: 'We might have an issue',
        issueLocation: 'http://www.the.url.to-issue.com',
        issueScreenshot: 'https://url-to-the-image.com/image.png',
        reporter: {
                name: 'Chisato Yamamoto',
                email: 'chisato-hana@water.jp'
        },
        priority: 'LOW',
        operatingSystem: 'MacOsX',
        browser: 'Chrome 42',
        device: 'Macbook Pro',
        status: 'PENDING',
        assignedTo: null,
        reportedDate: new Date('2020-10-11 03:59:45'),
        updatedDate: null,
        note: null
    }
];

export const supportUsers = [
    { name: "Dansin Ryushin", email: "ryu@sky.jp" },
    { name: "Johnny Walker", email: "johnny@bravo.co.uk" },
    { name: "Alice Wonder", email: "alice.wonder@mail.com" },
];
