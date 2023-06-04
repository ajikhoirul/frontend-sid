import React, { useEffect } from "react";
import Layout from "./Layout";
import FormAddPertanyaan from "../components/FormAddPertanyaan";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const AddPertanyaan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
    <Layout>
      <FormAddPertanyaan />
    </Layout>
  );
};

export default AddPertanyaan;
