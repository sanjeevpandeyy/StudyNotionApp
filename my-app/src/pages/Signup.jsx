import Tamplete from "../components/core/auth/Tamplete";

const Signup=(setloggedin)=>{
  return(
    <div>
    <Tamplete
      title="Join the millions learning to code with StudyNotion for free"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      formtype="signup"
      setloggedin={setloggedin}
    />
    </div>
  )
}
export default Signup;