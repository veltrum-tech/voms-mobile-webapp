export const remittances = [
    {
        id: 1,
        date: 'August 2024',
        remittance: {
            title: 'Remittance for August 2024',
            paymentFor: 'August PAYE',
            status: 'Remitted',
            amount: 12000,
            date: '10/04/2024',
            recievingState: 'Nasarawa State',
        },
    },
];

export const paymentLogs = [
    {
        id: 1,
        paymentFor: 'John Brown',
        amount: 12000,
        date: '30/05/2024',
        paidTo: 'Nasarawa',
    },
    {
        id: 2,
        paymentFor: 'Sonia Thompson',
        amount: 12000,
        date: '30/06/2024',
        paidTo: 'Nasarawa',
    },
    {
        id: 3,
        paymentFor: 'Anna Maison',
        amount: 12000,
        date: '30/07/2024',
        paidTo: 'Nasarawa',
    },
    {
        id: 1,
        paymentFor: 'John Brown',
        amount: 12000,
        date: '30/05/2024',
        paidTo: 'Nasarawa',
    },
    {
        id: 2,
        paymentFor: 'Sonia Thompson',
        amount: 12000,
        date: '30/06/2024',
        paidTo: 'Nasarawa',
    },
    {
        id: 3,
        paymentFor: 'Anna Maison',
        amount: 12000,
        date: '30/07/2024',
        paidTo: 'Nasarawa',
    },
    {
        id: 3,
        paymentFor: 'Anna Maison',
        amount: 12000,
        date: '30/07/2024',
        paidTo: 'Nasarawa',
    },
];

export const reconciliations = [
    {
        id: 1,
        reconciliationTitle: 'Employee movement record - Aug, 2024',
        requestingState: 'Lagos state',
        status: 'Pending',
        dateInitiated: '10/09/2024',
        reconcilingState: 'Enugu State',
    },
    {
        id: 2,
        reconciliationTitle: 'Employee movement record - Sept, 2024',
        requestingState: 'Nasarawa state',
        status: 'Pending',
        dateInitiated: '10/09/2024',
        reconcilingState: 'Borno State',
    },
    {
        id: 3,
        reconciliationTitle: 'Employee movement record - Sept, 2024',
        requestingState: 'Nasarawa state',
        status: 'Resolved',
        dateInitiated: '10/09/2024',
        reconcilingState: 'Borno State',
    },
];

export const movementRecords = [
    {
        id: 1,
        employeeName: 'John Brown',
        jtbTIN: '1234567890',
        previousMda: 'Ministry of Works',
        newMda: 'Ministry of Housing',
        type: 'Moved In',
        monthlyPaye: 15000,
        annualPaye: 180000,
        taxableIncome: 1800000,
    },
    {
        id: 2,
        employeeName: 'Sonia Thompson',
        jtbTIN: '1234567891',
        previousMda: 'Ministry of Works',
        newMda: 'Ministry of Housing',
        type: 'Moved In',
        monthlyPaye: 15000,
        annualPaye: 180000,
        taxableIncome: 1800000,
    },
    {
        id: 3,
        employeeName: 'Anna Maison',
        jtbTIN: '1234567892',
        previousMda: 'Ministry of Works',
        newMda: 'Ministry of Housing',
        type: 'Moved Out',
        monthlyPaye: 15000,
        annualPaye: 180000,
        taxableIncome: 1800000,
    },
];

export const taxCollection = [
    {
        id: 1,
        employeeName: 'Ogunlana Mercy',
        jtbTin: '6342AJC7721',
        monthYear: 'August, 2021',
        paye: 1640000,
        remittance: 12000,
        annualPaye: 124000,
        taxableIncome: 1640000,
    },
    {
        id: 2,
        employeeName: 'Detola Brown',
        jtbTin: '6342AJC7721',
        monthYear: 'August, 2021',
        paye: 1640000,
        remittance: 12000,
        annualPaye: 124000,
        taxableIncome: 1640000,
    },
    {
        id: 3,
        employeeName: 'Samuel Grace',
        jtbTin: '6342AJC7721',
        monthYear: 'August, 2021',
        paye: 1640000,
        remittance: 12000,
        annualPaye: 124000,
        taxableIncome: 1640000,
    },
];

export const data = {
    totalEmployers: {
        mdas: {
            totalEmployees: 1500,
            totalMda: 50,
        },
        privateCompanies: {
            totalEmployees: 1200,
            totalPrivateCompanies: 40,
        },
    },
    totalPayeCounter: {
        totalPaye: 500000,
        previousYearPaye: 480000,
        percentageChange: 4,
    },
    totalEarning: {
        totalEarning: 1000000,
        percentageChange: 5,
    },
};

export const payeRemittance = [
    {
        id: 1,
        state: 'Abia State',
        expected: 1640000,
        received: 1565205,
    },
    {
        id: 2,
        state: 'Adamawa State',
        expected: 1640000,
        received: 1565205,
    },
    {
        id: 3,
        state: 'Akwa-Ibom State',
        expected: 1640000,
        received: 1565205,
    },
    {
        id: 4,
        state: 'Bauchi State',
        expected: 1640000,
        received: 1565205,
    },
];