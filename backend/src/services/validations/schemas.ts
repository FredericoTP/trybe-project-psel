import * as Joi from 'joi';
import { StringSchema } from 'joi';

const customMessage = (fieldName: string, min: number, type: string) => ({
  'string.base': `${fieldName} should be a type of ${type}`,
  'string.empty': `${fieldName} cannot be an empty field`,
  'string.min': `${fieldName} should have a minimum length of ${min}`,
  'any.required': `${fieldName} is a required field`,
});

const documentSchema: StringSchema = Joi.string().required().messages(customMessage('document', 5, 'string'));

const passwordSchema: StringSchema = Joi.string().required().messages(customMessage('password', 5, 'string'));

const loginSchema = Joi.object({
  document: documentSchema,
  password: passwordSchema,
});

export { documentSchema, passwordSchema, loginSchema };
