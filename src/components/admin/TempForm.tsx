'use client'
import React from 'react';
import Form from 'react-jsonschema-form-material-ui';

const schema = {
  title: 'Person',
 
  properties: {
    firstName: { type: 'string', title: 'Name' },
    lastName: { type: 'string', title: 'Last Name' },
    age: { type: 'number', title: 'Age' },
    email: { type: 'string', title: 'Email' },
  },
};

const FormComponent = ({lng}: {lng: string}) => {
  const onSubmit = (formData: any) => {
    console.log(formData);
    // Perform any necessary the form data
  };

  return (
    <Form schema={schema} onSubmit={onSubmit} />
 )};

export default FormComponent;


