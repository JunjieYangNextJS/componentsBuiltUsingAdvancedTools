import React, {useState} from 'react';
import Link from 'next/link'
import {useCharacters} from "../../hooks/useCharacters";
import { useFormik } from 'formik';
import * as yup from 'yup';
import {Box, Button, Autocomplete, TextField, FormGroup, FormControlLabel, FormControl, FormLabel, RadioGroup, Radio, Checkbox} from '@mui/material'

interface Values {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    gender: string;
    character: string;
    terms: boolean;
    notify: boolean
}

const validationSchema = yup.object({
    firstName: yup
        .string()
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
        .required('Email is required'),
    lastName: yup
        .string()
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
        .required('Email is required'),
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    passwordConfirmation: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});

function Index() {

    const {error, loading, data} = useCharacters()

    // console.log(data?.characters.results, 'results');



    const formik = useFormik({
        initialValues: {
            firstName:'',
            lastName:'',
            email: '',
            password: '',
            passwordConfirmation: '',
            gender:'',
            character:'',
            terms: false,
            notify: true
        },
        validationSchema: validationSchema,
        onSubmit: (values: Values) => {
            console.log(values)
        }
    })

    const {handleSubmit, values, handleChange, setFieldValue, errors, touched, handleBlur} = formik

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box >
                    <TextField
                        id='firstName'
                        name='firstName'
                        label='firstName'
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}

                    />
                    <TextField
                        id='lastName'
                        name='lastName'
                        label='lastName'
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}

                    />
                    <TextField
                        fullWidth
                        id='email'
                        name='email'
                        label='email'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                    />
                    <TextField
                        fullWidth
                        id='password'
                        name='password'
                        label='password'
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                    />
                    <TextField
                        fullWidth
                        id='passwordConfirmation'
                        name='passwordConfirmation'
                        label='confirm your password'
                        type="password"
                        value={values.passwordConfirmation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        error={touched.passwordConfirmation && Boolean(errors.passwordConfirmation)}
                        helperText={touched.passwordConfirmation && errors.passwordConfirmation}
                    />
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                            row
                            aria-label="gender"
                            onChange={handleChange}
                            id='gender'
                            name='gender'
                            value={values.gender}

                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>
                    {data && <Autocomplete
                        value={values.character}
                        onChange={(e, value) =>
                            setFieldValue("character", value)}
                        id="character"
                        options={data?.characters.results.map((character: any) => character.name)}
                        sx={{ width: 300 }}
                        renderInput={(params) =>
                            <TextField {...params}
                                       label="Character"
                                       name='character'

                            />}
                    />}
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    required
                                    onChange={handleChange}
                                    id='terms'
                                    name='terms'
                                    value={values.terms}

                                /> }
                            label="I understand the terms and conditions." />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    defaultChecked
                                    onChange={handleChange}
                                    id='notify'
                                    name='notify'
                                    value={values.notify}
                                />}
                            label="Notify me when there is a discount or promotion." />
                    </FormGroup>
                    <Button color='primary'
                            variant='contained'
                            type='submit'
                            fullWidth>

                        Submit</Button>
                </Box>

            </form>
            <Box>
                <Link href='/signin'><a>Already have an account? Sign in here.</a></Link>
                </Box>
        </div>
    );
}

export default Index;