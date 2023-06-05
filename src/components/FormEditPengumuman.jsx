import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const FormEditPengumuman = () => {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getPengumumanById = async () => {
      try {
        const response = await axios.get(
          `http://13.229.115.11:5000/pengumuman/${id}`
        );
        setJudul(response.data.judul);
        setIsi(response.data.isi);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getPengumumanById();
  }, [id]);

  const updatePengumuman = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://13.229.115.11:5000/pengumuman/${id}`, {
        judul: judul,
        isi: isi,
      });
      alert("Data berhasil diubah!");
      navigate("/pengumuman");
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
                <h1 className="m-0">Pengumuman</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <NavLink to={"/dashboard"}>Home</NavLink>
                  </li>
                  <li className="breadcrumb-item">
                    <NavLink to={"/pengumuman"}>Pengumuman</NavLink>
                  </li>
                  <li className="breadcrumb-item active">Edit Pengumuman</li>
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
                    <h3 className="card-title">Form Tambah Pengumuman</h3>
                  </div>
                  {/* /.card-header */}
                  {/* form start */}
                  <form onSubmit={updatePengumuman}>
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
                          Judul Pengumuman
                        </label>

                        <div className="col-sm-10">
                          {" "}
                          <input
                            id="judul"
                            type="text"
                            className="form-control"
                            value={judul}
                            onChange={(e) => setJudul(e.target.value)}
                            placeholder="Masukkan Judul Pengumuman"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Isi Pengumuman
                        </label>
                        <div className="col-sm-10">
                          <CKEditor
                            editor={ClassicEditor}
                            data={isi}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setIsi(data);
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <button
                          type="submit"
                          className="btn btn-success float-right">
                          Edit
                        </button>
                        <NavLink
                          to={"/pengumuman"}
                          className="btn btn-danger float-right mr-2">
                          Kembali
                        </NavLink>
                      </div>
                    </div>
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

export default FormEditPengumuman;
