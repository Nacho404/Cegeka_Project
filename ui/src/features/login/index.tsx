import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { UserLogin } from "../../models/login/user-login-model"
import * as yup from "yup";
import { login } from "../../services/login.api.service";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/userSlice'
import { UserRoles } from "../../core/types";

const validationSchema = yup.object({
    email: yup.string().required("Acest camp este obligatoriu"),
    password: yup.string().required("Please enter your password")
});

export function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isConfirmationDialogOpen, setOpenConfirmationDialog] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const user: UserLogin = {
                email: values.email,
                password: values.password
            };
            setOpenConfirmationDialog(false);
            login(user)
                .then((res) => {
                    dispatch(setUser({
                        email: res.email,
                        name: res.name,
                        role: res.role
                    }))
                    setOpenConfirmationDialog(true);
                    
                    if(res.role == UserRoles.Administrator){
                        navigate('/nomenclatoare');
                    }

                    if(res.role == UserRoles.Architect){
                        navigate('/proiecte');
                    }
                });
        }
    })

    return (
        <>
            <Box component="form" onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", marginTop: "10em", justifyContent: "center", alignItems: "center" }}>
                <Typography id="register-title" variant="h2" gutterBottom component="div">Autentificare</Typography>

                <TextField
                    style={{ width: 500, marginTop: "20px" }}
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

                <Button variant="outlined" type="submit" style={{ width: "300px", margin: "2em 7em" }}> Autentifica-te </Button>
                <Box style={{ width: 500, marginTop: "10px" }}>
                    <Divider />
                </Box>
                <Box style={{ width: 500, marginTop: "30px" }}>
                    <Grid container spacing={2} direction="row"
                        justifyContent="center"
                        alignItems="center">
                        <Grid item xs={5}>
                            <Button >ATI UITAT PAROLA?</Button>
                        </Grid>
                        <Grid item xs={5}>
                            <Button variant="contained" onClick={() => { navigate('/register') }} type="submit" color="success">Inregistrare</Button>
                        </Grid>
                    </Grid>
                </Box>
                <Dialog open={isConfirmationDialogOpen}>
                    <DialogTitle>Bine ai revenit</DialogTitle>
                    <DialogContent style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <Button variant="outlined" href="/" color="primary">Ok</Button>

                    </DialogContent>
                </Dialog>
            </Box>

        </>
    )
}


