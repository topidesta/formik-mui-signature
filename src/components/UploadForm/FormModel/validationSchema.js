import * as Yup from "yup";
//import moment from "moment";
import formModel from "./formModel";
const {
  formField: { image }
} = formModel;

const FILE_SIZE = 10 * 1024 * 1024; // ~= 10 MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

export default [
  // WelcomeForm   Nothing to validate
  Yup.object().shape({}),
  // Image Upload
  Yup.object().shape({
    [image.name]: Yup.string()
  }),

  // ReviewForm   Nothing to validate
  Yup.object().shape({})
];
