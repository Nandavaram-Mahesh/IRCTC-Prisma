model User {
  id String   @id @default(cuid())
  name String 
  email String @unique
  password String

  bookings   Booking[]

  createdAt DateTime @default(now()) // set once on creation
  updatedAt DateTime @updatedAt // auto-updated on every change
}

//////////////////////////////////////////////////
// User CRUD
//////////////////////////////////////////////////
🟢 CREATE User

const user = await prisma.user.create({
    data:{
        name: "M",
        email: "m@example.com",
        password: "hashed_password"
    }
})

👉 Think: data = row you want to insert

//////////////////////////////////////////////////

🔵 READ Users

    1. Get all users
    
    const users = await prisma.user.findMany()

    2. Get one user

    const user = await prisma.user.findUnique({
        where:{
             email: "m@example.com"
        }
    })

    👉 findUnique → must use unique field (email, id)
//////////////////////////////////////////////////

🟡 UPDATE User

    const updatedUser = await prisma.user.update({
          where: {
                    email: "m@example.com"
                },
          data: {
                    name: "New Name"
                }
    })

//////////////////////////////////////////////////

🔴 DELETE User

await prisma.user.delete({
  where: {
    email: "m@example.com"
  }
})

//////////////////////////////////////////////////



//////////////////////////////////////////////////
🔹 3. CRUD WITH RELATIONSHIPS
//////////////////////////////////////////////////


