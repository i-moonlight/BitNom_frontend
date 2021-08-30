import * as Yup from 'yup';

export const workValidation = Yup.object().shape({
  company: Yup.string().required().min(2).label('Company'),
  title: Yup.string().required().min(2).label('Title'),
  start_date: Yup.string().required().label('Start Date'),
  end_date: Yup.string().label('End Date'),
  description: Yup.string().required().min(15).label('Description'),
});

export const educationValidation = Yup.object().shape({
  institution: Yup.string().required().min(2).label('Institution'),
  major: Yup.string().required().min(2).label('Major'),
  start_date: Yup.string().required().label('Start Date'),
  end_date: Yup.string().label('End Date'),
  description: Yup.string().required().min(15).label('Description'),
});

export const honorValidation = Yup.object().shape({
  organization: Yup.string().required().min(2).label('Organization'),
  name: Yup.string().required().min(2).label('Name'),
  start_date: Yup.string().required().label('Start Date'),
  end_date: Yup.string().label('End Date'),
  url: Yup.string().required().url().label('Credential Url'),
});

export const courseAndProjectValidation = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  year: Yup.string().required().label('Year'),
});
