"use client";
import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import React, { useEffect, useState } from 'react'

export const SummaryDetails = () => {
    const [isLoading, setLoading] = useState(true);
    const { subTotal, total, tax, totalItems } = useCartStore(state => state.getDataSummary());

    useEffect(() => {
        setLoading(false)
    }, [])

    if (isLoading) {
        return <p>Loading...</p>
    }
    return (
        <>
            <div className="grid grid-cols-2">
                <span>No. Productos</span>
                <span className="text-right">{currencyFormat(totalItems)} artículos</span>

                <span>Subtotal</span>
                <span className="text-right">{currencyFormat(subTotal)}</span>

                <span>Impuestos (16%)</span>
                <span className="text-right">{currencyFormat(tax)}</span>

                <span className="mt-5 text-2xl">Total:</span>
                <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
            </div>
        </>
    )
}
