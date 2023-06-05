import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, NavLink } from "react-router-dom";

const FormEditProfilDesa = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [notelp, setNoTelp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProfilById = async () => {
      try {
        const response = await axios.get(
          `http://13.229.115.11:5000/profil-desa/${id}`
        );
        setNama(response.data.nama_desa);
        setEmail(response.data.email);
        setAlamat(response.data.alamat);
        setNoTelp(response.data.notelp);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProfilById();
  }, [id]);

  const updateProfil = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://13.229.115.11:5000/profil-desa/${id}`, {
        nama_desa: nama,
        email: email,
        alamat: alamat,
        notelp: notelp,
      });
      alert("Data berhasil diubah");
      navigate("/profil-desa");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
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
                  <li className="breadcrumb-item">
                    <NavLink to={"/profil-desa"}>Profil Desa</NavLink>
                  </li>
                  <li className="breadcrumb-item active">Edit Profil Desa</li>
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
              <div className="col-12">
                {/* /.card */}
                {/* Horizontal Form */}
                <div className="card card-info">
                  <div className="card-header">
                    <h3 className="card-title">Form Edit Profil Desa</h3>
                  </div>
                  {/* /.card-header */}
                  {/* form start */}
                  <form onSubmit={updateProfil} className="form-horizontal">
                    <div className="card-body">
                      {msg && (
                        <div className="alert alert-danger mt-2" role="alert">
                          <ul className="list-unstyled mb-0">
                            <li>{msg}</li>
                          </ul>
                        </div>
                      )}
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Nama Desa
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Nama Desa..."
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Masukkan Email Desa..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Nomor Telepon
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Nomor Telepon Desa..."
                            value={notelp}
                            onChange={(e) => setNoTelp(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Alamat
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Alamat Desa..."
                            value={alamat}
                            onChange={(e) => setAlamat(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                      <NavLink to={"/profil-desa"} className="btn btn-danger">
                        Kembali
                      </NavLink>
                      <button
                        type="submit"
                        className="btn btn-info float-right">
                        Edit
                      </button>
                    </div>
                    {/* /.card-footer */}
                  </form>
                </div>
                {/* /.card */}

                {/* /.card */}
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

export default FormEditProfilDesa;
