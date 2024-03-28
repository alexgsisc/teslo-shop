'use server';

import prisma from "@/lib/prisma";

interface PaginationOptions {
    page?: number
    limit?: number

}

export const getPaginateProductsWithImages = async () => {
    try {
        const products = await prisma.product.findMany({
            take: 9,
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true
                    }
                }
            }
        })
        console.log(products.length);
        return {
            products: products.map(product => ({
                ...product,
                images: product.ProductImage.map(image => image.url)
            }))
        }
        
    } catch (error) {
        throw new Error('Error getting products')
    }
}