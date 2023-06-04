import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { NavLink, Link } from "react-router-dom";
import "./galeri/style.css";

const CompStruktur = () => {
  const [struktur, setStruktur] = useState([]);

  useEffect(() => {
    getStruktur();
  }, []);

  const getStruktur = async () => {
    const response = await axios.get("http://localhost:5000/struktur-desa");
    setStruktur(response.data);
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
                <h1 className="m-0">Struktur Desa</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <NavLink to={"/dashboard"}>Home</NavLink>
                  </li>
                  <li className="breadcrumb-item active">Struktur Desa</li>
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
                {/* <NavLink to={"/galeri/add"} className="btn btn-success tambah">
                  Tambah
                </NavLink> */}

                <div className="container-fluid mt-3">
                  <div className="row">
                    <div className="col-12">
                      <div className="section-title">
                        <h4 className="m-0 text-uppercase font-weight-bold">
                          Struktur Desa Kepuhrubuh
                        </h4>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="position-relative mb-3">
                        <img
                          className="img-fluid w-100"
                          src={struktur[0]?.url}
                          style={{ objectFit: "cover" }}
                        />
                        <div className="bg-white border border-top-0 p-3 pb-5">
                          <p
                            className="m-0 font-weight-medium"
                            dangerouslySetInnerHTML={{
                              __html: struktur[0]?.text,
                            }}
                          />
                          <Link
                            to={`edit/${struktur[0]?.id_struktur}`}
                            className="btn btn-sm btn-primary mr-2 float-right">
                            <i className="fa-solid fa-pen-to-square"></i>
                          </Link>
                        </div>
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

export default CompStruktur;
