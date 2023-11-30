import mongoose from "mongoose";
import {
  connectToMongoose,
  getAllOrdersFromMongoDB,
  getUserById,
  insertOrderFromAPI,
  insertOrdersIntoMongoose,
} from "./mongoose";

describe("Test for MongoDB functions", () => {
  beforeAll(async () => {
    await connectToMongoose();
  });
  it("should insert orders into MongoDB", async () => {
    await insertOrdersIntoMongoose();
    const orders = await getAllOrdersFromMongoDB();
    expect(orders.length).toBeGreaterThan(0);
  });
});

// //   it("should connect to MongoDB successfully", () => {
// //     expect(mongoose.connection).toBe(1);
// //   });

// // describe("Test for MongoDB functions", () => {
// //   it("hello", async () => {
// //     await connectToMongoose();
// //     expect(process.env.MONGODB_URI).toBe(mongoose.connect());
// //   });
// // });

// //   afterAll(async () => {
// //     // Optionally disconnect from MongoDB after all tests
// //     await mongoose.disconnect();
// //   });

// //   it("should insert orders into MongoDB", async () => {
// //     await insertOrdersIntoMongoose();
// //     const orders = await getAllOrdersFromMongoDB();
// //     expect(orders.length).toBeGreaterThan(0);
// //   });
// // });

// //   it("should fetch user by ID", async () => {
// //     const user = await getUserById("your-user-id");
// //     expect(user).toBeDefined();
// //   });

// //   it("should insert order from API", async () => {
// //     const order = {
// //       /* your order object */
// //     };
// //     const newOrder = await insertOrderFromAPI(order);
// //     expect(newOrder).toBeDefined();
// //   });

// // Add more test cases for other functions...
// // });
