import * as Yup from 'yup';

export const workValidation = Yup.object().shape({
  company: Yup.string().required().min(2).label('Company'),
  title: Yup.string().required().min(2).label('Title'),
  start_date: Yup.string().required().label('Start Date'),
  end_date: Yup.string().label('End Date'),
  description: Yup.string().required().min(15).label('Description'),
});
