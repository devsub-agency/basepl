import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

const Home = () => {
  return (
    <div className="flex flex-col justify-center mx-auto max-w-screen-xl sm:px-8 h-screen">
      <div className="flex flex-col z-10 gap-6 w-3/5 px-4 sm:px-10 sm:text-center mx-auto pb-40">
        <h1 className="text-6xl font-medium leading-[1.125] tracking-tight">
          Create applications in seconds with ease
        </h1>
        <p className="text-lg text-muted-foreground">
          Awesome out of the box fields, blocks, components and plugins for payload cms. Bootstrap
          your next project in seconds with ease.
        </p>
        <div className="flex gap-4 mx-auto">
          <Link href="/blog">
            <Button variant="outline" className="bg-transparent border-muted-foreground">
              Learn more
            </Button>
          </Link>
          <Link href="/#newsletter">
            <Button variant="default">Support us</Button>
          </Link>
        </div>
      </div>
      <Image
        src="/bg-pattern.png"
        alt="logo"
        width={1000}
        height={1000}
        className="absolute left-0 top-0 h-full w-full object-cover opacity-80 dark:opacity-20 z-0"
      />
    </div>
  )
}

export default Home
