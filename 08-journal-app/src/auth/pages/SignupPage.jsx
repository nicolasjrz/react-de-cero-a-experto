import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { startCreatingWithEmailPassword } from "../../store/auth/thunks";
import { AuthLayout } from "../layout/AuthLayout";

const dataFrom = {
  email: "nico@gmail.com",
  password: "123456",
  displayName: "Nicolas",
};

const formValidations = {
  email: [(value) => value.includes("@"), "The email must have an @"],
  password: [
    (value) => value.length >= 6,
    "The password must have more than 6 letters.",
  ],
  displayName: [(value) => value.length >= 1, "Name is required"],
};

export const SignupPage = () => {
  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector((state) => state.auth);

  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );

  const [formSumitted, setFormSumitted] = useState(false);

  const {
    displayName,
    email,
    password,
    onInputChange,
    formState,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(dataFrom, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSumitted(true);
    if (!isFormValid) return;

    dispatch(startCreatingWithEmailPassword(formState));
  };

  return (
    <AuthLayout title="Signup">
      <h1>FormValid : {isFormValid ? "valido" : "invalido"}</h1>
      <form
        onSubmit={onSubmit}
        method="get"
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Full name"
              type="text"
              placeholder="John Doe"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSumitted}
              helperText={displayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSumitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="Insert password"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSumitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ md: 2, mt: 1 }}>
            <Grid item display={!!errorMessage ? "" : "none"} xs={12}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12}>
              <Button
                disabled={isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth
              >
                Create Account
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end" sx={{ mt: 1 }}>
            <Typography>You already have an account?</Typography>
            <Link
              component={RouterLink}
              color="inherit"
              to="/auth/login"
              sx={{ ml: 1 }}
            >
              Login
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
