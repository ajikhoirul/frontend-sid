import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { NavLink } from "react-router-dom";
import "./galeri/style.css";

const GaleriList = () => {
  const [galeri, setGaleri] = useState([]);

  useEffect(() => {
    getGaleri();
  }, []);

  const getGaleri = async () => {
    const response = await axios.get("http://localhost:5000/galeri");
    setGaleri(response.data);
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
                <h1 className="m-0">Galeri</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <NavLink to={"/dashboard"}>Home</NavLink>
                  </li>
                  <li className="breadcrumb-item active">Galeri</li>
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
                    <div className="col-lg-7 px-0">
                      <div className="main-carousel position-relative">
                        <div
                          className="position-relative overflow-hidden"
                          style={{ height: 500 }}>
                          <img
                            alt="Gambar 1"
                            className="img-fluid w-100 h-100"
                            src={galeri[0]?.url}
                            style={{ objectFit: "cover" }}
                          />
                          <div className="overlay">
                            <div className="mb-2">
                              <NavLink
                                to={`/galeri/edit/${galeri[0]?.id_galeri}`}
                                className="btn btn-sm btn-warning mr-1"
                                style={{ borderRadius: "10px" }}>
                                <i className="fa-solid fa-pen-to-square"></i>
                              </NavLink>
                              <a
                                className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                                href>
                                {galeri[0]?.user.name}
                              </a>
                              <a className="text-white" href>
                                {moment(galeri[0]?.updatedAt).format(
                                  "DD-MM-YYYY"
                                )}
                              </a>
                            </div>
                            <a
                              className="h2 m-0 text-white text-uppercase font-weight-bold"
                              href>
                              {galeri[0]?.judul}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 px-0">
                      <div className="row mx-0">
                        <div className="col-md-6 px-0">
                          <div
                            className="position-relative overflow-hidden"
                            style={{ height: 250 }}>
                            <img
                              className="img-fluid w-100 h-100"
                              src={galeri[1]?.url}
                              style={{ objectFit: "cover" }}
                            />
                            <div className="overlay">
                              <div className="mb-2">
                                <NavLink
                                  to={`/galeri/edit/${galeri[1]?.id_galeri}`}
                                  className="btn btn-sm btn-warning mr-1"
                                  style={{ borderRadius: "10px" }}>
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </NavLink>
                                <a
                                  className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                                  href>
                                  {galeri[1]?.user.name}
                                </a>
                                <a className="text-white" href>
                                  <small>
                                    {moment(galeri[1]?.updatedAt).format(
                                      "DD-MM-YYYY"
                                    )}
                                  </small>
                                </a>
                              </div>
                              <a
                                className="h6 m-0 text-white text-uppercase font-weight-semi-bold"
                                href>
                                {galeri[1]?.judul}
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 px-0">
                          <div
                            className="position-relative overflow-hidden"
                            style={{ height: 250 }}>
                            <img
                              className="img-fluid w-100 h-100"
                              src={galeri[2]?.url}
                              style={{ objectFit: "cover" }}
                            />
                            <div className="overlay">
                              <div className="mb-2">
                                <NavLink
                                  to={`/galeri/edit/${galeri[2]?.id_galeri}`}
                                  className="btn btn-sm btn-warning mr-1"
                                  style={{ borderRadius: "10px" }}>
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </NavLink>
                                <a
                                  className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                                  href>
                                  {galeri[2]?.user.name}
                                </a>
                                <a className="text-white" href>
                                  <small>
                                    {moment(galeri[2]?.updatedAt).format(
                                      "DD-MM-YYYY"
                                    )}
                                  </small>
                                </a>
                              </div>
                              <a
                                className="h6 m-0 text-white text-uppercase font-weight-semi-bold"
                                href>
                                {galeri[2]?.judul}
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 px-0">
                          <div
                            className="position-relative overflow-hidden"
                            style={{ height: 250 }}>
                            <img
                              className="img-fluid w-100 h-100"
                              src={galeri[3]?.url}
                              style={{ objectFit: "cover" }}
                            />
                            <div className="overlay">
                              <div className="mb-2">
                                <NavLink
                                  to={`/galeri/edit/${galeri[3]?.id_galeri}`}
                                  className="btn btn-sm btn-warning mr-1"
                                  style={{ borderRadius: "10px" }}>
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </NavLink>
                                <a
                                  className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                                  href>
                                  {galeri[3]?.user.name}
                                </a>
                                <a className="text-white" href>
                                  <small>
                                    {moment(galeri[3]?.updatedAt).format(
                                      "DD-MM-YYYY"
                                    )}
                                  </small>
                                </a>
                              </div>
                              <a
                                className="h6 m-0 text-white text-uppercase font-weight-semi-bold"
                                href>
                                {galeri[3]?.judul}
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 px-0">
                          <div
                            className="position-relative overflow-hidden"
                            style={{ height: 250 }}>
                            <img
                              className="img-fluid w-100 h-100"
                              src={galeri[4]?.url}
                              style={{ objectFit: "cover" }}
                            />
                            <div className="overlay">
                              <div className="mb-2">
                                <NavLink
                                  to={`/galeri/edit/${galeri[4]?.id_galeri}`}
                                  className="btn btn-sm btn-warning mr-1"
                                  style={{ borderRadius: "10px" }}>
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </NavLink>
                                <a
                                  className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                                  href>
                                  {galeri[4]?.user.name}
                                </a>
                                <a className="text-white" href>
                                  <small>
                                    {moment(galeri[4]?.updatedAt).format(
                                      "DD-MM-YYYY"
                                    )}
                                  </small>
                                </a>
                              </div>
                              <a
                                className="h6 m-0 text-white text-uppercase font-weight-semi-bold"
                                href>
                                {galeri[4]?.judul}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 mb-5">
                    <h5 className="mb-4 text-white text-uppercase font-weight-bold">
                      Galeri
                    </h5>
                    <div className="row">
                      <div className="col-4 mb-3">
                        <a href>
                          <img className="w-100" src={galeri[5]?.url} alt />
                          <div className="overlay">
                            <div className="mb-2">
                              <NavLink
                                to={`/galeri/edit/${galeri[5]?.id_galeri}`}
                                className="btn btn-sm btn-warning mr-1"
                                style={{ borderRadius: "10px" }}>
                                <i className="fa-solid fa-pen-to-square"></i>
                              </NavLink>
                              <a
                                className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                                href>
                                {galeri[5]?.user.name}
                              </a>
                              <a className="text-white" href>
                                <small>
                                  {moment(galeri[5]?.updatedAt).format(
                                    "DD-MM-YYYY"
                                  )}
                                </small>
                              </a>
                            </div>
                            <a
                              className="h6 m-0 text-white text-uppercase font-weight-semi-bold"
                              href>
                              {galeri[5]?.judul}
                            </a>
                          </div>
                        </a>
                      </div>
                      <div className="col-4 mb-3">
                        <a href>
                          <img className="w-100" src={galeri[6]?.url} alt />
                          <div className="overlay">
                            <div className="mb-2">
                              <NavLink
                                to={`/galeri/edit/${galeri[6]?.id_galeri}`}
                                className="btn btn-sm btn-warning mr-1"
                                style={{ borderRadius: "10px" }}>
                                <i className="fa-solid fa-pen-to-square"></i>
                              </NavLink>
                              <a
                                className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                                href>
                                {galeri[6]?.user.name}
                              </a>
                              <a className="text-white" href>
                                <small>
                                  {moment(galeri[6]?.updatedAt).format(
                                    "DD-MM-YYYY"
                                  )}
                                </small>
                              </a>
                            </div>
                            <a
                              className="h6 m-0 text-white text-uppercase font-weight-semi-bold"
                              href>
                              {galeri[6]?.judul}
                            </a>
                          </div>
                        </a>
                      </div>
                      <div className="col-4 mb-3">
                        <a href>
                          <img className="w-100" src={galeri[7]?.url} alt />
                          <div className="overlay">
                            <div className="mb-2">
                              <NavLink
                                to={`/galeri/edit/${galeri[7]?.id_galeri}`}
                                className="btn btn-sm btn-warning mr-1"
                                style={{ borderRadius: "10px" }}>
                                <i className="fa-solid fa-pen-to-square"></i>
                              </NavLink>
                              <a
                                className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                                href>
                                {galeri[7]?.user.name}
                              </a>
                              <a className="text-white" href>
                                <small>
                                  {moment(galeri[7]?.updatedAt).format(
                                    "DD-MM-YYYY"
                                  )}
                                </small>
                              </a>
                            </div>
                            <a
                              className="h6 m-0 text-white text-uppercase font-weight-semi-bold"
                              href>
                              {galeri[7]?.judul}
                            </a>
                          </div>
                        </a>
                      </div>
                      <div className="col-4 mb-3">
                        <a href>
                          <img className="w-100" src={galeri[8]?.url} alt />
                          <div className="overlay">
                            <div className="mb-2">
                              <NavLink
                                to={`/galeri/edit/${galeri[8]?.id_galeri}`}
                                className="btn btn-sm btn-warning mr-1"
                                style={{ borderRadius: "10px" }}>
                                <i className="fa-solid fa-pen-to-square"></i>
                              </NavLink>
                              <a
                                className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                                href>
                                {galeri[8]?.user.name}
                              </a>
                              <a className="text-white" href>
                                <small>
                                  {moment(galeri[8]?.updatedAt).format(
                                    "DD-MM-YYYY"
                                  )}
                                </small>
                              </a>
                            </div>
                            <a
                              className="h6 m-0 text-white text-uppercase font-weight-semi-bold"
                              href>
                              {galeri[8]?.judul}
                            </a>
                          </div>
                        </a>
                      </div>
                      <div className="col-4 mb-3">
                        <a href>
                          <img className="w-100" src={galeri[9]?.url} alt />
                          <div className="overlay">
                            <div className="mb-2">
                              <NavLink
                                to={`/galeri/edit/${galeri[9]?.id_galeri}`}
                                className="btn btn-sm btn-warning mr-1"
                                style={{ borderRadius: "10px" }}>
                                <i className="fa-solid fa-pen-to-square"></i>
                              </NavLink>
                              <a
                                className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                                href>
                                {galeri[9]?.user.name}
                              </a>
                              <a className="text-white" href>
                                <small>
                                  {moment(galeri[9]?.updatedAt).format(
                                    "DD-MM-YYYY"
                                  )}
                                </small>
                              </a>
                            </div>
                            <a
                              className="h6 m-0 text-white text-uppercase font-weight-semi-bold"
                              href>
                              {galeri[9]?.judul}
                            </a>
                          </div>
                        </a>
                      </div>
                      <div className="col-4 mb-3">
                        <a href>
                          <img className="w-100" src={galeri[10]?.url} alt />
                          <div className="overlay">
                            <div className="mb-2">
                              <NavLink
                                to={`/galeri/edit/${galeri[10]?.id_galeri}`}
                                className="btn btn-sm btn-warning mr-1"
                                style={{ borderRadius: "10px" }}>
                                <i className="fa-solid fa-pen-to-square"></i>
                              </NavLink>
                              <a
                                className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                                href>
                                {galeri[10]?.user.name}
                              </a>
                              <a className="text-white" href>
                                <small>
                                  {moment(galeri[10]?.updatedAt).format(
                                    "DD-MM-YYYY"
                                  )}
                                </small>
                              </a>
                            </div>
                            <a
                              className="h6 m-0 text-white text-uppercase font-weight-semi-bold"
                              href>
                              {galeri[10]?.judul}
                            </a>
                          </div>
                        </a>
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

export default GaleriList;
