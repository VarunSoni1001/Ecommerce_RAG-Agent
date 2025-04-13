import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import CustomInput from "../components/CustomInput";
import {
  getStoreInfo,
  resetState,
  addOrUpdateStoreInfo,
  deleteStoreInfo,
} from "../features/store/storeInfoSlice";

const schema = yup.object().shape({
  about: yup.string().required("About is required"),
  privacy: yup.string().required("Privacy Policy is required"),
  returnPolicy: yup.string().required("Return Policy is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  street: yup.string().required("Street is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  pincode: yup.string().required("Pincode is required"),
});

const AddStoreInfo = () => {
  const dispatch = useDispatch();
  const { storeInfo, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.store
  );

  const existingInfo = storeInfo[0] || {
    about:
      "this is the store named RAG Ecom. this is an RAG based ecommerce project",
    privacy:
      "Not everyone knows how to make a Privacy Policy agreement, especially with CCPA or GDPR or CalOPPA or PIPEDA or Australia's Privacy Act provisions. If you are not a lawyer or someone who is familiar to Privacy Policies, you will be clueless. Some people might even take advantage of you because of this. Some people may even extort money from you. These are some examples that we want to stop from happening to you.  We will help you protect yourself by generating a Privacy Policy.  Our Privacy Policy Generator can help you make sure that your business complies with the law. We are here to help you protect your business, yourself and your customers.  Fill in the blank spaces below and we will create a personalized website Privacy Policy for your business. No account registration required. Simply generate & download a Privacy Policy in seconds!  Small remark when filling in this Privacy Policy generator: Not all parts of this Privacy Policy might be applicable to your website. When there are parts that are not applicable, these can be removed. Optional elements can be selected in step 2. The accuracy of the generated Privacy Policy on this website is not legally binding. Use at your own risk.",
    returnPolicy:
      "return can be done by emailing us and can be processed only withing 2 weeks of purchase",
    contactDetails: { email: "rag@ecom.com", phone: "1234567890" },
    address: {
      street: "Delhi",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110001",
    },
  };

  useEffect(() => {
    dispatch(getStoreInfo());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Store info updated successfully!");
      dispatch(resetState());
    }
    if (isError) {
      toast.error(`Error: ${message}`);
      dispatch(resetState());
    }
  }, [isSuccess, isError, message, dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      about: existingInfo.about || "",
      privacy: existingInfo.privacy || "",
      returnPolicy: existingInfo.returnPolicy || "",
      email: existingInfo.contactDetails?.email || "",
      phone: existingInfo.contactDetails?.phone || "",
      street: existingInfo.address?.street || "",
      city: existingInfo.address?.city || "",
      state: existingInfo.address?.state || "",
      pincode: existingInfo.address?.pincode || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const payload = {
        // id: existingInfo.id,
        about: values.about,
        privacy: values.privacy,
        returnPolicy: values.returnPolicy,
        contactDetails: {
          email: values.email,
          phone: values.phone,
        },
        address: {
          street: values.street,
          city: values.city,
          state: values.state,
          pincode: values.pincode,
        },
      };

      dispatch(addOrUpdateStoreInfo(payload));
    },
  });

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Store Information</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <CustomInput
          name="about"
          type="text"
          label="About Store"
          placeholder="About Store"
          val={formik.values.about}
          onChng={formik.handleChange}
          onBlr={formik.handleBlur}
        />
        {formik.touched.about && formik.errors.about && (
          <div className="text-red-500 text-sm">{formik.errors.about}</div>
        )}

        <CustomInput
          name="privacy"
          type="text"
          label="Privacy Policy"
          placeholder="Privacy Policy"
          val={formik.values.privacy}
          onChng={formik.handleChange}
          onBlr={formik.handleBlur}
        />
        {formik.touched.privacy && formik.errors.privacy && (
          <div className="text-red-500 text-sm">{formik.errors.privacy}</div>
        )}

        <CustomInput
          name="returnPolicy"
          type="text"
          label="Return Policy"
          placeholder="Return Policy"
          val={formik.values.returnPolicy}
          onChng={formik.handleChange}
          onBlr={formik.handleBlur}
        />
        {formik.touched.returnPolicy && formik.errors.returnPolicy && (
          <div className="text-red-500 text-sm">
            {formik.errors.returnPolicy}
          </div>
        )}

        <CustomInput
          name="email"
          type="email"
          label="Email"
          placeholder="Email"
          val={formik.values.email}
          onChng={formik.handleChange}
          onBlr={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}

        <CustomInput
          name="phone"
          type="text"
          label="Phone"
          placeholder="Phone"
          val={formik.values.phone}
          onChng={formik.handleChange}
          onBlr={formik.handleBlur}
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className="text-red-500 text-sm">{formik.errors.phone}</div>
        )}

        <CustomInput
          name="street"
          type="text"
          label="Street"
          placeholder="Street"
          val={formik.values.street}
          onChng={formik.handleChange}
          onBlr={formik.handleBlur}
        />
        {formik.touched.street && formik.errors.street && (
          <div className="text-red-500 text-sm">{formik.errors.street}</div>
        )}

        <CustomInput
          name="city"
          type="text"
          label="City"
          placeholder="City"
          val={formik.values.city}
          onChng={formik.handleChange}
          onBlr={formik.handleBlur}
        />
        {formik.touched.city && formik.errors.city && (
          <div className="text-red-500 text-sm">{formik.errors.city}</div>
        )}

        <CustomInput
          name="state"
          type="text"
          label="State"
          placeholder="State"
          val={formik.values.state}
          onChng={formik.handleChange}
          onBlr={formik.handleBlur}
        />
        {formik.touched.state && formik.errors.state && (
          <div className="text-red-500 text-sm">{formik.errors.state}</div>
        )}

        <CustomInput
          name="pincode"
          type="text"
          label="Pincode"
          placeholder="Pincode"
          val={formik.values.pincode}
          onChng={formik.handleChange}
          onBlr={formik.handleBlur}
        />
        {formik.touched.pincode && formik.errors.pincode && (
          <div className="text-red-500 text-sm">{formik.errors.pincode}</div>
        )}

        <button
          disabled={isLoading}
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>

        <button
          disabled={isLoading}
          className="btn btn-danger border-0 rounded-3 my-5"
          type="button"
          onClick={() => {
            if (
              window.confirm("Are you sure you want to delete this store info?")
            ) {
              dispatch(deleteStoreInfo(existingInfo.id));
            }
          }}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </button>
      </form>
    </div>
  );
};

export default AddStoreInfo;
