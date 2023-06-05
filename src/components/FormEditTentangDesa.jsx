import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const FormEditTentangDesa = () => {
  const [tentang, setTentang] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const getTentangDesaById = async () => {
      try {
        const response = await axios.get(
          `http://13.229.115.11:5000/tentang-desa/${id}`
        );
        setTentang(response.data.tentang);
        setFile(response.data.gambar);
        setPreview(response.data.url);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getTentangDesaById();
  }, [id]);

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const updateTentangDesa = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tentang", tentang);
    try {
      await axios.patch(
        `http://13.229.115.11:5000/tentang-desa/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Data berhasil diubah");
      navigate("/tentang-desa");
    } catch (error) {
      console.log(error);
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
                <h1 className="m-0">Tentang Desa</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <NavLink to={"/dashboard"}>Home</NavLink>
                  </li>
                  <li className="breadcrumb-item">
                    <NavLink to={"/artikel"}>Tentang Desa</NavLink>
                  </li>
                  <li className="breadcrumb-item active">Edit Tentang Desa</li>
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
                    <h3 className="card-title">Form Edit Tentang Desa</h3>
                  </div>
                  {/* /.card-header */}
                  {/* form start */}
                  <form onSubmit={updateTentangDesa}>
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
                          Tentang Desa
                        </label>
                        <div className="col-sm-10">
                          <CKEditor
                            editor={ClassicEditor}
                            data={tentang}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setTentang(data);
                            }}
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Gambar
                        </label>
                        <div className="input-group col-sm-10">
                          <div className="custom-file">
                            <input
                              id="gambar"
                              type="file"
                              className="custom-file-input"
                              onChange={loadImage}
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="gambar">
                              Pilih sebuah gambar...
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Preview
                        </label>
                        <div className="input-group col-sm-10">
                          {preview ? (
                            <figure className="image">
                              <img
                                src={preview}
                                alt="Preview Image"
                                width="200"
                                height="200"
                              />
                            </figure>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      <div className="form-group">
                        <button
                          type="submit"
                          className="btn btn-success float-right">
                          Edit
                        </button>
                        <NavLink
                          to={"/tentang-desa"}
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

export default FormEditTentangDesa;
