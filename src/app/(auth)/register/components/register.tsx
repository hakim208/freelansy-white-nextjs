"use client"
import React, { FormEvent } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import { emailAtom, firstNameAtom, passwordAtom, roleAtom, surNameAtom } from '@/store/registerSlice';
import axios from 'axios';
import { useAtom } from 'jotai';

interface FormProps {
    roleUser: string;
}

const Form: React.FC<FormProps> = ({ roleUser }) => {

    const [email, setEmail] = useAtom(emailAtom);
    const [password, setpassword] = useAtom(passwordAtom)
    const [name, setname] = useAtom(firstNameAtom)
    const [surname, setsurname] = useAtom(surNameAtom)

    const router = useRouter()

    const goToAbout = () => {
        router.push('/login');
    };

    const registerUser = async () => {
        if (name.length > 0 && password.length > 3 && surname.length > 0 && email.length > 0) {
            try {
                const newUser = {
                    name,
                    surname,
                    email,
                    password,
                    roleUser,
                    createdAt: new Date().toISOString(),
                    orders:[]
                }

                await axios.post("https://43baa55b08d805d5.mokky.dev/user", newUser)
                goToAbout()
                toast.success('Регистрация прошла успешно!')
            } catch (error) {
                toast.error('Такой пользователь уже существует!')
                console.error(error);
            }
        }
        else {
            toast.error('Пополните карточк!')
        }
    }

    return (
        <StyledWrapper>
            <Toaster/>
            <div className='form'>
                <p className="title">Register </p>
                <p className="message">Signup now and get full access to our app.</p>

                <div className="flex">
                    <label htmlFor="firstname">
                        <input
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                            id="firstname"
                            name="firstname"
                            required
                            placeholder=" "
                            type="text"
                            className="input"
                        />
                        <span>Firstname</span>
                    </label>

                    <label htmlFor="lastname">
                        <input
                            value={surname}
                            onChange={(e) => setsurname(e.target.value)}
                            id="lastname"
                            name="lastname"
                            required
                            placeholder=" "
                            type="text"
                            className="input"
                        />
                        <span>Lastname</span>
                    </label>
                </div>

                <label htmlFor="email">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        name="email"
                        required
                        placeholder=" "
                        type="email"
                        className="input"
                    />
                    <span>Email</span>
                </label>

                <label htmlFor="password">
                    <input
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        id="password"
                        name="password"
                        required
                        placeholder=" "
                        type="password"
                        className="input"
                    />
                    <span>Password</span>
                </label>

                <label htmlFor="confirmPassword">
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        placeholder=" "
                        type="password"
                        className="input"
                    />
                    <span>Confirm password</span>
                </label>

                <button className="submit" onClick={registerUser} >Submit</button>
                <p className="signin">
                    Already have an account? <a href="/login">Signin</a>
                </p>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  /* Ваш CSS из предыдущего примера */
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 350px;
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    position: relative;
  }

  .title {
    font-size: 28px;
    color: royalblue;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
  }

  .title::before,
  .title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: royalblue;
  }

  .title::before {
    width: 18px;
    height: 18px;
    background-color: royalblue;
  }

  .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }

  .message,
  .signin {
    color: rgba(88, 87, 87, 0.822);
    font-size: 14px;
  }

  .signin {
    text-align: center;
  }

  .signin a {
    color: royalblue;
  }

  .signin a:hover {
    text-decoration: underline royalblue;
  }

  .flex {
    display: flex;
    width: 100%;
    gap: 6px;
  }

  .form label {
    position: relative;
    flex: 1;
  }

  .form label .input {
    width: 100%;
    padding: 10px 10px 20px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }

  .form label .input + span {
    position: absolute;
    left: 10px;
    top: 15px;
    color: grey;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .form label .input:placeholder-shown + span {
    top: 15px;
    font-size: 0.9em;
  }

  .form label .input:focus + span,
  .form label .input:valid + span {
    top: 30px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .form label .input:valid + span {
    color: green;
  }

  .submit {
    border: none;
    outline: none;
    background-color: royalblue;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transition: 0.3s ease;
    cursor: pointer;
  }

  .submit:hover {
    background-color: rgb(56, 90, 194);
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }
`;

export default Form;