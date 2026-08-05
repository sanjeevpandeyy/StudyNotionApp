import Tamplete from "../components/core/auth/Tamplete";

const Login=({setloggedin})=>{
  return(
    <div>
    <Tamplete 
      title="Welcome Back"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      formtype="login"
      setloggedin={setloggedin}
    />
    </div>
  )
}
export default Login;
