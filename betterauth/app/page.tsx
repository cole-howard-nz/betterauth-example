import { Button } from "@/components/ui/button"
import Link from "next/link"

const Home = () => {
  return (
    <div className="fixed top-5 left-5 space-x-2">
      <Link href='/login'>
        <Button className="cursor-pointer" variant={'outline'}>
          Login
        </Button>
      </Link>

      <Link href='/sign-up'>
        <Button className="cursor-pointer" variant={'outline'}>
          Sign Up
        </Button>
      </Link>
    </div>
  )
}

export default Home