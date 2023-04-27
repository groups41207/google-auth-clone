import { createContext, useState, useEffect } from "react"

export const UserContext = createContext({})

export default function UserContextProvider(props: any) {
  const [userInfo, setUserInfo] = useState<any>({})

  useEffect(() => {
    console.log(userInfo, "userInfo");
  }, [userInfo])

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
