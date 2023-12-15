"use client"

import {useQueryClient} from "@tanstack/react-query"

export const DeatailsModule =()=>{

    const queryClient = useQueryClient()

    const userData = queryClient.getQueryData(["users"])
    console.log("usedata",userData) 

    return <div>  DEatisl  </div>
}