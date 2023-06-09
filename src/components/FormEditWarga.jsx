import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, NavLink } from "react-router-dom";

const FormEditWarga = () => {
  const [nama_lengkap, setNama] = useState("");
  const [nik, setNik] = useState("");
  const [kelamin, setKelamin] = useState("");
  const [alamat, setAlamat] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getWargaById = async () => {
      try {
        const response = await axios.get(
          `http://13.229.115.11:5000/warga/${id}`
        );
        setNama(response.data.nama_lengkap);
        setNik(response.data.nik);
        setKelamin(response.data.kelamin);
        setAlamat(response.data.alamat);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getWargaById();
  }, [id]);

  const updateWarga = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://13.229.115.11:5000/warga/${id}`, {
        nama_lengkap: nama_lengkap,
        nik: nik,
        kelamin: kelamin,
        alamat: alamat,
      });
      alert("Data berhasil diubah");
      navigate("/warga");
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
                <h1 className="m-0">Warga Desa</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <NavLink to={"/dashboard"}>Home</NavLink>
                  </li>
                  <li className="breadcrumb-item">
                    <NavLink to={"/warga"}>Warga</NavLink>
                  </li>
                  <li className="breadcrumb-item active">Edit Warga</li>
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
                    <h3 className="card-title">Form Edit Warga</h3>
                  </div>
                  {/* /.card-header */}
                  {/* form start */}
                  <form onSubmit={updateWarga} className="form-horizontal">
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
                          Nama Lengkap
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Nama Lengkap"
                            value={nama_lengkap}
                            onChange={(e) => setNama(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">NIK</label>
                        <div className="col-sm-10">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Masukkan Nomor Induk Kependudukan"
                            value={nik}
                            onChange={(e) => setNik(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Jenis Kelamin
                        </label>
                        <div className="col-sm-10">
                          <select
                            class="form-control"
                            value={kelamin}
                            onChange={(e) => setKelamin(e.target.value)}>
                            <option value={""}>--Pilih Jenis Kelamin--</option>
                            <option value="Laki - laki">Laki - laki</option>
                            <option value="Perempuan">Perempuan</option>
                          </select>
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
                            placeholder="Masukkan Alamat"
                            value={alamat}
                            onChange={(e) => setAlamat(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                      <NavLink to={"/warga"} className="btn btn-danger">
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

export default FormEditWarga;
