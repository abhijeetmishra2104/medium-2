import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL :  string,
        JWT_SECRET : string
    },
    Variables: {
        userId: string;
        
    }
}> ();


blogRouter.use("/*", async (c, next) => {
    const authHeader =  c.req.header("authorization") || "";

    try{
        const user = await verify(authHeader, c.env.JWT_SECRET);

        if(user){
            // @ts-ignore
            c.set("userId", user.id);
            await next();
        }
        else {
            c.status(403);
            c.json({
                msg: "you are not logged in"
            })
        }
    }
    catch(e){
        c.status(403);
        return c.json({
            msg: "Jwt verification throwed an error",
            error: e
            
        })
    }
    
    
})



blogRouter.post('/', async (c) => {
	const userId = c.get("userId");
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId
		}
	});
	return c.json({
		id: post.id
	});
})



blogRouter.put("/", async (context) => {

    const body = await context.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: context.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const post = await prisma.post.update({
        where: {
            id: body.id,
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })

    return context.json({
        id: post.id,
        msg: "updated successfully"
    })
    
  })

blogRouter.get("/bulk", async (context) => {

    const prisma = new PrismaClient({
        datasourceUrl: context.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });
    return context.json({
        blogs
    })

})



blogRouter.get("/:id", async (context) => {
    
    const id =  context.req.param("id");

    const prisma = new PrismaClient({
        datasourceUrl: context.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const post = await prisma.post.findFirst({
            where: {
                id: id,
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
    
        return context.json({
            post
        })
    }
    catch{
        context.status(411);
        return context.json({
            msg: "error while fetching blog"
        })
    }
 
  })
