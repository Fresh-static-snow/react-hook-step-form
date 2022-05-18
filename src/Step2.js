import React from "react";
import { useHistory } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useData } from "./DataContext";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import { PrimaryButton } from "./components/PrimaryButton";
import { MainContainer } from "./components/MainContainer";
import { Form } from "./components/Form";
import { Input } from "./components/Input";
import * as yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should have correct format")
    .required("Email is a required field"),
  phoneNumber: yup
    .number()
    // .matches('^[0-9]+$', 'Phone must contain only numbers')
    .required("Phone is a required field"),
  //ОТОБРАЗИТЬ
});

const normalizePhoneNumber = (value) => {
  const phoneNumber = parsePhoneNumberFromString(value);
  if (!phoneNumber) {
    return value;
  }

  return phoneNumber.formatInternational();
};

export const Step2 = () => {
  const { setValues, data } = useData();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: data.email,
      hasPhone: data.hasPhone,
      phoneNumber: data.phoneNumber,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const hasPhone = watch("hasPhone");

  const onSubmit = (data) => {
    history.push("./result");
    setValues(data);
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        🦄 Step 2
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email")}
          id="email"
          type="email"
          label="Email"
          name="email"
          error={!!errors?.email}
          helperText={errors?.email?.message}
          required
        />

        <input type="checkbox" {...register("hasPhone")} />

        {hasPhone && (
          <Input
            {...register("phoneNumber")}
            id="phoneNumber"
            type="tel"
            label="Phone Number"
            name="phoneNumber"
            error={!!errors?.phoneNumber}
            helperText={errors?.phoneNumber?.message}
            onChange={(e) => {
              e.target.value = normalizePhoneNumber(e.target.value);
            }}
          />
        )}
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};
