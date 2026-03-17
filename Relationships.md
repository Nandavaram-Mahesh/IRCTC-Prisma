We'll cover three types of relationships:

1️⃣ One-to-One
2️⃣ One-to-Many
3️⃣ Many-to-Many



1️⃣ One-to-One Relationship (1 : 1)

model User{
    id String @id @default(cuid())
    email String @unique
    password String

    profile Profile?
}


model Profile{
    id String @id @default(cuid())
    bio String

    userId String  // ForeignKey

    user User @relation(fields:[userId],reference:[id])
}

    1.1:  What userId Actually Is
        
        userId String

        This is just a normal database column.

        Database table:

        id | bio | userId
        
        P1	Hello	U1

        It only stores the ID reference.

    1.2: What user Field Is
        
        user User

        This is not a database column.

        It is a relation field used by Prisma Client.

        It allows queries like:

        prisma.profile.findMany({
        include: { user: true }
        })

        Result:

        {
        "id": "p1",
        "bio": "Hello",
        "userId": "u1",
        "user": {
            "id": "u1",
            "email": "user@gmail.com"
        }
        }

        Without this field, Prisma cannot fetch related data easily.

2️⃣ One-to-Many Relationship (1 : N)

    One record in Table A can relate to many records in Table B.

    model User {
        id       String @id @default(cuid())
        email    String @unique

        bookings Booking[]
    }

    model Booking {
        id     String @id @default(cuid())
        userId String

        user   User @relation(fields: [userId], references: [id])
    }

3️⃣ Many-to-Many Relationship (M : N)

    Option 1: — Implicit Many-to-Many (Simple)

    model Student {
        id String @id @default(cuid())

        courses Course[]
    }

    model Course {
        id String @id @default(cuid())

        students Student[]
    }

    Option 2: Many-to-Many With Extra Fields (Explicit)

        Sometimes the join table must store extra data.

        Example in our train system:

        Train → Station

        But we also need:

        arrivalTime
        departureTime
        stopNumber

        So we create an explicit model.


        model Train {
            id String @id @default(cuid())

            routeStops TrainRouteStop[]
        }

        model Station {
            id String @id @default(cuid())

            routeStops TrainRouteStop[]
        }

        model TrainRouteStop {
            id String @id @default(cuid())

            trainId   String
            stationId String

            stopNumber Int

            train   Train   @relation(fields: [trainId], references: [id])
            station Station @relation(fields: [stationId], references: [id])
        }