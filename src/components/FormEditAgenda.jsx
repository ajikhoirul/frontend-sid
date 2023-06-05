import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, NavLink } from "react-router-dom";

const FormEditAgenda = () => {
  const [judul, setJudul] = useState("");
  const [waktu, setWaktu] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getAgendaById = async () => {
      try {
        const response = await axios.get(
          `http://13.229.115.11:5000/agenda/${id}`
        );
        setJudul(response.data.judul);
        setWaktu(response.data.waktu);
        setLokasi(response.data.lokasi);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getAgendaById();
  }, [id]);

  const updateAgenda = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://13.229.115.11:5000/agenda/${id}`, {
        judul: judul,
        waktu: waktu,
        lokasi: lokasi,
      });
      alert("Data berhasil diubah!");
      navigate("/agenda");
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
                <h1 className="m-0">Agenda Desa</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <NavLink to={"/dashboard"}>Home</NavLink>
                  </li>
                  <li className="breadcrumb-item">
                    <NavLink to={"/agenda"}>Agenda</NavLink>
                  </li>
                  <li className="breadcrumb-item active">Edit Agenda</li>
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
                    <h3 className="card-title">Form Edit Agenda</h3>
                  </div>
                  {/* /.card-header */}
                  {/* form start */}
                  <form onSubmit={updateAgenda} className="form-horizontal">
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
                          Nama Agenda
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Nama Agenda..."
                            value={judul}
                            onChange={(e) => setJudul(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Waktu Agenda
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Waktu Agenda..."
                            value={waktu}
                            onChange={(e) => setWaktu(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Lokasi Agenda
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Lokasi Agenda..."
                            value={lokasi}
                            onChange={(e) => setLokasi(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                      <NavLink to={"/agenda"} className="btn btn-danger">
                        Kembali
                      </NavLink>
                      <button
                        type="submit"
                        className="btn btn-info float-right">
                        Simpan
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

export default FormEditAgenda;
