import { useRouter } from "next/router" 
export default function LoginWithProvider (){
  const router = useRouter()
  return <h1>Log in with provider {router.query.provider}</h1>
}
