import { useRef, useState, useContext } from "react"
import { Button } from "react-bootstrap"
import { GoogleLogo } from "../../assets/icons"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../../contexts/UserContext"

import "./SignIn.scss"

export default function SignIn() {
  const navigate = useNavigate()
  const floatingLabalRef = useRef<HTMLSpanElement>(null)
  const emailInputRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [email, setEmail] = useState<any>("")
  const { userInfo, setUserInfo } = useContext<any>(UserContext)

  const handleInputChange = (e: any) => {
    const value = e.target.value
    setEmail(value)
    if (value) {
      if (!floatingLabalRef.current) return
      floatingLabalRef.current.classList.add("valid")
      if (!emailInputRef.current) return
      emailInputRef.current.classList.remove("invalid")
    } else {
      if (!floatingLabalRef.current) return
      floatingLabalRef.current.classList.remove("valid")
    }
  }

  const handleNext = () => {
    if (!email) {
      if (!emailInputRef.current) return
      emailInputRef.current.classList.add("invalid")
      if (!inputRef.current) return
      inputRef.current.focus()
      return
    } else {
      if (!emailInputRef.current) return
      emailInputRef.current.classList.remove("invalid")
    }
    setUserInfo((prev: any) => ({ ...prev, email: email }))
    navigate("/password")
  }

  return (
    <div className="page-signIn d-flex align-items-center justify-content-center">
      <div className="signIn-section d-flex flex-column align-items-center">
        <GoogleLogo />
        <div className="main-section w-100">
          <div className="heading d-flex flex-column align-items-center">
            <span className="heading-text">Sign in</span>
            <span className="heading-sub-text">Use your Google Account</span>
          </div>

          <div className="form">
            <div className="email-input" ref={emailInputRef}>
              <input
                type="email"
                placeholder=""
                ref={inputRef}
                className="form-control"
                value={email}
                onChange={(e: any) => handleInputChange(e)}
                spellCheck={false}
              />
              <span className="place" ref={floatingLabalRef}>
                Email or phone
              </span>
              <span className="d-flex align-items-center enter-email d-none">
                <svg
                  aria-hidden="true"
                  className="me-2"
                  fill="#d93025"
                  focusable="false"
                  width="16px"
                  height="16px"
                  viewBox="0 0 24 24"
                  xmlns="https://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                </svg>
                Enter an email or phone number
              </span>
            </div>

            <div className="forgot-password">
              <Button variant="link" className="text-decoration-none">
                Forgot email?
              </Button>
            </div>

            <div className="learn-more">
              <p>Not your computer? Use Guest mode to sign in privately.</p>
              <Button
                variant="link"
                target="_self"
                href="https://support.google.com/chrome/answer/6130773?hl=en"
                className="text-decoration-none"
              >
                Learn more
              </Button>
            </div>

            <div className="create-account d-flex justify-content-between">
              <Button
                variant="link"
                className="text-decoration-none btn-create"
              >
                Create account
              </Button>
              <Button
                variant="primary"
                className="text-decoration-none btn-next"
                onClick={() => handleNext()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
        <footer className="position-absolute d-flex justify-content-between w-100">
          <div className="language-select">English (United States)</div>
          <div className="links">
            <Link
              to="https://support.google.com/accounts?hl=en&amp;p=account_iph"
              target="_blank"
              className="text-decoration-none"
            >
              Help
            </Link>
            <Link
              to="https://accounts.google.com/TOS?loc=RU&amp;hl=en&amp;privacy=true"
              target="_blank"
              className="text-decoration-none"
            >
              Privacy
            </Link>
            <Link
              to="https://accounts.google.com/TOS?loc=RU&amp;hl=en"
              target="_blank"
              className="text-decoration-none"
            >
              Terms
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}
