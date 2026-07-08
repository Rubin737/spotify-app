import { Button } from '@/components/ui/button';
import { useSignIn } from '@clerk/react'

const SignInOAuthButton = () => {
  const {signIn}=useSignIn();
  if(!signIn) return null
  const signInWithGoogle=()=>{
    signIn.sso({
      strategy:"oauth_google",
      redirectCallbackUrl:"/sso-callback",
      redirectUrl: "/auth-callback",    
    })
  }
  return (
    <div>
      <Button variant='ghost' className='p-2 bg-green-800 text-xs lg:text-sm cursor-pointer' onClick={signInWithGoogle}>Signin with Google</Button>
    </div>
  )
}

export default SignInOAuthButton