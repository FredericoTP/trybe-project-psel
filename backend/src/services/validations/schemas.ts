import * as Joi from 'joi';
import {
  StringSchema, ObjectSchema, NumberSchema, DateSchema,
} from 'joi';
import validator from 'cpf-cnpj-validator';

const JoiExtends = require('joi').extend(validator);

const customMessage = (fieldName: string, min: number, type: string) => ({
  'string.base': `${fieldName} should be a type of ${type}`,
  'string.empty': `${fieldName} cannot be an empty field`,
  'string.min': `${fieldName} should have a minimum length of ${min}`,
  'string.email': `${fieldName} should be valid`,
  'any.required': `${fieldName} is a required field`,
});

const idSchema: NumberSchema = Joi.number().required().messages(customMessage('id', 5, 'number'));

const documentSchema: StringSchema = Joi.string().required().messages(customMessage('document', 5, 'string'));

const passwordSchema: StringSchema = Joi.string().required().messages(customMessage('password', 5, 'string'));

const emailSchema: StringSchema = Joi.string().email().required().messages(customMessage('email', 5, 'string'));

const nameSchema: StringSchema = Joi.string().required().messages(customMessage('name', 5, 'string'));

const dateSchema: DateSchema = Joi.date().iso().required().messages(customMessage('date', 5, 'string'));

const valueSchema: NumberSchema = Joi.number().required().messages(customMessage('value', 5, 'number'));

const cnpjSchema = JoiExtends.document().cnpj();

const cpfSchema = JoiExtends.document().cpf();

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

const updateSchema: ObjectSchema = Joi.object({
  id: idSchema,
  name: nameSchema,
  email: emailSchema,
});

const transactionSchema: ObjectSchema = Joi.object({
  id: idSchema,
  value: valueSchema,
  date: dateSchema,
});

export {
  idSchema,
  documentSchema,
  passwordSchema,
  loginSchema,
  accountSchema,
  cnpjSchema,
  cpfSchema,
  updateSchema,
  transactionSchema,
};
