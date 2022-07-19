import { Button, Dialog, DialogContent, DialogTitle, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useFormik } from "formik";
import { User } from "../../models/registration/user-model"
import * as yup from "yup";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { insertAccount } from "../../services/administration.account.api.service";
import CloseIcon from '@mui/icons-material/Close';
import { UserRoles, validationMessage } from "../../core/types";

interface TProps {
  openAddForm: any;
  setOpenAddForm: any;
  getAndSetAccounts: any;
}

const validationSchema = yup.object({
  firstName: yup.string()
    .min(2, "Prenumele este prea scrut")
    .max(32, "Prenumele este prea lung")
    .matches(/^[aA-zZ]+$/, "Prenumele trebuie sa contina doar litere")
    .required(validationMessage),
  lastName: yup.string()
    .min(2, "Numele este prea scrut")
    .max(32, "Numele este prea lung")
    .matches(/^[aA-zZ]+$/, "Numele trebuie sa contina doar litere")
    .required(validationMessage),
  email: yup.string().email("Email invalid").required(validationMessage),
  roleName: yup.string().required(validationMessage),
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

function reloadPage(props:TProps, resetForm:any) : void {
  resetForm();
  props.setOpenAddForm(false);
  props.getAndSetAccounts();
}

export function AddAccountForm(props: TProps) {

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
      roleName: '',
      password: '',
      confimationPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const account: User = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password
      };

      insertAccount(account, values.roleName).then(() => {
        reloadPage(props, resetForm);
      })

    }
  })

  return (
    <Dialog
    open={props.openAddForm}
    onClose={() => props.setOpenAddForm(false)}
    >
      <DialogTitle style={{width: 450, wordWrap: "break-word"}}>
        Adăugați utilizator 
      </DialogTitle>

      <DialogContent style={{padding: "0 24px 0 24px"}}>
          <form onSubmit={formik.handleSubmit} style={{maxWidth: 500}}>
              <TextField
                  style={{ width: 500, marginTop: "20px" }}
                  id="firstName"
                  name="firstName"
                  label="Prenume"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && !!formik.errors.firstName}
                  helperText={formik.touched.firstName && formik.errors.firstName}
              >
              </TextField>

              <TextField
                  style={{ width: 500, marginTop: "20px" }}
                  id="lastName"
                  name="lastName"
                  label="Nume"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && !!formik.errors.lastName}
                  helperText={formik.touched.lastName && formik.errors.lastName}
              >
              </TextField>

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
              >
              </TextField>

              <FormControl
                fullWidth 
                style={{width: 500, marginTop: "20px"}} 
                variant="standard"
                error={formik.touched.roleName && Boolean(formik.errors.roleName)}
              >
                <InputLabel variant="standard" htmlFor="uncontrolled-native" id="demo-customized-select-label">
                  Rol utilizator
                </InputLabel>
    
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-simple-select"
                  label="Rol"
                  name="roleName"
                  value={formik.values.roleName}
                  onChange={(e) => formik.handleChange(e)}
                >
                  <MenuItem key={UserRoles.Architect} value={UserRoles.Architect}>{UserRoles.Architect}</MenuItem>
                  <MenuItem key={UserRoles.Administrator} value={UserRoles.Administrator}>{UserRoles.Administrator}</MenuItem>
                </Select>
    
                <FormHelperText>{formik.touched.roleName && formik.errors.roleName}</FormHelperText>
    
              </FormControl>

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
              >
              </TextField>

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
              >
              </TextField>

              <div id="form-buttons">
                  <Button className="button-formular-style" type="submit">ADAUGĂ</Button>
                  <Button className="button-formular-style" onClick={() => props.setOpenAddForm(false)}>RENUNȚĂ</Button>
              </div>

          </form>

          <IconButton
              aria-label="close"
              onClick={() => props.setOpenAddForm(false)}
              sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500]
              }}>
              <CloseIcon style={{color: "#1976d2"}} />
          </IconButton>

      </DialogContent>
    </Dialog>
  )
}


