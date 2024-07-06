import { useRouter } from "next/router" 
export default function SignWithProvider (){
  const router = useRouter()
  return <h1>Signup with provider {router.query.provider}</h1>
}
