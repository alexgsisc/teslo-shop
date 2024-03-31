'use server';

import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {

    try {

        const product = await prisma.product.findFirst({
            include: {
                ProductImage: {
                    select: {
                        url: true
                    }
                }
            },
            where: {
                slug: slug
            }
        })

        if (!product) return null;

        const { ProductImage, ...productWithoutImages } = product

        return {
            ...productWithoutImages,
            images: product.ProductImage.map((image) => image.url)
        };

    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener el producto');
    }
}