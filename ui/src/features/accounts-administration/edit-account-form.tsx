import {
    Button,
    Checkbox,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { Account } from "../../models/administration-account/account";
import { updateAccount } from "../../services/administration.account.api.service";
import CloseIcon from '@mui/icons-material/Close';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { UserRoles, validationMessage } from "../../core/types";


interface TProps {
    element: Account;
    openEditForm: any;
    setOpenEditForm: any;
    getAndSetAccounts: any;
}

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
    newRoleName: yup.string(),
    password: yup.string()
});

function reloadPage(props:TProps, resetForm:any) : void {
    resetForm();
    props.setOpenEditForm(false);
    props.getAndSetAccounts();
}
  
export default function EditAccountForm(props: TProps) {
    const formik = useFormik({

        initialValues: {

            id: props.element.id,
            firstName: props.element.firstName,
            lastName: props.element.lastName,
            email: props.element.email,
            newRoleName: props.element.currentlyRoleName,
            changePassword: props.element.changePassword,
            password: props.element.password
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {

            const account: Account = {
                id: props.element.id,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                roleId: props.element.roleId,
                currentlyRoleName: props.element.currentlyRoleName,
                newRoleName: values.newRoleName,
                changePassword: values.changePassword,
                password: values.password
            };

            updateAccount(account)
            .then(() => {
                reloadPage(props, resetForm);
            });
        }
    });

    const [ changeAccountPassword, setChangeAccountPassword] = useState(false);
    const [ changeAccountRole, setChangeAccountRole] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    
    function handleChangeCheckboxPassword (event:any){
        if(event.target.checked == true){
            validationSchema.fields.password = yup.string().required("Please enter your password")
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
                "Password must contain one special case character");
        } else {
            validationSchema.fields.password = yup.string();
            formik.values.password = "";
            formik.initialValues.password = "";
        }
        formik.handleChange(event); 
        setChangeAccountPassword(event.target.checked);
    }

    function handleChangeCheckboxRole(event:any){
        if(event.target.checked == true){
            validationSchema.fields.newRoleName = yup.string().required(validationMessage);
        } else {
            validationSchema.fields.newRoleName = yup.string();
            formik.values.newRoleName = props.element.currentlyRoleName;
            formik.initialValues.newRoleName = props.element.currentlyRoleName;
        }
        setChangeAccountRole(event.target.checked);
    }

    return (
        <Dialog
        open={props.openEditForm}
        onClose={() => props.setOpenEditForm(false)}
        >
        <DialogTitle style={{width: 450, wordWrap: "break-word"}}>
            Modificați datele utilizatorului {props.element.lastName} {props.element.firstName}
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

                <FormControlLabel
                    control={<Checkbox />}
                    name = "changePassword"
                    label="Schimbati parola utlizatorului ?"
                    value={formik.values.changePassword}
                    checked = {formik.values.changePassword}
                    onChange = {(e) => handleChangeCheckboxPassword(e)}
                />

                <FormControlLabel
                    control={<Checkbox />}
                    name = "changePassword"
                    label="Schimbati rolul utlizatorului ?"
                    checked = {changeAccountRole}
                    onChange = {(e) => handleChangeCheckboxRole(e)}
                />

                {changeAccountRole?
                    <FormControl
                        fullWidth 
                        style={{width: 500, marginTop: "20px"}} 
                        variant="standard"
                        error={formik.touched.newRoleName && Boolean(formik.errors.newRoleName)}
                    >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native" id="demo-customized-select-label">
                            Selectează noul rol al utilizatorului
                        </InputLabel>
            
                        <Select
                            labelId="demo-customized-select-label"
                            id="demo-simple-select"
                            label="Rol"
                            name="newRoleName"
                            value={formik.values.newRoleName}
                            onChange={(e) => formik.handleChange(e)}
                        >
                            <MenuItem key={UserRoles.Architect} value={UserRoles.Architect}>{UserRoles.Architect}</MenuItem>
                            <MenuItem key={UserRoles.Administrator} value={UserRoles.Administrator}>{UserRoles.Administrator}</MenuItem>
                        </Select>
            
                        <FormHelperText>{formik.touched.newRoleName && formik.errors.newRoleName}</FormHelperText>
            
                    </FormControl>
                :null
                }
                {changeAccountPassword? 
                <div>
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

                </div>
                :null}

                <div id="form-buttons">
                    <Button className="button-formular-style" type="submit">MODIFICĂ</Button>
                    <Button className="button-formular-style" onClick={() => props.setOpenEditForm(false)}>RENUNȚĂ</Button>
                </div>

            </form>

            <IconButton
            aria-label="close"
            onClick={() => props.setOpenEditForm(false)}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500]
            }}>
            <CloseIcon style={{color: "#1976d2"}}/>
            </IconButton>
        </DialogContent>
        </Dialog>
    );
}