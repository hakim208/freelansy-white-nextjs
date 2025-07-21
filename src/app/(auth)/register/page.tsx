"use client"
import ProtectedRoute from '@/components/protectedRoute/protectedRoute';
import Image from 'next/image';
import styled from 'styled-components';
import ImgRegister from './img/customerTwo.webp'
import Form from './components/register';
import { useState } from 'react';

const Register = () => {
    const [role, setRole] = useState("")

    return (
        <ProtectedRoute>
            <div className=''>
                {
                    !role && (
                        <div className="flex gap-10 justify-center items-center mt-8">
                            <div onClick={() => setRole("client")}>
                                <StyledWrapper>
                                    <div className="flip-card">
                                        <div className="flip-card-inner">
                                            <div className="flip-card-front">
                                                <p className="title">Войдите в мир как клиент</p>
                                            </div>
                                            <div className="flip-card-back">
                                                <p className="title">Войдите в мир как клиент и получайте высококлассные услуги от опытных профессионалов, которые ценят ваше время и результат.</p>
                                            </div>
                                        </div>
                                    </div>
                                </StyledWrapper>
                            </div>
                            <div onClick={() => setRole("freelancer")}>
                                <StyledWrapper>
                                    <div className="flip-card">
                                        <div className="flip-card-inner">
                                            <div className="flip-card-front">
                                                <p className="title">Работайте свободно — как фрилансер</p>
                                            </div>
                                            <div className="flip-card-back">
                                                <p className="title">Работайте свободно и независимо — выбирайте проекты по душе, управляйте своим временем и развивайте карьеру фрилансера без ограничений.</p>
                                            </div>
                                        </div>
                                    </div>
                                </StyledWrapper>
                            </div>
                        </div>
                    )
                }
                {
                    role &&
                    <div>
                        <div className='flex items-center justify-between '>
                            <div className='w-[40%] flex flex-col items-center mt-[7%] '>
                                <Form roleUser={role} />
                            </div>
                            <div className='w-[50%] flex flex-col items-center gap-[30px] '>
                                <h1>Freelansy</h1>
                                <Image src={ImgRegister} width={0} height={0} alt='photo' />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </ProtectedRoute>
    )
}

const StyledWrapper = styled.div`
  .flip-card {
    background-color: transparent;
    width: 400px;
    height: 80vh;
    perspective: 1000px;
    font-family: sans-serif;
  }

  .title {
    font-size: 1.5em;
    font-weight: 900;
    text-align: center;
    margin: 0;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front, .flip-card-back {
    box-shadow: 0 8px 14px 0 rgba(0,0,0,0.2);
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border: 1px solid coral;
    border-radius: 1rem;
  }

  .flip-card-front {
    background: linear-gradient(120deg, bisque 60%, rgb(255, 231, 222) 88%,
       rgb(255, 211, 195) 40%, rgba(255, 127, 80, 0.603) 48%);
    color: coral;
  }

  .flip-card-back {
    background: linear-gradient(120deg, rgb(255, 174, 145) 30%, coral 88%,
       bisque 40%, rgb(255, 185, 160) 78%);
    color: white;
    transform: rotateY(180deg);
  }`;

export default Register
