import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress
} from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";

import { Formik, Form, useFormikContext } from "formik";

import WelcomeForm from "./Forms/WelcomeForm";
// import AddressForm from "./Forms/AddressForm";
// import GeneralInfoForm from "./Forms/GeneralInfoForm";
// import SymptomForm from "./Forms/SymptomForm";
// import ReasonForm from "./Forms/ReasonForm";
// import UploadForm from "./Forms/UploadForm";
import SignatureForm from "./Forms/SignatureForm";

// import ResultForm from "./Forms/ResultForm";

// import PaymentForm from "./Forms/PaymentForm";
import ReviewForm from "./Forms/ReviewForm";
import CheckoutSuccess from "./CheckoutSuccess/CheckoutSuccess";

import validationSchema from "./FormModel/validationSchema";
import formModel from "./FormModel/formModel";
import formInitialValues from "./FormModel/formInitialValues";

import useStyles from "./styles";

const debug = true;
const steps = ["Welcome", "Upload Image", "Submit it"];
const { formId, formField } = formModel;

function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <WelcomeForm />;
    case 1:
      return <SignatureForm formField={formField} />;
    case 2:
      return <ReviewForm formField={formField} />;

    default:
      return <div>Not Found</div>;
  }
}

const Logger = () => {
  const formik = useFormikContext();
  React.useEffect(() => {
    console.group("Formik State");
    console.log("values", formik.values);
    console.log("errors", formik.errors);
    console.log("touched", formik.touched);
    console.log("isSubmitting", formik.isSubmitting);
    console.log("isValidating", formik.isValidating);
    console.log("submitCount", formik.submitCount);
    console.groupEnd();
  }, [
    formik.values,
    formik.errors,
    formik.touched,
    formik.isSubmitting,
    formik.isValidating,
    formik.submitCount,
    formik.initialValues
  ]);
  return null;
};

export default function CheckoutPage() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const matchBigScreen = useMediaQuery("(min-width:1024px)");
  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  return (
    <div className={classes.mainContainer}>
      <Typography component="h1" variant="h3" className={classes.formHeader}>
        {activeStep > 0 && "Formik, Yup, Material-UI"}
      </Typography>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{matchBigScreen && label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        {activeStep === steps.length ? (
          <CheckoutSuccess />
        ) : (
          <Formik
            initialValues={formInitialValues}
            validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
            debug={debug}
          >
            {({ isSubmitting }) => (
              <Form id={formId} className={classes.formContainer}>
                <Logger />
                {_renderStepContent(activeStep)}

                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button
                      onClick={_handleBack}
                      className={(classes.button, classes.backButton)}
                    >
                      Back
                    </Button>
                  )}
                  <div className={classes.wrapper}>
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      {isLastStep ? "Place order" : "Next"}
                    </Button>
                    {isSubmitting && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </React.Fragment>
    </div>
  );
}
