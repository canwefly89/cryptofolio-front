# ๐ฐ **CryptoFolio**

![Main]()

## ๐ &nbsp; What is CryptoFolio?

<br>

## ๐ &nbsp; Project Overview

 <!-- <img src="./README_assets/energyBattle_gif.gif" alt="EnergyBattle" width="70%" /> -->

<br>

## ๐ &nbsp; Github Repository

๐ &nbsp; [**Frontend** Repository](https://github.com/voice-game/front)

๐ &nbsp; [**Backend** Repository](https://github.com/voice-game/back)

<br>

---

<br>

## Project Description

๐ค &nbsp; [Motivation](#-Motivation)

๐ &nbsp; [Schedule](#-Schedule)

๐  &nbsp; [Tech Stack](#-TechStack)

๐ &nbsp; [Feature](#-Feature)

๐งโโ๏ธ &nbsp; [Challenge](#-Challenge)

โ๏ธ &nbsp; [History](#-Hisotry)

๐๐ปโโ๏ธ &nbsp; [Conclusion](#-Conclusion)

<br>

---

<br>

## Motivation

<br>

## Schedule

### **`2021.05.03~05.21 ์ด ์ ์๊ธฐ๊ฐ 19์ผ`**

### **`1์ฃผ์ฐจ` - ๊ธฐํ ๋จ๊ณ**

- ํ๋ก์ ํธ ์ฃผ์  ์ ์ 
- Mock-Up ์ ์
- DB-Schema ๋ฐ Redux State ๊ตฌ์กฐ ์ค๊ณ
- ๊ตฌํ ๊ฐ๋ฅ ์ฌ๋ถ ๊ฒํ 
- DB ์ฐ๊ฒฐ ๋ฐ ๋ผ์ฐํ ๊ธฐ์ด ์ค๊ณ

### **`2์ฃผ์ฐจ` - ๊ตฌํ ๋จ๊ณ**

**Front End**

- ๊ธฐ๋ฅ ๊ตฌํ

**Back End**

### **`3์ฃผ์ฐจ` - ๋ง๋ฌด๋ฆฌ ๋จ๊ณ**

- ๊ตฌํ ๋ง๋ฌด๋ฆฌ
- ๋ฆฌํฉํ ๋ง
  - ์ ์ฒด ์ฝ๋ ์ผ๊ด์ฑ ์ ์ง
  - Prop-types ์ถ๊ฐ
- ํ์คํธ ์ฝ๋ ์์ฑ
- ํ๋ก ํธ์๋, ๋ฐฑ์๋ ๋ฐฐํฌ
  - Netlify, AWS Elastic Beanstalk

<br>

## TechStack

| Stack                 | Remarks                                              |
| :-------------------- | :--------------------------------------------------- |
| ES2015+               | -                                                    |
| React                 | MERN-STACK ๊ธฐ๋ฐ ๊ตฌํ                                 |
| React-router-dom      | -                                                    |
| Redux-thunk           | Redux Store ๋น๋๊ธฐ ์์ (์๋ฒ์์ฒญ, ์ด๋ฏธ์ง ๋ก๋ฉ) ๊ด๋ฆฌ |
| Styled-components     | ๊ณตํต ์ปดํฌ๋ํธ ์ฌ์ฌ์ฉ์ฑ                               |
| Firebase              | Social Login ๊ตฌํ                                    |
| Socket.io-client      | ๋ฉํฐํ๋ ์ด๋ฅผ ์ํ ์ค์๊ฐ ํต์                         |
| Pusher-js             | ์ค์๊ฐ DB ๋ณํ ๊ตฌ๋                                  |
| Jest                  | React Component Test                                 |
| Enzyme                | React Component Test                                 |
| React-testing-library | TBD                                                  |
| Redux-logger          | TBD                                                  |

| Stack                | Remarks                       |
| :------------------- | :---------------------------- |
| NodeJS               | JavaScript Runtime์ผ๋ก npm    |
| Express              | JavaScript ์๋ฒ ์ ํ๋ฆฌ์ผ์ด์  |
| MongoDB              | MERN-STACK ๊ธฐ๋ฐ ๊ตฌํ          |
| Mongoose             | MongoDB JavaScript ODM        |
| JWT (JSON Web Token) | ํ ํฐ ๊ธฐ๋ฐ ์ธ์ฆ                |
| Soket.io             | ๋ฉํฐํ๋ ์ด๋ฅผ ์ํ ์ค์๊ฐ ํต์  |
| Pusher               | ์ค์๊ฐ DB ๋ณํ ์๋ฆผ           |
| Mocha                | ์๋ฒ ์๋ํฌ์ธํธ ํ์คํธ        |
| supertest            | ์๋ฒ ์๋ํฌ์ธํธ ํ์คํธ        |
| AWS                  | TBD                           |

<br>

## Feature

<br>

## Challenge

### **`Socket IO`**

Voice Game์์ socket ํต์ ์ด ํ์ํ ๋ถ๋ถ์ ์๋์ ๊ฐ์ต๋๋ค.

1. ๋ฐฉ ์ํด์ฅ ๊ด๋ จ ํต์  (join-room, leave-room)
2. ๊ฒ์ ์ค ์ ์  ์ ๋ณด ํต์  (start-game, player-input)

๋๋ถ๋ถ์ ๋์์ ์์ํ๊ฒ ๊ตฌํํ์ผ๋, `disconnect`๋ฅผ ์กฐ์ํ๋ ๊ณผ์ ์์ ์ด๋ ค์์ด ์์์ต๋๋ค. ์ ์ ๊ฐ ์๋์ ์ผ๋ก ๋ฐฉ์ ๋๊ฐ ๊ฒฝ์ฐ์๋ `useEffect`์์ ์ด๋ฒคํธ๋ฅผ emitํ์ฌ ํธ๋ค๋งํ  ์ ์์ผ๋ ์๋ก๊ณ ์นจ, ์ธํฐ๋ท ์ฐ๊ฒฐ ์ข๋ฃ ๋ฑ์ ํน์  ์ํฉ์์๋ socket์ ๊ธฐ๋ณธ์ ์ผ๋ก ๋ด์ฅ๋์ด์๋ `disconnect` ์ด๋ฒคํธ๊ฐ ์๋์ผ๋ก ์คํ๋๊ธฐ ๋๋ฌธ์ ์ฝ๋ฐฑํจ์์ ์ธ์๋ฅผ ์ ๋ฌํ๊ธฐ ์ด๋ ต๊ธฐ ๋๋ฌธ์๋๋ค.

์ธ์๋ฅผ ์ ๋ฌํ๋ ๊ฒ์ด ์ค์ํ๋ ์ด์ ๋, '๋๊ฐ ๋๊ฐ๋์ง'์ ๋ํ ์ ๋ณด๊ฐ ํ์ํ๊ธฐ ๋๋ฌธ์๋๋ค. ๋จ์ง socket์์ ๋๊ตฐ๊ฐ `disconnect`๋์๋ค๋ ์ฌ์ค์ ๊ทธ ์ํ๋ก๋ ํ์ธํ  ์ ์์์ผ๋ '๋ฐฉ์ฅ'์ด ๋๊ฐ ๊ฒฝ์ฐ์๋ ํน์ ํ ๋์์ ์ํํ  ํ์๊ฐ ์์์ต๋๋ค.

์ธ์ ์ ๋ฌ ์์ด๋ `disconnect` ๋์์ ์ฌ๋ฐ๋ฅด๊ฒ ์๋ํ๋๋ก ํ๊ธฐ ์ํด์๋ socket ๋ด๋ถ ๊ธฐ๋ฅ์ ๋ํ ๋ณด๋ค ๊น์ ์ดํด๊ฐ ํ์ํ์ต๋๋ค. ์์ธํ ํด๊ฒฐ ์ ์ฐจ๋ ์๋์ ๊ฐ์ต๋๋ค.

[๋ฐฉ์ฅ์ด ๋๊ฐ ์ฌ์ค์ ์ด๋ป๊ฒ ๊ฐ์งํ ๊น? - socket.io](https://www.notion.so/canwefly89/disconnect-leave-socket-io-950fbef3ed9a4c789f4e850af2dad3e7)

<br>

## History

<br>

## Conclusion

<br>

## Contact

### **`์์ฑ์ฃผ`** canwefly89@gmail.com
