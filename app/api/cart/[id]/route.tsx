import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch Cart (/api/cart/[id])
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const cart = await prisma.cart.findUnique({
    where: {
      id: id,
    },
    include: {
      products: true,
    },
  });
  return NextResponse.json(cart);
}

// Update Cart (full) (/api/cart/[id])
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const cartId = params.id;
  const { productId: productId } = await request.json();

  try {
    const cart = await prisma.cart.findUnique({
      where: {
        id: cartId,
      },
      include: {
        products: true,
      },
    });

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    const productExists = cart.products.some(
      (product) => product.id === productId
    );

    if (productExists) {
      return NextResponse.json(
        { error: "Product already exists in the cart" },
        {
          status: 400,
        }
      );
    }

    // Connect the product to the cart
    const updatedCart = await prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        products: {
          connect: {
            id: productId,
          },
        },
      },
      include: {
        products: true, // Include the connected products in the response
      },
    });

    return NextResponse.json(JSON.stringify(updatedCart), { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

// Delete Cart (/api/cart/[id])
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const deleted = await prisma.cart.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(deleted);
}
