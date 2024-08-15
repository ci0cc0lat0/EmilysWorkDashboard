import Link from "next/link";

export default function Sort_toggle({href,filterby}){

  return(
    <>

    <Link href={href} >
    Sorting by {filterby}
    </Link>
    </>
  )
}