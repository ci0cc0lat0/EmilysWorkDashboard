import Image from "next/image";
import s from "@/app/styles/page.module.css"
import Link from "next/link";
import { Poppins } from 'next/font/google'

const Poppins_font = Poppins({
  weight:['200','300','400','500','600','700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins'
})

function Grid_item({title,children,href="#"}){

  return(

    <Link href={href} className={s.fp_grid_item}>
            <div className={s.fp_item_wrapper}>
            <div className={s.fp_item_text}>
                <h1>{title}</h1>
                <hr></hr>
                <p>{children}</p>
              </div>
            </div>
          </Link>

  )
}

export default function Home() {
  return (
    <main className={s.main}>
      <div className={s.fp_wrapper}>
        <div className={`${s.fp_grid_container} ${Poppins_font.variable}`}>
          <Grid_item title="Docs" href="/docs">
            The collection of Documents written up and stored
          </Grid_item>
          <Grid_item title="Lists" href="/todo-list">
            List with actionable task that need to be referenced later. Some call these, todo list.
          </Grid_item>
          <Grid_item title="References">
            Site references and links for easy access
          </Grid_item>
          <Grid_item title="Site info">
            Site map, reason for this website, and about the creators
          </Grid_item>

        </div>
      </div>
      
    </main>
  );
}
