import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const CompProfilDesa = () => {
  const [profil, setProfilDesa] = useState([]);
  const [filter, setFilter] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getProfiDesa();
  }, []);

  const getProfiDesa = async () => {
    const response = await axios.get("http://13.229.115.11:5000/profil-desa");
    setProfilDesa(response.data);
  };

  return (
    <div>
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Profil Desa</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <NavLink to={"/dashboard"}>Home</NavLink>
                  </li>
                  <li className="breadcrumb-item active">Profil Desa</li>
                </ol>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {/* Small boxes (Stat box) */}

            <div className="row">
              <div className="col-lg-12">
                <div className="row mt-2">
                  <div className="col-md-4 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">
                          <strong>{profil[0]?.nama_desa}</strong>
                        </h5>
                        <p className="card-text mb-0">
                          <i className="fa-solid fa-location"></i>{" "}
                          {profil[0]?.alamat}
                        </p>
                        <p className="card-text mb-0">
                          <i className="fa-solid fa-phone"></i>{" "}
                          {profil[0]?.notelp}
                        </p>
                        <p className="card-text mb-0">
                          <i className="fa-solid fa-envelope"></i>{" "}
                          {profil[0]?.email}
                        </p>
                        <Link
                          to={`edit/${profil[0]?.id_profil}`}
                          className="btn btn-sm btn-primary mr-2 float-right">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /.row */}
            {/* Main row */}
            {/* /.row (main row) */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}
    </div>
  );
};

export default CompProfilDesa;
