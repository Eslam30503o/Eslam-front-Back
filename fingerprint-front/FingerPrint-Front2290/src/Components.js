
import styled, { createGlobalStyle } from "styled-components"
import { motion } from "framer-motion"

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    background: linear-gradient(135deg, #1b2a49 0%, #2c3e50 100%);
    background-attachment: fixed;
    color: #333;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`

export const Container = styled(motion.div)`
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 1100px;
  max-width: 100%;
  min-height: 650px;
  perspective: 1200px;
  transform-style: preserve-3d;
`

Container.defaultProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
}

export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${(props) =>
    props.signinIn !== true
      ? `transform: translateX(100%); opacity: 1; z-index: 5;`
      : null}
`

export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) =>
    props.signinIn !== true ? `transform: translateX(100%);` : null}
`

export const Form = styled.form`
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`

export const Title = styled.h1`
  font-weight: 700;
  margin: 0 0 20px 0;
  color: ${({ theme, inOverlay }) => (inOverlay ? "#fff" : theme.title)};
  font-size: 28px;
`

export const InputGroup = styled.div`
  position: relative;
  width: 100%;
  margin: 10px 0;
`

export const InputIcon = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
`

export const Input = styled.input`
  background-color: ${({ theme }) => theme.inputBackground};
  border: 1px solid #e0e0e0;
  padding: 15px 15px 15px 45px;
  margin: 5px 0;
  width: 100%;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
    background-color: ${({ theme }) => theme.inputFocusBackground};
    border: 1px solid ${({ theme }) => theme.inputFocusBorder};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:focus + ${InputIcon} {
    color: ${({ theme }) => theme.inputFocusBorder};
  }
`

export const ForgotPassword = styled.a`
  color: #888;
  font-size: 13px;
  text-decoration: none;
  margin: 15px 0;
  align-self: flex-end;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.link};
    text-decoration: underline;
  }
`

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.error};
  font-size: 14px;
  margin: 10px 0;
  background-color: rgba(231, 76, 60, 0.1);
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  text-align: center;
`

export const Button = styled.button`
  border-radius: 30px;
  background-color: ${({ theme }) => theme.button};
  color: ${({ theme }) => theme.buttonText};
  font-size: 14px;
  font-weight: bold;
  padding: 14px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  margin-top: 20px;
  width: 80%;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
    background-color: ${({ theme }) => theme.buttonActive};
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

export const GhostButton = styled(Button)`
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    color: #fff;
  }
`

export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;

  ${({ signinIn }) =>
    signinIn !== true
      ? `transform: translateX(-100%);`
      : ""}
`

export const Overlay = styled.div`
  background: linear-gradient(135deg, #1b2a49 0%, #2c3e50 100%);
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;

  ${({ signinIn }) =>
    signinIn !== true
      ? `transform: translateX(50%);`
      : ""}
`

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`

export const LeftOverlayPanel = styled(OverlayPanel)`
  ${({ signinIn }) =>
    signinIn !== true
      ? `transform: translateX(0);`
      : `transform: translateX(-20%);`}
`

export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  ${({ signinIn }) =>
    signinIn !== true
      ? `transform: translateX(20%);`
      : `transform: translateX(0);`}
`

export const Paragraph = styled.p`
  font-size: 15px;
  font-weight: 300;
  line-height: 1.6;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
  max-width: 90%;
`
