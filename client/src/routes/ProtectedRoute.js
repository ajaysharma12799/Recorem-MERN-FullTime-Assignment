/* eslint-disable react/prop-types */
import React from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';

function PrivateRoute({ auth }) {
  const { isAuthenticated } = auth;

  if (!isAuthenticated) {
    return (
      <div className='container mx-auto w-full'>
        <h1 className="text-center text-2xl mb-10">You Are Not Authenticated To Create Article</h1>
        <Link to="/" className="cursor-pointer bg-[#3944f7] p-5 rounded-0 w-full mt-10 text-[#ffffff]">Go To Login Page</Link>
      </div>
    )
  }
  return (
    <div>
      { isAuthenticated ? <Outlet /> : <Navigate to="/" /> }
    </div>
  );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps)(PrivateRoute);