import * as Yup from 'yup';
const minRealDate = new Date(1920, 0, 1, 0, 0, 0);
const today = new Date();

export const workValidation = Yup.object().shape({
    company: Yup.string().required().min(2).max(50).label('Company'),
    title: Yup.string().required().min(2).max(50).label('Title'),
    start_date: Yup.date()
        .min(minRealDate, 'Enter a realistic date')
        .required()
        .label('Start Date'),
    end_date: Yup.date()
        .min(Yup.ref('start_date'), "End date can't be before start date")
        .label('End Date'),
    description: Yup.string().required().min(15).max(50).label('Description'),
});

export const educationValidation = Yup.object().shape({
    institution: Yup.string().required().min(2).max(50).label('Institution'),
    major: Yup.string().required().min(2).max(50).label('Major'),
    start_date: Yup.date()
        .min(minRealDate, 'Enter a realistic date')
        .required()
        .label('Start Date'),
    end_date: Yup.date()
        .min(Yup.ref('start_date'), "End date can't be before start date")
        .label('End Date'),

    description: Yup.string().required().min(15).max(50).label('Description'),
});

export const honorValidation = Yup.object().shape({
    organization: Yup.string().required().min(2).max(50).label('Organization'),
    name: Yup.string().required().min(2).max(50).label('Name'),
    start_date: Yup.date()
        .min(minRealDate, 'Enter a realistic date')
        .max(today, 'Enter a date before today')
        .required()
        .label('Start Date'),
    end_date: Yup.date()
        .min(Yup.ref('start_date'), "End date can't be before start date")
        .label('End Date'),
    url: Yup.string().required().url().max(2048).label('Credential Url'),
});

export const courseAndProjectValidation = Yup.object().shape({
    name: Yup.string().required().max(20).label('Name'),
    year: Yup.string().required().label('Year'),
});

export const bioValidation = Yup.object().shape({
    bio: Yup.string().required().min(50).max(120).label('Bio'),
});

export const profileValidation = Yup.object().shape({
    displayName: Yup.string().required().label('Name'),
});
