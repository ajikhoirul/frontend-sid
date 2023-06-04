import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { NavLink, Link } from "react-router-dom";
import "./galeri/style.css";

const CompVideo = () => {
  const [video, setVideo] = useState([]);

  useEffect(() => {
    getVideo();
  }, []);

  const getVideo = async () => {
    const response = await axios.get("http://localhost:5000/video");
    setVideo(response.data);
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
                <h1 className="m-0">Video</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <NavLink to={"/dashboard"}>Home</NavLink>
                  </li>
                  <li className="breadcrumb-item active">Video</li>
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
                          List Video
                        </h4>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="position-relative mb-3">
                        <iframe
                          width="560"
                          height="500"
                          className="img-fluid w-100 h-100"
                          style={{ objectFit: "cover", height: "500px" }}
                          src={video[0]?.url}
                          title="YouTube video player"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          webkitallowfullscreen
                          mozallowfullscreen
                          allowfullscreen></iframe>
                        <div className="bg-white border border-top-0 p-4">
                          <div className="mb-2">
                            <a
                              className="badge badge-danger text-uppercase font-weight-semi-bold p-2 mr-2"
                              href>
                              {video[0]?.sumber}
                            </a>
                            <a className="text-body" href>
                              <small>
                                {moment(video[0]?.createdAt).format(
                                  "DD-MM-YYYY HH:mm:ss"
                                )}
                              </small>
                            </a>
                            <Link
                              to={`edit/${video[0]?.id_video}`}
                              className="btn btn-sm btn-primary mr-2 float-right">
                              <i className="fa-solid fa-pen-to-square"></i>
                            </Link>
                          </div>
                          <a
                            className="h4 d-block mb-0 text-secondary text-uppercase font-weight-bold"
                            href>
                            {video[0]?.judul}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="position-relative mb-3">
                        <iframe
                          className="img-fluid w-100 h-100"
                          style={{ objectFit: "cover" }}
                          width="364"
                          height="500"
                          src={video[1]?.url}
                          title="YouTube video player"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen></iframe>
                        <div className="bg-white border border-top-0 p-4">
                          <div className="mb-2">
                            <a
                              className="badge badge-danger text-uppercase font-weight-semi-bold p-2 mr-2"
                              href>
                              {video[1]?.sumber}
                            </a>
                            <a className="text-body" href>
                              <small>
                                {moment(video[1]?.createdAt).format(
                                  "DD-MM-YYYY HH:mm:ss"
                                )}
                              </small>
                            </a>
                            <Link
                              to={`edit/${video[1]?.id_video}`}
                              className="btn btn-sm btn-primary mr-2 float-right">
                              <i className="fa-solid fa-pen-to-square"></i>
                            </Link>
                          </div>
                          <a
                            className="h4 d-block mb-0 text-secondary text-uppercase font-weight-bold"
                            href>
                            {video[1]?.judul}
                          </a>
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

export default CompVideo;
