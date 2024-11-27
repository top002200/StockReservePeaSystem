import React, { useState } from 'react';

const Login: React.FC = () => {

    return (
        <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
            <div className="container py-5 h-100">
                <div className=" d-flex justify-content-center align-items-center h-100">
                    <div className="card rounded-5 text-black col-lg-6">
                        <div className="card-body p-md-5 mx-md-4">

                            <div className="text-center">
                                <img src="src/assets/logo/PEA Logo on Violet White Stroks.png" alt="PEA Logo" style={{ width: "200px", marginBottom: "10px" }} />
                            </div>

                            <form>
                                <div data-mdb-input-init className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form2Example11">เลขประจำตัวพนักงาน</label>
                                    <input type="email" id="form2Example11" className="form-control"
                                        placeholder="" />
                                </div>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form2Example22">รหัสผ่าน</label>
                                    <input type="password" id="form2Example22" className="form-control" />
                                </div>

                                <div className="text-center">
                                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button"
                                        style={{ border: "none" }}
                                    >เข้าสู่ระบบ</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
