import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../componets/AuthContext'; 
import '../../style/login.css';
import TextField from '@mui/material/TextField';
import 'animate.css';

const Login = () => {
  const { register, reset, handleSubmit, formState: { errors } } = useForm();
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = data => {
    const { email, password } = data;
    if (email === 'muskan228@gmail.com' && password === 'pankaj@123') {
      login('your-auth-token'); 
      navigate('/home');
    } else {
      alert('Invalid credentials');
    }
    reset();
  };

  return (
    <Container fluid className='bg-light'>
      <Row>
        <Col lg={12} md={12} className='mt-lg-5 d-flex justify-content-center p-2' style={{ height: '93vh' }}>
          <div className="form-login p-5 d-flex justify-content-center" style={{ height: '100vh', maxHeight: '600px' }}>
            <div className="login w-100 p-0 me-5">
              <h2 className='text-center text-white animate__animated animate__bounce'>SignIn</h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formEmail">
                  <TextField 
                    id="outlined-basic"
                    className='login-input text-white w-100'
                    label="Email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
                </Form.Group>

                <Form.Group className='mt-4 d-flex flex-column' controlId="formPassword">
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    className='login-input text-white'
                    autoComplete="current-password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 8, message: 'Password must be at least 8 characters' },
                      maxLength: { value: 16, message: 'Password must be at most 16 characters' },
                    })}
                  />
                  {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
                </Form.Group>

                <div className='d-flex mt-3 justify-content-around align-items-center'>
                  <Button className='mt-3 px-4 fw-bold btn bg-none' type="submit">
                    SignIn
                  </Button>
                  <Button className='mt-3 px-4 fw-bold btn bg-none'>
                    <Link className='nav-link text-white p-0' to='/signup'>SignUp</Link>
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
