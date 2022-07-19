import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { User } from "../../models/registration/user-model"
import * as yup from "yup";
import { register } from "../../services/register.api.service";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const validationSchema = yup.object({
  firstName: yup.string()
    .min(2, "Prenumele este prea scrut")
    .max(32, "Prenumele este prea lung")
    .matches(/^[aA-zZ]+$/, "Prenumele trebuie sa contina doar litere")
    .required("Acest camp este obligatoriu"),
  lastName: yup.string()
    .min(2, "Numele este prea scrut")
    .max(32, "Numele este prea lung")
    .matches(/^[aA-zZ]+$/, "Numele trebuie sa contina doar litere")
    .required("Acest camp este obligatoriu"),
  email: yup.string().email("Email invalid").required("Acest camp este obligatoriu"),
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^.*(?=.{8,}).*$/,
      "Password must contain at least 8 characters")
    .matches(
      /^.*((?=.*[a-z]){1}).*$/,
      "Password must contain one lower case character")
    .matches(
      /^.*((?=.*[A-Z]){1}).*$/,
      "Password must contain one uppercase case character")
    .matches(
      /^.*(?=.*\d).*$/,
      "Password must contain one number character")
    .matches(
      /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1}).*$/,
      "Password must contain one special case character"),
  confimationPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
});

export function Register() {

  const [isConfirmationDialogOpen, setOpenConfirmationDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confimationPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const user: User = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password
      };
      setOpenConfirmationDialog(false);
      register(user).then(() => {
        setOpenConfirmationDialog(true);
      })
    }
  })

  return (
    <Box component="form" onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", marginTop: "10em", justifyContent: "center", alignItems: "center" }}>
      <Typography id="register-title" variant="h2" gutterBottom component="div">Inregistrare</Typography>
      <TextField
        style={{ width: 500, marginTop: "20px" }}
        id="firstName"
        name="firstName"
        label="Prenume"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        error={formik.touched.firstName && !!formik.errors.firstName}
        helperText={formik.touched.firstName && formik.errors.firstName}
      ></TextField>
      <TextField
        style={{ width: 500, marginTop: "20px" }}
        id="lastName"
        name="lastName"
        label="Nume"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        error={formik.touched.lastName && !!formik.errors.lastName}
        helperText={formik.touched.lastName && formik.errors.lastName}
      ></TextField>
      <TextField
        style={{ width: 500, marginTop: "20px" }}
        type = "email"
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && !!formik.errors.email}
        helperText={formik.touched.email && formik.errors.email}
      ></TextField>
      <TextField
        style={{ width: 500, marginTop: "20px" }}
        type={showPassword ? "text" : "password"}
        id="password"
        name="password"   
        label="Parola"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && !!formik.errors.password}
        helperText={formik.touched.password && formik.errors.password}
      ></TextField>
      <TextField
        style={{ width: 500, marginTop: "20px" }}
        type={showConfirmPassword ? "text" : "password"}
        id="confimationPassword"
        name="confimationPassword"
        label="Confirma Parola"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownConfirmPassword}
              >
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
        value={formik.values.confimationPassword}
        onChange={formik.handleChange}
        error={formik.touched.confimationPassword && !!formik.errors.confimationPassword}
        helperText={formik.touched.confimationPassword && formik.errors.confimationPassword}
      ></TextField>
      <Button variant="outlined" type="submit" style={{ width: "300px", margin: "2em 7em" }}> Inregistreaza-te </Button>


      <Dialog open={isConfirmationDialogOpen}>
        <DialogTitle>Te-ai inregistrat cu succes</DialogTitle>
        <DialogContent style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Button variant="outlined" href="/" color="primary">Ok</Button>
        </DialogContent>
      </Dialog>
    </Box>
  )
}


