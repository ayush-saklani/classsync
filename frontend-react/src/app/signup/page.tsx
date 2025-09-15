'use client';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { validateEmail } from '@/utils/validation';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function LoginPage() {

  return (
    <>
      <body>
        <title>Class-Sync | Sign up</title>

        <div className="container p-5 signupbox shadow-lg">
          <div className="row">
            <div className="col-md-6">
              <img src="/image/logo.png" className="h-16 d-inline-block align-text-top " />
              <h1 className="heading-text mt-4">Sign up</h1>
              <h4 className="text my-3">Create an account</h4>
            </div>

            <div className="col-lg-6">
              <form className="mt-4 mb-2">
                <div className="mb-3 row">
                  <div className="col-6">
                    <label htmlFor="signup_firstname" className="form-label heading-text h5">First name</label>
                    <input type="text" className="form-control text" placeholder="Mohan" id="signup_firstname" />
                  </div>
                  <div className="col-6">
                    <label htmlFor="signup_lastname" className="form-label heading-text h5">Last name</label>
                    <input type="text" className="form-control text" placeholder="Motorwala"
                      id="signup_lastname" />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="signup_email" className="form-label heading-text h5">Email address</label>
                  <input type="email" className="form-control text"
                    placeholder="fabulouslightningmcqueen@gehu.ac.in" id="signup_email" />
                  <div className="form-text text">We'll never share your email with anyone else.🤞🏼</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="signup_InputPassword" className="form-label heading-text h5">Password</label>
                  <input type="password" className="form-control" id="signup_InputPassword" />
                </div>
                <div className="mb-2">
                  <label htmlFor="signup_InputPassword_confirm" className="form-label heading-text h5">Confirm
                    Password</label>
                  <input type="password" className="form-control" id="signup_InputPassword_confirm" />
                </div>
                <div className="my-2">
                  <label className="text-danger text fw-bold" id="signup_error"></label>
                </div>
                <button type="submit" className="button" id="signup">
                  <div className="button-top-blue h5"><b>Sign up</b></div>
                  <div className="button-bottom-blue"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}