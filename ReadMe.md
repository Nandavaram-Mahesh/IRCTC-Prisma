This is a learning project
//////////////////////////////////////////////////
// USER
//////////////////////////////////////////////////
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

1️⃣ What a Booking Represents

A Booking is one ticket purchase event.

Example booking:

Booking
-------
User: Rahul
Train: 12627
Date: 20 Mar
Passengers: Rahul, Priya

That’s one booking.

2️⃣ Users Travel Multiple Times

In real life, people book trains many times.

Example:

Rahul travels multiple times during a year.

Booking 1
Chennai → Bangalore
Date: Jan 5

Booking 2
Bangalore → Chennai
Date: Jan 8

Booking 3
Chennai → Mumbai
Date: Mar 20

Booking 4
Mumbai → Chennai
Date: Mar 25

All of these belong to the same user.

//////////////////////////////////////////////////

//////////////////////////////////////////////////
// STATION
//////////////////////////////////////////////////
model Station {
  id   String @id @default(cuid())
  name String
  code String @unique
  city String

  trainRouteStops TrainRouteStop[]   // Junction table of Train <-> Station (Many to Many Table) with extra fields(arrival Time , departure time , stopNumber)
}

//////////////////////////////////////////////////


**`Station` has `trainRouteStops` because a station can appear in many train routes.**

But let’s walk through **how we arrive at this design**.

---

# 1️⃣ The Real-World Relationship

Think about a railway station like **Chennai Central**.

Many trains stop there.

Example:

```
Train A : Chennai → Bangalore → Mysore
Train B : Chennai → Vijayawada → Vizag
Train C : Madurai → Chennai → Delhi
```

So **one station belongs to many train routes**.

Relationship:

```
Station → many RouteStops
```

---

# 2️⃣ Why We Introduced `RouteStop`

Earlier we identified a **many-to-many relationship**.

```
Train ↔ Station
```

But we also need **extra information**:

```
arrivalTime
departureTime
stopNumber
```

Because of that we created a **junction table**:

```
RouteStop
```

So the real structure becomes:

```
Train --- RouteStop --- Station
```

---

# 3️⃣ The RouteStop Model

```prisma
model RouteStop {
  id        String @id @default(cuid())

  trainId   String
  stationId String

  stopNumber Int

  arrivalTime   DateTime?
  departureTime DateTime?

  train   Train   @relation(fields: [trainId], references: [id])
  station Station @relation(fields: [stationId], references: [id])
}
```

This table represents:

```
A specific train stopping at a specific station
```

Example row:

```
Train: 12627
Station: Bangalore
Stop: 3
Arrival: 06:20
Departure: 06:25
```````````
//////////////////////////////////////////////////