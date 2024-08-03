'use client'
import { useState } from "react";
import FetchTitles from "./FetchTitles";


export default function SimpleButton(){
    const [sortby, setSortby] = useState("ASC")
    function changeSortBy(){
        setSortby(sortby === 'ASC' ? 'DESC' : 'ASC')
    }

    return (
        <>
            <button onClick={changeSortBy}>Sorting by: {sortby}</button>
        </>
    )
}