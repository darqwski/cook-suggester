import React from "react";
import  './login.less'
import FormInput from "../../components/forms/FormInput";
import WithLabel from "../../components/forms/WitLabel";
import { loginUser } from "../../utils/api/login";
const LoginPage = () => {
  const onSubmit =async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { password: passwordElement, login: loginElement } = event.target as HTMLFormElement;
    const { value: login } = loginElement as HTMLInputElement
    const { value: password } = passwordElement as HTMLInputElement

    const [status, message] =await loginUser(login, password);

    if(status === 200){
      console.log("Logged in")
      location.href = '../'
    } else {
      console.log(message)
    }

  }
  return <div>
    <form className="login-container" onSubmit={onSubmit}>
      <h3>Login panel</h3>
      <WithLabel label="login">
        <input name="login"/>
      </WithLabel>
      <WithLabel label="password">
        <input name="password" type="password"/>
      </WithLabel>
      <div>
        <button className="btn btn-large" type="submit">Need account?</button>
        <button className="btn btn-large" type="submit">Login</button>
      </div>

    </form>
  </div>;
};

export default LoginPage;
