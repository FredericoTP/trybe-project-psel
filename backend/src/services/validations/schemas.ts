import * as Joi from 'joi';
import { StringSchema, ObjectSchema } from 'joi';

const customMessage = (fieldName: string, min: number, type: string) => ({
  'string.base': `${fieldName} should be a type of ${type}`,
  'string.empty': `${fieldName} cannot be an empty field`,
  'string.min': `${fieldName} should have a minimum length of ${min}`,
  'string.email': `${fieldName} should be valid`,
  'any.required': `${fieldName} is a required field`,
});

const documentSchema: StringSchema = Joi.string().required().messages(customMessage('document', 5, 'string'));

const passwordSchema: StringSchema = Joi.string().required().messages(customMessage('password', 5, 'string'));

const emailSchema: StringSchema = Joi.string().email().required().messages(customMessage('email', 5, 'string'));

const nameSchema: StringSchema = Joi.string().required().messages(customMessage('name', 5, 'string'));

const loginSchema: ObjectSchema = Joi.object({
  document: documentSchema,
  password: passwordSchema,
});

const accountSchema: ObjectSchema = Joi.object({
  name: nameSchema,
  password: passwordSchema,
  email: emailSchema,
  document: documentSchema,
});

export {
  documentSchema, passwordSchema, loginSchema, accountSchema,
};
