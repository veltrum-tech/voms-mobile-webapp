const getHeaderDetails = () => {
    const info = [
        { label: 'View Profile', link: '/profile' },
        { label: 'Change Password', link: '/reset-password' },
    ];

    return info;
};

export { getHeaderDetails };
