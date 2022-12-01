import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUserAsync } from '../../redux/actions/authActions';

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(logoutUserAsync());
    navigate('/login');
  }, []);
  return (
    <div>LogOut</div>
  );
}
