import Link from 'next/link'

export const BaseplLogo = () => {
  return (
    <Link href={'/'} className="flex gap-2 items-center">
      <svg
        width="107"
        height="196"
        viewBox="0 0 107 196"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-fit"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M102.5 194.972C104.5 196.127 107 194.684 107 192.374L107 76.963C107 74.6536 104.5 73.2103 102.5 74.365L74.0001 90.8194L74.0001 137.106C74.0001 138.646 72.3334 139.608 71.0001 138.838L30.9145 115.695L2.55096 132.071C0.550962 133.225 0.550962 136.112 2.55097 137.267L102.5 194.972Z"
          fill="#45B783"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 36.333C0 37.4048 0.5718 38.3952 1.5 38.9311L38.5499 60.3218C38.6277 60.3668 38.701 60.4156 38.7697 60.468L65.5691 75.9406C66.4973 76.4765 67.6409 76.4765 68.5691 75.9406L98.949 58.4007C100.282 57.6309 100.282 55.7064 98.949 54.9366L4.5 0.4064C2.5 -0.748301 0 0.695074 0 3.00448V36.333Z"
          fill="#5BD19B"
        />
      </svg>

      <span className="text-2xl font-semibold text-foreground whitespace-nowrap tracking-tighter">
        basepl
      </span>
      <span className="ml-4 text-muted-foreground">v0.1 &alpha;lpha</span>
    </Link>
  )
}
