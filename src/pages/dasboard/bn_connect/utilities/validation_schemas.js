// Auth Pages Validation Schemas
import * as Yup from 'yup';

export const createPostSchema = Yup.object().shape({
  content: Yup.string().min(1).max(250).required().label('Content'),
  images: Yup.array().max(4).label('Images'),
});
