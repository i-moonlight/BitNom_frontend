export const getUserInitials = (nameString) => {
    if (!nameString) return 'US';
    const names = nameString?.split(' ');
    let initials = names[0]?.substring(0, 1)?.toUpperCase();

    if (names?.length > 1) {
        initials += names[names?.length - 1]?.substring(0, 1)?.toUpperCase();
    }
    return initials;
};

/* export const getUserInitials = (nameString) => {
    const fullName = nameString?.split(' ');
    const initials = fullName?.shift()?.charAt(0) + fullName?.pop()?.charAt(0);

    return initials ? initials?.toUpperCase() : 'us'.toUpperCase();
}; */
