'use client'
import { getStockBySlug } from "@/actions"
import { titleFont } from "@/config/fonts"
import { useEffect, useState } from "react"

interface StockLabelProps {
    slug: string
}
export const StockLabel = ({ slug }: StockLabelProps) => {

    const [Stock, setStock] = useState(0);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        getStock()
    }, [])

    const getStock = async () => {

        const stock = await getStockBySlug(slug)
        console.log('stock ' + stock)
        setStock(stock)
        setIsLoading(false)
    }

    return (

        <>
            {
                isLoading ? (
                    <h6 className={` ${titleFont.className} antialiased font-bold text-lg bg-gray-300 animate-pulse`}>
                        &nbsp;
                    </h6>
                ) : (
                    <h6 className={` ${titleFont.className} antialiased font-bold text-lg`}>
                        Stock: {Stock}
                    </h6>
                )
            }
        </>

    )
}
